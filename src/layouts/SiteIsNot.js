import React from 'react'
import siteNotFound from '../images/site_not_found.jpg';
import logo from '../images/logo.png'
import { Link } from 'react-router-dom';
const SiteIsNot = () => {
    return (
        <div className='relative  '>
            <Link to="/" className='flex items-center space-x-4  p-2 mt-4'>
                <img src={logo} className="w-[50px] h-[50px]" alt="error" />
                <span className='text-gray-700 font-semibold text-2xl'>WebCraft</span>
            </Link>
            <div className='flex flex-wrap min-h-[80vh] px-7 md:mt-0 mt-10  items-center'>
                <div className=' flex flex-col justify-center items-center '>
                    <h1 className='text-red-500 md:text-5xl text-4xl font-semibold'>Site is not present</h1>
                    <p className='mt-3 text-3xl text-gray-400 md:text-left text-center'>have you written the url correct or not? 🙄</p>
                    <div className='mt-10 gap-3 flex flex-col items-center'>
                        <h1 className='text-2xl capitalize font-semibold text-gray-700 '>Want to Create a website?</h1>
                        <Link to="/" className='text-white bg-yellow-300 px-5 py-2 rounded-full'>Click Me</Link>
                    </div>
                </div>
                <div className='flex-1 flex flex-col justify-center'>
                    <img src={siteNotFound} alt="site-not-present" />
                </div>
            </div>
        </div>
    )
}

export default SiteIsNot