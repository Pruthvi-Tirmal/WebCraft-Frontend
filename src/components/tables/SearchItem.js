import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { FaSearch } from 'react-icons/fa'
import { searchItemAction } from '../../redux/reducers/SearchRes';
const SearchItem = () => {
    const [searchItem, setSearchItem] = useState("");
    const dispatch = useDispatch()
    let timerId = null;
    const debounce = (func, timer) => {
        if (timerId) {
            clearInterval(timerId)
        }
        timerId = setTimeout(() => {
            func()
        }, timer)
    }
    const handleChange = (e) => {
        setSearchItem(e.target.value);
        debounce(() => {
            dispatch(searchItemAction.getSearchItem(e.target.value));
        }, 1000)
    }
    return (
        <div className='absolute right-[50px] w-[350px] border flex items-center space-x-2 p-2 rounded-full shadow-md'>
            <input type="text" value={searchItem} placeholder="Search With Registered User's Email" className='w-full outline-none border-none h-full px-4 py-2 text-medium text-gray-800' onChange={handleChange} />
            <FaSearch className='text-3xl  text-gray-800' />
        </div>
    )
}

export default SearchItem