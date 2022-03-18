import React from "react";
import { useRoutes } from "react-router-dom";
import CandidateAuth from "../screens/CandidateAuth/CandidateAuth";

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
  ]);
};

export default AuthRoutes;
