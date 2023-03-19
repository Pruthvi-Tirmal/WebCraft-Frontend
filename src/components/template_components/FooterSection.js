import React from 'react'
import Headline from './Headline'
import LayoutBox from './LayoutBox'
import { Link } from 'react-router-dom'
import { FaLinkedin, FaInstagram, FaFacebookSquare } from 'react-icons/fa'
const FooterSection = ({ theme, facebook = "", instagram = "", linkedin = "" }) => {
    const btnList = [{
        id: 1,
        path: "",
        title: "Facebook",
        name: "facebook",
        icon: <FaFacebookSquare />,
    }, {
        id: 2,
        path: "",
        name: "instagram",
        title: "Instagram",
        icon: <FaInstagram />,
    }, {
        id: 3,
        name: "linkedin",
        path: "",
        title: "LinkedIn",
        icon: <FaLinkedin />,
    }
    ]

    const social = [facebook, instagram, linkedin];

    return (
        <LayoutBox theme={theme}>
            <Headline title="Follow Us" />
            <div className='flex flex-col w-full'>
                <div className='flex flex-wrap justify-center gap-4'>
                    {
                        btnList.map((btn) => (
                            <a href={social[btn.id - 1]} rel="noreferrer" target="_blank" key={btn.id} className={` ${(social[btn.id - 1] === "" && "hidden")} flex-1 flex shadow-md bg-gray-700 px-3 py-2 rounded-md justify-center space-x-2 items-center hover:scale-95 transform transition-all duration-100 ease-linear`}>
                                <div className='text-2xl'>
                                    {btn.icon}
                                </div>
                                <span>{btn.title}</span>
                            </a>
                        ))
                    }
                </div>
            </div>
        </LayoutBox>
    )
}

export default FooterSection