import React from 'react'
import { MdPhone } from "react-icons/md";
import { FaWhatsapp, FaEnvelope, FaMobile, FaFacebook, FaUsers, FaShareAlt, FaEdit, FaGooglePay } from "react-icons/fa";
import { RiQuestionAnswerFill, RiStarHalfLine } from "react-icons/ri";
import { HiLocationMarker, HiPhotograph, HiVideoCamera } from "react-icons/hi";


const FeaturesList = () => {
    const list = [{
        id: 1,
        icon: <MdPhone className='text-5xl font-bold text-blue-500' />,
        title: "Click to Call",
        subtitle: "Your customers will reach you by just tapping on mobile number on vCard."
    },
    {
        id: 2,
        icon: <FaWhatsapp className='text-5xl font-bold text-blue-500' />,
        title: "Click To WhatsApp",
        subtitle: "Your customers can whatsapp you without even saving your number!"
    },
    {
        id: 3,
        icon: <FaEnvelope className='text-5xl font-bold text-blue-500' />,
        title: "Click to Email",
        subtitle: "One Click and your customer will be able to send you an email directly."
    },
    {
        id: 4,
        icon: <HiLocationMarker className='text-5xl font-bold text-blue-500' />,
        title: "Click to Navigate",
        subtitle: "Using Website, people can navigate to your store with Google Maps."
    },
    {
        id: 5,
        icon: <FaMobile className='text-5xl font-bold text-blue-500' />,
        title: "Add to Contacts",
        subtitle: "People can save all your contact details in their phone address book."
    },
    {
        id: 6,
        icon: <FaFacebook className='text-5xl font-bold text-blue-500' />,
        title: "Website & Social Links",
        subtitle: "With digital visiting card, Customers can visit websites and social sites."
    },
    {
        id: 7,
        icon: <FaShareAlt className='text-5xl font-bold text-blue-500' />,
        title: "Share Unlimited",
        subtitle: "You can share your Website unlimited times to anyone using social media."
    },
    {
        id: 8,
        icon: <FaEdit className='text-5xl font-bold text-blue-500' />,
        title: "Easy To Update",
        subtitle: "You can update your details as and when you want to change the detail unlimited times."
    }, {
        id: 9,
        icon: <HiPhotograph className='text-5xl font-bold text-blue-500' />,
        title: "Photo Gallery",
        subtitle: "Showcase your business related images and products to your customers (15 to 20 photo )."
    }, {
        id: 10,
        icon: <FaGooglePay className='text-5xl font-bold text-blue-500' />,
        title: "Payment Section",
        subtitle: "Display payment details to your customers, Like: Paytm, Phonepe, Google Pay, Bank Account."
    },
    ]
    return (
        <div className='bg-slate-50 sm:p-5 p-2'>
            <h1 className='text-center text-4xl font-sans text-blue-500 font-bold'>Features</h1>
            <p className='text-center capitalize mt-5 text-2xl font-sans text-gray-800 font-semibold'>One Website, endless possibilities</p>
            <div className='sm:max-w-[95%]  justify-center max-w-[100%] mt-10 flex flex-wrap gap-x-4  gap-y-6  p-5 mx-auto'>
                {
                    list.map((item) => (
                        <div key={item.id} className='flex hover:scale-105 flex-col ring-2 ring-yellow-400 p-4 md:w-[300px] w-full space-y-4 border bg-slate-50 rounded-md shadow-lg transition-all duration-100 ease-linear  items-center'>
                            {item.icon}
                            <h1 className='text-3xl text-center font-semibold text-gray-800'>{item.title}</h1>
                            <p className='text-center text-gray-800'>{item.subtitle}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default FeaturesList