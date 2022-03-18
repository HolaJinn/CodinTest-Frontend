import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../modules/auth/store/slices/authSlice";
import registerReducer from "../modules/auth/store/slices/registerSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        register: registerReducer
    }
})