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
import fetchExerciseDetailsReducer from "./../modules/CompanyDashboard/store/slices/fetchExerciseDetailsSlice";
import deleteExerciseReducer from "../modules/CompanyDashboard/store/slices/deleteExerciseSlice";
import createTechnicalTestReducer from "../modules/CompanyDashboard/store/slices/createTechnicalTestSlice";
import addExercisesToTechnicalTestReducer from "../modules/CompanyDashboard/store/slices/addExercisesToTechnicalTestSlice";
import fetchTechnicalTestsReducer from "../modules/CompanyDashboard/store/slices/fetchTechnicalTestsSlice";
import deleteTechnicalTestReducer from "../modules/CompanyDashboard/store/slices/deleteTechnicalTestSlice";
import fetchInvitationsReducer from "../modules/CompanyDashboard/store/slices/fetchInvitationsSlice";
import createInvitationReducer from "../modules/CompanyDashboard/store/slices/createInvitationSlice";
import fetchCurrentUserInvitationsReducer from "../modules/CandidateDashboard/store/slices/fetchCurrentUserInvitationsSlice";
import acceptInvitationReducer from '../modules/CandidateDashboard/store/slices/acceptInvitationSlice';
import rejectInvitationReducer from "../modules/CandidateDashboard/store/slices/rejectInvitationSlice";
import fetchRelatedCandidatesReducer from "../modules/CompanyDashboard/store/slices/fetchRelatedCandidates";
import addRecruiterReducer from "../modules/CompanyDashboard/store/slices/addRecruiterSlice";
import fetchRecruitersReducer from "../modules/CompanyDashboard/store/slices/fetchRecruitersSlice";
import fetchTechnicalTestDetailsReducer from "../modules/CompanyDashboard/store/slices/fetchTechnicalTestDetailsSlice";
import fetchInvitationDetailsReducer from "../modules/CompanyDashboard/store/slices/fetchInvitationDetailsSlice";
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
        fetchExerciseDetails: fetchExerciseDetailsReducer,
        deleteExercise: deleteExerciseReducer,
        createTechnicalTest: createTechnicalTestReducer,
        addExercisesToTechnicalTest: addExercisesToTechnicalTestReducer,
        fetchTechnicalTests: fetchTechnicalTestsReducer,
        fetchTechnicalTestDetails: fetchTechnicalTestDetailsReducer,
        deleteTechnicalTest: deleteTechnicalTestReducer,
        fetchInvitations: fetchInvitationsReducer,
        fetchInvitationDetails: fetchInvitationDetailsReducer,
        createInvitation: createInvitationReducer,
        fetchCurrentUserInvitations: fetchCurrentUserInvitationsReducer,
        acceptInvitation: acceptInvitationReducer,
        rejectInvitation: rejectInvitationReducer,
        fetchRelatedCandidates: fetchRelatedCandidatesReducer,
        fetchRecruiters: fetchRecruitersReducer,
        addRecruiter: addRecruiterReducer
    }
})