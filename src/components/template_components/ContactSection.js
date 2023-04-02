import React from 'react'
import LayoutBox from './LayoutBox'
import Headline from './Headline'
import { BsEnvelopeFill } from 'react-icons/bs';
import { FaLocationArrow } from 'react-icons/fa';
const ContactSection = ({ theme, email, address }) => {
    return (
        <LayoutBox theme={theme}>
            <Headline title="Any Query Contact Us" />
            <div className='flex flex-col w-full gap-y-3'>
                <div className='flex flex-wrap justify-center items-center gap-4'>
                    <BsEnvelopeFill className="text-3xl" />
                    <a className='text-2xl font-medium text-gray-800 hover:underline decoration-white' href={`mailto:${email}?subject="Queries"`}>{email}</a>
                </div>
                <div>
                    <div className='flex mb-4 justify-center items-center pb-1 border-b-4 border-gray-800 w-fit mx-auto gap-x-3'>
                        <FaLocationArrow className='text-2xl text-white' />
                        <h1 className='font-semibold text-2xl text-white mt-3 mb-2 text-center  '>Location</h1>
                        {/* <Headline title="Location" /> */}
                    </div>
                    <p className='text-white text-center'>{address}</p>
                </div>
            </div>
        </LayoutBox>
    )
}

export default ContactSection