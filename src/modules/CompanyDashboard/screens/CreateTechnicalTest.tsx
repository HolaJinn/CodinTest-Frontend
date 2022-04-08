import { Col, Breadcrumb, Spin, Alert, Steps } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import CreateTechnicalTestForm from "../../../components/CreateTechnicalTestForm/CreateTechnicalTestForm";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { ITechnicalTestRequest } from "../models";
import { createTechnicalTest } from "../store/slices/createTechnicalTestSlice";

const { Step } = Steps;

const CreateTechnicalTest = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const creationState = useSelector(
    (state: RootStateOrAny) => state.createTechnicalTest
  );

  const technicalTestRequest: ITechnicalTestRequest = {
    title: "",
    description: "",
    timerInMinute: 0,
  };

  const submitHandler = () => {
    console.log(technicalTestRequest);
    dispatch(createTechnicalTest(technicalTestRequest));
  };

  return (
    <div className="flex flex-col">
      <div className="p-5 bg-gray-100">
        <Col offset={3}>
          <Breadcrumb separator=">">
            <Breadcrumb.Item href="/company/technical-tests">
              Technical Tests
            </Breadcrumb.Item>
            <Breadcrumb.Item>Create Technical Test</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </div>
      <Col offset={3} span={18}>
        <div className="px-5 py-2 bg-gray-150">
          <Steps current={0} percent={60}>
            <Step title="In Progress" description="Provide details" />
            <Step title="Waiting" description="Provide exercises" />
          </Steps>
        </div>
        <div className="border border-current rounded shadow-xl my-5 px-12 py-4">
          <CreateTechnicalTestForm
            technicalTestRequest={technicalTestRequest}
            submitHandler={submitHandler}
          />
          {creationState.isCreating && (
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
            />
          )}
          {creationState.error && (
            <Alert type="error" message={creationState.message} />
          )}
          {creationState.success &&
            navigate("/company/create-technical-test/add-exercises")}
        </div>
      </Col>
    </div>
  );
};

export default CreateTechnicalTest;
