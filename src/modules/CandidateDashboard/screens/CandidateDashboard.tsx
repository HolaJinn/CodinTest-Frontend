import React, { useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../auth/store/slices/userSlice";
import { Outlet } from "react-router-dom";
import { Col, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import ShortcutInvitations from "../components/ShortcutInvitations/ShortcutInvitations";
import ShortcutExercises from "../components/ShortcutExercises/ShortcutExercises";

const CandidateDashboard = () => {
  const dispatch = useDispatch();
  const userSelector = useSelector((state: RootStateOrAny) => state.user);

  // const user = localStorage.getItem("user");
  // console.log(JSON.parse(user!));
  // const currentUser: IUser = JSON.parse(user!);
  const cUser = userSelector.user;
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
  if (userSelector.isLoading) {
    return (
      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
    );
  }
  return (
    <>
      <Outlet />
      {!userSelector.isLoading && userSelector.success && (
        <div className="py-5">
          <Col offset={3} span={18}>
            <h1 className="text-xl">Welcome {cUser.firstName}</h1>
            <div className="flex items-start my-5">
              <div className=" mx-5 w-6/12">
                <ShortcutInvitations />
              </div>
              <div className=" mx-5 w-6/12">
                <ShortcutExercises />
              </div>
            </div>
          </Col>
        </div>
      )}
    </>
  );
};

export default CandidateDashboard;
