import React from "react";
import { Alert, Breadcrumb, Col, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import AddNewRecruiterForm from "../../../components/AddNewRecruiterForm/AddNewRecruiterForm";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IRecruiterRegisterRequest } from "../models";
import { addRecruiter } from "../store/slices/addRecruiterSlice";

const AddRecruiter = () => {
  const dispatch = useDispatch();
  const creationState = useSelector(
    (state: RootStateOrAny) => state.addRecruiter
  );
  const navigate = useNavigate();

  const recruiterRequest: IRecruiterRegisterRequest = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "RECRUITER",
    roleInCompany: "",
  };

  const submitHandler = () => {
    console.log(recruiterRequest);
    dispatch(addRecruiter(recruiterRequest));
  };
  return (
    <div className="flex flex-col">
      <div className="p-5 bg-gray-100">
        <Col offset={3}>
          <Breadcrumb separator=">">
            <Breadcrumb.Item href="/company/details">
              Company Details
            </Breadcrumb.Item>
            <Breadcrumb.Item href="/company/recruiters">
              Recruiters
            </Breadcrumb.Item>
            <Breadcrumb.Item>Add Recruiter</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </div>
      <Col offset={3} span={18}>
        <p className="text-xl font-bold">
          Please fill in the form with the new recruiters informations
        </p>
        <div className="border border-current rounded shadow-xl my-5 px-12 py-4  items-center ">
          <AddNewRecruiterForm
            recruiterRequest={recruiterRequest}
            submitHandler={submitHandler}
          />
          {creationState.isAdding && (
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
            />
          )}
          {creationState.error && (
            <Alert type="error" message={creationState.message} />
          )}
          {creationState.success && navigate("/company/recruiters")}
        </div>
      </Col>
    </div>
  );
};

export default AddRecruiter;
