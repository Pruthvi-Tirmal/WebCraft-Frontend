import React from 'react'
import { Link } from 'react-router-dom'
import Error from '../images/Error.jpg'
const ErrorPage = () => {
    return (
        <div className='w-full min-h-[80vh] grid place-items-center'>
            <div className='w-[450px]'>
                <img className='object-contain' src={Error} alt="errorpage" />
            </div>
            <Link to="/" className='ring-2 ring-blue-500 px-4 py-2 rounded-md hover:bg-gray-800 hover:ring-gray-500 text-white bg-blue-400 text-xl '>Go Home</Link>
        </div>
    )
}

export default ErrorPage