import React from 'react'
import { FaChevronRight } from 'react-icons/fa';
export const UserBtn = ({ title }) => {
    return (
        <button className='sm:w-[40%] w-[50%] bg-teal-400 group text-xl rounded-lg self-end ring-teal-600 hover:ring-2 hover:scale-x-105 transition-all duration-150 ease-linear py-4 px-3 flex items-center space-x-3 justify-center'>
            <span className='text-gray-800 font-semibold'>{title}</span>
            <FaChevronRight className='transition-all ease-in duration-100 text-2xl transform  ' />
        </button>
    )
}
