import React from 'react'
import HeadlineSection from './HeadlineSection'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import { BsAsterisk } from 'react-icons/bs'
import { UserBtn } from './UserBtn'
import axios from 'axios'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase'
const PaymentForm = () => {
    const [user] = useAuthState(auth);
    const inputList = [{
        id: 1,
        title: "payer",
        type: "text",
        placeholder: "Enter Payer Name"
    },
    {
        id: 2,
        title: "company name",
        type: "text",
        placeholder: "Enter Company Name"
    },
    {
        id: 3,
        title: "Email Address",
        type: "email",
        placeholder: "Enter Email Address"
    }
    ]

    const handlePayment = (e) => {
        e.preventDefault();
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onerror = () => {
            alert("Razorpay SDK failed to load, Are you online?")
        }
        script.onload = async () => {
            try {
                // change the url
                const result = await axios.post('/create-order', { amount: "10000" })   // this is 100 paisa to rupee
                // console.log(result.data);
                let { amount, id: order_id, currency } = result.data;
                // console.log(amount.toString());
                const { data: { key: razorpayKey } } = await axios.get('http://localhost:5000/get-razor-pay-key');
                // razor-pay window
                // const value = amount * 100
                // console.log(value);
                const options = {
                    key: razorpayKey,
                    amount: amount.toString(),   // razorpay deals with paise so multiply with 100 to convert in rupee
                    currency: currency,
                    name: 'example_name',
                    description: "Example_transaction",
                    order_id: order_id,
                    handler: async (res) => {
                        try {
                            const result = await axios.post('http://localhost:5000/pay-order', {
                                amount: (amount / 100),
                                razorpayPaymentId: res.razorpay_payment_id,
                                razorpayOrderId: res.razorpay_order_id,
                                razorpaySignature: res.razorpay_signature
                            });
                            alert(result.data.msg);
                        } catch (err) {
                            alert(err);
                        }
                    },
                    prefill: {
                        name: "example name",
                        email: "email@example.com",
                        contact: "9999999999"
                    }
                }

                const paymentObject = new window.Razorpay(options)
                paymentObject.open();
            } catch (err) {
                alert(err);
            }
        }
        document.body.appendChild(script);
    }

    return (
        <div className='pt-2 pb-4 sm:max-w-[85%]  md:max-w-[75%] lg:max-w-[80%] max-w-[90%] md:block  flex flex-col justify-center mx-auto mt-10 min-h-[80vh] md:mb-0 mb-20'>
            <HeadlineSection title="Payment Details" />
            <form onSubmit={handlePayment} className="lg:max-w-[60%] bg-white sm:w-[80%] w-[95%] md:p-5 p-3 rounded-lg   shadow-lg ring-blue-400  flex flex-col space-y-5  mx-auto" action="">
                {
                    inputList.map((item) => (
                        <div key={item.id} className='flex flex-col space-y-2'>
                            <label htmlFor="" className='text-2xl font-semibold'>
                                <div className='flex space-x-2 items-center'>
                                    <BsAsterisk className='text-[1.1rem] text-red-500' />
                                    <h1 className='capitalize'>{item.title}</h1>
                                </div>
                            </label>
                            <input type={item.type} placeholder={item.placeholder} className="text-xl px-5 placeholder:text-[1.1rem] py-3 outline-none ring-2 rounded-md ring-blue-400 focus:ring-teal-500" required />
                        </div>
                    ))
                }
                <div>
                    <label htmlFor="" className='text-2xl font-semibold'>
                        <div className='flex space-x-2 items-center'>
                            <BsAsterisk className='text-[1.1rem] text-red-500' />
                            <h1 className='capitalize'>Contact Number</h1>
                        </div>
                    </label>
                    <PhoneInput
                        placeholder="Enter Your Contact number"
                        country={'in'}
                        containerStyle={{ margin: "10px auto", display: "block", width: "100%", }}
                        inputStyle={{ width: "100%", border: "1px solid blue" }}
                        inputProps={{ name: 'phone', required: true }}
                    />
                </div>
                <UserBtn title="Pay" />
            </form>
        </div>
    )
}

export default PaymentForm