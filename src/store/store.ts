import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../modules/auth/store/slices/authSlice";
import registerReducer from "../modules/auth/store/slices/registerSlice"
import registerOwnerReducer from "../modules/auth/store/slices/registerOwnerSlice"
import accountVerificationReducer from "../modules/auth/store/slices/accountVerificationSlice"
import emailVerificationReducer from "../modules/auth/store/slices/emailVerificationSlice"
import resetPasswordReducer from "../modules/auth/store/slices/resetPasswordSlice"
import userSliceReducer from "../modules/auth/store/slices/userSlice"
import createExerciseReducer from "../modules/CompanyDashboard/store/slices/createExerciseSlice";
import createInitialCodeReducer from "../modules/CompanyDashboard/store/slices/createInitialCodeSlice";
import createTestCaseReducer from "../modules/CompanyDashboard/store/slices/createTestCaseSlice"
import programmingLanguageReducer from "./slices/programmingLanguageSlice";
import fetchExerciseReducer from './../modules/CompanyDashboard/store/slices/fetchExerciseSlice';
import deleteExerciseReducer from "../modules/CompanyDashboard/store/slices/deleteExerciseSlice";
import createTechnicalTestReducer from "../modules/CompanyDashboard/store/slices/createTechnicalTestSlice";
import addExercisesToTechnicalTestReducer from "../modules/CompanyDashboard/store/slices/addExercisesToTechnicalTestSlice";
import fetchTechnicalTestsReducer from "../modules/CompanyDashboard/store/slices/fetchTechnicalTestsSlice";
import deleteTechnicalTestReducer from "../modules/CompanyDashboard/store/slices/deleteTechnicalTestSlice";
import createInvitationReducer from "../modules/CompanyDashboard/store/slices/createInvitationSlice";
import fetchCurrentUserInvitationsReducer from "../modules/CandidateDashboard/store/slices/fetchCurrentUserInvitationsSlice";
import acceptInvitationReducer from '../modules/CandidateDashboard/store/slices/acceptInvitationSlice';
import rejectInvitationReducer from "../modules/CandidateDashboard/store/slices/rejectInvitationSlice";

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
        createInitialCode: createInitialCodeReducer,
        createTestCase: createTestCaseReducer,
        programmingLanguage: programmingLanguageReducer,
        fetchExercises: fetchExerciseReducer,
        deleteExercise: deleteExerciseReducer,
        createTechnicalTest: createTechnicalTestReducer,
        addExercisesToTechnicalTest: addExercisesToTechnicalTestReducer,
        fetchTechnicalTests: fetchTechnicalTestsReducer,
        deleteTechnicalTest: deleteTechnicalTestReducer,
        createInvitation: createInvitationReducer,
        fetchCurrentUserInvitations: fetchCurrentUserInvitationsReducer,
        acceptInvitation: acceptInvitationReducer,
        rejectInvitation: rejectInvitationReducer
    }
})