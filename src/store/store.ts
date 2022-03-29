import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../modules/auth/store/slices/authSlice";
import registerReducer from "../modules/auth/store/slices/registerSlice"
import registerOwnerReducer from "../modules/auth/store/slices/registerOwnerSlice"
import accountVerificationReducer from "../modules/auth/store/slices/accountVerificationSlice"
import emailVerificationReducer from "../modules/auth/store/slices/emailVerificationSlice"
import resetPasswordReducer from "../modules/auth/store/slices/resetPasswordSlice"
import userSliceReducer from "../modules/auth/store/slices/userSlice"
import createExerciseReducer from "../modules/CompanyDashboard/store/slices/createExerciseSlice";
import createTestCaseReducer from "../modules/CompanyDashboard/store/slices/createTestCaseSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        register: registerReducer,
        registerOwner: registerOwnerReducer,
        verifyAccount: accountVerificationReducer,
        verifyEmail: emailVerificationReducer,
        resetPassword: resetPasswordReducer,
        user: userSliceReducer,
        createExercise: createExerciseReducer,
        createTestCase: createTestCaseReducer
    }
})