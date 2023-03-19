import React from 'react'
import { Link } from 'react-router-dom'

const DemoVideo = () => {
    return (
        <div className=' grid place-items-center min-h-[80vh]'>
            <div className='flex flex-col space-y-5 '>
                <h1 className='text-gray-800 text-center  sm:text-3xl text-2xl font-semibold'>New To Try Making Website ? <span className='font-normal'>Don't Know How To Start</span> </h1>
                <p className='sm:text-2xl text-center text-xl text-gray-800'>Check Out Our Demo Video Below 💻</p>
            </div>
            <div className='shadow-lg border sm:max-w-[50%] w-[80%] mx-auto sm:h-[400px] h-[300px] mt-10 relative ring-4 ring-blue-400 rounded-lg'>

            </div>
            <Link className='px-4 py-3 border rounded-md shadow-md bg-blue-400 text-white mx-auto block max-w-fit mt-10' to="fill/userhome">Let's Create Now 🚀</Link>
        </div>
    )
}

export default DemoVideo