import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../../auth/store/slices/userSlice";

const CandidateDashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  });
  return <Navbar />;
};

export default CandidateDashboard;
