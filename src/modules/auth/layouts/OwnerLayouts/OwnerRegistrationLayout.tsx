import React from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { registerOwner } from "../../store/slices/registerOwnerSlice";
import { IOwnerRegistrationPayload } from "../../model";
import { Alert, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import OwnerRegistrationForm from "../../../../components/OwnerRegistrationForm/OwnerRegistrationForm";

const OwnerRegistrationLayout = () => {
  const dispatch = useDispatch();
  const registerState = useSelector(
    (state: RootStateOrAny) => state.registerOwner
  );
  const registrationForm: IOwnerRegistrationPayload = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "OWNER",
    companyName: "",
    roleInCompany: "",
    country: "",
  };
  const submitHandler = (registrationForm: IOwnerRegistrationPayload) => {
    dispatch(registerOwner(registrationForm));
  };
  return (
    <>
      <OwnerRegistrationForm
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

export default OwnerRegistrationLayout;
