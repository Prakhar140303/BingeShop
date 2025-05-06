import { configureStore } from "@reduxjs/toolkit";  
import authReducer from "./auth-slice/index.js";
import adminProductReducer from "./product-slice/index.js";
const store = configureStore({
    reducer: {
        auth : authReducer,
        product : adminProductReducer
    }
});

export default store;
