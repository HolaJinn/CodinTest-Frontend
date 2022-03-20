import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../modules/auth/store/slices/authSlice";
import registerReducer from "../modules/auth/store/slices/registerSlice"
import registerOwnerReducer from "../modules/auth/store/slices/registerOwnerSlice"
import emailVerificationReducer from "../modules/auth/store/slices/emailVerificationSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        register: registerReducer,
        registerOwner: registerOwnerReducer,
        verifyEmail: emailVerificationReducer
    }
})