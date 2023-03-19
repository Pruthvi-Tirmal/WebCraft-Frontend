import React, { useEffect, useRef, useState } from 'react'
import HeadlineSection from './HeadlineSection'
import LayoutBox from './LayoutBox'
import PlaceholderFills from './PlaceholderFills'
// import { Editor } from '@tinymce/tinymce-react';
import { UserBtn } from './UserBtn';
// import { useDispatch } from 'react-redux'
// import { userNavigateActions } from '../redux/reducers/userNavigate'
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom';
import { createAboutSection, getAboutSection, updateAboutSection, updateTracker } from '../api/userAPI';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase'
import JoditEditor from "jodit-react";
import './joditEditorStyle.css'
import { useDispatch } from 'react-redux';
import { AboutDataActions } from '../redux/reducers/AboutData';
export const UserAboutDetails = ({ flag = true, admin = false }) => {
    const [user] = useAuthState(auth);
    const [content, setContent] = useState("");
    const [aboutState, setAboutState] = useState({ loggedUser: "", aboutInfo: "" });

    // check if the data is present already
    const [preData, setPreData] = useState(false);
    // change the btn name from save & next to save
    const [btnName, setBtnName] = useState("Save and Next");
    const getAbout = async (email) => {
        if (email) {

            const res = await getAboutSection({ loggedUser: email });
            if (res) {
                const val = JSON.parse(res.data.aboutInfo)
                setAboutState((prev) => { return { ...prev, ...res.data } })
                setContent(val); // the data if present
                setBtnName("Save"); // the data is present 
                setPreData(true); // that means the data is already present 
            } else {
                setAboutState((prev) => { return { ...prev, loggedUser: email } })
            }
        }
    }
    const { id } = useParams();  // to edit by admin

    useEffect(() => {
        if (admin) {
            getAbout(id);
        } else {
            if (user)
                getAbout(user.email);
        }
    }, [user, id, admin])

    const navigate = useNavigate();
    // dispatch
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (aboutState.aboutInfo === "") {
            toast.warning("Editor is Empty");
        } else {
            // post the details
            if (!preData) {
                // console.log("new")
                createAboutSection(aboutState);
                // updating the tracking system
                updateTracker({ loggedUser: aboutState.loggedUser, about: true });
                navigate("../userproducts");
            }
            // update the details
            else {
                dispatch(AboutDataActions.setAboutData(content));
                updateAboutSection(aboutState);
            }

        }
    }
    const editor = useRef(null);
    // handle parse of JSON
    useEffect(() => {
        setAboutState((prev) => { return { ...prev, aboutInfo: JSON.stringify(content) } })
    }, [content]);
    return (
        <div className=''>
            {flag && <HeadlineSection title="About Section Details" />}
            <form onSubmit={handleSubmit} className={`${flag && "lg:max-w-[50%]"} sm:w-[80%] w-[95%] flex flex-col space-y-3  mx-auto`} action="">
                <LayoutBox>
                    <PlaceholderFills title="Company's Info Details" />
                    <div className='mt-4'>
                        <JoditEditor
                            ref={editor}
                            onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                            value={content}
                            onChange={(newContent) => { setContent(newContent) }}
                        />

                    </div>
                </LayoutBox>
                <UserBtn title={btnName} />
            </form>
            <ToastContainer />
        </div>
    )
}
