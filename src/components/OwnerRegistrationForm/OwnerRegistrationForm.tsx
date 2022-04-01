import { Button, Form, Input } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  BuildOutlined,
} from "@ant-design/icons";
import ReactFlagsSelect from "react-flags-select";
import { useState } from "react";
import { IOwnerRegistrationPayload } from "../../modules/auth/model";

interface Props {
  registrationForm: IOwnerRegistrationPayload;
  submitHandler: any;
}

const OwnerRegistrationForm = ({ registrationForm, submitHandler }: Props) => {
  const [selected, setSelected] = useState("TN");
  const role = "OWNER";

  const onFinish = (values: any) => {
    values.country = selected;
    registrationForm = values;
    registrationForm.role = role;
    console.log("FORM", registrationForm);
    submitHandler(registrationForm);
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

      <Form.Item
        name="companyName"
        className="justify-center"
        rules={[
          { required: true, message: "Please input your company name" },
          {
            min: 2,
            message: "Your company name should contain at least 2 characters",
          },
          {
            max: 20,
            message: "Your company name should contain less 20 chatacters",
          },
        ]}
      >
        <Input
          prefix={<BuildOutlined className="site-form-item-icon" />}
          placeholder="Company Name"
        />
      </Form.Item>

      <Form.Item
        name="roleInCompany"
        className="justify-center"
        rules={[
          { required: true, message: "Please input your role in company" },
          {
            min: 2,
            message:
              "Your role in company should contain at least 2 characters",
          },
          {
            max: 40,
            message: "Your role in company should contain less 40 chatacters",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Role in Company"
        />
      </Form.Item>

      <Form.Item name="country" className="justify-center">
        <ReactFlagsSelect
          className="countries-select"
          selected={selected}
          onSelect={(code) => {
            setSelected(code);
          }}
          searchable={true}
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

export default OwnerRegistrationForm;
