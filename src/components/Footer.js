import React from 'react'
import { Link as NavLink } from 'react-router-dom'
import logo from '../images/logo.png'
import { Link as ScrollLink } from 'react-scroll'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'
const Footer = () => {
    const LinkList = [{ id: 1, title: "Home", path: "home" }, { id: 2, title: "About", path: "about" }, { id: 3, title: "Contact", path: "contact" }]
    const [user] = useAuthState(auth);
    return (
        <div className='bg-[#fefefe] p-5'>
            <div className='max-w-[80%] flex space-y-2 flex-col items-center mx-auto'>
                <div className='w-20'>
                    <img src={logo} alt="brand" />
                </div>
                <h1 className='font-semibold '>Copyright © 2023 webcraft.com - All rights reserved. </h1>
                <div className='font-semibold flex items-center gap-4'>
                    {
                        LinkList.map((item) => (
                            <ScrollLink className='cursor-pointer' key={item.id} to={item.path} spy={true} smooth={true} offset={50} duration={500}>{item.title}</ScrollLink>
                        ))
                    }

                    {user ? (<NavLink to="/dashboard/home">Open Dashboard</NavLink>) : (
                        <>
                            <NavLink to="/login">Login</NavLink>
                            <NavLink to="/signup">Register</NavLink>
                        </>
                    )
                    }

                </div>
            </div>
        </div>
    )
}

export default Footer