import { signOut } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDispatch, } from 'react-redux'
import { Link, Outlet, useNavigate, } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getAllHome } from '../api/adminAPI'
import SideBar from '../components/SideBar'
import SearchItem from '../components/tables/SearchItem'
import { auth } from '../firebase'
import logo from '../images/logo.png'
import { usersActions } from '../redux/reducers/Users'
const Admin = () => {
    const navigate = useNavigate();
    const [user, error] = useAuthState(auth);
    const dispatch = useDispatch();
    useEffect(() => {
        if ((user === null) && error) {
            navigate('../admin-login');
            return;
        }
        const getHome = async () => {
            try {
                const res = await getAllHome();
                if (res) {
                    dispatch(usersActions.setData(res.data));
                }
            } catch (err) {
                console.log(err);
            }
        }
        getHome();
    }, [navigate, dispatch, user, error])

    // logout
    const logout = () => {
        signOut(auth).then(() => navigate('/')).catch(err => toast.error(err));
    }
    return (
        <div className='relative min-h-[100vh] overflow-hidden'>
            <div className='w-full flex p-4 justify-between items-center'>
                <Link to="/" className=' flex items-center gap-3 '>
                    <img src={logo} className="w-12" alt="logo" />
                    <h1 className='font-sans font-semibold text-2xl hidden sm:block'>WebCraft</h1>
                </Link>
                <button onClick={logout} className='px-4 py-2 text-red-500 ring-2 ring-red-400 text-lg rounded-full mr-5 hover:bg-red-500 hover:text-white transition-all duration-100 ease-linear'>
                    logout
                </button>
            </div>
            <div className='flex justify-center relative items-center space-x-5 w-full'>
                <h1 className='text-gray-800 mx-auto font-semibold text-3xl text-center underline '>Admin Dashboard</h1>
                <SearchItem />
            </div>
            <div className='flex  w-full mt-10'>
                <SideBar />
                <div className='px-4 w-full h-full'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Admin