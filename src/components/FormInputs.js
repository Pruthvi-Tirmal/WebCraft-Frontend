import React from 'react'

const FormInputs = ({ labelName = "", type = "", placeholder = "", name = "", }) => {
    return (
        <div className='flex flex-col gap-3'>
            <label htmlFor="" className='text-gray-700 capitalize font-semibold text-xl'>{labelName}</label>
            <input type={type} name={name} required placeholder={placeholder} className='px-4 py-3 outline-none ring-1 ring-gray-700 shadow-md rounded-md text-base font-normal font-sans' />
        </div>
    )
}
export default FormInputs