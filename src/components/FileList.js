import React from 'react'
import { FaFileImage, FaTrash } from 'react-icons/fa'

const FileList = ({ files, removeFile }) => {
    return (
        <ul className='flex flex-col mt-5 space-y-4'>
            {
                files && files.map((file => (
                    file.fileName && (
                        <li key={file.fileName} className=' border flex max-w-[70%] mx-auto items-center w-full bg-[#fcfeff] rounded-md shadow-md p-3 text-[1.1rem]'>
                            <FaFileImage className='text-2xl mr-5 text-blue-500 ' />
                            <p className=''>{file.fileName}</p>
                            <FaTrash className='text-2xl text-red-500 ml-auto cursor-pointer hover:scale-105 transform' onClick={() => removeFile(file.fileName)} />
                        </li>
                    )
                )))
            }
        </ul>
    )
}
export default FileList