import { createSlice } from "@reduxjs/toolkit";

const initialState = { aboutInfo: "" };

const AboutDataSlice = createSlice({
    name: "About",
    initialState,
    reducers: {
        setAboutData: (state, action) => {
            return {
                ...state,
                aboutInfo: action.payload
            }
        }
    }
})

export const AboutDataActions = AboutDataSlice.actions;
export const AboutDataReducer = AboutDataSlice.reducer;