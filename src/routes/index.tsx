import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "../components/HomePage/Home";

const AppRoutes = () => {
  return useRoutes([
    {
      path: "/",
      element: <Home />,
    },
  ]);
};

export default AppRoutes;
