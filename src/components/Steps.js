import React from 'react'
import { MdOutlineFormatPaint, MdSimCardDownload, MdShare } from "react-icons/md";
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll'
const Steps = () => {
    const stepsCollection = [{
        id: 1,
        title: "Create Your Website",
        subtitle: "Design your Website in 2 minutes",
        icon: <MdOutlineFormatPaint className="text-4xl text-blue-500" />
    },
    {
        id: 2,
        title: "Save to your Device",
        subtitle: "Digital Visiting Website is accessible anytime from anywhere",
        icon: <MdSimCardDownload className="text-4xl text-blue-500" />
    },
    {
        id: 3,
        title: "Share with friends",
        subtitle: "Share your card through a variety of channels",
        icon: <MdShare className="text-4xl text-blue-500" />
    },
    ]
    return (
        <div className='sm:p-5 p-2 bg-[#f3f3f39c] '>
            <div className='mt-14'>
                <h1 className='text-center font-semibold text-4xl font-sans text-gray-800'>A New Era</h1>
                <p className='text-center mt-5 font-semibold text-5xl font-sans text-blue-500'>Digital Business Website</p>
                <p className='sm:max-w-[80%] max-w-[95%] mx-auto mt-5 text-[1.1rem] font-medium text-center'>WebCraft brings you a new age digital visiting card, that is smart elegant and affordable. No now more worries of carrying paper visiting card. Share Website link with unlimited persons anywhere anytime on just a single click.</p>
                <div className='flex flex-wrap gap-3 justify-center mt-5'>
                    <Link to="/login" className={`py-3 px-6 font-base bg-gray-700 text-white shadow-md hover:bg-gray-600 hover:ring-2 hover:ring-gray-800 transition-all duration-100 ease-in rounded-lg border text-xl`}>Create a Website</Link>
                    <ScrollLink to="contact" spy={true} smooth={true} offset={50} duration={500} className={`py-3 px-6 font-base bg-blue-500 text-white shadow-md hover:bg-blue-600 hover:ring-2 hover:ring-blue-800 cursor-pointer transition-all duration-100 ease-in rounded-lg border text-xl`}>Contact Us</ScrollLink>
                </div>
            </div>
            <div className='mt-[150px] pb-5'>
                <h1 className='text-center font-semibold text-4xl text-gray-800'>How it works </h1>
                <div className='flex flex-wrap justify-between max-w-[90%] gap-4 mx-auto mt-10'>
                    {stepsCollection.map((item) => (
                        <div key={item.id} className='flex md:max-w-[30%] items-center cursor-pointer transition-all duration-150 hover:scale-105 hover:shadow-md ease-linear md:shadow-lg p-5 ring-2 ring-gray-800 rounded-md  flex-wrap gap-3'>
                            <div className='rounded-full shadow-lg p-2'>
                                {item.icon}
                            </div>
                            <div className='flex flex-col'>
                                <h1 className='text-2xl font-bold'>{item.title}</h1>
                                <p className='text-xl'>{item.subtitle}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Steps