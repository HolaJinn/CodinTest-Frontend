import React, { useState } from "react";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Form, Input, Button, Switch } from "antd";
import { ITestCaseRequest } from "../../modules/CompanyDashboard/models";

const { TextArea } = Input;

interface Props {
  testCaseRequest: ITestCaseRequest;
  submitHandler: any;
}

const CreateTestCaseForm = ({ testCaseRequest, submitHandler }: Props) => {
  const [sample, setSample] = useState(testCaseRequest.isSample);
  const onFinish = (values: ITestCaseRequest) => {
    console.log(values);
    testCaseRequest.name = values.name;
    testCaseRequest.score = values.score;
    testCaseRequest.input = values.input;
    testCaseRequest.expectedOutput = values.expectedOutput;
    testCaseRequest.isSample = sample;
    submitHandler();
  };

  const onFinishFailed = (error: any) => {
    console.log(error);
  };

  const onSwitchChange = (change: any) => {
    setSample(change);
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="on"
    >
      <Form.Item
        name="name"
        className="justify-center"
        rules={[
          {
            required: true,
            message: "Please input the test case name",
          },
        ]}
      >
        <Input placeholder="Test case name" />
      </Form.Item>

      <Form.Item name="score" className="justify-center">
        <Input type="number" placeholder="Test case score" />
      </Form.Item>

      <Form.Item name="isSample" className="justify-center">
        <Switch
          checkedChildren="Sample"
          unCheckedChildren="Not Sample"
          onChange={onSwitchChange}
          className="m-2"
        />
      </Form.Item>

      <Form.Item
        name="input"
        className="justify-center"
        rules={[
          {
            required: true,
            message: "Input cases are required",
          },
        ]}
      >
        <TextArea placeholder="Input to be tested" showCount />
      </Form.Item>

      <Form.Item
        name="expectedOutput"
        className="justify-center"
        rules={[
          {
            required: true,
            message: "Expected output is required",
          },
        ]}
      >
        <TextArea placeholder="Expected output is required" showCount />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
        <Button
          size="large"
          type="ghost"
          htmlType="submit"
          icon={<CheckCircleOutlined />}
        >
          Create
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateTestCaseForm;
