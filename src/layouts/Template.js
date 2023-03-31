import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { AboutSection } from '../components/template_components/AboutSection'
import CompanyFooter from '../components/template_components/CompanyFooter'
import ContactSection from '../components/template_components/ContactSection'
import FooterSection from '../components/template_components/FooterSection'
import GallerySection from '../components/template_components/GallerySection'
import HomeSection from '../components/template_components/HomeSection'
import Navigator from '../components/template_components/Navigator'
import PaymentSection from '../components/template_components/PaymentSection'
import ProductSection from '../components/template_components/ProductSection'
import { getAboutSection, getDomain, getGallerySection, getHomeSection, getPaymentSection, getProductsSection } from '../api/userAPI'
import { PaymentDataActions } from '../redux/reducers/PaymentData'
import { galleryDataActions } from '../redux/reducers/GalleryData'
import { ProductsDataActions } from '../redux/reducers/ProductsData'
import { AboutDataActions } from '../redux/reducers/AboutData'
import { HomeDataActions } from '../redux/reducers/HomeData'
import Loader from '../components/Loader'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
const Template = ({ flag = true }) => {
    const navigate = useNavigate();
    // selector
    const URL = useParams();
    // console.log(URL);
    const { id } = URL;
    const [load, setLoad] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
        if (URL['*'] && URL['*'].includes("update/")) {
            return;
        } else {
            const getAllDetails = async () => {
                try {
                    // console.log(id);
                    const domainUser = await getDomain({ url: id, loggedUser: "" })
                    // console.log(domainUser.data);
                    const { loggedUser } = domainUser.data;
                    if (loggedUser !== undefined) {
                        // home section
                        const resHome = await getHomeSection({ loggedUser });
                        dispatch(HomeDataActions.setHomeInfo(resHome.data));
                        // about section
                        const resAbout = await getAboutSection({ loggedUser });
                        let val = JSON.parse(resAbout.data.aboutInfo);
                        dispatch(AboutDataActions.setAboutData(val));
                        // product section
                        const resProducts = await getProductsSection({ loggedUser });
                        val = JSON.parse(resProducts.data.productsInfo)
                        dispatch(ProductsDataActions.setProductsInfo({ productsInfo: val, files: resProducts.data.files }));
                        // gallery Section
                        const resGallery = await getGallerySection({ loggedUser });
                        dispatch(galleryDataActions.setGalleryData(resGallery.data));
                        // user payment section
                        const resUserPayment = await getPaymentSection({ loggedUser });
                        dispatch(PaymentDataActions.setPaymentData(resUserPayment.data));
                        setLoad(false);
                    } else {
                        navigate('/site-is-not-present');
                    }
                } catch (err) {
                    toast.error("network error, please try after some time.");
                    console.log(err);
                }
            }
            getAllDetails();
        }
    }, [dispatch, id, navigate, URL])

    const homeData = useSelector((state) => state.Home);
    const aboutData = useSelector(state => state.About);
    const productsData = useSelector(state => state.Products);
    const galleryData = useSelector(state => state.Gallery);
    const paymentData = useSelector(state => state.Payment);
    return (<>
        {load && (<Loader />)}
        {!load && (<div className='bg-gray-800 overflow-hidden relative w-full min-h-screen grid place-items-center'>
            <div className={`${flag && "lg:w-[40%] md:w-[70%] "} w-[90%] rounded-sm shadow-lg flex flex-col p-4 space-y-5 mb-[70px]`}>
                <HomeSection theme={homeData.theme} founderName={homeData.founderName} companyLogo={homeData.companyLogo} phoneNumber={homeData.phoneNumber} whatsappNumber={homeData.whatsappNumber} url_id={id} nameTitle={homeData.nameTitle} companyName={homeData.companyName} />
                <AboutSection theme={homeData.theme} aboutInfo={aboutData.aboutInfo} />
                <ProductSection theme={homeData.theme} productsInfo={productsData.productsInfo} files={productsData.files} whatsappNumber={homeData.whatsappNumber} />
                <GallerySection theme={homeData.theme} files={galleryData.files} />
                <PaymentSection theme={homeData.theme} files={paymentData.files} bankName={paymentData.bankName} ifscCode={paymentData.ifscCode} accountHolder={paymentData.accountHolder} mobile={homeData.phoneNumber} accountNumber={paymentData.accountNumber} />
                <ContactSection theme={homeData.theme} address={homeData.address} email={homeData.email} />
                {
                    (homeData?.facebook !== "" || homeData?.instagram !== "" || homeData?.linkedIn !== "") && (<FooterSection theme={homeData.theme} facebook={homeData?.facebook} instagram={homeData?.instagram} linkedin={homeData?.linkedIn} />)
                }
                <CompanyFooter theme={homeData.theme} />
            </div>
            {flag && <Navigator theme={homeData.theme} />}
        </div>)}
        <ToastContainer />
    </>
    )
}

export default Template