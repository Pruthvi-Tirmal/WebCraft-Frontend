import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    search: "",
}
const searchItem = createSlice({
    name: "search",
    initialState,
    reducers: {
        getSearchItem: (state, action) => {
            state.search = action.payload
        }
    }
})

export const searchItemAction = searchItem.actions;
export const searchItemReducers = searchItem.reducer; 
