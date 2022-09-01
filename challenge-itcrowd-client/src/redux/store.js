import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import brandReducer from "./brandSlice";

export default configureStore({
    reducer: {
        products: productReducer,
        brands: brandReducer
    }
})