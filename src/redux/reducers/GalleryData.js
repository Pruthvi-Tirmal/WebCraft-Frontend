import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    files: [{}]
}

const gallerySlice = createSlice({
    name: "Gallery",
    initialState,
    reducers: {
        setGalleryData: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        }
    }
})

export const galleryDataActions = gallerySlice.actions;
export const galleryDataReducer = gallerySlice.reducer;
