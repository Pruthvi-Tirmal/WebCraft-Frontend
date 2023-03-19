import axios from "axios"
const url = "https://webcraft.onrender.com/api/admin";

// *Home Section
// get all user's home sections
export const getAllHome = async () => {
    try {
        const data = await axios.get(`${url}/get/home`);
        return data;
    } catch (err) {
        console.log(err);
    }
}

//*About Section
// get all user's home sections
export const getAllAbout = async () => {
    try {
        const data = await axios.get(`${url}/get/about`);
        return data;
    } catch (err) {
        console.log(err);
    }
}

//* Products-Service Section
// get all user's home sections
export const getAllProductsServices = async () => {
    try {
        const data = await axios.get(`${url}/get/products-services`);
        return data;
    } catch (err) {
        console.log(err);
    }
}

//* Gallery Section
// get all user's home sections
export const getAllGalleries = async () => {
    try {
        const data = await axios.get(`${url}/get/galleries`);
        return data;
    } catch (err) {
        console.log(err);
    }
}

//* User payment Section
// get all user's home sections
export const getAllUserDisplayedPayments = async () => {
    try {
        const data = await axios.get(`${url}/get/userpayments`);
        return data;
    } catch (err) {
        console.log(err);
    }
}

//* Tracker  Section
// get all tracker status 
export const getAllTrackers = async () => {
    try {
        const data = await axios.get(`${url}/get/trackers`);
        return data;
    } catch (err) {
        console.log(err);
    }
}

// *Domain Section
// get all Domains 
export const getAllDomains = async () => {
    try {
        const data = await axios.get(`${url}/get/domains`);
        return data;
    } catch (err) {
        console.log(err);
    }
}

//*Cred

export const getCred = async (cred) => {
    try {
        const data = await axios.get(`${url}/get/admin-cred/${cred.email}`,);
        return data;
    } catch (err) {
        console.log(err);
    }
}