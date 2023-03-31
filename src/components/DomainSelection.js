import React, { useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { createDomain, getDomain, getTracker, updateTracker } from '../api/userAPI';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import BackBtn from './BackBtn';
const DomainSelection = () => {
    //! set the navigate to not come again here once tracker status is true.

    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [avail, setAvail] = useState("");
    const [showBtn, setShowBtn] = useState(false);
    const [user] = useAuthState(auth);
    const url = '/dashboard/create/fill';

    useEffect(() => {
        const getStatus = async (user) => {
            try {
                if (user) {
                    // get the tracker status
                    const status = await getTracker({ loggedUser: user.email });
                    // console.log(status.data);
                    if (!status) navigate(`${url}/userhome`);
                    else {
                        const { domain } = status.data;
                        if (domain) navigate('../home');

                    }
                }
            } catch (err) {
                console.log(err);
            }
        }
        getStatus(user);
    })

    const checkSpecialChar = (arr) => {
        //! put regular expression
        return arr === "#" || arr === "$" || arr === "@" || arr === "%" || arr === "^" || arr === "&" || arr === "*" || arr === "(" || arr === ")" || arr === '/' || arr === '\\';
    }
    const clearValue = () => {
        setAvail("")
        setShowBtn(false);
    }
    const searchHandle = async () => {
        try {
            const arr = search.split("");
            // console.log(arr);
            if (arr.find(checkSpecialChar)) {
                toast.warning("Don't use Special Characters");
                return;
            }
            const domain = search.trim();
            if (domain !== "") {
                // console.log(domain);
                const res = await getDomain({ url: search, loggedUser: "" });
                // console.log(res.data);

                if (typeof (res.data) !== Object) {
                    if (res.data.startsWith("available", 10)) {
                        setAvail("URL is available");
                        setShowBtn(true);
                    }
                } else {
                    setAvail("URL is not available");
                }
                // console.log(res);
            }
        } catch (err) {
            setAvail("URL is not available");
            console.log(err);
        }

    }
    const handleStatus = () => {
        // create a domain
        createDomain({ loggedUser: user.email, domain: search })
        // function to sent to axios post to for tracker 
        updateTracker({ loggedUser: user.email, domain: true });
        navigate('../home');
    }
    return (
        <div className='w-fit mx-auto mt-10 p-2'>
            <BackBtn />
            <h1 className='text-4xl text-gray-800 font-bold md:text-left text-center'>URN Selection</h1>
            <p className='md:text-left text-center text-xl text-gray-800 mt-4 font-medium capitalize'>Type Your Favorite URN Name To see on the URL</p>
            <p className='text-gray-500 font-semibold md:text-left text-center'>
                For Example : www.webcraft.com/example
            </p>
            <p className='text-red-600 font-medium text-lg md:text-left text-center'>!Important Please Don't use Spaces, Special Symbol like @,#,$,%,^,*,etc.</p>
            <div className='flex flex-col  items-center mt-10 gap-2'>
                {/* <label htmlFor="" className='text-gray-800 self-left text-xl font-semibold'>Domain Name</label> */}
                <div className='flex gap-3 w-full justify-center mt-3 items-center '>
                    <input type="text" autoComplete="off" name='domain' value={search} placeholder='Search..' className='w-full ring-2 rounded-lg px-4 py-3 outline-none ring-blue-400 border-none text-xl' onChange={(e) => { setSearch(e.target.value); clearValue(); }} />
                    <div className='cursor-pointer hover:scale-95 transition-all ease-linear duration-100 transform p-3 rounded-full ring-blue-400 ring-2 outline-none' onClick={searchHandle}>
                        <BsSearch className='text-2xl text-blue-500' />
                    </div>
                </div>
                <p className='text-teal-600 font-semibold'>{avail}</p>
                {
                    showBtn && (<button className='px-9  rounded-md ring-2 ring-teal-500 mt-3 transition-all ease-linear duration-100 text-xl py-3 outline-none hover:shadow-lg hover:bg-teal-400 hover:text-white' onClick={handleStatus}>Accept</button>)
                }
            </div>
        </div>
    )
}

export default DomainSelection