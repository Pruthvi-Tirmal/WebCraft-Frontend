import React from 'react'
import LayoutBox from './LayoutBox'
import Headline from './Headline'
import { BsEnvelopeFill } from 'react-icons/bs';
const ContactSection = ({ theme, email }) => {
    return (
        <LayoutBox theme={theme}>
            <Headline title="Any Query Contact Us" />
            <div className='flex flex-col w-full'>
                <div className='flex flex-wrap justify-center items-center gap-4'>
                    <BsEnvelopeFill className="text-3xl" />
                    <a className='text-2xl font-medium text-gray-800 hover:underline decoration-white' href={`mailto:${email}?subject="Queries"`}>{email}</a>
                </div>
            </div>
        </LayoutBox>
    )
}

export default ContactSection