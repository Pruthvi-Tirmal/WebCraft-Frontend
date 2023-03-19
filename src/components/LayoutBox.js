import React from 'react'

const LayoutBox = (props) => {
    return (
        // this provides the layout box in every section
        <div className='bg-[#E6E6FA] p-4 rounded-md shadow-md '>
            {props.children}
        </div>
    )
}

export default LayoutBox