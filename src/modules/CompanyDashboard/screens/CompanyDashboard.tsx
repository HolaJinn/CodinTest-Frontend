import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../../auth/store/slices/userSlice";
import { Outlet } from "react-router-dom";
import { IUser } from "../../../models/User";
import { Col } from "antd";
import ShortcutInvitations from "../components/ShortcutInvitations/ShortcutInvitations";
import ShortcutExercises from "../components/ShortcutExercises/ShortcutExercises";

const CompanyDashboard = () => {
  const dispatch = useDispatch();

  const user = localStorage.getItem("user");
  console.log(JSON.parse(user!));
  const currentUser: IUser = JSON.parse(user!);
  useEffect(() => {
    dispatch(getCurrentUser());
  });
  return (
    <>
      <Outlet />
      <div className="py-5">
        <Col offset={3} span={18}>
          <h1 className="text-xl">Welcome {currentUser.firstName}</h1>
          <div className="flex items-start ">
            <div className=" mx-5 w-6/12">
              <ShortcutInvitations />
            </div>
            <div className=" mx-5 w-6/12">
              <ShortcutExercises />
            </div>
          </div>
        </Col>
      </div>
    </>
  );
};

export default CompanyDashboard;
