import { LoadingOutlined } from "@ant-design/icons";
import { Row, Col, Breadcrumb, Spin, Alert } from "antd";
import { IExerciseRequest } from "../models";
import { ExerciseDifficulty } from "../../../models/ExerciceDifficulty";
import { ExerciseStatus } from "../../../models/ExerciseStatus";
import { createExercise } from "../store/slices/createExerciseSlice";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import CreateExerciseForm from "../../../components/CreateExerciseForm/CreateExerciseForm";
import { useNavigate } from "react-router-dom";

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
      <Row>
        <Col span={18} offset={3}>
          <div className="flex flex-col">
            <div className="my-5">
              <Breadcrumb separator=">">
                <Breadcrumb.Item href="/company/exercises">
                  Exercises
                </Breadcrumb.Item>
                <Breadcrumb.Item>Create Exercise</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div className="flex justify-center">
              <h1 className="text-3xl text-bold">Create New Exercise</h1>
            </div>
            <Col offset={3} span={18}>
              <div className="border border-current rounded shadow-xl px-12 py-4">
                <CreateExerciseForm
                  exerciseRequest={exerciseRequest}
                  submitHandler={submitHandler}
                />
                {creationState.isCreating && (
                  <Spin
                    indicator={
                      <LoadingOutlined style={{ fontSize: 24 }} spin />
                    }
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
        </Col>
      </Row>
    </>
  );
};

export default CreateExercise;
