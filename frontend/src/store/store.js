import { configureStore } from "@reduxjs/toolkit";  
import authReducer from "./auth-slice/index.js";
import adminProductReducer from "./admin/product-slice/index.js";
import shopProductSlice from "./shop/product-slice/index.js";
const store = configureStore({
    reducer: {
        auth : authReducer,
        product : adminProductReducer,
        shopProduct : shopProductSlice
    }
});

export default store;
