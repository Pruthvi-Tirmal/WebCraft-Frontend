import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import BannerForSignUp from '../images/BannerForSignUp.svg'
import { motion } from 'framer-motion'
// notify
import { ToastContainer, toast } from "react-toastify";

// firebase hooks
import { auth, } from '../firebase'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth';

import GoogleButton from '../components/GoogleButton'
import { storeInDB } from '../components/firebase_firestore_method';
const SignUp = () => {
    const navigate = useNavigate();
    const [signUp, setSignUp] = useState({ email: "", password: "" });
    const [user, error] = useAuthState(auth);
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
        setSignUp((prev) => { return { ...prev, [name]: value } })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (user) {
            console.log(user);
            toast.info("Your Are Already Logged, First Logout");
        } else if (error) {
            toast.error(error);
        } else {
            createUserWithEmailAndPassword(auth, signUp.email, signUp.password).then((user) => {
                // email verification
                // console.log(auth.currentUser)
                // console.log(user);

                // store in db
                storeInDB(auth.currentUser);

                sendEmailVerification(auth.currentUser).then(() => {
                    toast.success("Verify Your Email Check Email if not present check spam folder");
                    setTimeout(() => {
                        navigate("/dashboard/home");
                    }, 3000);
                }).catch(err => {
                    console.log(err);
                })

            }).catch(err => {
                toast.error(err.message);
            })

        }
    }
    return (
        <>

            <Navbar />

            <div className='flex sm:max-w-[85%] sm:gap-10 gap-0 max-w-[90%]  mx-auto mt-10  justify-evenly '>
                <motion.div initial={{ visibility: "hidden", opacity: 0, x: -100 }} transition={{ type: "tween", duration: 1 }} animate={{ visibility: "visible", opacity: 1, x: 0 }} className='sm:flex flex-col  sm:justify-center max-w-[50%]   hidden'>
                    <img src={BannerForSignUp} className="w-full h-auto scale-125" alt="Banner" loading="lazy" />
                </motion.div>

                <motion.div variants={container} initial="hidden"
                    animate="visible" className='flex flex-col gap-3   lg:w-[30%] md:w-min-[40%] w-full  min-h-[80vh] justify-center'>
                    <motion.p variants={item} className='uppercase font-semibold text-gray-500'>start for free</motion.p>
                    <motion.h1 variants={item} className='md:text-4xl text-3xl font-sans font-bold text-blue-600'>Sign up to WebCraft</motion.h1>
                    <motion.h2 variants={item} className='capitalize text-base font-sans font-semibold text-gray-500'>already a member? <Link to='/login' className='text-blue-600'>Log In</Link></motion.h2>
                    <motion.form variants={item} action="" className='flex flex-col gap-4' onSubmit={handleSubmit}>
                        <div className='flex flex-col gap-3'>
                            <label htmlFor="" className='text-gray-700 capitalize font-semibold text-xl'>Email</label>
                            <input type='email' value={signUp.email} name="email" required placeholder='name@gmail.com' className='px-4 py-3 outline-none ring-1 ring-gray-700 shadow-md rounded-md text-base font-normal font-sans' onChange={handleAction} />
                        </div>

                        <div className='flex flex-col gap-3'>
                            <label htmlFor="" className='text-gray-700 capitalize font-semibold text-xl'>Password</label>
                            <input type='password' value={signUp.password} name="password" required placeholder='6+ characters, 1+ special letter' className='px-4 py-3 outline-none ring-1 ring-gray-700 shadow-md rounded-md text-base font-normal font-sans' onChange={handleAction} />
                        </div>
                        {/* {forget && <Link to="/forget" className='text-gray-500 self-end font-sans cursor-pointer hover:underline'>forget password ?</Link>} */}
                        <motion.button variants={item} className='shadow-md bg-gray-800  px-4 py-3 text-white font-sans  rounded-md hover:rounded-none text-xl hover:shadow-lg transition-all duration-150 ease-in-out'>Create an account</motion.button>
                    </motion.form>
                    <GoogleButton variants={item} flag={false} title="Sign Up with Google" />

                </motion.div>

            </div>
            <ToastContainer />
        </>
    )
}

export default SignUp