import React from 'react'
import { NavLink } from 'react-router-dom'
import './scrollHide.css'

const NaviUpdateSec = () => {
    return (
        <div className='overflow-x-scroll rounded-md w-fit py-3 pr-2 pl-1 shadow-md scrollHide'>
            <nav className='flex justify-start items-center space-x-4 text-xl  font-medium text-gray-400'>
                <NavLink style={({ isActive }) =>
                    isActive ? { borderBottom: "2px solid #6366F1", color: "#6366F1" } : undefined
                } to="userhome" className="h-[34px]">Home</NavLink>
                <NavLink style={({ isActive }) =>
                    isActive ? { borderBottom: "2px solid #6366F1", color: "#6366F1" } : undefined
                } to="userabout" className="h-[34px]">About</NavLink>
                <NavLink style={({ isActive }) =>
                    isActive ? { borderBottom: "2px solid #6366F1", color: "#6366F1" } : undefined
                } to="userproducts" className="h-[34px]">Products</NavLink>
                <NavLink style={({ isActive }) =>
                    isActive ? { borderBottom: "2px solid #6366F1", color: "#6366F1" } : undefined
                } to="usergallery" className="h-[34px]">Gallery</NavLink>
                <NavLink style={({ isActive }) =>
                    isActive ? { borderBottom: "2px solid #6366F1", color: "#6366F1" } : undefined
                } to="userpayment" className="h-[34px]">Payment</NavLink>
            </nav>
        </div>
    )
}

export default NaviUpdateSec