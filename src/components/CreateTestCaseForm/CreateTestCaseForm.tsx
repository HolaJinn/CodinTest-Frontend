import React, { useEffect, useState } from "react";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Form, Input, Button, Switch, Tooltip } from "antd";
import { ITestCaseRequest } from "../../modules/CompanyDashboard/models";

const { TextArea } = Input;
interface Props {
  testCaseRequest: ITestCaseRequest;
  addTestCase: any;
}

const CreateTestCaseForm = ({ testCaseRequest, addTestCase }: Props) => {
  const [form] = Form.useForm();
  const [sample, setSample] = useState(testCaseRequest.isSample);

  console.log(testCaseRequest.name);

  useEffect(() => {}, [testCaseRequest.name]);

  const onFinish = (values: any) => {
    testCaseRequest.name = values.name;
    testCaseRequest.score = values.score;
    testCaseRequest.input = values.input;
    testCaseRequest.expectedOutput = values.expectedOutput;
    testCaseRequest.isSample = sample;
    form.resetFields();
    addTestCase();
  };

  const onFinishFailed = (error: any) => {
    console.log(error);
  };

  const onSwitchChange = (change: any) => {
    setSample(change);
  };
  return (
    <Form
      form={form}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="on"
    >
      <Form.Item
        name="name"
        initialValue={testCaseRequest.name}
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
        <Input type="number" placeholder="Test case score" min={0} />
      </Form.Item>

      <Form.Item name="isSample" className="justify-center">
        <Tooltip title="Mark this test case as a sample">
          <Switch
            checkedChildren="Sample"
            unCheckedChildren="Not Sample"
            onChange={onSwitchChange}
            className="m-2"
          />
        </Tooltip>
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
      <Form.Item>
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
