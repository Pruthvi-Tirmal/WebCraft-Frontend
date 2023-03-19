import React, { useEffect, useRef, useState } from 'react'
import HeadlineSection from './HeadlineSection'
import LayoutBox from './LayoutBox'
import 'react-phone-input-2/lib/material.css'
import PlaceholderFills from './PlaceholderFills'
import { UserBtn } from './UserBtn'
// import { Editor } from '@tinymce/tinymce-react';
import { userNavigateActions } from '../redux/reducers/userNavigate'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'
import { createProductsSection, getProductsSection, updateProductsSection, updateTracker } from '../api/userAPI'
import JoditEditor from "jodit-react";
import './joditEditorStyle.css'
import { ProductsDataActions } from '../redux/reducers/ProductsData'
import FileUploader from './FileUploader'
import FileList from './FileList'

const UserProductsDetails = ({ flag = true, admin = false }) => {
    const [user] = useAuthState(auth);
    const [content, setContent] = useState("");
    const dispatch = useDispatch();
    const [files, setFiles] = useState([{ fileName: "", encoded: "" }])
    // change the btn name from save & next to save
    const [btnName, setBtnName] = useState("Save and Next");
    // check if the data is present already
    const [preData, setPreData] = useState(false);
    const [productState, setProductState] = useState({ loggedUser: "", productsInfo: "" });

    const getProducts = async (email) => {
        if (email) {
            const res = await getProductsSection({ loggedUser: email });
            if (res) {
                const val = JSON.parse(res.data.productsInfo)
                setProductState((prev) => { return { ...prev, ...res.data } })
                setContent(val); // the data if present
                setFiles(res.data.files);
                setBtnName("Save") // data is present i.e why save
                setPreData(true); // that means the data is already present 
            } else {
                setProductState((prev) => { return { ...prev, loggedUser: email } })
            }
        }
    }
    const { id } = useParams();  // to edit by admin
    useEffect(() => {
        if (admin) {
            getProducts(id)
        }
        else {
            if (user)
                getProducts(user.email);
        }
    }, [user, id, admin])
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (productState.productsInfo === "") {
            toast.warning("Editor is empty", { toastId: 'wr1' })
        } else {
            // post the details
            if (!preData) {
                if (files.length === 1) {
                    toast.warning("Empty Gallery Please Upload the photos");
                }
                else {
                    files.shift(); // removing the first object form array
                    // console.log("new")
                    createProductsSection({ productState, imgCollections: [...files] });
                    // updating the tracking system
                    updateTracker({ loggedUser: productState.loggedUser, products: true });
                    navigate("../usergallery");

                }
            }
            // update the details
            else {
                dispatch(ProductsDataActions.setProductsInfo({ content, files: files })); // send to redux
                updateProductsSection({ productState, imgCollections: [...files] });
            }

        }
    }
    const editor = useRef(null);
    // handle parse of JSON
    useEffect(() => {
        setProductState((prev) => { return { ...prev, productsInfo: JSON.stringify(content) } })
    }, [content]);

    const removeFile = (filename) => {
        setFiles((files.filter((file) => file.fileName !== filename)));
    }

    return (
        <div className=''>
            {flag && <HeadlineSection title="Products and Services Section Details" />}
            <form onSubmit={handleSubmit} className={`${flag && "lg:max-w-[50%]"} sm:w-[80%] w-[95%] flex flex-col space-y-3  mx-auto`} action="">

                <LayoutBox>
                    <PlaceholderFills title="Products and Services Details" />
                    <div className='mt-4'>
                        <JoditEditor
                            ref={editor}
                            onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                            value={content}
                            onChange={(newContent) => { setContent(newContent) }}
                        />
                    </div>
                </LayoutBox>
                <LayoutBox>
                    <PlaceholderFills title="Add Services or Products Photos" />
                    <div className=''>
                        <FileUploader setFiles={setFiles} />
                        <FileList files={files} removeFile={removeFile} />
                    </div>
                </LayoutBox>
                <UserBtn title={btnName} />
            </form>
        </div>
    )
}

export default UserProductsDetails
