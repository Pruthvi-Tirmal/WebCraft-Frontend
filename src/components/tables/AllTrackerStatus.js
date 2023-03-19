import React, { useEffect, useState } from 'react'
import { getAllTrackers } from '../../api/adminAPI';
import { BsCheckLg, BsClockHistory, BsFillTrashFill, } from 'react-icons/bs';
import { deleteAllSpecSection } from './deleteAllOperation';
import { useSelector } from 'react-redux';
import { paginationAndSearch } from './paginationAndSearch';
import ReactPaginate from 'react-paginate';
import Loader from '../Loader';


const AllTrackerStatus = () => {
    // loader
    const [loading, setLoading] = useState(true);
    const [tracker, setTracker] = useState([]);
    // search
    const search = useSelector((state) => state.search.search)
    useEffect(() => {
        const getTracker = async () => {
            try {
                const res = await getAllTrackers();
                if (res) {
                    setTracker(res.data);
                    setLoading(false); // to stop loading
                }
            } catch (error) {
                console.log(error)
            }
        }
        getTracker();
    }, [])

    // pagination 
    const [pageNumber, setPageNumber] = useState(0);
    const usersPerPage = 10;
    const displayTrackerSections = paginationAndSearch(pageNumber, tracker, search, usersPerPage).map((item) => (
        <tr className='border ' key={item._id}>
            <td className='text-gray-800 border py-4 px-6'>{item.loggedUser}</td>
            <td className='text-gray-800  border py-4 px-6'>
                {item.home ? (<BsCheckLg title="User Has Completed The Section" className='text-2xl text-teal-500 mx-auto' />) : (<BsClockHistory title="User Has Not Completed The Section" className='text-2xl text-amber-500 mx-auto' />)}
            </td>
            <td className='text-gray-800 border py-4 px-6'>
                {item.about ? (<BsCheckLg title="User Has Completed The Section" className='text-2xl text-teal-500 mx-auto' />) : (<BsClockHistory title="User Has Not Completed The Section" className='text-2xl text-amber-500 mx-auto' />)}
            </td>
            <td className='text-gray-800 border py-4 px-6'>
                {item.products ? (<BsCheckLg title="User Has Completed The Section" className='text-2xl text-teal-500 mx-auto' />) : (<BsClockHistory title="User Has Not Completed The Section" className='text-2xl text-amber-500 mx-auto' />)}
            </td>
            <td className='text-gray-800 border py-4 px-6'>
                {item.gallery ? (<BsCheckLg title="User Has Completed The Section" className='text-2xl text-teal-500 mx-auto' />) : (<BsClockHistory title="User Has Not Completed The Section" className='text-2xl text-amber-500 mx-auto' />)}
            </td>
            <td className='text-gray-800 border py-4 px-6'>
                {item.payment ? (<BsCheckLg title="User Has Completed The Section" className='text-2xl text-teal-500 mx-auto' />) : (<BsClockHistory title="User Has Not Completed The Section" className='text-2xl text-amber-500 mx-auto' />)}
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
    const pageCount = Math.ceil(tracker.length / usersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    }

    return (
        <div>
            {loading ? (<Loader />) : (<div>
                <div className="overflow-auto relative min-h-fit max-h-[100vh] ">
                    <table className="w-full text-base text-left  text-gray-500 ">
                        <thead className="text-base text-gray-700 uppercase border bg-gray-50 ">
                            <tr>
                                <th rowSpan={2} scope="col" className="py-3 border px-6">
                                    Logged User
                                </th>
                                <th colSpan={5} scope="col" className="text-center py-3 border px-6">
                                    Sections
                                </th>
                                <th rowSpan={2} scope="col" className="py-3 border px-6">
                                    Operations
                                </th>
                            </tr>
                            <tr>
                                <th scope="col" className="py-3 border px-6">
                                    Home
                                </th>
                                <th scope="col" className="py-3 border px-6">
                                    About
                                </th>
                                <th scope="col" className="py-3 border px-6">
                                    Product and Services
                                </th>
                                <th scope="col" className="py-3 border px-6">
                                    Gallery
                                </th>
                                <th scope="col" className="py-3 border px-6">
                                    User Payment
                                </th>
                            </tr>
                        </thead>
                        {
                            tracker.length ? (
                                <tbody>
                                    {
                                        displayTrackerSections
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

export default AllTrackerStatus