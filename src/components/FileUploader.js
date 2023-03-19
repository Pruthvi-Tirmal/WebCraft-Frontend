import React from 'react'
import { FaPlus } from 'react-icons/fa';
import FileBase64 from 'react-file-base64'
import './fileBtn.css'
const FileUploader = ({ setFiles }) => {
  // temp
  // const [imgCol, setImgCol] = useState([{ fileName: "", encode: "" }]);
  // const uploadHandler = (e) => {
  //   console.log(e.target.files[0]);
  //   const totalFiles = e.target.files;
  //   for (let i = 0; i < totalFiles.length; i++) {
  //     const file = totalFiles[i];
  //     file.isUploading = true;
  //     setFiles((prev) => [...prev, file]);
  //   }
  // }
  // console.log(imgCol);

  return (
    <div className='border-gray-800 border-2 border-dashed bg-[#edf2f7] shadow-lg rounded-md mx-auto sm:w-[70%] w-[90%] h-[200px] justify-center mt-10 space-y-3 flex flex-col items-center'>
      <div className='bg-blue-400 text-white shadow-blue-500/50  hover:shadow-none transition-all duration-100 ease-in shadow-md rounded-md mb-4 w-[50%] h-[55px] font-semibold'>
        {/* <input onChange={uploadHandler} type="file" name="" id="upload" accept='.png, .jpg, .jpeg' className='opacity-0 text-xs absolute -z-10' required multiple /> */}
        <div className=' relative z-20 h-full'>
          <FileBase64
            type="file"
            multiple={false}
            onDone={({ base64, file }) => setFiles((prev) => { return [...prev, { encoded: base64, fileName: file.name }] })}
          />
          <label htmlFor='upload' className='flex cursor-pointer text-xl h-full items-center space-x-3 justify-center absolute top-0 -z-10  w-full'>
            <FaPlus />
            <span>Upload</span>
          </label>
        </div>
      </div>
      <p className='text-gray-800 font-semibold'>
        Supported Files JPEG, JPG, PNG
      </p>
    </div>
  )
}

export default FileUploader