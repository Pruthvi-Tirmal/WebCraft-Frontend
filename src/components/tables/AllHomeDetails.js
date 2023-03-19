import React, { useState } from 'react'
import { useEffect } from 'react'
import { getAllHome } from '../../api/adminAPI'
import { BsFillTrashFill } from 'react-icons/bs'
import demoLogo from '../.././images/demo_avatar.png'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import { usersActions } from '../../redux/reducers/Users'
import { deleteAllSpecSection } from './deleteAllOperation'
import { paginationAndSearch } from './paginationAndSearch'
import Loader from '../Loader'

const AllHomeDetails = () => {
    // loader
    const [loading, setLoading] = useState(true);
    const [home, setHome] = useState([]);
    const search = useSelector((state) => state.search.search)
    // console.log(search);
    const dispatch = useDispatch();
    useEffect(() => {
        const getHome = async () => {
            try {
                const res = await getAllHome();
                if (res) {
                    setHome(res.data);
                    //*this is for only admin
                    dispatch(usersActions.setData(res.data));
                    setLoading(false); // to stop loading
                }
            } catch (err) {
                console.log(err);
            }
        }
        getHome();
    }, [dispatch])

    // pagination
    const [pageNumber, setPageNumber] = useState(0);
    const usersPerPage = 10;

    const displayHomeSections = paginationAndSearch(pageNumber, home, search, usersPerPage).map((item) => (
        <tr className='border' key={item._id}>
            <td className='text-gray-800 border py-4 px-6'>{item.loggedUser}</td>
            <td className='text-gray-800 border py-4 px-6'>{item.theme}</td>
            <td className='text-gray-800 border py-4 px-6'>
                <img className='w-[100px] h-[100px] object-contain' src={item.companyLogo === "" ? demoLogo : item.companyLogo} alt="company logo" />
            </td>
            <td className='text-gray-800 border py-4 px-6'>{item.companyName}</td>
            <td className='text-gray-800 border py-4 px-6'>{item.email}</td>
            <td className='text-gray-800 border py-4 px-6'>{item.nameTitle} {item.founderName}</td>
            <td className='text-gray-800 border py-4 px-6'>{item.phoneNumber}</td>
            <td className='text-gray-800 border py-4 px-6'>{item.whatsappNumber}</td>
            <td className='text-gray-800 border py-4 px-6'>{item.address}</td>
            <td className='text-gray-800 border py-4 px-6'>
                {(item.facebook !== "" || item.instagram !== "" || item.linkedIn !== "") ? (
                    <ul className='list-disc'>
                        <li className={item.facebook === "" ? "hidden" : undefined}>{item.facebook}</li>
                        <li className={item.instagram === "" ? "hidden" : undefined}>{item.instagram}</li>
                        <li className={item.linkedIn === "" ? "hidden" : undefined}>{item.linkedIn}</li>
                    </ul>
                ) : (<h1>No Data is Present</h1>)}
            </td>
            <td className='text-gray-800 border py-4 px-6'>
                <div className='flex items-center justify-evenly'>
                    <button onClick={() => deleteAllSpecSection(item.loggedUser)} className='flex flex-col outline-none items-center px-3 py-2 hover:ring-red-500 rounded-md hover:ring-2 hover:text-red-500 mr-3'>
                        <BsFillTrashFill />
                        <span>Delete</span>
                    </button>
                </div>
            </td>

        </tr>
    ))

    // page count 
    const pageCount = Math.ceil(home.length / usersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    }
    return (
        <div>
            {loading ? (<Loader />) : (<div>
                <div className="overflow-auto relative min-h-fit max-h-[100vh]  w-[85%]">
                    <table className="w-full text-base text-left  text-gray-500 ">
                        <thead className="text-base text-gray-700 uppercase border bg-gray-50 ">
                            <tr>
                                <th scope="col" className="py-3 border px-6">
                                    Registered User
                                </th>
                                <th scope="col" className="py-3 border px-6">
                                    Selected Theme
                                </th>
                                <th scope="col" className="py-3 border px-6">
                                    Company Logo
                                </th>
                                <th scope="col" className="py-3 border px-6">
                                    Company Name
                                </th>
                                <th scope="col" className="py-3 border px-6">
                                    Email Address
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
                                <th scope="col" className="py-3 border px-6">
                                    Address
                                </th>
                                <th scope="col" className="py-3 border px-6">
                                    Social Media Links
                                </th>
                                <th scope="col" className="py-3 border px-6">
                                    Operations
                                </th>
                            </tr>
                        </thead>
                        {
                            home.length ? (
                                <tbody className='border'>
                                    {

                                        displayHomeSections
                                    }
                                </tbody>
                            ) : (<h1 className='text-gray-800 text-xl'>No Data is Present</h1 >)
                        }
                    </table>
                </div>
                <ReactPaginate previousLabel="Previous" nextLabel="Next" pageCount={pageCount} onPageChange={changePage}
                    containerClassName="flex p-4 w-[85%]  justify-center space-x-4 items-center"
                    previousLinkClassName='px-3 py-2 ring-2 rounded-md outline-none'
                    nextLinkClassName=' px-3 py-2 outline-none ring-2 rounded-md'
                    pageClassName="text-gray-800 font-semibold"
                    activeClassName='px-5 py-2  rounded-md bg-blue-500 '
                />
            </div>)}
        </div>
    )
}


export default AllHomeDetails