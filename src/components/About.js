import React from 'react'
import { Link } from 'react-router-dom'
import banner from '../images/aboutUsBanner.png'
const About = () => {
    return (
        <div id='about' className='pt-2 pb-10 bg-slate-50'>
            <div className='mt-10 sm:max-w-[85%] mx-auto max-w-[95%] '>
                <h1 className='lg:text-7xl md:text-6xl text-4xl  font-semibold text-gray-500'>About Us</h1>
                <div className='flex justify-around mt-5 gap-4 '>
                    <div className='flex flex-col flex-1 space-y-6 self-center'>
                        <h1 className='text-2xl lg:text-5xl sm:text-4xl font-bold text-[#0D8ECD]'>Freedom from Boring Printed Business Cards</h1>
                        <p className='text-base sm:text-[1.1rem] font-sans '>Design your website in 2 minutes - it's easy, elegant and affordable. WebCraft is always in your pocket, never tears and never runs out. Your website can be easily updated with our user-friendly dashboard, so you won't need to re-print a business card again.</p>
                        <Link to="/login" className='py-4 w-[200px] px-5 hover:ring-2 rounded-md hover:ring-blue-400 bg-blue-400 text-white text-xl hover:bg-blue-300  transition-all duration-100 ease-linear hover:text-gray-800'>Create Now</Link>
                    </div>
                    <div className='md:block hidden flex-1 self-baseline'>
                        <img src={banner} alt="banner" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About