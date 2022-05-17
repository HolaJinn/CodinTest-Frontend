import React from "react";
import { Alert, Breadcrumb, Col, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import InvitationForm from "../../../components/InvitationForm/InvitationForm";
import { IInvitationRequest, TechnicalTestItem } from "../models";
import { createInvitation } from "../store/slices/createInvitationSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";

const CreateInvitation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isCreating, error, message } = useSelector(
    (state: RootStateOrAny) => state.createInvitation
  );

  const technicalTest: TechnicalTestItem = JSON.parse(
    localStorage.getItem("technicalTest")!
  );

  const candidateEmail: string = localStorage.getItem("wantToInvite")!;

  const invitationRequest: IInvitationRequest = {
    technicalTestId: technicalTest.id,
    candidateEmail: candidateEmail,
    expirationDate: "",
    subject: technicalTest.title,
    content: "",
  };

  const submitHandler = () => {
    dispatch(createInvitation(invitationRequest));
    localStorage.removeItem("technicalTest");
    localStorage.removeItem("wantToInvite");
    navigate("/company/invitations");
  };

  return (
    <div className="flex flex-col">
      <div className="p-5 bg-gray-100">
        <Col offset={3}>
          <Breadcrumb separator=">">
            <Breadcrumb.Item href="/company/technical-tests">
              Tests
            </Breadcrumb.Item>
            <Breadcrumb.Item>Invite Candidate</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-bold text-2xl mt-3">{technicalTest.title}</h1>
        <div className="border border-current rounded shadow-xl my-5 px-12 py-4 w-8/12">
          <InvitationForm
            invitationRequest={invitationRequest}
            submitHandler={submitHandler}
          />
          {isCreating && (
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
            />
          )}
          {error && <Alert type="error" message={message} />}
        </div>
      </div>
    </div>
  );
};

export default CreateInvitation;
