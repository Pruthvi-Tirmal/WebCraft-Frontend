import React from 'react'
import LayoutBox from './LayoutBox'
import tpt from '../../images/logo.png'
const CompanyFooter = ({ theme }) => {
    return (
        <LayoutBox theme={theme}>
            <div className='flex flex-col items-center space-y-2'>
                <h1 onClick={() => window.location.href = "https://webcraft-223cd.web.app/"} className='text-xl cursor-pointer'>&copy; 2023 <span>www.webcraft.com</span></h1>
                <div className='flex items-center justify-center w-full'>
                    <h1 className='text-center text-gray-800 font-semibold flex-1'>Developed & Maintained by WebCraft </h1>
                    <img className=' w-8 h-8' src={tpt} alt="brand" />
                </div>
            </div>
        </LayoutBox>
    )
}

export default CompanyFooter