import { configureStore } from "@reduxjs/toolkit";
import userNavigateReducer from "../reducers/userNavigate";
import { HomeDataReducer } from "../reducers/HomeData";
import { AboutDataReducer } from "../reducers/AboutData";
import { ProductsDataReducer } from "../reducers/ProductsData";
import { galleryDataReducer } from "../reducers/GalleryData";
import { PaymentDataReducer } from "../reducers/PaymentData";
import { searchItemReducers } from "../reducers/SearchRes";
import { userReducer } from "../reducers/Users";
import { userIdReducer } from "../reducers/UserId";
export const store = configureStore({
    reducer: {
        userNavigate: userNavigateReducer,
        Home: HomeDataReducer,
        About: AboutDataReducer,
        Products: ProductsDataReducer,
        Gallery: galleryDataReducer,
        Payment: PaymentDataReducer,
        search: searchItemReducers,
        Users: userReducer,
        userId: userIdReducer,
    }, devTools: true
})