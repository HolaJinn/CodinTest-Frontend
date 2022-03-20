import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Alert, Spin, Row, Col } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import { verify } from "../../modules/auth/store/slices/emailVerificationSlice";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";

const EmailVerificationPage = () => {
  const [searchParam] = useSearchParams();
  const verificationState = useSelector(
    (state: RootStateOrAny) => state.verifyEmail
  );
  const dispatch = useDispatch();

  const code = searchParam.get("code");

  useEffect(() => {
    dispatch(verify(code));
  }, [code, dispatch]);

  return (
    <>
      <Navbar />
      <Row>
        <Col offset={4} span={16} className="p-10">
          {verificationState.verifiying && (
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
            />
          )}
          {verificationState.success && (
            <Alert message={verificationState.message} type="success" />
          )}
          {verificationState.error && (
            <Alert message={verificationState.message} type="error" />
          )}
        </Col>
      </Row>
    </>
  );
};

export default EmailVerificationPage;
