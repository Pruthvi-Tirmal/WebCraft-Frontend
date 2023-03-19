import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    productsInfo: ""
}

const ProductsSlice = createSlice({
    name: "Products",
    initialState,
    reducers: {
        setProductsInfo: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        }
    }
})

export const ProductsDataActions = ProductsSlice.actions;
export const ProductsDataReducer = ProductsSlice.reducer;