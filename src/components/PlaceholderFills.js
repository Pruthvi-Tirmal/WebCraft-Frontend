import React from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa';
const PlaceholderFills = ({ title }) => {
    return (
        <div className='flex  items-center space-x-3 '>
            <FaAngleDoubleRight className='text-blue-500 text-2xl' />
            <h1 className='sm:text-2xl text-xl font-semibold text-gray-800'>{title}</h1>
        </div>
    )
}

export default PlaceholderFills