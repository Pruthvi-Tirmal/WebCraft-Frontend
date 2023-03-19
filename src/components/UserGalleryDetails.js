import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import FileList from './FileList'
import FileUploader from './FileUploader'
import { toast } from 'react-toastify'
import HeadlineSection from './HeadlineSection'
import LayoutBox from './LayoutBox'
import PlaceholderFills from './PlaceholderFills'
import { UserBtn } from './UserBtn'
import { createGallerySection, getGallerySection, updateGallerySection, updateTracker } from '../api/userAPI'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'
import { galleryDataActions } from '../redux/reducers/GalleryData'
const UserGalleryDetails = ({ flag = true, admin = false }) => {
    const [files, setFiles] = useState([{ fileName: "", encoded: "" }])
    const [preData, setPreData] = useState(false); // the data is present or not
    const [btnName, setBtnName] = useState("Save and Next");

    const [user] = useAuthState(auth);
    const { id } = useParams();  // to edit by admin
    const dispatch = useDispatch();
    useEffect(() => {
        const getGallery = async (email) => {
            if (email) {
                const res = await getGallerySection({ loggedUser: email });
                if (res) {
                    // console.log(res.data);
                    setFiles(res.data.files);
                    setPreData(true); // that means the data is already present 
                    setBtnName("Save") // data is present i.e why save

                }
            }
        }
        if (admin) {
            getGallery(id);
        } else {
            if (user) {
                getGallery(user.email);
            }
        }
    }, [user, admin, id])

    const removeFile = (filename) => {
        setFiles((files.filter((file) => file.fileName !== filename)));
    }
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // post the details
        if (!preData) {
            if (files.length === 1) {
                toast.warning("Empty Gallery Please Upload the photos");
            } else {
                files.shift(); // removing the first object form array
                // console.log("new")
                createGallerySection({ loggedUser: user.email, imgCollections: [...files] });
                // updating the tracking system
                updateTracker({ loggedUser: user.email, gallery: true });
                navigate("../userpayment");

            }
        }
        // update the details
        else {
            // console.log("edit");
            dispatch(galleryDataActions.setGalleryData({ files: files }));
            if (admin) {
                updateGallerySection({ loggedUser: id, imgCollections: [...files] });
            } else {
                if (user) {
                    updateGallerySection({ loggedUser: user.email, imgCollections: [...files] });
                }
            }
        }



    }
    return (
        <div className=''>
            {flag && <HeadlineSection title="Gallery Section Details" />}
            <form onSubmit={handleSubmit} className={`${flag && "lg:max-w-[50%]"} sm:w-[80%] w-[95%] flex flex-col space-y-3  mx-auto`} action="">
                <LayoutBox>
                    <PlaceholderFills title="Add Photos" />
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

export default UserGalleryDetails