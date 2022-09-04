import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import brandReducer from "./brandSlice";
import userReducer from "./userSlice"

export default configureStore({
    reducer: {
        products: productReducer,
        brands: brandReducer,
        user: userReducer
    }
})