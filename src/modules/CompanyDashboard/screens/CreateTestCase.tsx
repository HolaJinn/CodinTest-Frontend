import React, { useEffect, useState } from "react";
import {
  Col,
  Breadcrumb,
  Spin,
  Alert,
  Steps,
  Table,
  Space,
  Button,
  Modal,
  Popconfirm,
} from "antd";
import {
  LoadingOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import CreateTestCaseForm from "../../../components/CreateTestCaseForm/CreateTestCaseForm";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { ITestCaseRequest } from "../models";
import { createTestCase } from "../store/slices/createTestCaseSlice";
import { useNavigate } from "react-router-dom";

const { Step } = Steps;

interface TestCaseItem {
  key: React.Key;
  exerciseId: number;
  name: String;
  score: Number;
  isSample: Boolean;
  input: String;
  expectedOutput: String;
}

const CreateTestCase = () => {
  const [testCaseName, setTestCaseName] = useState("#TestCase0");
  const [counter, setCounter] = useState(0);
  const [list, setList] = useState<TestCaseItem[]>([]);
  const [testCases, setTestCases] = useState<ITestCaseRequest[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const exercise = useSelector(
    (state: RootStateOrAny) => state.createExercise.exercise
  );
  const creationState = useSelector(
    (state: RootStateOrAny) => state.createTestCase
  );
  const navigate = useNavigate();

  const testCaseRequest: ITestCaseRequest = {
    exerciseId: exercise.id,
    name: testCaseName,
    score: 0,
    isSample: false,
    input: "",
    expectedOutput: "",
  };

  useEffect(() => {}, [testCaseName]);

  const addTestCase = () => {
    const newTest: TestCaseItem = {
      key: list.length + 1,
      exerciseId: testCaseRequest.exerciseId,
      name: testCaseRequest.name,
      score: testCaseRequest.score,
      isSample: testCaseRequest.isSample,
      input: testCaseRequest.input,
      expectedOutput: testCaseRequest.expectedOutput,
    };
    setList([...list, newTest]);
    const newRequest: ITestCaseRequest = testCaseRequest;
    setTestCases([...testCases, newRequest]);
    setCounter((prev) => prev + 1);
    setTestCaseName("#TestCase" + counter.toString());
    console.log(testCaseName);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const removeItem = (key: React.Key) => {
    setList(list.filter((item) => item.key !== key));
    setCounter((prev) => prev - 1);
    setTestCaseName("#TestCase" + counter.toString());
  };

  const saveTestCases = () => {
    testCases.map((testCase) => dispatch(createTestCase(testCase)));
    navigate("/company/exercises");
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
    },
    {
      title: "Input",
      dataIndex: "input",
      key: "input",
    },
    {
      title: "Expected Output",
      dataIndex: "expectedOutput",
      key: "expectedOutput",
    },
    {
      title: "Is Sample",
      dataIndex: "isSample",
      key: "isSample",
      render: (text: boolean) => (text ? <p>Yes</p> : <p>No</p>),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: { key: React.Key }) => (
        <Space size="middle">
          <Popconfirm
            title="Sure to delete this test case?"
            onConfirm={() => removeItem(record.key)}
          >
            <Button icon={<DeleteOutlined />}>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="p-5 bg-gray-100">
        <Col offset={3}>
          <Breadcrumb separator=">">
            <Breadcrumb.Item href="/company/exercises">
              Exercises
            </Breadcrumb.Item>
            <Breadcrumb.Item>Create Exercise</Breadcrumb.Item>
            <Breadcrumb.Item>Add Test Cases</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </div>

      <Col offset={3} span={18}>
        <div className="px-5 py-2 bg-gray-150">
          <Steps current={2} percent={60}>
            <Step title="Finished" description="Provide Details" />
            <Step title="Finished" description="Provide Initial Code" />
            <Step title="In Progress" description="Provide Test Cases" />
          </Steps>
        </div>
        <div className="border border-current rounded shadow-xl px-12 py-4 my-5">
          <Table columns={columns} dataSource={list} />
          <div>
            <Button
              shape="round"
              size="large"
              type="ghost"
              htmlType="submit"
              icon={<CheckCircleOutlined />}
              onClick={() => saveTestCases()}
            >
              Save Exercise
            </Button>
            <p className="mx-2 inline">Or</p>
            <Button
              shape="round"
              size="large"
              type="ghost"
              htmlType="submit"
              icon={<CheckCircleOutlined />}
              onClick={showModal}
            >
              Add Another Test Case
            </Button>
            <Modal
              title="Add test case"
              visible={isModalVisible}
              onCancel={handleCancel}
              footer={[
                <Button key="cancel" onClick={handleCancel}>
                  Cancel
                </Button>,
              ]}
            >
              <CreateTestCaseForm
                testCaseRequest={testCaseRequest}
                addTestCase={addTestCase}
              />
            </Modal>
          </div>
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
  );
};

export default CreateTestCase;
