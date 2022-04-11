import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "../pages/HomePage/Home";
import PrivateRoute from "./PrivateRoute";
import CandidateDashboard from "../modules/CandidateDashboard/screens/CandidateDashboard";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignupPage from "../pages/SignupPage/SignupPage";
import EmailVerificationPage from "../pages/EmailVerificationPage/EmailVerificationPage";
import CompanyDashboard from "../modules/CompanyDashboard/screens/CompanyDashboard";
import ExercisesScreen from "../modules/CompanyDashboard/screens/ExercisesScreen";
import CompanyLayout from "../modules/CompanyDashboard/layouts/CompanyLayout";
import CreateExercise from "../modules/CompanyDashboard/screens/CreateExercise";
import CreateTestCase from "../modules/CompanyDashboard/screens/CreateTestCase";
import CreateInitialCode from "../modules/CompanyDashboard/screens/CreateInitialCode";
import TechnicalTestsScreen from "../modules/CompanyDashboard/screens/TechnicalTestsScreen";
import CreateTechnicalTest from "../modules/CompanyDashboard/screens/CreateTechnicalTest";
import AddExercisesToTechnicalTest from "../modules/CompanyDashboard/screens/AddExercisesToTechnicalTest";
import CreateInvitation from "../modules/CompanyDashboard/screens/CreateInvitation";
import InvitationsScreen from "../modules/CompanyDashboard/screens/InvitationsScreen";

const AppRoutes = () => {
  return useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <SignupPage />,
    },
    {
      path: "/auth/verify",
      element: <EmailVerificationPage />,
    },
    {
      element: <PrivateRoute />,
      children: [
        {
          path: "/dashboard",
          element: <CandidateDashboard />,
        },
        {
          path: "/company",
          element: <CompanyLayout />,
          children: [
            {
              path: "/company/dashboard",
              element: <CompanyDashboard />,
            },
            {
              path: "/company/exercises",
              element: <ExercisesScreen />,
            },
            {
              path: "/company/create-exercise",
              element: <CreateExercise />,
            },
            {
              path: "/company/create-exercise/initial-code",
              element: <CreateInitialCode />,
            },
            {
              path: "/company/create-exercise/add-test-cases",
              element: <CreateTestCase />,
            },
            {
              path: "/company/technical-tests",
              element: <TechnicalTestsScreen />,
            },
            {
              path: "/company/create-technical-test",
              element: <CreateTechnicalTest />,
            },
            {
              path: "/company/create-technical-test/add-exercises",
              element: <AddExercisesToTechnicalTest />,
            },
            {
              path: "/company/technical-tests/:id/invite-candidate",
              element: <CreateInvitation />,
            },
            {
              path: "/company/invitations",
              element: <InvitationsScreen />,
            },
          ],
        },
      ],
    },
  ]);
};

export default AppRoutes;
