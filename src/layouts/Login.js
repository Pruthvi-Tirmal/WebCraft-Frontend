import React, { useState } from 'react'

import Navbar from '../components/Navbar'
import BannerForLogin from '../images/BannerForLogin.svg'
import { motion } from 'framer-motion'

import { signInWithEmailAndPassword } from 'firebase/auth'
import { toast, ToastContainer } from 'react-toastify'
import { auth } from '../firebase'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'

import GoogleButton from '../components/GoogleButton'
const Login = () => {
    const navigate = useNavigate();
    const [user, error] = useAuthState(auth);
    const [login, setLogin] = useState({ email: "", password: "" });

    const container = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    }
    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    const handleAction = (e) => {
        const { name, value } = e.target;
        setLogin((prev) => { return { ...prev, [name]: value } })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (user) {
            // console.log(user);
            toast.info("Your Are Already Logged, First Logout");
        } else if (error) {
            toast.error(error);
        } else {
            signInWithEmailAndPassword(auth, login.email, login.password).then((user) => {
                toast.success("Login");
                setTimeout(() => {
                    navigate("/dashboard/home");
                }, 3000);
                // console.log(user)
            }).catch(err => {
                toast.error(err.message);
                // console.log(data);
            })
        }
    }
    return (
        <>
            <Navbar />

            <div className='flex    sm:max-w-[85%] flex-row-reverse max-w-[90%]  mx-auto mt-10  justify-evenly '>
                <motion.div initial={{ visibility: "hidden", opacity: 0, x: 100 }} transition={{ type: "tween", duration: 1 }} animate={{ visibility: "visible", opacity: 1, x: 0 }} className='sm:flex flex-col justify-start sm:justify-center  max-w-[50%]  md:ml-0 sm:ml-9 hidden '>
                    <img src={BannerForLogin} className="w-full h-auto scale-125" alt="Banner" loading="lazy" />
                </motion.div>

                <motion.div variants={container} initial="hidden"
                    animate="visible" className='flex flex-col gap-3   lg:w-[30%] md:w-min-[40%] w-full  min-h-[80vh] justify-center'>

                    <motion.h1 variants={item} className='md:text-4xl text-3xl font-sans font-bold text-blue-600'>Login</motion.h1>
                    <motion.h2 variants={item} className='capitalize text-base font-sans font-semibold text-gray-500'>not a member? <Link to='/signup' className='text-blue-600'>sign up</Link></motion.h2>
                    <GoogleButton variants={item} title="Login with Google" />
                    <motion.div variants={item} className='flex  items-center justify-center relative'><span className='text-gray-500  h-[2px] border-1 border-gray-500 w-[300px] z-0 bg-gray-500 top-[55%] left-[50%] -translate-x-[50%] -translate-y-[50%] absolute'></span>
                        <span className='font-semibold bg-white  relative text-gray-500  text-center'>or Sign In with Email</span>
                    </motion.div>
                    <motion.form variants={item} action="" className='flex flex-col gap-4' onSubmit={handleSubmit}>
                        <div className='flex flex-col gap-3'>
                            <label htmlFor="" className='text-gray-700 capitalize font-semibold text-xl'>Email</label>
                            <input type='email' value={login.email} name="email" required placeholder='name@gmail.com' className='px-4 py-3 outline-none ring-1 ring-gray-700 shadow-md rounded-md text-base font-normal font-sans' onChange={handleAction} />
                        </div>

                        <div className='flex flex-col gap-3'>
                            <label htmlFor="" className='text-gray-700 capitalize font-semibold text-xl'>Password</label>
                            <input type='password' value={login.password} name="password" required placeholder='6+ characters, 1+ special letter' className='px-4 py-3 outline-none ring-1 ring-gray-700 shadow-md rounded-md text-base font-normal font-sans' onChange={handleAction} />
                        </div>
                        <Link to="/forget" className='text-gray-500 self-end font-sans cursor-pointer hover:underline'>forget password ?</Link>
                        <motion.button variants={item} className='shadow-md bg-gray-800  px-4 py-3 text-white font-sans  rounded-md hover:rounded-none text-xl hover:shadow-lg transition-all duration-150 ease-in-out'>Login</motion.button>
                    </motion.form>


                </motion.div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Login