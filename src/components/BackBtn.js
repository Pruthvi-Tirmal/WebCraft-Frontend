import React from 'react'
import { FaBackward } from 'react-icons/fa'
import { Link } from 'react-router-dom'
const BackBtn = () => {
    return (
        <div className='flex md:w-[80%] justify-end'>
            <Link to="/dashboard/home" className='shadow-lg px-6 transform hover:scale-90 transition-all ease-linear duration-150 py-4 rounded-md w-fit bg-blue-300'>
                <FaBackward />
            </Link>
        </div>
    )
}

export default BackBtn