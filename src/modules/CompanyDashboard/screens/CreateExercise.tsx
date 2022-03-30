import { LoadingOutlined } from "@ant-design/icons";
import { Col, Breadcrumb, Spin, Alert, Steps } from "antd";
import { IExerciseRequest } from "../models";
import { ExerciseDifficulty } from "../../../models/ExerciceDifficulty";
import { ExerciseStatus } from "../../../models/ExerciseStatus";
import { createExercise } from "../store/slices/createExerciseSlice";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import CreateExerciseForm from "../../../components/CreateExerciseForm/CreateExerciseForm";
import { useNavigate } from "react-router-dom";

const { Step } = Steps;

const CreateExercise = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const creationState = useSelector(
    (state: RootStateOrAny) => state.createExercise
  );

  const exerciseRequest: IExerciseRequest = {
    title: "",
    description: "",
    difficulty: ExerciseDifficulty.EASY,
    status: ExerciseStatus.PUBLIC,
    timerInMinute: 0,
    programmingLanguage: "",
    initialCode: "",
  };

  const submitHandler = () => {
    console.log(exerciseRequest);
    dispatch(createExercise(exerciseRequest));
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="p-5 bg-gray-100">
          <Breadcrumb separator=">">
            <Breadcrumb.Item href="/company/exercises">
              Exercises
            </Breadcrumb.Item>
            <Breadcrumb.Item>Create Exercise</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="px-5 py-2 bg-gray-150">
          <Steps current={0} percent={60}>
            <Step title="In Progress" description="Provide details" />
            <Step title="Waiting" description="Provide test cases" />
            <Step title="Waiting" description="Provide Tags" />
          </Steps>
        </div>
        <Col offset={3} span={18}>
          <div className="border border-current rounded shadow-xl my-5 px-12 py-4">
            <CreateExerciseForm
              exerciseRequest={exerciseRequest}
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
              navigate("/company/create-exercise/add-test-cases")}
          </div>
        </Col>
      </div>
    </>
  );
};

export default CreateExercise;
