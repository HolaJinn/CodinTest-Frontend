import React from "react";
import { Breadcrumb, Button, Col } from "antd";
import { useNavigate } from "react-router-dom";

const CompanyDetailsScreen = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col">
      <div className="p-5 bg-gray-100">
        <Col offset={3}>
          <Breadcrumb separator=">">
            <Breadcrumb.Item>Company Details</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </div>
      <div className="px-5">
        <Col offset={5} span={14}>
          <div className="flex justify-end my-5">
            <Button
              size="large"
              shape="round"
              onClick={(e) => navigate("/company/recruiters")}
            >
              Show Recruiters
            </Button>
          </div>
        </Col>
      </div>
    </div>
  );
};

export default CompanyDetailsScreen;
