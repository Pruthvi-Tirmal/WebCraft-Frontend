import React, { useEffect, useState } from 'react'
import logo from '../images/logo.png'
import { FaRegBell, FaChevronDown } from "react-icons/fa";
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { toast, ToastContainer } from 'react-toastify'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth';
import { motion } from 'framer-motion'
const UserNavbar = ({ onlyUser = true, Sticky = true }) => {
  const [user] = useAuthState(auth);
  // const [show, setShow] = useState(false);
  let photoURL = null;
  photoURL = user?.photoURL;
  // console.log(displayName + photoURL);
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate('/');
    }).catch(err => {
      toast.error(err);
    })
  }

  return (
    <div className={`md:max-w-[80%]  bg-[#fff]  z-50 top-0 w-full sm:max-w-[85%] max-w-[95%] mb-3 pt-3 mx-auto ${Sticky ? "sticky" : ""}`} >
      <div className='flex justify-between items-center'>
        <div className=' flex items-center gap-3 cursor-pointer' onClick={() => navigate('/')}>
          <img src={logo} className="w-12" alt="Logo" />
          <h1 className='font-sans font-semibold text-2xl hidden sm:block'>WebCraft</h1>
        </div>
        <div className='flex gap-4 items-center'>
          <div className='flex md:mr-5'>
            <button onClick={handleSignOut} className='px-4 py-1 text-[1.1rem] ring-1 ring-gray-400 rounded-full'>Logout</button>
          </div>
          <div className='flex relative md:mr-5'>

            {onlyUser &&
              // (<div className='relative' onClick={() => { setShow((prev => !prev)) }}>
              //   <FaRegBell className=' text-2xl cursor-pointer ' />
              //   {/*//TODO below is badge to show the user about active notification */}
              //   <span className='animate-ping  absolute left-3 top-0 w-4 h-4 cursor-pointer z-10 bg-red-500 border border-red-500 rounded-full'></span>
              //   <span className='absolute left-3 top-0 w-4 h-4 cursor-pointer z-10 bg-red-500 border border-red-500 rounded-full'></span>
              // </div>)
              (<p></p>)
            }

            {/* <div >
              {show && (
                <div className='sm:w-[400px] w-[300px] z-40 bg-gray-800 top-[40px] border h-[500px] absolute sm:-right-[160px] -right-[70px] rounded-md'>

                  <div className='absolute bottom-3 w-full'>
                    <h1 className='capitalize hover:text-gray-200 cursor-pointer font-medium  text-white text-center'>all notifications</h1>
                  </div>

                </div>
              )}
            </div> */}
          </div>
          <div className='flex items-center gap-3  '>
            <img className='w-10 rounded-full' src={photoURL ? photoURL : "https://www.gravatar.com/avatar/00000000000000000000000000000000"} alt="User" />

            <div>

            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div >
  )
}

export default UserNavbar