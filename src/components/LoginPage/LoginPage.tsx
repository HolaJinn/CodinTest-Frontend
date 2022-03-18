import React from "react";
import Navbar from "../Navbar/Navbar";
import "./LoginPage.scss";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "antd";

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <Row>
        <Col offset={4} span={24}>
          <div className="flex flex-col justify-center items-center py-10 w-9/12">
            <h1 className="text-5xl font-bold">
              The largest community of developers and companies.
            </h1>
            <div className="info-section">
              <div className="info-item">
                <h2 className="text-2xl font-bold">For Companies</h2>
                <p className="w-9/12">
                  Use our platform to interview, identify and hire developers
                  wherever they are.
                </p>
                <button
                  className="btn"
                  onClick={(e) => navigate("/owner/login")}
                >
                  Login
                </button>
              </div>
              <div className="info-item">
                <h2 className="text-2xl font-bold">For Developers</h2>
                <p>
                  Join the largest developers community to practise coding
                  skills, prepare for job interviews and get hired.
                </p>
                <button
                  className="btn"
                  onClick={(e) => navigate("/candidate/login")}
                >
                  Login
                </button>
              </div>
            </div>
            <br />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default LoginPage;
