import React, { useEffect, useState } from 'react'
import { FaFacebookSquare, FaInstagram, FaLinkedinIn, FaRegEdit } from 'react-icons/fa';
import demoAvatar from '../images/demo_avatar.png'
import FileBase64 from 'react-file-base64';
import LayoutBox from './LayoutBox'
import PlaceholderFills from './PlaceholderFills';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import HeadlineSection from './HeadlineSection';
import { UserBtn } from './UserBtn';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import './fileBtn.css'
import { createHomeSection, createTracker, getHomeSection, updateHomeSection } from '../api/userAPI';
import { HomeDataActions } from '../redux/reducers/HomeData';
const UserHomeDetails = ({ flag = true, admin = false }) => {
    // logged user
    const [user] = useAuthState(auth);
    const [theme, setTheme] = useState([{
        id: 1,
        color: "bg-cyan-500",
        flag: true
    }, {
        id: 2,
        color: "bg-blue-500",
        flag: false
    }
        , {
        id: 3,
        color: "bg-indigo-500",
        flag: false
    }, {
        id: 4,
        color: "bg-teal-500",
        flag: false
    }, {
        id: 5,
        color: "bg-amber-500",
        flag: false
    }, {
        id: 6,
        color: "bg-pink-500",
        flag: false
    }, {
        id: 7,
        color: "bg-rose-500",
        flag: false
    }, {
        id: 8,
        color: "bg-orange-500",
        flag: false
    }])
    // Use state
    const [homeState, setHomeState] = useState({ loggedUser: "", theme: "bg-cyan-500", companyLogo: "", companyName: "", email: "", founderName: "", nameTitle: "Mr.", whatsappNumber: "", phoneNumber: "", address: "", facebook: "", instagram: "", linkedIn: "", });
    // flag to check
    const [checked, setChecked] = useState(true);
    // change theme through db 

    // flag to identity whether is present or not
    const [preData, setPreData] = useState(false);
    // change the btn name from save & next to save
    const [btnName, setBtnName] = useState("Save and Next");
    // dispatch
    const dispatch = useDispatch();
    const getUserHome = async (email) => {
        const res = await getHomeSection({ loggedUser: email });
        if (res) {
            setHomeState((prev) => { return { ...prev, ...res.data } })
            setPreData(true) // data is present
            setBtnName("Save") // data is present i.e why save
            //   theme changing
            setTheme(theme.map((item) => {
                if (item.color === res.data.theme) {
                    item.flag = true;
                } else {
                    item.flag = false;
                }
                return item;
            }))
            if (res.data.whatsappNumber === res.data.phoneNumber) setChecked(false);

        }
        else {
            setHomeState((prev) => { return { ...prev, loggedUser: email } })
        }
    }
    const { id } = useParams();  // to edit by admin
    useEffect(() => {
        if (admin) {
            getUserHome(id);
        } else {
            if (user)
                getUserHome(user.email);
        }
    }, [id, user, admin])
    const navigate = useNavigate();


    // on Change Function 
    const handleEvent = (e) => {
        const { name, value } = e.target;
        setHomeState((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const inputFunc = (item, flag,) => {
        return (
            <input value={homeState[item.name]} onChange={handleEvent} type={item.type} placeholder={`Enter ${item.placeholder}`} name={item.name} className={(item?.flag ? ' w-[80%]' : ' w-[90%]') + (" h-[50px] p-2 mt-4 rounded-md ring-2 ring-white outline-none text-xl font-semibold  focus:ring-blue-400 mb-4 placeholder:text-[1.1rem]")} required={flag} />
        )
    }

    const socialLinks = [{
        id: 1,
        icon: <FaFacebookSquare />,
        type: "text",
        name: "facebook",
        placeholder: "Enter Url Of Your Facebook account"
    },
    {
        id: 2,
        icon: <FaInstagram />,
        type: "text",
        name: "instagram",
        placeholder: "Enter Url Of Your Instagram account"
    },
    {
        id: 3,
        icon: <FaLinkedinIn />,
        name: "linkedIn",
        type: "text",
        placeholder: "Enter Url Of Your Facebook account"
    },
    ]
    const inputList = [{
        id: 1,
        type: "text",
        placeholder: "Company Name: ",
        flag: false,
        name: "companyName"
    },
    {
        id: 2,
        type: "email",
        flag: false,
        placeholder: "Company's Email Address: ",
        name: "email"
    },
    {
        id: 3,
        type: "text",
        placeholder: "Founder's Name: ",
        flag: true,
        name: "founderName"
    },
    ]


    const handleSubmit = (e) => {
        e.preventDefault();
        if (homeState.whatsappNumber === "") {
            toast.warning("Whatsapp number is required");
        } else {
            // function to send to axios post
            if (!preData) {
                createHomeSection(homeState);
                // function to sent to axios post to for tracker 
                createTracker({ loggedUser: homeState.loggedUser, home: true });
                navigate("../userabout");
            }
            // update the home-section;
            else {
                dispatch(HomeDataActions.setHomeInfo(homeState)); // move to redux
                updateHomeSection(homeState);
            }
            // dispatch(userNavigateActions.setMark({ id: 1 }));
        }
    }

    // handle theme selection
    const ChooseTheme = (id) => {
        setTheme(theme.map((item) => {
            if (item.id === id) {
                item.flag = true
                setHomeState((prev) => {
                    return {
                        ...prev,
                        theme: item.color
                    }
                })
            }
            else
                item.flag = false
            return item;
        }))
    }

    // check whether the phone number is same as whatsapp number
    const check = () => {
        if (checked) {
            setHomeState((prev) => { return { ...prev, whatsappNumber: homeState.phoneNumber } })
        }
        else {
            setHomeState((prev) => { return { ...prev, whatsappNumber: "" } })
        }
        setChecked((prev) => !prev);
    }

    return (
        <div>
            {flag && <HeadlineSection title="Home Section Details" />}
            <form onSubmit={handleSubmit} className={`${flag && "lg:max-w-[50%]"} sm:w-[80%] w-[95%] flex flex-col space-y-3  mx-auto`} action="">
                {/* theme selection (optional) */}
                <LayoutBox>
                    <PlaceholderFills title="Theme Selection" />
                    <div className='mt-5 flex flex-wrap justify-center items-center gap-3'>
                        {
                            theme.map((code) => (
                                <div key={code.id} onClick={() => ChooseTheme(code.id)} className={(code.flag === true ? " ring-gray-800 " : " ring-white ") + (` ${code.color} shadow-lg sm:w-[50px] ring-2 sm:h-[50px] cursor-pointer border-2 border-white rounded-full w-[40px] h-[40px]`)}></div>
                            ))
                        }

                    </div>
                </LayoutBox>

                {/* image file upload */}
                <LayoutBox>
                    <PlaceholderFills title="Company's Logo" />
                    <div className='mt-10 flex flex-col relative items-center'>
                        <div className='w-[250px] bg-slate-200 overflow-hidden flex items-center justify-center h-[250px] rounded-full'>
                            {/* //*TODO: ask to transparent the logo icon and avatar put company  */}
                            <img className='w-[220px] h-[220px] rounded-full object-contain' src={homeState.companyLogo !== "" ? homeState.companyLogo : demoAvatar} alt="demo avatar" />
                        </div>
                        <div className=' mb-5'>

                            <div className='w-[43px] h-[43px] rounded-full bg-[#e1e1e1]  cursor-pointer transition-all ease-linear duration-100 hover:bg-[#f0eaea] text-center flex justify-center items-center absolute top-[5%]  left-[58%]'>
                                <FileBase64
                                    multiple={false}
                                    type="file"
                                    onDone={({ base64 }) => setHomeState((prev) => { return { ...prev, companyLogo: base64 } })} />
                                <FaRegEdit className='text-2xl ml-1 absolute' />
                            </div>


                        </div>
                        <p className='text-gray-800 font-semibold'>
                            Supported Files JPEG, JPG, PNG
                        </p>

                    </div>
                </LayoutBox>
                {/* Company */}

                {
                    inputList.map((item) => {
                        return (

                            <LayoutBox key={item.id}>
                                <PlaceholderFills title={`Your ${item.placeholder}`} />
                                <div className='flex justify-center space-x-4  items-center'>
                                    {item.flag && (
                                        <div className=''>
                                            <select onChange={handleEvent} value={homeState.nameTitle} name="nameTitle" id="" className='h-[50px] rounded-md text-xl font-semibold outline-none ring-2 ring-white focus:ring-blue-500 cursor-pointer'>
                                                <option value="Mr.">Mr.</option>
                                                <option value="Ms.">Ms.</option>
                                                <option value="Mrs.">Mrs.</option>
                                            </select>
                                        </div>
                                    )}
                                    {inputFunc(item, true)}
                                </div>
                            </LayoutBox>
                        )
                    })
                }
                {/* Phone Number */}
                <LayoutBox>
                    <PlaceholderFills title="Mobile Number" />
                    <div className='mt-4 flex flex-col items-center mb-4'>
                        <PhoneInput
                            placeholder="Enter Your Whatsapp number"
                            country={'in'}
                            containerStyle={{ margin: "0 auto", display: "block", width: "90%" }}
                            inputStyle={{ width: "100%" }}
                            inputProps={{ required: true }}
                            value={homeState.phoneNumber}
                            onChange={phone => setHomeState((prev) => { return { ...prev, phoneNumber: phone } })}
                        />
                    </div>
                </LayoutBox>
                {/* check box */}
                <div className='flex gap-3 m-3 items-center'>
                    {/* //!TODO  customize the checkbox */}
                    <input className='w-[30px] h-[30px] cursor-pointer' onChange={check} type="checkbox" checked={!checked} />
                    <p className='capitalize text-gray-800 font-semibold text-xl'>
                        whatsapp number is same as phone number ?
                    </p>
                </div>
                {/* WhatsApp number */}
                <LayoutBox>
                    <PlaceholderFills title="Whatsapp Number" />
                    <div className='mt-4 flex flex-col items-center mb-4'>
                        <PhoneInput
                            placeholder="Enter Your Whatsapp number"
                            country={'in'}
                            containerStyle={{ margin: "0 auto", display: "block", width: "90%" }}
                            inputStyle={{ width: "100%" }}
                            inputProps={{ required: true }}
                            value={homeState.whatsappNumber}
                            onChange={phone => setHomeState((prev) => { return { ...prev, whatsappNumber: phone } })}
                        />
                    </div>
                </LayoutBox>
                {/* address */}
                <LayoutBox>
                    <PlaceholderFills title="Company's Address" />
                    <textarea required name="address" onChange={handleEvent} value={homeState.address} id="" rows="" placeholder="Enter Company's Address" className='mt-5 mx-auto block w-[90%] h-[150px] p-4 rounded-md ring-2 ring-white focus:ring-blue-500 outline-none mb-4'></textarea>
                </LayoutBox>
                {/* social  */}
                <LayoutBox>
                    <PlaceholderFills title="Social Media Links" />
                    <p className='text-center text-pink-600 font-semibold capitalize mt-4'>
                        this is optional
                    </p>
                    {
                        socialLinks.map((item) => (
                            <div key={item.id} className="flex items-center space-x-4 text-4xl text-gray-800">
                                <div>
                                    {item.icon}
                                </div>
                                {inputFunc(item, false)}
                            </div>
                        ))
                    }
                </LayoutBox>
                <UserBtn title={btnName} />
            </form>
            <ToastContainer />
        </div >
    )
}

export default UserHomeDetails