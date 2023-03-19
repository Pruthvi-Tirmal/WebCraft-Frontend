import React from 'react'
import Headline from './Headline'
import LayoutBox from './LayoutBox'
import { Gallery, Item } from 'react-photoswipe-gallery'
const PaymentSection = ({ theme, files, bankName, ifscCode, accountHolder, accountNumber, mobile }) => {
    return (
        <LayoutBox theme={theme}>
            <Headline title="Payment" />
            <div id='userpayment' className='w-[95%] mx-auto mt-4 rounded-lg shadow-lg ring-2 ring-gray-800 p-4'>
                <h1 className='font-bold text-2xl '>Account Details :</h1>
                <div className='flex flex-col mt-4 text-gray-800  space-y-5'>
                    <div className='flex items-center space-x-1 text-xl'>
                        <span className='flex-1 font-semibold'>Bank Name : </span>
                        <span className='flex-[0.5] font-medium text-white'>{bankName}</span>
                    </div>
                    <div className='flex items-center space-x-1 text-xl'>
                        <span className='flex-1 font-semibold'>Account Number : </span>
                        <span className='flex-[0.5] font-medium text-white'>{accountNumber}</span>
                    </div>
                    <div className='flex items-center space-x-1 text-xl'>
                        <span className='flex-1 font-semibold'>Account Holder Name : </span>
                        <span className='flex-[0.5] font-medium text-white'>{accountHolder}</span>
                    </div>
                    <div className='flex items-center space-x-1 text-xl'>
                        <span className='flex-1 font-semibold'>IFSC Code : </span>
                        <span className='flex-[0.5] font-medium text-white'>{ifscCode}</span>
                    </div>
                    <div className='flex items-center space-x-1 text-xl'>
                        <span className='flex-1 font-semibold'>Mobile Number : </span>
                        <span className='flex-[0.5] font-medium text-white'>+{mobile}</span>
                    </div>

                </div>
            </div>
            <div className='mt-9'>
                <Headline title="Payment QRCode" />
                <div className=''>
                    <Gallery>

                        {files.map((item, index) => (
                            <div className="cursor-pointer " key={index}>
                                <Item original={item.encoded} key={index} width="1024" height="768"  >
                                    {({ ref, open }) => (
                                        <img ref={ref} onClick={open} alt="error" src={item.encoded} className="border-2 border-gray-800 w-[350px] mb-4" />
                                    )}
                                </Item>
                            </div>
                        ))}
                    </Gallery>
                </div>
            </div>
        </LayoutBox>
    )
}

export default PaymentSection