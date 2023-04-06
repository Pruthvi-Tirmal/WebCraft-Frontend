import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import notFound from '../images/pageNotFound.svg'
import notFoundMobile from '../images/notfoundmobile.png'
import UserCardSection from './UserCardSection'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'
import { getHomeSection } from '../api/userAPI'
import Loader from "../components/Loader"
import { toast, ToastContainer } from 'react-toastify'
const UserHome = () => {
    const [present, setPresent] = useState(false);   // this will check if the user is present or not.
    const [cardInfo, setCardInfo] = useState({ founderName: "", phoneNumber: "", email: "", companyLogo: "" });
    const [user] = useAuthState(auth);
    const [load, setLoad] = useState(true);
    useEffect(() => {
        const getUser = async () => {
            if (user) {
                try {
                    const res = await getHomeSection({ loggedUser: user.email });
                    // console.log(res);
                    if (res?.response?.status === 404) {
                        toast.error("network error, please try after some time.");
                        return;
                    }
                    if (res?.status === 200) {
                        setPresent(true);
                        setCardInfo(res.data);
                    }
                    setLoad(false);
                } catch (err) {
                    console.log(err);
                    // toast.error("network error, please try after some time.");
                    // console.log("error");
                }
            }
        }
        getUser();
    }, [user]);
    return (
        <div className='pt-2 pb-4  sm:max-w-[85%]  md:max-w-[75%] lg:max-w-[80%] max-w-[90%] md:block  flex flex-col justify-center mx-auto mt-10 min-h-[80vh] md:mb-0 mb-20'>
            {load && (<Loader />)}
            {!load && (!present ? (<div className='flex gap-4 flex-wrap justify-center items-center '>
                <div className="hidden sm:inline">
                    <img src={notFound} className="w-[700px] " alt="not-found-icon" />
                </div>
                <div className='sm:hidden'>
                    <img src={notFoundMobile} className="w-[700px] " alt="not-found-icon" />
                </div>
                <div className='flex flex-col items-center sm:mt-0 mt-10  gap-4'>
                    <h1 className='sm:text-3xl text-2xl font-semibold  text-gray-800'>Let's Create a Website</h1>
                    <Link to="/dashboard/create" className='bg-blue-500 flex pb-3 pt-2 px-9 text-2xl ring-1 ring-black rounded-full transition-all duration-100 ease-linear text-white hover:scale-110 transform'>create</Link>
                </div>
            </div>) : (<UserCardSection founderName={cardInfo.founderName} companyLogo={cardInfo.companyLogo} emailId={cardInfo.email} mobile={cardInfo.phoneNumber} />)
            )}
            <ToastContainer />
        </div>
    )
}

export default UserHome