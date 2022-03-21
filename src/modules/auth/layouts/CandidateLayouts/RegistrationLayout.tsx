import React from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { register } from "../../store/slices/registerSlice";
import RegistrationForm from "../../../../components/RegistrationForm/RegistrationForm";
import { IRegistrationPayload } from "../../model";
import { Alert, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const RegistrationLayout = () => {
  const dispatch = useDispatch();
  const registerState = useSelector((state: RootStateOrAny) => state.register);
  const registrationForm: IRegistrationPayload = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "CANDIDATE",
  };
  const submitHandler = () => {
    console.log(registrationForm);
    dispatch(register(registrationForm));
  };
  return (
    <>
      <RegistrationForm
        registrationForm={registrationForm}
        submitHandler={submitHandler}
      />
      {registerState.registering && (
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
      )}
      {registerState.success && (
        <Alert message={registerState.message} type="success" />
      )}
      {registerState.error && (
        <Alert message={registerState.message} type="error" />
      )}
    </>
  );
};

export default RegistrationLayout;
