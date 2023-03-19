import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getDomain, } from '../../api/userAPI';
import { getUsers } from '../firebase_firestore_method';
import demoLogo from '../../images/demo_avatar.png'
import { BsFillTrashFill, BsFillPencilFill, BsFillEyeFill } from 'react-icons/bs'
import { Link } from 'react-router-dom';
import { deleteAllSpecSection } from './deleteAllOperation';
import { paginationAndSearch } from './paginationAndSearch';
import ReactPaginate from 'react-paginate';
import Loader from '../Loader';
const AllUsers = () => {
    // loader
    const [loading, setLoading] = useState(true);
    const [reg, setReg] = useState([]);
    // search
    const search = useSelector((state) => state.search.search)
    const home = useSelector((state => state.Users));
    // console.log(home);
    useEffect(() => {
        const getRegisteredUsers = async () => {
            try {
                const data = await getUsers();
                const collect = [];
                data.forEach((doc) => {
                    collect.push(doc.data());
                })
                setReg(collect);
                setLoading(false); // to stop loading
                // console.log(collect);
            } catch (err) {
                console.log(err);
            }
        }
        getRegisteredUsers();
    }, [])

    const getSpecDomain = async (user) => {
        try {
            const res = await getDomain({ loggedUser: user, url: "" })
            const { domain } = res.data;
            window.open(`http://localhost:3000/${domain}`)
        } catch (err) {
            console.log(err);
        }
    }

    // pagination 
    const [pageNumber, setPageNumber] = useState(0);
    const usersPerPage = 10;
    const displayUsersSections = paginationAndSearch(pageNumber, reg, search, usersPerPage).map((item, index) => (
        <tr className='border' key={index}>
            <td className='text-gray-800 border py-4 px-6'>{item.user}</td>
            {
                Array.isArray(home) && home.filter((user) => user.loggedUser === item.user).map((res, index) => (
                    <React.Fragment key={index}>
                        <td className='text-gray-800 border py-4 px-6'>
                            <img className='w-[100px] h-[100px] object-contain' src={res.companyLogo === "" ? demoLogo : res.companyLogo} alt="company logo" />
                        </td>
                        <td className='text-gray-800 border py-4 px-6'>{res.companyName}</td>

                        <td className='text-gray-800 border py-4 px-6'>{res.nameTitle} {res.founderName}</td>
                        <td className='text-gray-800 border py-4 px-6'>{res.phoneNumber}</td>
                        <td className='text-gray-800 border py-4 px-6'>{res.whatsappNumber}</td>
                        <td className='text-gray-800 border py-4 px-6'>
                            <div className='flex items-center justify-evenly'>
                                <button onClick={() => getSpecDomain(item.user)} className='flex flex-col items-center px-3 py-2 hover:ring-teal-500 rounded-md hover:ring-2 hover:text-teal-500 mr-3 outline-none'>
                                    <BsFillEyeFill />
                                    <span>View</span>
                                </button>
                                <Link to={`../edit/${item.user}`} className='flex flex-col items-center px-3 py-2 hover:ring-blue-500 rounded-md hover:ring-2 hover:text-blue-500 mr-3 outline-none'>
                                    <BsFillPencilFill />
                                    <span>Edit</span>
                                </Link>
                                <button onClick={() => deleteAllSpecSection(item.user)} className='flex flex-col outline-none items-center px-3 py-2 hover:ring-red-500 rounded-md hover:ring-2 hover:text-red-500 mr-3'>
                                    <BsFillTrashFill />
                                    <span>Delete</span>
                                </button>
                            </div>
                        </td>
                    </React.Fragment>

                ))


            }
            {/* //! Need to see there is a problem with firebase because we need to delete from the auth section as well otherwise there is a problem */}
            {/* <td className='text-gray-800 border py-4 px-6'>
                <button onClick={() => deleteAllSpecSection(item.user)} className='flex flex-col outline-none items-center px-3 py-2 hover:ring-red-500 rounded-md hover:ring-2 hover:text-red-500 mr-3'>
                    <BsFillTrashFill />
                    <span>Delete</span>
                </button>
            </td> */}
        </tr>
    ))
    // page count 
    const pageCount = Math.ceil(reg.length / usersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    }
    return (
        <div>
            {
                loading ? (<Loader />) : (
                    <div>
                        <div className="overflow-auto relative h-[70vh]">
                            <table className="w-full text-base text-left  text-gray-500 ">
                                <thead className="text-base text-gray-700 uppercase border bg-gray-50 ">
                                    <tr>
                                        <th scope="col" className="py-3 border px-6">
                                            Registered User
                                        </th>
                                        <th scope="col" className="py-3 border px-6">
                                            Company Logo
                                        </th>
                                        <th scope="col" className="py-3 border px-6">
                                            Company Name
                                        </th>
                                        <th scope="col" className="py-3 border px-6">
                                            Founder Name
                                        </th>
                                        <th scope="col" className="py-3 border px-6">
                                            Phone Number
                                        </th>
                                        <th scope="col" className="py-3 border px-6">
                                            Whatsapp Number
                                        </th>
                                        <th scope="col" colSpan={2} className="py-3 border px-6">
                                            Operations
                                        </th>
                                    </tr>

                                </thead>
                                {
                                    reg.length ? (
                                        <tbody className='border'>
                                            {
                                                displayUsersSections
                                            }
                                        </tbody>
                                    ) : (<h1 className='text-gray-800 text-xl'>No Data is Present</h1 >)
                                }
                            </table >
                        </div>
                        <ReactPaginate previousLabel="Previous" nextLabel="Next" pageCount={pageCount} onPageChange={changePage}
                            containerClassName="flex p-4 w-full  justify-center space-x-4 items-center"
                            previousLinkClassName='px-3 py-2 ring-2 rounded-md outline-none'
                            nextLinkClassName=' px-3 py-2 outline-none ring-2 rounded-md'
                            pageClassName="text-gray-800 font-semibold"
                            activeClassName='px-5 py-2  rounded-md bg-blue-500 '
                        />
                    </div >)
            }
        </div>
    )
}

export default AllUsers