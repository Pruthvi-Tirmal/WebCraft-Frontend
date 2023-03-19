import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getTracker } from '../api/userAPI'
import { auth } from '../firebase'
import logo from '../images/demo_avatar.png'
import ProgressBar from './ProgressBar'
import UserOptions from './UserOptions'
const UserCardSection = ({ founderName, emailId, mobile, companyLogo }) => {
    const [complete, setComplete] = useState(false);
    const [user] = useAuthState(auth);
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        const getStatus = async () => {
            if (user) {
                try {
                    const res = await getTracker({ loggedUser: user.email });
                    if (res) {
                        const { home, about, products, gallery, payment, paymentToUs, domain } = res.data;
                        const status = [home, about, products, gallery, payment, paymentToUs, domain];
                        for (let i = 0; i < status.length; i++) {
                            if ((i === 5 && !status[i]) || (i === 6 && !status[i])) {
                                setProgress((i) * 15);
                                return;
                            }
                            if (!status[i]) {
                                setProgress((i) * 15);
                                return;
                            }
                        }
                        setComplete(true);

                    }
                } catch (err) {
                    console.log(err);
                }
            }
        }
        getStatus()
    }, [user])
    return (
        <div>
            <h1 className='w-full decoration-dotted underline text-3xl text-blue-500 mb-5 p-5 rounded-md font-semibold'>My Website</h1>
            <div className='shadow-lg flex flex-col items-center p-4 rounded-md md:max-w-[400px] w-[95%] mx-auto md:mx-0'>
                <div className='flex items-center justify-around w-full'>
                    <div className='flex-1 '>
                        <h1 className='font-semibold text-gray-800 text-2xl'>{founderName}</h1>
                        <div className='text-gray-500'>
                            <p>{emailId}</p>
                            <p>+{mobile}</p>
                        </div>
                        <button className={`${complete ? "text-teal-600 bg-teal-200" : "text-red-500 bg-red-300"} py-1 px-2 rounded-lg mt-3 shadow-md`}>{complete ? "published" : "not published"}</button>
                    </div>
                    <div className='border-4 overflow-hidden border-dashed w-fit rounded-full flex items-center'>
                        <img src={companyLogo !== "" ? companyLogo : logo} className="w-[100px] h-[100px] object-contain" alt="company icon" />
                    </div>
                </div>
                <div className='w-full mt-5 p-2 border-dashed border-t-2'>
                    {
                        complete ? (<UserOptions />
                        ) : (<ProgressBar progress={progress} />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default UserCardSection