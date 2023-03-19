import React from 'react'
import { Link } from 'react-router-dom'
const ProgressBar = ({ progress }) => {
    return (
        <div className='flex space-y-3 flex-col'>
            <div className='w-full relative flex  rounded-md shadow-md shadow-slate-100 items-center h-[40px] bg-slate-100 overflow-hidden'>
                <h1 className='font-semibold text-gray-800 absolute left-[10px]'>{progress}%</h1>
                {/* tailwind do not dynamically add the styles in classes */}
                <div className="h-full bg-teal-400 transition-all duration-[1000ms] ease-in-out" style={{ width: `${progress}%` }}>
                </div>
            </div>
            <div className='flex flex-col items-start space-y-2'>
                <p className='text-gray-500 font-semibold'>Complete The Remaining Work...</p>
                <Link to="../create/fill" className='px-3 py-2 ring-2 ring-teal-400 text-gray-500 font-semibold rounded-md transition-all duration-150 ease-linear hover:bg-teal-400 hover:text-white shadow-md shadow-teal-200'>Start 💻</Link>
            </div>
        </div>
    )
}

export default ProgressBar