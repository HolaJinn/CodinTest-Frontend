import { LoadingOutlined } from "@ant-design/icons";
import { Col, Breadcrumb, Spin, Alert, Steps } from "antd";
import { IExerciseRequest } from "../models";
import { ExerciseDifficulty } from "../../../models/ExerciceDifficulty";
import { ExerciseStatus } from "../../../models/ExerciseStatus";
import { createExercise } from "../store/slices/createExerciseSlice";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import CreateExerciseForm from "../../../components/CreateExerciseForm/CreateExerciseForm";
import { useNavigate } from "react-router-dom";
import { fetchProgrammingLanguages } from "../../../store/slices/programmingLanguageSlice";

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
    tags: [],
  };

  const submitHandler = () => {
    console.log(exerciseRequest);
    dispatch(createExercise(exerciseRequest));
    dispatch(fetchProgrammingLanguages());
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="p-5 bg-gray-100">
          <Col offset={3}>
            <Breadcrumb separator=">">
              <Breadcrumb.Item href="/company/exercises">
                Exercises
              </Breadcrumb.Item>
              <Breadcrumb.Item>Create Exercise</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </div>

        <Col offset={3} span={18}>
          <div className="px-5 py-2 bg-gray-150">
            <Steps current={0} percent={60}>
              <Step title="In Progress" description="Provide Details" />
              <Step title="Waiting" description="Provide Initial Code" />
              <Step title="Waiting" description="Provide Test Cases" />
            </Steps>
          </div>
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
              navigate("/company/create-exercise/initial-code")}
          </div>
        </Col>
      </div>
    </>
  );
};

export default CreateExercise;
