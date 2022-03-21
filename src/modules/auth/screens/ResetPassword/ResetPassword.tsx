import React, { useState } from "react";
import { Alert, Button, Form, Input, Spin } from "antd";
import { LockOutlined, LoadingOutlined } from "@ant-design/icons";
import "./ResetPassword.scss";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { reset } from "../../store/slices/resetPasswordSlice";

const ResetPassword = () => {
  const [newPassword] = useState("");

  const dispatch = useDispatch();
  const resetPasswordState = useSelector(
    (state: RootStateOrAny) => state.resetPassword
  );

  const [searchParam] = useSearchParams();
  const token = searchParam.get("token");

  const request = {
    newPasswordRequest: {
      newPassword,
    },
    token,
  };

  const onFinish = (values: any) => {
    console.log(values);
    request.newPasswordRequest.newPassword = values.password;
    console.log(request);
    dispatch(reset(request));
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log(errorInfo);
  };

  return (
    <div className="reset-password-container">
      <h1 className="text-5xl font-bold">CodinTest</h1>
      <p className="text-xl">
        Please enter your new password. Make sure that you confirm it correctly.
      </p>
      <div className="reset-password-section">
        <h2 className="text-3xl font-bold py-2">reset your password</h2>
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
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Confirm Password"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        {resetPasswordState.verifiying && (
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        )}
        {resetPasswordState.success && (
          <Alert message={resetPasswordState.message} type="success" />
        )}
        {resetPasswordState.error && (
          <Alert message={resetPasswordState.message} type="error" />
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
