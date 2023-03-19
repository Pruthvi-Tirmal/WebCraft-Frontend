import React, { useRef } from 'react'
import FormInputs from './FormInputs'
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const ContactUs = () => {
    const inputList = [{
        id: 1,
        labelName: "Your Name",
        name: "fullname",
        type: "text",
        placeholder: "Enter Your Name : "
    },
    {
        id: 2,
        labelName: "Your Email",
        name: "email",
        type: "email",
        placeholder: "Enter Your Email address : "
    }, {
        id: 3,
        labelName: "Your Phone",
        name: "phone",
        type: "text",
        placeholder: "Enter Your Mobile Number : "
    }]

    // email js
    const form = useRef();
    // notification
    const successNotify = () => {
        toast.success("Your Message is sent!")
    }
    const errorNotify = () => {
        toast.error("Error While Sending Message Try again!")
    }
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_b940hi9', 'template_3dvtebt', form.current, 'gq4nwM8TH4MMpsFdK')
            .then((result) => {
                console.log(result);
                successNotify()
            }, (error) => {
                errorNotify();
            });

        e.target.reset();
    };

    return (
        <>
            <div id='contact' className='bg-[#E1F3FF] pt-5 pb-5'>
                <div className='sm:max-w-[90%] max-w-[95%] p-2  mx-auto flex-wrap flex justify-evenly gap-6'>
                    <div className='flex flex-1 flex-col'>
                        <iframe className='sm:w-[600px] w-full  h-[450px]' title='the pioneer tech company' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.8947211595378!2d72.43756931478602!3d23.06432098493196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9c1732514939%3A0xefe384ba0a79209c!2sIndus%20University!5e0!3m2!1sen!2sin!4v1676082002092!5m2!1sen!2sin" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        <h1 className='text-gray-800 text-3xl font-semibold mt-2 capitalize'>
                            contact info
                        </h1>
                        <p className='text-xl text-gray-800 font-semibold'>Email : <span className="text-gray-700">webcraft.feedback@webcraft.com</span>
                        </p>
                    </div>
                    <div className='flex-[1] md:ml-10 text-gray-800' >
                        <h1 className='text-4xl  text-center font-semibold font-sans '>
                            Contact Us
                        </h1>
                        <form action="" ref={form} onSubmit={sendEmail}>
                            {
                                inputList.map((item) => (
                                    <FormInputs key={item.id} {...item} />
                                ))
                            }
                            <div className='flex flex-col gap-3'>
                                <label htmlFor="" className='text-gray-700 capitalize font-semibold text-xl'>Your Message</label>
                                <textarea type="textarea" name="msg" required placeholder="Enter Your Message" className='px-4 py-3 outline-none ring-1 ring-gray-700 shadow-md rounded-md text-base font-normal font-sans' />
                            </div>
                            <button className='py-4 w-[200px] mt-6 px-5 hover:ring-2 rounded-md hover:ring-gray-400 bg-gray-500 text-white text-[1.1rem] hover:bg-gray-300  transition-all duration-100 ease-linear hover:text-gray-800'>Send</button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default ContactUs