import React, { useEffect, useState } from "react";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Form, Input, Button, Switch, Tooltip } from "antd";
import { ITestCaseRequest } from "../../modules/CompanyDashboard/models";

const { TextArea } = Input;
interface Props {
  testCaseRequest: ITestCaseRequest;
  counter: number;
  addTestCase: any;
  handleCancel: any;
}

const CreateTestCaseForm = ({
  testCaseRequest,
  counter,
  addTestCase,
  handleCancel,
}: Props) => {
  const [form] = Form.useForm();
  const [name] = useState("#TestCase" + counter);
  const [sample, setSample] = useState(false);

  const onFinish = (values: any) => {
    testCaseRequest.name = values.name;
    testCaseRequest.score = values.score;
    testCaseRequest.input = values.input;
    testCaseRequest.expectedOutput = values.expectedOutput;
    testCaseRequest.isSample = sample;
    addTestCase();
    form.resetFields();
    handleCancel();
  };

  const onFinishFailed = (error: any) => {
    console.log(error);
  };

  const onSwitchChange = (change: any) => {
    setSample(change);
  };

  useEffect(() => {
    console.log(testCaseRequest.name);
  }, [testCaseRequest.name]);
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
        initialValue={name}
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
          className="mt-5"
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
