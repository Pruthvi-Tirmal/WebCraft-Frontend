import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    // home data
    loggedUser: "",
    theme: "",
    companyLogo: "",
    companyName: "",
    email: "",
    founderName: "",
    phoneNumber: "",
    whatsappNumber: "",
    address: "",
    facebook: "",
    nameTitle: "",
    instagram: "",
    linkedIn: "",

}

// reducers
const HomeDataSlice = createSlice({
    name: "Home",
    initialState,
    reducers: {
        setHomeInfo: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        }
    }
})

export const HomeDataActions = HomeDataSlice.actions;
export const HomeDataReducer = HomeDataSlice.reducer;