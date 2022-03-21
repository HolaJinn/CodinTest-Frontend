import React from "react";
import { useRoutes } from "react-router-dom";
import CandidateAuth from "../screens/CandidateAuth/CandidateAuth";
import OwnerAuth from "../screens/OwnerAuth/OwnerAuth";
import ForgotPassword from "../screens/ResetPassword/ForgotPassword";
import ResetPassword from "../screens/ResetPassword/ResetPassword";

const AuthRoutes = () => {
  return useRoutes([
    {
      path: "/candidate/signup",
      element: <CandidateAuth path={"signup"} />,
    },
    {
      path: "/candidate/login",
      element: <CandidateAuth path={"login"} />,
    },
    {
      path: "/owner/signup",
      element: <OwnerAuth path={"signup"} />,
    },
    {
      path: "/owner/login",
      element: <OwnerAuth path={"login"} />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/reset-password",
      element: <ResetPassword />,
    },
  ]);
};

export default AuthRoutes;
