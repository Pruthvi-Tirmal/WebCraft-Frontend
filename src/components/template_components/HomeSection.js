import React from 'react'
import { FaWhatsapp, FaPhoneAlt, FaShareAlt } from 'react-icons/fa'
import logo from '../../images/demo_avatar.png'
import LayoutBox from './LayoutBox'
import { RWebShare } from "react-web-share";
const HomeSection = ({ theme, companyName, founderName, nameTitle, companyLogo, url_id, whatsappNumber, phoneNumber }) => {
    return (
        <LayoutBox theme={theme}>
            <div id='userhome' className='w-full flex flex-wrap items-center justify-center sm:justify-evenly gap-4'>
                <div className=' flex items-center justify-center  overflow-hidden' >
                    <img src={companyLogo === "" ? logo : companyLogo} className="w-[150px] h-[150px] object-fill" alt="demoPIC" />
                </div>
                <div className='flex flex-col space-y-3'>
                    <h1 className='sm:text-2xl text-xl font-semibold text-white '>
                        {companyName}
                    </h1>
                    <p className='md:w-[100px] w-full h-[3px] mt-2 bg-gray-800'></p>
                    <p className='flex sm:items-start flex-col items-center '>
                        {nameTitle} {founderName}
                        <span>Founder</span>
                    </p>
                </div>
            </div>
            <div className='flex flex-col items-center justify-center mt-5'>
                <div className='flex flex-wrap justify-center gap-4'>
                    {/* whatsapp links, share and phonebook */}
                    {/* whatsapp */}
                    <a href={`https://wa.me/${whatsappNumber}?text=http://localhost:3000/${url_id}`} className='flex shadow-md bg-gray-700 px-3 py-2 rounded-md justify-center space-x-2 items-center hover:scale-95 transform transition-all duration-100 ease-linear'>
                        <div className='text-2xl'>
                            <FaWhatsapp />
                        </div>
                        <span>Share On Whatsapp</span>
                    </a>
                    {/* Phone */}
                    <a href={`tel:+${phoneNumber}`} className='cursor-pointer flex shadow-md bg-gray-700 px-3 py-2 rounded-md justify-center space-x-2 items-center hover:scale-95 transform transition-all duration-100 ease-linear'>
                        <div className='text-2xl'>
                            <FaPhoneAlt />
                        </div>
                        <span>Call Us</span>
                    </a>
                    {/* share */}
                    <RWebShare
                        data={{
                            url: `${url_id}`,
                            title: companyName,
                        }}
                        onClick={() => console.log("shared successfully!")}
                    >
                        <button className='flex shadow-md bg-gray-700 px-3 py-2 rounded-md justify-center space-x-2 items-center hover:scale-95 transform transition-all duration-100 ease-linear'>
                            <div className='text-2xl'>
                                <FaShareAlt />
                            </div>
                            <span>Share</span>
                        </button>
                    </RWebShare>
                </div>
                <div>
                </div>
            </div>
        </LayoutBox>
    )
}

export default HomeSection