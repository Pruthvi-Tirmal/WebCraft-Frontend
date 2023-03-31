import React, { useEffect, useState } from 'react'
import Logo from '../images/logo.png'
import { motion } from 'framer-motion'
import { HiMenuAlt2, HiX } from "react-icons/hi";
import { Link as NavLink } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const Navbar = ({ flag = false }) => {
    const [toggle, setToggle] = useState(false);
    const pathCollection = [{ id: 3, path: "/login", title: "Login" }, { id: 4, path: "/signup", title: "Register" }]
    useEffect(() => {
        window.addEventListener('resize', () => {
            if (window.innerWidth > 791) {
                setToggle(false);
            }
        })
    })
    const handleAction = () => {
        setToggle(prev => !prev);
    }
    const [user] = useAuthState(auth);
    // console.log(user);
    return (
        <div id="home" className='flex items-center justify-between  max-w-[95%] pt-5  mx-auto relative'>
            <NavLink to="/" className='flex self-start  gap-2 items-center'>
                <img className='w-12' src={Logo} alt="Logo" />
                <p className='text-gray-800 font-sans font-semibold text-3xl'>WebCraft</p>
            </NavLink>
            {flag && (
                <>
                    <div className='md:flex hidden  text-[#001D3E] text-[1.1rem] items-center space-x-3 relative'>
                        <ScrollLink to="about" spy={true} smooth={true} offset={50} duration={500} className=' transition cursor-pointer duration-100 ease-linear hover:border-b-2 hover:border-b-[#001D3E] '>About</ScrollLink>
                        <span className='absolute left-[34%] -top-[15%] '>.</span>
                        <ScrollLink to="contact" spy={true} smooth={true} offset={50} duration={500} className='hover:border-b-2 cursor-pointer hover:border-b-[#001D3E]  transition duration-100 ease-linear '>Contact</ScrollLink>
                    </div>
                    <div className='md:flex hidden items-center text-base  gap-4'>
                        {!user ? (<>
                            <NavLink to="/login" className=' hover:border-2 hover:border-[#001D3E]  transition-all duration-200 ease-out  px-5 py-2 text-medium'>Login</NavLink>
                            <NavLink to="/signup" className='px-5 py-2 bg-[#001D3E] text-white'>Register</NavLink>
                        </>) : (<NavLink to="/dashboard/home" className='px-5 py-2 bg-[#001D3E] text-white'>Open Dashboard</NavLink>)}
                    </div>
                    <div className='md:hidden flex cursor-pointer' onClick={handleAction}>
                        <HiMenuAlt2 className='text-3xl' />
                    </div>
                    <motion.div initial={{ x: 2000, visibility: "hidden", opacity: 1 }} transition={{ type: "just", duration: 0.5 }} animate={{ x: toggle ? 0 : 2000, visibility: "visible" }} className={`w-full h-[100vh] z-50 fixed top-0 right-0 flex`} >
                        <div className="bg-black opacity-10 h-[100vh] md:w-[80%] w-[40%]" onClick={handleAction}></div>
                        <div className='bg-gray-800 relative md:w-[50%] w-[60%]'>
                            <div className="absolute right-4 cursor-pointer top-5" onClick={handleAction}><HiX className="text-4xl text-white" /></div>
                            <div className='flex justify-center'>
                                <ul className='flex flex-col text-white text-2xl text-semibold mt-36'>
                                    {!user ? (pathCollection.map((item) => (
                                        <NavLink className='px-4 py-3 rounded-lg transition-all ease-in-out duration-100 hover:bg-gray-600 text-center mb-5' to={item.path} key={item.id}>{item.title}</NavLink>
                                    ))) :
                                        (<NavLink className='px-4 py-3 rounded-lg transition-all ease-in-out duration-100 hover:bg-gray-600 text-center mb-5' to='/dashboard/home' >Open Dashboard</NavLink>)
                                    }
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </div >
    )
}

export default Navbar