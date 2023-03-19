import React, { useEffect, useState } from 'react'
import FileUploader from './FileUploader'
import LayoutBox from './LayoutBox'
import PlaceholderFills from './PlaceholderFills'
import 'react-phone-input-2/lib/material.css'
import { FaPiggyBank } from 'react-icons/fa'
import { UserBtn } from './UserBtn'
import { toast } from 'react-toastify'
import FileList from './FileList'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import HeadlineSection from './HeadlineSection'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'
import { createPaymentSection, getPaymentSection, updatePaymentSection, updateTracker } from '../api/userAPI'
import { PaymentDataActions } from '../redux/reducers/PaymentData'
const UserPaymentDetails = ({ flag = true, admin = false }) => {
    const [files, setFiles] = useState([{}])
    const [preData, setPreData] = useState(false);
    const [user] = useAuthState(auth);
    const [paymentState, setPaymentState] = useState({ bankName: "", ifscCode: "", accountHolder: "", accountNumber: "" })
    const dispatch = useDispatch();
    const { id } = useParams();  // to edit by admin
    // change the btn name from save & next to save
    useEffect(() => {
        const getPayment = async (email) => {
            if (email) {
                const res = await getPaymentSection({ loggedUser: email });
                if (res) {
                    setFiles(res.data.files);
                    const { bankName, ifscCode, accountHolder, accountNumber } = res.data;
                    setPaymentState({ bankName, ifscCode, accountHolder, accountNumber });
                    setPreData(true); // that means the data is already present 
                }
            }
        }
        if (admin) {
            getPayment(id);
        } else {
            if (user) {
                getPayment(user.email);
            }
        }
    }, [user, admin, id])

    const removeFile = (filename) => {
        setFiles((files.filter((file) => file.fileName !== filename)));
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentState((prev) => { return { ...prev, [name]: value } });
    }
    const inputList = [{
        id: 1,
        title: "Bank Name",
        name: "bankName",
        placeholder: "Enter Your Bank Name"
    },
    {
        id: 2,
        name: "ifscCode",
        title: "IFSC Code",
        placeholder: "Enter Your IFSC Code"
    },
    {
        id: 3,
        name: "accountHolder",
        title: "Account Holder",
        placeholder: "Enter Account Holder Name"
    },
    {
        id: 4,
        name: "accountNumber",
        title: "Account Number",
        placeholder: "Enter Account Number"
    },
    ]
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!preData) {
            if (files.length === 1) {
                toast.warning("Empty Gallery Please Upload the photos");
            } else {
                files.shift(); // removing the first object form array
                // console.log("new")
                createPaymentSection({ loggedUser: user.email, imgCollections: [...files], paymentState })
                // updating the tracking system
                updateTracker({ loggedUser: user.email, payment: true });
                // navigate("../../../payment");
                //! for temporary purpose
                navigate("../../../domain-selection")
            }

        }
        // update the details
        else {
            // console.log("edit");
            // console.log(paymentState);
            dispatch(PaymentDataActions.setPaymentData({ files: files, ...paymentState }));
            if (admin) {
                updatePaymentSection({ loggedUser: id, imgCollections: [...files], paymentState });
            } else {
                if (user)
                    updatePaymentSection({ loggedUser: user.email, imgCollections: [...files], paymentState });
            }
        }



    }
    return (
        <div className=''>
            {flag && <HeadlineSection title="Payment Section Details" />}
            <form onSubmit={handleSubmit} className={`${flag && "lg:max-w-[50%]"} sm:w-[80%] w-[95%] flex flex-col space-y-3  mx-auto`} action="">
                <LayoutBox>
                    <PlaceholderFills title="Payment QRCode Photos" />
                    <div className='mb-5'>
                        <FileUploader setFiles={setFiles} />
                        <FileList files={files} removeFile={removeFile} />
                    </div>

                </LayoutBox>

                <LayoutBox>
                    <PlaceholderFills title="Bank Account Details" />
                    <div className='flex flex-col justify-start mb-4 p-3'>
                        {
                            inputList.map((item) => (
                                <div key={item.id} className='flex  gap-4 mt-5 font-semibold items-center'>
                                    <label htmlFor="" className='flex-1 flex items-center space-x-2'>
                                        <FaPiggyBank />
                                        <span>{item.title}</span>
                                    </label>
                                    <input type="text" value={paymentState[item.name]} onChange={handleChange} name={item.name} className='w-[70%] rounded-md p-3' placeholder={item.placeholder} required />
                                </div>
                            ))
                        }
                    </div>
                </LayoutBox>
                <UserBtn title="Save" />
            </form>
        </div>
    )
}

export default UserPaymentDetails