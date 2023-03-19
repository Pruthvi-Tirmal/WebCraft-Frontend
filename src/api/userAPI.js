import axios from 'axios';
// this is because there is some problem i will figure it out.
const url = "https://webcraft.onrender.com/api/new/card"

//*Home Section
// post for home section
export const createHomeSection = (card) => axios.post(`${url}/post/user-home-section`, card);
// get for home section
export const getHomeSection = async (card) => {
    try {
        const data = await axios.get(`${url}/get/user-home-section/${card.loggedUser}`)
        return data;
    } catch (err) {
        console.log(err);
    }
}

// update for home section 
export const updateHomeSection = (card) => axios.patch(`${url}/update/user-home-section`, card);
//delete for home section
export const deleteHomeSection = (user) => axios.delete(`${url}/delete/user-home-section/${user}`)

//*About section
//post for about section
export const createAboutSection = (card) => axios.post(`${url}/post/user-about-section`, card);
// get the about section 
export const getAboutSection = async (card) => {
    try {
        const data = await axios.get(`${url}/get/user-about-section/${card.loggedUser}`);
        return data;
    } catch (err) {
        console.log(err);
    }
}
// update the about section 
export const updateAboutSection = (card) => axios.patch(`${url}/update/user-about-section`, card);
//delete for about section
export const deleteAboutSection = (user) => axios.delete(`${url}/delete/user-about-section/${user}`)

// *Products Section
// get the about section 
export const getProductsSection = async (card) => {
    try {
        const data = await axios.get(`${url}/get/user-products-section/${card.loggedUser}`);
        return data;
    } catch (err) {
        console.log(err);
    }
}
//post for products section
export const createProductsSection = (card) => axios.post(`${url}/post/user-products-section`, card);
// update products section
export const updateProductsSection = (card) => axios.patch(`${url}/update/user-products-section`, card);
//delete for products section
export const deleteProductsSection = (user) => axios.delete(`${url}/delete/user-products-section/${user}`)


//* Gallery Section

//post for gallery section
export const createGallerySection = (card) => axios.post(`${url}/post/user-gallery-section`, card);
// update for gallery section
export const updateGallerySection = (card) => axios.patch(`${url}/update/user-gallery-section`, card);
// get the gallery section 
export const getGallerySection = async (card) => {
    try {
        const data = await axios.get(`${url}/get/user-gallery-section/${card.loggedUser}`);
        return data;
    } catch (err) {
        console.log(err);
    }
}
//delete for gallery section
export const deleteGallerySection = (user) => axios.delete(`${url}/delete/user-gallery-section/${user}`)


//* Payment Section

//post for payment section
export const createPaymentSection = (card) => axios.post(`${url}/post/user-payment-section`, card);
// get the payment section
export const getPaymentSection = async (card) => {
    try {
        const data = await axios.get(`${url}/get/user-payment-section/${card.loggedUser}`);
        return data;
    } catch (err) {
        console.log(err);
    }
}
// update for payment section
export const updatePaymentSection = (card) => axios.patch(`${url}/update/user-payment-section`, card);
//delete for user payment section
export const deletePaymentSection = (user) => axios.delete(`${url}/delete/user-payment-section/${user}`)

//*Tracker
//post for tracker section
export const createTracker = (card) => axios.post(`${url}/post/user-tracker`, card);
// patch for tracker section
export const updateTracker = (card) => axios.patch(`${url}/update/user-tracker`, card);
// get the status from the tracker
export const getTracker = async (card) => {
    try {
        const data = await axios.get(`${url}/get/user-tracker/${card.loggedUser}`);
        return data;
    }
    catch (err) {
        console.log(err);
    }
}
//delete for tracker section
export const deleteTracker = (user) => axios.delete(`${url}/delete/user-tracker/${user}`)

// *Domain Selection
// create a domain
export const createDomain = async (domain) => {
    try {
        const res = await axios.post(`${url}/post/domain`, domain);
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

// get specific user domain
export const getDomain = async (domain) => {
    try {
        let res = null;
        // console.log(domain)
        if (domain.loggedUser !== "") {
            res = await axios.get(`${url}/get/domain/${domain.loggedUser}`);
        } else {
            res = await axios.get(`${url}/get/domain/${domain.url}`);
        }
        return res;
    } catch (err) {
        console.log(err);
    }
}

//delete for home section
export const deleteDomain = (user) => axios.delete(`${url}/delete/domain/${user}`)