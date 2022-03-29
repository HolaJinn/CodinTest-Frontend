import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../../auth/store/slices/userSlice";
import { Outlet } from "react-router-dom";

const CompanyDashboard = () => {
  const dispatch = useDispatch();

  const user = localStorage.getItem("user");
  console.log(JSON.parse(user!));
  useEffect(() => {
    dispatch(getCurrentUser());
  });
  return (
    <>
      <Outlet />
    </>
  );
};

export default CompanyDashboard;
