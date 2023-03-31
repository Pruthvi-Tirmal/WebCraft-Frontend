import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import NaviUpdateSec from '../components/NaviUpdateSec'
import Template from './Template.js'
import { FaTv, FaMixer } from 'react-icons/fa'
import { useDispatch, } from 'react-redux'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'
import { getAboutSection, getGallerySection, getHomeSection, getPaymentSection, getProductsSection } from '../api/userAPI'
import { HomeDataActions } from '../redux/reducers/HomeData'
import { AboutDataActions } from '../redux/reducers/AboutData'
import { ProductsDataActions } from '../redux/reducers/ProductsData'
import { galleryDataActions } from '../redux/reducers/GalleryData'
import { PaymentDataActions } from '../redux/reducers/PaymentData'
import BackBtn from '../components/BackBtn'
const UserUpdate = ({ flag = true }) => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [check, setCheck] = useState(false);
    const url = useParams();
    const { id } = useParams(); // this to edit
    // console.log(id);
    const [user] = useAuthState(auth)
    // redux
    const dispatch = useDispatch();
    useEffect(() => {
        if (url['*'] === "update")
            navigate('/dashboard/update/userhome');
        else if (id && !check) {
            setCheck(true);
            navigate('userhome');
        }
        const getAllDetails = async (email) => {
            // home section
            const resHome = await getHomeSection({ loggedUser: email });
            dispatch(HomeDataActions.setHomeInfo(resHome.data));
            // about section
            const resAbout = await getAboutSection({ loggedUser: email });
            let val = JSON.parse(resAbout.data.aboutInfo);
            dispatch(AboutDataActions.setAboutData(val));
            // product section
            const resProducts = await getProductsSection({ loggedUser: email });
            val = JSON.parse(resProducts.data.productsInfo)
            dispatch(ProductsDataActions.setProductsInfo({ productsInfo: val, files: resProducts.data.files }));
            // gallery Section
            const resGallery = await getGallerySection({ loggedUser: email });
            dispatch(galleryDataActions.setGalleryData(resGallery.data));
            // user payment section
            const resUserPayment = await getPaymentSection({ loggedUser: email });
            dispatch(PaymentDataActions.setPaymentData(resUserPayment.data));
        }
        if (flag) {
            if (user)
                getAllDetails(user.email);
        } else {
            getAllDetails(id);
        }
    }, [navigate, url, dispatch, user, flag, id]);
    const handleShow = () => {
        setShow((prev) => !prev);
    }
    return (
        <div className='relative md:mt-10 p-2 '>
            <BackBtn />
            {flag && (
                <h1 className='decoration-blue-500 underline my-5 text-center font-semibold sm:text-4xl text-3xl'>Update Your Webpage🚀</h1>)
            }
            <h1 onClick={handleShow} className='w-fit relative mt-7 ml-5 flex p-3 cursor-pointer font-semibold text-white bg-gray-800 rounded-lg shadow-md items-center justify-center space-x-4 lg:hidden'>
                <span className=''>{show ? "Close Preview" : "Live Preview"}</span>
                {show ? <FaMixer /> : <FaTv />}
            </h1>
            <div className='flex rounded-md overflow-x-hidden border-2 relative flex-col sm:max-w-[90%] max-w-[95%] mx-auto mt-5 p-5 min-h-[100vh]  shadow-lg'>
                <div className=' relative flex items-center mb-5'>
                    {/* navigation */}
                    <NaviUpdateSec />
                </div>
                <div className='flex min-h-[100vh]'>
                    <div className='w-full border-2 shadow-lg overflow-y-scroll h-[100vh] flex flex-col md:mt-12 mt-5  py-2'>
                        <Outlet />
                    </div>
                    <div className={`${show ? "right-0 top-0" : "right-[100%] lg:right-0"}  bg-white w-full absolute border-2 rounded-md lg:block lg:relative lg:z-0 z-50`}>
                        <h1 className='w-fit relative flex p-3 cursor-pointer font-semibold text-gray-800 text-xl '>
                            <span className=''>Live Preview</span>
                            <span className='animate-ping absolute -right-4 top-5 w-4 h-4 z-10 bg-red-500 border border-red-500 rounded-full'></span>
                            <span className='absolute -right-4 top-5 w-4 h-4 z-10 bg-red-500 border border-red-500 rounded-full'></span>
                        </h1>
                        <div className={`${!show ? "overflow-y-scroll h-[100vh] p-5" : " min-h-[100vh]"} border-2  shadow-lg`}>
                            <Template flag={false} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserUpdate