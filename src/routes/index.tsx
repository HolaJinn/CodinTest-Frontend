import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "../pages/HomePage/Home";
import PrivateRoute from "./PrivateRoute";
import CandidateDashboard from "../modules/Dashboard/screens/CandidateDashboard";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignupPage from "../pages/SignupPage/SignupPage";
import EmailVerificationPage from "../pages/EmailVerificationPage/EmailVerificationPage";

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
      ],
    },
  ]);
};

export default AppRoutes;
