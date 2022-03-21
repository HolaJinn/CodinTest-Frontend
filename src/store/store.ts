import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../modules/auth/store/slices/authSlice";
import registerReducer from "../modules/auth/store/slices/registerSlice"
import registerOwnerReducer from "../modules/auth/store/slices/registerOwnerSlice"
import accountVerificationReducer from "../modules/auth/store/slices/accountVerificationSlice"
import emailVerificationReducer from "../modules/auth/store/slices/emailVerificationSlice"
import resetPasswordReducer from "../modules/auth/store/slices/resetPasswordSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        register: registerReducer,
        registerOwner: registerOwnerReducer,
        verifyAccount: accountVerificationReducer,
        verifyEmail: emailVerificationReducer,
        resetPassword: resetPasswordReducer
    }
})