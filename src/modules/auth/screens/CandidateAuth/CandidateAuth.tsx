import React from "react";
import "./CandidateAuth.scss";
import { useNavigate } from "react-router-dom";
import { Tabs } from "antd";
import LoginLayout from "../../layouts/CandidateLayouts/LoginLayout";
import RegistrationLayout from "../../layouts/CandidateLayouts/RegistrationLayout";

const { TabPane } = Tabs;
interface Props {
  path: string;
}
const CandidateAuth = ({ path }: Props) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="auth-container">
        <h1 className="text-5xl font-bold">CodinTest</h1>
        <h2 className="text-2xl font-bold">For Developers</h2>
        <p className="text-xl">
          Practice coding, prepare for interviews, and get hired.
        </p>
        <div className="tab-container">
          <Tabs
            className="text-blue-600"
            defaultActiveKey={path}
            size="large"
            type="card"
            centered
            onChange={(e) => navigate(`/candidate/${e}`)}
          >
            <TabPane tab="Signup" key="signup">
              <RegistrationLayout />
            </TabPane>
            <TabPane tab="Login" key="login">
              <LoginLayout />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default CandidateAuth;
