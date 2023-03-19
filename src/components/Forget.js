import React, { useState } from 'react'
import Navbar from './Navbar'
import forgetIcon from '../images/confused.png'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import { motion } from 'framer-motion'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'
import { sendPasswordResetEmail } from 'firebase/auth'
const Forget = () => {
    const [user, error] = useAuthState(auth);
    const [mail, setMail] = useState("");
    const handleAction = (e) => {
        setMail(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (user) {
            toast.info("Your are already Logged In, First Logout");
        } else if (error) {
            toast.error(error);
        } else {

            sendPasswordResetEmail(auth, mail).then((res) => {
                toast("Reset Password Email is send to your respective Email, Check Your Spam Section if not present")
            }).catch((err) => {
                toast.error(err.message)
            })
        }
        e.target.reset();
        setMail("");
    }

    return (
        <>
            <div className=''>
                <Navbar></Navbar>
                <motion.div initial={{ visibility: 'hidden', opacity: 0, y: 10 }} animate={{ visibility: 'visible', opacity: 1, y: 0 }} transition={{ type: 'just', duration: 1 }} className='md:max-w-[50%]  min-h-[80vh] justify-center mt-10 sm:mt-0 sm:max-w-[60%]  px-5 gap-5 flex flex-col max-w-[95%] mx-auto'>
                    <h1 className='text-center sm:text-4xl text-3xl text-red-500  font-semibold'>Forget Password?</h1>
                    <div className='mx-auto mt-10 flex justify-center'>
                        <img className='w-40 object-cover' src={forgetIcon} alt="forgetIcon" />
                    </div>
                    <p className='text-center font-base text-xl sm:text-2xl mb-5 font-sans capitalize'>enter your email address to retrieve your password</p>
                    <form action="" className='flex flex-col gap-5' onSubmit={handleSubmit}>

                        <div className='flex flex-col gap-3'>
                            <label htmlFor="" className='text-gray-700 capitalize font-semibold text-xl'>Email</label>
                            <input type='email' value={setMail.email} name="email" required placeholder='Enter Email Address' className='px-4 py-3 outline-none ring-1 ring-gray-700 shadow-md rounded-md text-base font-normal font-sans' onChange={handleAction} />
                        </div>
                        <Link to='/login' className='self-end hover:underline '>already know password?</Link>
                        <button className='shadow-md bg-red-500  px-4 py-3 text-white font-sans  rounded-md hover:rounded-none text-xl hover:shadow-lg transition-all duration-150 ease-in-out block w-full'>Reset Password</button>
                    </form>
                </motion.div>
                <ToastContainer />
            </div>
        </>
    )
}

export default Forget