import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { getCred } from '../api/adminAPI';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate, } from 'react-router-dom';
const AdminLogin = () => {
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
        try {
            const res = await getCred(login);
            if (res.data) {
                // localStorage
                if (!window.localStorage.getItem("email")) {
                    console.log("done");
                    window.localStorage.setItem("email", res.data.email);
                }
                navigate("../admin");
            } else {
                toast.warning("Wrong Credentials");
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className='grid place-items-center'>
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