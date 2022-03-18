import React from "react";
import { useRoutes } from "react-router-dom";
import CandidateAuth from "../screens/CandidateAuth/CandidateAuth";
import OwnerAuth from "../screens/OwnerAuth/OwnerAuth";

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
  ]);
};

export default AuthRoutes;
