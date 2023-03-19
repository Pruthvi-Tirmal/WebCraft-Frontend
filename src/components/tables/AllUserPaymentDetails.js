import React, { useState } from 'react'
import { useEffect } from 'react';
import { getAllUserDisplayedPayments } from '../../api/adminAPI';
import { BsFillTrashFill } from 'react-icons/bs'
import { deleteAllSpecSection } from './deleteAllOperation';
import { paginationAndSearch } from './paginationAndSearch';
import { useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import Loader from '../Loader';

const AllUserPaymentDetails = () => {
    // loader
    const [loading, setLoading] = useState(true);
    const [userPayment, setUserPayment] = useState([]);
    // search
    const search = useSelector((state) => state.search.search)
    useEffect(() => {
        const getUserDisplayedPayments = async () => {
            try {
                const res = await getAllUserDisplayedPayments();
                if (res) {
                    setUserPayment(res.data);
                    setLoading(false); // to stop loading
                }
            } catch (error) {
                console.log(error);
            }
        }
        getUserDisplayedPayments()
    }, [])

    // pagination 
    const [pageNumber, setPageNumber] = useState(0);
    const usersPerPage = 10;
    const displayUserPaymentSections = paginationAndSearch(pageNumber, userPayment, search, usersPerPage).map((item) => (
        <tr className='border' key={item._id}>
            <td className='text-gray-800 border py-4 px-6'>{item.loggedUser}</td>
            <div className='flex flex-wrap gap-3 justify-evenly items-center'>
                {item.files?.map((pic) => (
                    <img key={pic._id} className='w-[100px] h-[100px] object-contain border border-gray-200' src={pic.encoded} alt="errorOnPhoto" />
                ))}
            </div>
            <td className='text-gray-800 border py-4 px-6'>{item.bankName}</td>
            <td className='text-gray-800 border py-4 px-6'>{item.accountNumber}</td>
            <td className='text-gray-800 border py-4 px-6'>{item.ifscCode}</td>
            <td className='text-gray-800 border py-4 px-6'>{item.accountHolder}</td>
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
    const pageCount = Math.ceil(userPayment.length / usersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    }
    return (
        <div>
            {loading ? (<Loader />) : (<div>
                <div className="overflow-auto relative min-h-fit max-h-[100vh]">
                    <table className="w-full text-base text-left  text-gray-500 ">
                        <thead className="text-base text-gray-700 uppercase border bg-gray-50 ">
                            <tr>
                                <th scope="col" className="py-3 border px-6">
                                    Logged User
                                </th>
                                <th scope="col" className="py-3 w-[650px] border px-6">
                                    QR Code Photos
                                </th>
                                <th scope="col" className="py-3 border px-6">
                                    Bank Name
                                </th>
                                <th scope="col" className="py-3 border px-6">
                                    Account Number
                                </th>
                                <th scope="col" className="py-3 border px-6">
                                    IFSC Code
                                </th>
                                <th scope="col" className="py-3 border px-6">
                                    Account Holder
                                </th>
                                <th scope="col" className="py-3 border px-6">
                                    Operations
                                </th>
                            </tr>
                        </thead>
                        {
                            userPayment.length ? (
                                <tbody className='border'>{
                                    displayUserPaymentSections
                                }
                                </tbody>
                            ) : (<h1 className='text-gray-800 text-xl'>No Data is Present</h1 >)
                        }
                    </table>
                </div>
                <ReactPaginate previousLabel="Previous" nextLabel="Next" pageCount={pageCount} onPageChange={changePage}
                    containerClassName="flex p-4 w-full  justify-center space-x-4 items-center"
                    previousLinkClassName='px-3 py-2 ring-2 rounded-md outline-none'
                    nextLinkClassName=' px-3 py-2 outline-none ring-2 rounded-md'
                    pageClassName="text-gray-800 font-semibold"
                    activeClassName='px-5 py-2  rounded-md bg-blue-500 '
                />
            </div>)}
        </div>
    )
}

export default AllUserPaymentDetails