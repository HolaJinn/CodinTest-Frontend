import React from "react";
import { Col, Breadcrumb, Spin, Alert, Steps } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import InitialCodeForm from "../../../components/InitialCodeForm/InitialCodeForm";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { IInitialCodeRequest } from "../models";
import { createInitialCode } from "../store/slices/createInitialCodeSlice";
import { useNavigate } from "react-router-dom";

const { Step } = Steps;

const CreateInitialCode = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const exercise = useSelector(
    (state: RootStateOrAny) => state.createExercise.exercise
  );
  const creationState = useSelector(
    (state: RootStateOrAny) => state.createInitialCode
  );

  console.log(creationState);

  const initialCodeRequest: IInitialCodeRequest = {
    exerciseId: exercise.id,
    programmingLanguage: "",
    initialCode: "",
  };

  const submitHandler = () => {
    console.log(initialCodeRequest);
    dispatch(createInitialCode(initialCodeRequest));
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="p-5 bg-gray-100">
          <Col offset={3}>
            <Breadcrumb separator=">">
              <Breadcrumb.Item href="/company/exercises">
                Exercises
              </Breadcrumb.Item>
              <Breadcrumb.Item>Create Exercise</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </div>

        <Col offset={3} span={18}>
          <div className="px-5 py-2 bg-gray-150">
            <Steps current={1} percent={60}>
              <Step title="Finished" description="Provide Details" />
              <Step title="In Progress" description="Provide Initial Code" />
              <Step title="Waiting" description="Provide Test Cases" />
            </Steps>
          </div>
          <div className="border border-current rounded shadow-xl my-5 px-12 py-4">
            <InitialCodeForm
              initialCodeRequest={initialCodeRequest}
              submitHandler={submitHandler}
            />
            {creationState.isCreating && (
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
              />
            )}
            {creationState.error && (
              <Alert type="error" message={creationState.message} />
            )}
            {creationState.success &&
              navigate("/company/create-exercise/add-test-cases")}
          </div>
        </Col>
      </div>
    </>
  );
};

export default CreateInitialCode;
