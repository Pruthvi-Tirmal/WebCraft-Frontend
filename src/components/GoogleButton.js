import React from 'react'
import { FaGoogle } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, } from '../firebase'
import { toast } from 'react-toastify'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { findUserInDb, storeInDB } from './firebase_firestore_method'

const GoogleButton = ({ title, variants, flag = true }) => {
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider()
    const [user] = useAuthState(auth);

    const handleGoogle = async () => {
        if (!user) {
            signInWithPopup(auth, provider).then(() => {
                console.log(flag);
                console.log(auth.currentUser.uid);
                // Store in DB
                storeInDB(auth.currentUser);

                // setTimeout(() => {
                navigate("/dashboard/home");
                // }, 3000);
            }).catch(err => {
                toast.error(err.message);
            })

        } else {
            // console.log("hello");
            toast.info("Your are already Logged In, First Logout");
            // TODO  redirect
        }
    }

    return (
        <>
            <motion.button onClick={handleGoogle} variants={variants} className='flex items-center ring-1 ring-sky-400 rounded-md transition-all duration-100 ease-linear text-gray-800 hover:bg-sky-400 hover:ring-0 hover:text-white hover:shadow-lg  px-4 py-3 justify-center space-x-3'>
                <FaGoogle className='text-2xl' /> <span className='text-xl font-sans font-semibold '>{title}</span>
            </motion.button>

        </>
    )
}

export default GoogleButton