import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../../auth/store/slices/userSlice";
import { Outlet } from "react-router-dom";

const CandidateDashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  });
  return <Outlet />;
};

export default CandidateDashboard;
