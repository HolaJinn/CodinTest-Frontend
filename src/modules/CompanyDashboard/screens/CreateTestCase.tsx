import React from "react";
import { Row, Col, Breadcrumb, Spin, Alert } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import CreateTestCaseForm from "../../../components/CreateTestCaseForm/CreateTestCaseForm";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { ITestCaseRequest } from "../models";
import { createTestCase } from "../store/slices/createTestCaseSlice";

const CreateTestCase = () => {
  const dispatch = useDispatch();
  const exercise = useSelector(
    (state: RootStateOrAny) => state.createExercise.exercise
  );
  const creationState = useSelector(
    (state: RootStateOrAny) => state.createTestCase
  );

  const testCaseRequest: ITestCaseRequest = {
    exerciseId: exercise.id,
    name: "",
    score: 0,
    isSample: false,
    input: "",
    expectedOutput: "",
  };

  const submitHandler = () => {
    console.log(testCaseRequest);
    dispatch(createTestCase(testCaseRequest));
  };

  return (
    <Row>
      <Col offset={3} span={18}>
        <div className="flex flex-col">
          <div className="my-5">
            <Breadcrumb separator=">">
              <Breadcrumb.Item href="/company/exercises">
                Exercises
              </Breadcrumb.Item>
              <Breadcrumb.Item>Create Exercise</Breadcrumb.Item>
              <Breadcrumb.Item>Add Test Cases</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="flex justify-center">
            <h1 className="text-3xl text-bold">Create Test Cases</h1>
          </div>
          <Col offset={3} span={18}>
            <div className="border border-current rounded shadow-xl px-12 py-4">
              <CreateTestCaseForm
                testCaseRequest={testCaseRequest}
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
            </div>
          </Col>
        </div>
      </Col>
    </Row>
  );
};

export default CreateTestCase;
