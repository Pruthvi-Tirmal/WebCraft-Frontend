import React, { useEffect, useState } from 'react'
import { FaHome, FaUserAstronaut, FaBoxOpen, FaWallet, FaCheck } from 'react-icons/fa'
import { HiPhotograph } from 'react-icons/hi'
import './scrollHide.css'
import { useSelector } from 'react-redux'
const UserFillSteps = () => {
    // reducer
    const userNavigate = useSelector(state => state.userNavigate);
    const [listCollection, setListCollection] = useState([{
        id: 1,
        icon: <FaHome className='text-blue-500' />,
        title: "Home",
        path: "userhome",
        flag: false
    },
    {
        id: 2,
        icon: <FaUserAstronaut className='text-blue-500' />,
        title: "About",
        path: "userabout",
        flag: false
    },
    {
        id: 3,
        icon: <FaBoxOpen className='text-blue-500' />,
        title: "Products",
        path: "userproducts",
        flag: false
    },
    {
        id: 4,
        icon: <HiPhotograph className='text-blue-500' />,
        title: "Gallery",
        path: "usergallery",
        flag: false
    },
    {
        id: 5,
        icon: <FaWallet className='text-blue-500' />,
        title: "Payment",
        path: "userpayment",
        flag: false,
    }])
    useEffect(() => {
        setListCollection((listCollection) => {
            for (let i = 0; i < userNavigate.id; i++)
                listCollection[i].flag = true;
            return listCollection
        }
        )
    }, [userNavigate])

    return (
        <>
            <div className='w-full '>
                <ul className='flex scrollHide text-3xl overflow-x-scroll w-full items-center md:justify-center justify-start'>
                    {
                        listCollection.map((item) => (
                            <li key={item.id} className='flex last:overflow-hidden relative p-3  flex-col items-center min-w-[120px] justify-center after:absolute after:h-[3px]  after:bg-gray-800 after:w-[100%] after:top-[30%] after:-z-10 after:-translate-x-[-50%] last:after:w-[10%] after:-translate-Y-[30%] after:left-[0%]'>
                                {
                                    item?.flag === true ? (<div className='border p-2 rounded-full ring-2 ring-green-500 bg-white text-green-500'> <FaCheck /> </div>) : (<div className='border p-2 rounded-full ring-2 ring-red-500 bg-white'> {item.icon} </div>)
                                }
                                <p className='text-[1.1rem] text-gray-800 text-center font-semibold'>{item.title}</p>


                            </li>
                        ))
                    }
                </ul>
            </div>

        </>
    )
}

export default UserFillSteps