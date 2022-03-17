import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "../components/HomePage/Home";
import CandidateAuth from "../modules/auth/screens/CandidateAuth/CandidateAuth";

const AppRoutes = () => {
  return useRoutes([
    {
      path: "/",
      element: <Home />,
    },
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

export default AppRoutes;
