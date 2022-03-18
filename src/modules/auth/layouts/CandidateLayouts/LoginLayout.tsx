import { Alert, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import React, { SyntheticEvent, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import LoginForm from "../../../../components/LoginForm/LoginForm";
import { login } from "../../store/slices/authSlice";
import { ILoginPayload } from "../../model";

const LoginLayout = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const auth = useSelector((state: RootStateOrAny) => state.auth);
  const data: ILoginPayload = {
    email,
    password,
  };
  const submitHandler = async (e: SyntheticEvent) => {
    dispatch(login(data));
  };
  return (
    <>
      <LoginForm
        setEmail={setEmail}
        setPassword={setPassword}
        submitHandler={submitHandler}
      />
      {auth.error && <Alert message={auth.message} type="error" />}
      {auth.logging && (
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
      )}
    </>
  );
};

export default LoginLayout;
