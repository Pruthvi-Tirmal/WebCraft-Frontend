import React from 'react'

const LayoutBox = (props) => {
  return (
    <div className={`flex w-full flex-wrap items-center justify-center sm:justify-evenly mx-auto shadow-lg p-5 ${props.theme} text-white rounded-md`}>
      {props.children}
    </div>
  )
}

export default LayoutBox;