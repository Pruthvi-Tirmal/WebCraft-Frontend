import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { FaEdit, FaEye, FaCopy } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getDomain } from '../api/userAPI'
import { auth } from '../firebase'
const UserOptions = () => {
    const [user] = useAuthState(auth);
    const [url, setUrl] = useState("");
    useEffect(() => {
        const getUrl = async (user) => {
            try {
                if (user) {
                    const res = await getDomain({ loggedUser: user.email, url: "" });
                    // console.log(res);
                    setUrl(res.data.domain);
                }
            } catch (err) {
                console.log(err);
            }
        }
        getUrl(user)
    }, [user])

    const handleCopy = () => {
        navigator.clipboard.writeText(`localhost:3000/${url}`);
        toast.success("The Link is Copied")
    }

    return (
        <div className='flex items-center '>
            <Link to="/dashboard/update/userhome" className='flex-1 hover:text-red-500 cursor-pointer transition-all duration-100 ease-in hover:scale-105 transform text-lg  text-gray-700 flex space-x-2 items-center'>
                <FaEdit />
                <p >Edit</p>
            </Link>
            <Link to={`/${url}`} className='flex-1 hover:text-blue-500 cursor-pointer transition-all duration-100 ease-in hover:scale-105 transform text-lg text-gray-700 flex space-x-2 items-center'>
                <FaEye />
                <p>View</p>
            </Link >
            <div onClick={handleCopy} className='flex-1 hover:text-teal-500 cursor-pointer transition-all duration-100 ease-in hover:scale-105 transform text-lg text-gray-700 flex space-x-2 items-center'>
                <FaCopy />
                <p>Copy Link</p>
            </div>
        </div>
    )
}

export default UserOptions