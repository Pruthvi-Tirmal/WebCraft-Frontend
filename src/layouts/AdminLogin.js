import React, { useState } from 'react'
import { motion } from 'framer-motion';
// import { getCred } from '../api/adminAPI';
import logo from '../images/logo.png';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate, } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
const AdminLogin = () => {
    const [error] = useAuthState(auth);
    const [login, setLogin] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };
    const handleAction = (e) => {
        const { name, value } = e.target;
        setLogin((prev) => { return { ...prev, [name]: value } });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (error) {
            toast.error(error);
        } else {
            signInWithEmailAndPassword(auth, login.email, login.password).then(({ user }) => {
                if (user.email !== "wcerbaft@admin.com" || user.uid !== "Hg35UcH1N4gjuZlhmMeuWdiMnDj1") { return; }
                toast.success("Login");
                setTimeout(() => {
                    navigate("/admin");
                }, 1000);
                // console.log(user)
            }).catch(err => {
                toast.error(err.message);
                // console.log(data);
            })
        }
    }
    return (
        <div className='grid place-items-center'>
            <Link to="/" className='mt-7 flex items-center gap-3 '>
                <img src={logo} className="w-12" alt="logo" />
                <h1 className='font-sans font-semibold text-2xl hidden sm:block'>WebCraft</h1>
            </Link>
            <h1 className='text-4xl text-gray-700 text-center my-5'>Admin Login</h1>
            <motion.form variants={item} action="" className='flex w-[50%] flex-col gap-4' onSubmit={handleSubmit} >
                <div className='flex flex-col gap-3'>
                    <label htmlFor="" className='text-gray-700 capitalize font-semibold text-xl'>Email</label>
                    <input type='email' value={login.email} name="email" required placeholder='name@gmail.com' className='px-4 py-3 outline-none ring-1 ring-gray-700 shadow-md rounded-md text-base font-normal font-sans' onChange={handleAction} />
                </div>

                <div className='flex flex-col gap-3'>
                    <label htmlFor="" className='text-gray-700 capitalize font-semibold text-xl'>Password</label>
                    <input type='password' value={login.password} name="password" required placeholder='6+ characters, 1+ special letter' className='px-4 py-3 outline-none ring-1 ring-gray-700 shadow-md rounded-md text-base font-normal font-sans' onChange={handleAction} />
                </div>
                <motion.button variants={item} className='shadow-md bg-gray-800  px-4 py-3 text-white font-sans  rounded-md hover:rounded-none text-xl hover:shadow-lg transition-all duration-150 ease-in-out'>Login</motion.button>
            </motion.form>
            <ToastContainer />
        </div>
    )
}

export default AdminLogin