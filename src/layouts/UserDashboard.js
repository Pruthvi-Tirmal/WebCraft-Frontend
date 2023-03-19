import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import UserHome from '../components/UserHome';
import UserNavbar from '../components/UserNavbar'
import { auth } from '../firebase';
import { Routes, Route, useNavigate } from 'react-router-dom';
import UserCreate from '../components/UserCreate';
import UserFillData from '../components/UserFillData';
import UserHomeDetails from '../components/UserHomeDetails';
import { UserAboutDetails } from '../components/UserAboutDetails';
import UserProductsDetails from '../components/UserProductsDetails';
import UserGalleryDetails from '../components/UserGalleryDetails';
import UserPaymentDetails from '../components/UserPaymentDetails';
import PaymentForm from '../components/PaymentForm';
import ErrorPage from '../components/ErrorPage';
import UserUpdate from './UserUpdate';
import DomainSelection from '../components/DomainSelection';
const Dashboard = () => {
    const navigate = useNavigate();
    //*! ask about this
    useEffect(() => {
        onAuthStateChanged(auth, (user => {
            if (!user) navigate('/')
        }))

    }, [navigate]);

    return (
        <div className='relative  overflow-hidden'>
            <UserNavbar />
            <Routes>
                <Route exact index path="home" element={<UserHome />} />
                <Route path='create'>
                    <Route index={true} element={<UserCreate />} />
                    <Route path='fill' element={<UserFillData />}>
                        <Route index={true} path='userhome' element={<UserHomeDetails />} />
                        <Route path='userabout' element={<UserAboutDetails />} />
                        <Route path='userproducts' element={<UserProductsDetails />} />
                        <Route path='usergallery' element={<UserGalleryDetails />} />
                        <Route path='userpayment' element={<UserPaymentDetails />} />
                    </Route>
                </Route>
                {/* update */}
                <Route path='update' element={<UserUpdate />} >
                    <Route index={true} path='userhome' element={<UserHomeDetails flag={false} />} />
                    <Route path='userabout' element={<UserAboutDetails flag={false} />} />
                    <Route path='userproducts' element={<UserProductsDetails flag={false} />} />
                    <Route path='usergallery' element={<UserGalleryDetails flag={false} />} />
                    <Route path='userpayment' element={<UserPaymentDetails flag={false} />} />
                </Route>
                {/* <Route exact path='payment' element={<PaymentForm />} /> */}
                <Route exact path='domain-selection' element={<DomainSelection />} />
                <Route exact path="*" element={<ErrorPage />} />
            </Routes>
        </div >
    )
}

export default Dashboard