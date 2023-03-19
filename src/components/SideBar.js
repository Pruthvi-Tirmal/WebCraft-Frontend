import React, { useState } from 'react'
import { FaUser, FaHome, FaUserFriends, FaBoxes } from 'react-icons/fa'
import { BsImages, BsFillCollectionFill, BsFillCreditCardFill, BsMenuButtonFill, BsFillCompassFill } from 'react-icons/bs'
import { NavLink, useParams } from 'react-router-dom'


const SideBar = () => {
    const data = [{
        id: 1,
        name: "Users",
        path: "users",
        icon: <FaUserFriends className='text-4xl' />
    }, {
        id: 2,
        name: "Home",
        path: "homes",
        icon: <FaHome className='text-4xl' />
    }, {
        id: 3,
        name: "About",
        path: "about",
        icon: <FaUser className='text-4xl' />
    },
    {
        id: 4,
        path: "products-services",
        name: "Product and Service",
        icon: <FaBoxes className='text-6xl' />
    }, {
        id: 5,
        name: "Gallery",
        path: "galleries",
        icon: <BsImages className='text-4xl' />
    }, {
        id: 6,
        path: "userpayments",
        name: "User Payments",
        icon: <BsFillCollectionFill className='text-4xl' />
    }, {
        id: 7,
        name: "Payments",
        path: "payments",
        icon: <BsFillCreditCardFill className='text-4xl' />
    }, {
        id: 8,
        path: "trackers",
        name: "Track User Progress",
        icon: <BsFillCompassFill className='text-4xl' />
    },
    {
        id: 9,
        path: "urls-names",
        name: "URLS Names",
        icon: <BsMenuButtonFill className='text-4xl' />
    },
    ]
    const url = useParams();
    // const [check, setCheck] = useState(true);
    // console.log(url);
    let check = true;
    if (url.id && url?.id?.includes('@')) {
        // setCheck(false);
        check = false;
        return;
    }
    return (
        <>
            {check && (<div className='min-h-[100vh] w-[20%] bg-sky-500 p-2 pb-[50px]'>
                <h1 className='text-center text-2xl font-semibold text-gray-800 p-3 mb-2 shadow-md bg-white rounded-md'>Sections</h1>
                <div className=' p-4 min-h-[100vh]  flex flex-col gap-4'>
                    {
                        data.map((item) => (
                            <NavLink style={({ isActive }) =>
                                isActive ? { backgroundColor: 'white', color: "rgb(245 158 11)" } : undefined
                            } to={item.path} key={item.id} className="flex text-xl font-semibold text-white hover:bg-white  transition-all duration-200 ease-linear hover:text-amber-500 hover:shadow-lg rounded-md p-4 space-x-4 items-center ">
                                {item.icon}
                                <p>{item.name}</p>
                            </NavLink>
                        ))
                    }
                </div>
            </div>)}
        </>
    )
}

export default SideBar