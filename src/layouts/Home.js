import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Prices from '../components/Prices'
import CreateBanner from '../components/CreateBanner'
import Steps from '../components/Steps'
import Footer from '../components/Footer'
import FeaturesList from '../components/FeaturesList'
import About from '../components/About'
import ContactUs from '../components/ContactUs'
import FAQ from '../components/FAQ'
import { Link as ScrollLink } from 'react-scroll'
import { FaArrowUp } from "react-icons/fa";
import Loader from '../components/Loader'
const Home = () => {
    const [Top, setTop] = useState(false);
    useEffect(() => {
        window.addEventListener('scroll', () => {
            const value = window.scrollY;
            if (value > 1000) {
                setTop(true);
            } else
                setTop(false);
        })
    }, [])
    return (
        <>
            <div style={Top ? { display: "block" } : { display: "none" }} className='fixed z-40 right-10 bg-gray-800 text-white p-2 rounded-md  bottom-10 cursor-pointer'>
                <ScrollLink
                    to="home" spy={true} smooth={true} offset={50} duration={500} className='text-3xl'><FaArrowUp /></ScrollLink>
            </div>
            <motion.div initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)', visibility: "visible", opacity: 1 }} animate={{ visibility: "visible", clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', opacity: 1 }} transition={{ duration: 1, type: "just" }} className='h-auto w-full overflow-x-hidden '>
                <CreateBanner />
                {/* //! close for temporary purpose */}
                {/* <Prices /> */}
                <About />
                <Steps />
                <FeaturesList />
                <FAQ />
                <ContactUs />
                <Footer />
            </motion.div >
        </>
    )
}

export default Home