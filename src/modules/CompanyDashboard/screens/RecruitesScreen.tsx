import React from "react";
import { Breadcrumb, Button, Col } from "antd";
import { FileAddOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const RecruitesScreen = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col">
      <div className="p-5 bg-gray-100">
        <Col offset={3}>
          <Breadcrumb separator=">">
            <Breadcrumb.Item href="/company/details">
              Company Details
            </Breadcrumb.Item>
            <Breadcrumb.Item>Recruiters</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </div>
      <div className="px-5">
        <Col offset={5} span={14}>
          <div className="flex justify-end my-5">
            <Button
              size="large"
              shape="round"
              icon={<FileAddOutlined />}
              onClick={(e) => navigate("/company/add-recruiter")}
            >
              Add new recruiter
            </Button>
          </div>
        </Col>
      </div>
    </div>
  );
};

export default RecruitesScreen;
