import React from "react";
import "./OwnerAuth.scss";
import { useNavigate } from "react-router-dom";
import { Tabs } from "antd";
import LoginLayout from "../../layouts/CandidateLayouts/LoginLayout";
import OwnerRegistrationLayout from "../../layouts/OwnerLayouts/OwnerRegistrationLayout";

const { TabPane } = Tabs;
interface Props {
  path: string;
}
const OwnerAuth = ({ path }: Props) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="auth-container">
        <h1 className="text-5xl font-bold">CodinTest</h1>
        <h2 className="text-2xl font-bold">For Companies</h2>
        <p className="text-xl">
          Interview, identify and hire developers wherever they are.
        </p>
        <div className="tab-container">
          <Tabs
            className="text-blue-600"
            defaultActiveKey={path}
            size="large"
            type="card"
            centered
            onChange={(e) => navigate(`/owner/${e}`)}
          >
            <TabPane tab="Signup" key="signup">
              <OwnerRegistrationLayout />
            </TabPane>
            <TabPane tab="Login" key="login">
              <LoginLayout path={"company"} />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default OwnerAuth;
