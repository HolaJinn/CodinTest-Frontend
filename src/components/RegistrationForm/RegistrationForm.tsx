import React from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { IRegistrationPayload } from "../../modules/auth/model";

interface Props {
  registrationForm: IRegistrationPayload;
  submitHandler: any;
}

const RegistrationForm = ({ registrationForm, submitHandler }: Props) => {
  const onFinish = (values: any) => {
    console.log(values);
    registrationForm.firstName = values.firstName;
    registrationForm.lastName = values.lastName;
    registrationForm.email = values.email;
    registrationForm.password = values.password;
    submitHandler();
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log(errorInfo);
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
        name="firstName"
        className="justify-center"
        rules={[
          { required: true, message: "Please input your first name!" },
          {
            min: 2,
            message: "Your first name should contain at least 2 characters",
          },
          {
            max: 20,
            message: "Your first name should contain less 20 chatacters",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="First name"
        />
      </Form.Item>

      <Form.Item
        name="lastName"
        className="justify-center"
        rules={[
          { required: true, message: "Please input your last name!" },
          {
            min: 2,
            message: "Your last name should contain at least 2 characters",
          },
          {
            max: 20,
            message: "Your last name should contain less 20 chatacters",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Last name"
        />
      </Form.Item>

      <Form.Item
        name="email"
        className="justify-center"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input
          prefix={<MailOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Form.Item>

      <Form.Item
        name="password"
        className="justify-center"
        rules={[
          { required: true, message: "Please input your password!" },
          {
            min: 6,
            message: "Your password should contain at least 6 characters",
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item
        name="confirm"
        className="justify-center"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm;
