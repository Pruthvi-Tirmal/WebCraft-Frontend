import React from 'react'
import { FaHome, FaUserAstronaut, FaBoxOpen, FaWallet } from 'react-icons/fa'
import '.././scrollHide.css'
import { HiPhotograph } from 'react-icons/hi'
import { Link as ScrollLink } from 'react-scroll'

const Navigator = ({ theme }) => {
    const list = [{
        id: 1,
        icon: <FaHome />,
        title: "Home",
        path: "userhome",
    },
    {
        id: 2,
        icon: <FaUserAstronaut />,
        title: "About",
        path: "userabout",
    },
    {
        id: 3,
        icon: <FaBoxOpen />,
        title: "Products",
        path: "userproducts",
    },
    {
        id: 4,
        icon: <HiPhotograph />,
        title: "Gallery",
        path: "usergallery",
    },
    {
        id: 5,
        icon: <FaWallet />,
        title: "Payment",
        path: "userpayment",
    }]
    return (
        <div className='fixed bottom-0  z-50 w-full bg-gray-800 text-white '>
            <div className='flex h-[80px] sm:justify-center justify-start w-full p-2 items-center overflow-x-scroll space-x-9 scrollHide'>
                {
                    list.map((item) => (
                        <ScrollLink key={item.id} to={item.path} spy={true} smooth={true} offset={50} duration={500} className={`flex flex-col items-center  cursor-pointer rounded-md px-3 py-2 ${theme} transform hover:scale-105 transition-all duration-150 ease-linear`}>
                            <div>{item.icon}</div>
                            <p>{item.title}</p>
                        </ScrollLink>
                    ))
                }
            </div>
        </div>
    )
}

export default Navigator