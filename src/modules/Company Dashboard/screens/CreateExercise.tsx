import React, { useState } from "react";
import {
  CheckCircleOutlined,
  StarOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  Row,
  Col,
  Breadcrumb,
  Form,
  Input,
  Button,
  Menu,
  Switch,
  Spin,
  Alert,
} from "antd";
import { IExerciseRequest } from "../models";
import { ExerciseDifficulty } from "../../../models/ExerciceDifficulty";
import { ExerciseStatus } from "../../../models/ExerciseStatus";
import { createExercise } from "../store/slices/createExerciseSlice";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";

const { SubMenu } = Menu;
const { TextArea } = Input;

const CreateExercise = () => {
  const [timer, setTimer] = useState(false);
  const [timerValue, setTimerValue] = useState(0);
  const [language, setLanguage] = useState("Java");
  const [difficulty, setDiffulty] = useState(ExerciseDifficulty.EASY);
  const dispatch = useDispatch();
  const creationState = useSelector(
    (state: RootStateOrAny) => state.createExercise
  );

  const onFinish = (values: IExerciseRequest) => {
    values.timerInMinute = timerValue;
    values.programmingLanguage = language.toUpperCase();
    values.difficulty = difficulty;
    if (values.status) {
      values.status = ExerciseStatus.PUBLIC;
    } else {
      values.status = ExerciseStatus.PRIVATE;
    }
    console.log(values);
    dispatch(createExercise(values));
  };

  const onFinishFailed = (error: any) => {
    console.log(error);
  };

  const handleLanguageMenu = (e: any) => {
    setLanguage(e.key);
  };

  const changeTimerValue = (e: any) => {
    setTimerValue(e.target.value);
  };

  const handleDifficultyMenu = (e: any) => {
    setDiffulty(e.key);
  };

  const onSwitchChange = (checked: any) => {
    setTimer(checked);
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
              <div className="border border-current rounded shadow-lg px-12 py-4">
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
                    name="title"
                    className="justify-center"
                    rules={[
                      {
                        required: true,
                        message: "Please input the title!",
                      },
                      {
                        min: 2,
                        message:
                          "Your first name should contain at least 2 characters",
                      },
                      {
                        max: 20,
                        message:
                          "Your first name should contain less 20 chatacters",
                      },
                    ]}
                  >
                    <Input placeholder="Exercise Title" />
                  </Form.Item>

                  <Form.Item
                    name="description"
                    className="justify-center"
                    rules={[
                      {
                        required: true,
                        message: "Please input the exercise description!",
                      },
                    ]}
                  >
                    <TextArea showCount placeholder="Exercise Description" />
                  </Form.Item>

                  <div className="w-10/12 flex justify-center items-center">
                    <Form.Item name="timerInMinute" className="justify-center">
                      <Switch
                        checkedChildren="Timer"
                        unCheckedChildren="No Timer"
                        onChange={onSwitchChange}
                        className="m-2"
                      />
                      <Input
                        type="number"
                        placeholder="Timer in minute"
                        disabled={!timer}
                        className="m-5"
                        onChange={(e) => changeTimerValue(e)}
                      />
                    </Form.Item>
                    <Form.Item name="status" className="justify-center">
                      <Switch
                        checkedChildren="public"
                        unCheckedChildren="private"
                      />
                    </Form.Item>
                  </div>
                  <div className="w-full flex justify-between items-center">
                    <div className="w-full">
                      <Form.Item
                        name="programmingLanguage"
                        className="justify-center"
                      >
                        <Menu
                          onClick={handleLanguageMenu}
                          defaultSelectedKeys={["Java"]}
                          mode="vertical"
                        >
                          <SubMenu title={language} key="sub1">
                            <Menu.Item key="Java">Java</Menu.Item>
                            <Menu.Item key="C++">C++</Menu.Item>
                          </SubMenu>
                        </Menu>
                      </Form.Item>
                    </div>

                    <div className="w-full">
                      <Form.Item name="difficulty" className="justify-center">
                        <Menu
                          onClick={handleDifficultyMenu}
                          defaultSelectedKeys={[difficulty]}
                          mode="vertical"
                        >
                          <SubMenu title={difficulty} key="sub2">
                            <Menu.Item
                              key="EASY"
                              icon={
                                <>
                                  <StarOutlined />
                                </>
                              }
                            >
                              Easy
                            </Menu.Item>
                            <Menu.Item
                              key="MEDIUM"
                              icon={
                                <>
                                  <StarOutlined /> <StarOutlined />
                                </>
                              }
                            >
                              Medium
                            </Menu.Item>
                            <Menu.Item
                              key="HARD"
                              icon={
                                <>
                                  <StarOutlined /> <StarOutlined />{" "}
                                  <StarOutlined />
                                </>
                              }
                            >
                              Hard
                            </Menu.Item>
                          </SubMenu>
                        </Menu>
                      </Form.Item>
                    </div>
                  </div>

                  <Form.Item name="initialCode" className="justify-center">
                    <TextArea showCount placeholder="Initial Code" />
                  </Form.Item>

                  <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                    <Button
                      size="large"
                      type="ghost"
                      htmlType="submit"
                      icon={<CheckCircleOutlined />}
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
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
              </div>
            </Col>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default CreateExercise;
