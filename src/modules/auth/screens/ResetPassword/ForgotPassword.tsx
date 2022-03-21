import { Alert, Button, Form, Input, Spin } from "antd";
import React from "react";
import "./ForgotPassword.scss";
import { MailOutlined, LoadingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { verify } from "../../store/slices/emailVerificationSlice";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const verificationState = useSelector(
    (state: RootStateOrAny) => state.verifyEmail
  );

  const onFinish = (values: any) => {
    console.log(values);
    dispatch(verify(values));
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log(errorInfo);
  };
  return (
    <div className="forgot-password-container">
      <h1 className="text-5xl font-bold">CodinTest</h1>
      <p className="text-xl">
        Please enter your email. A verification link will be sent to you.
      </p>
      <div className="forgot-password-section">
        <h2 className="text-3xl font-bold py-2">verify your email</h2>
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

          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>

        {verificationState.verifiying && (
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        )}
        {verificationState.success && (
          <Alert message={verificationState.message} type="success" />
        )}
        {verificationState.error && (
          <Alert message={verificationState.message} type="error" />
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
