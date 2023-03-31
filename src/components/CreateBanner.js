import React from 'react'
import Navbar from './Navbar'
import heroSectionBanner from '../images/heroSection.png'
// import { Link as ScrollLink } from 'react-scroll'
import { Link } from 'react-router-dom'
const CreateBanner = () => {
    return (
        <div style={{
            background: "rgb(240,252,255)",
            backgroundImage: "linear-gradient(90deg, rgba(240,252,255,1) 36%, rgba(255,248,249,1) 54%)"
        }}>
            <Navbar flag={true} />
            <div className='h-auto  pb-5 flex md:mt-20 mt-10'>
                <div className='flex  md:flex-row gap-4 flex-col-reverse max-w-[90%] mx-auto md:flex-nowrap flex-wrap justify-around'>
                    <div className='flex flex-col  max-w-[100%] justify-center  gap-7 relative'>
                        <div className='flex gap-3 items-end '>
                            <span className='border-[#001D3E]  h-[1px] w-[50px] bg-[#304964]'></span>
                            <h1 className='text-[#304964] text-xl font-semibold '>New Digital Era</h1>
                        </div>
                        <div className='flex flex-col gap-11'>
                            <h1 className='font-bold text-[#001D3E] capitalize lg:text-6xl md:text-5xl text-4xl'>The New <br />way to discover digitally</h1>
                            <p className='font-semibold text-xl text-[#304964] capitalize'>Inspire Your Client Digitally.</p>
                        </div>
                        <div className='space-x-4 space-y-4 '>
                            <Link to="/login" className='px-5 py-3 text-base bg-[#001D3E] text-white'>Create Your Website Now</Link>
                        </div>
                    </div>
                    <div>
                        <img src={heroSectionBanner} alt="Banner" loading='lazy' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateBanner