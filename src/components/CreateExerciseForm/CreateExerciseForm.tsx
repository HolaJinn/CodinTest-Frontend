import React, { useState } from "react";
import { CheckCircleOutlined, StarOutlined } from "@ant-design/icons";
import { Form, Input, Button, Switch, Select } from "antd";
import { IExerciseRequest } from "../../modules/CompanyDashboard/models";
import { ExerciseDifficulty } from "../../models/ExerciceDifficulty";
import { ExerciseStatus } from "../../models/ExerciseStatus";

const { TextArea } = Input;
const { Option } = Select;

interface Props {
  exerciseRequest: IExerciseRequest;
  submitHandler: any;
}

const CreateExerciseForm = ({ exerciseRequest, submitHandler }: Props) => {
  const [timer, setTimer] = useState(false);
  const [timerValue, setTimerValue] = useState(0);
  const [language, setLanguage] = useState("Java");
  const [difficulty, setDiffulty] = useState(ExerciseDifficulty.EASY);

  const onFinish = (values: IExerciseRequest) => {
    values.timerInMinute = timerValue;
    values.programmingLanguage = language.toUpperCase();
    values.difficulty = difficulty;
    if (values.status) {
      values.status = ExerciseStatus.PUBLIC;
    } else {
      values.status = ExerciseStatus.PRIVATE;
    }
    exerciseRequest.title = values.title;
    exerciseRequest.description = values.description;
    exerciseRequest.initialCode = values.initialCode;
    exerciseRequest.programmingLanguage = values.programmingLanguage;
    exerciseRequest.difficulty = values.difficulty;
    exerciseRequest.status = values.status;
    exerciseRequest.timerInMinute = values.timerInMinute;
    submitHandler();
  };

  const onFinishFailed = (error: any) => {
    console.log(error);
  };

  const handleLanguageMenu = (value: string) => {
    setLanguage(value);
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
      <Form
        name="basic"
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
              message: "Your first name should contain at least 2 characters",
            },
            {
              max: 20,
              message: "Your first name should contain less 20 chatacters",
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
          <TextArea showCount placeholder="Exercise Description" rows={8} />
        </Form.Item>

        <div className="flex justify-around items-center">
          <div className="mx-5">
            <Form.Item name="timerInMinute">
              <div className="my-1">
                <Switch
                  checkedChildren="Timer"
                  unCheckedChildren="No Timer"
                  onChange={onSwitchChange}
                />
              </div>
              <Input
                style={{ width: 200 }}
                type="number"
                placeholder="Timer in minute"
                disabled={!timer}
                onChange={(e) => changeTimerValue(e)}
              />
            </Form.Item>
          </div>
          <div>
            <Form.Item name="status">
              <Switch checkedChildren="public" unCheckedChildren="private" />
            </Form.Item>
          </div>
        </div>
        <div className="flex justify-around items-center">
          <div>
            <Form.Item name="programmingLanguage" className="justify-center">
              <Select
                defaultValue="Java"
                style={{ width: 200 }}
                onChange={handleLanguageMenu}
              >
                <Option value="Java">Java</Option>
                <Option value="C++">C++</Option>
                <Option value="Python">Python</Option>
              </Select>
            </Form.Item>
          </div>

          <div>
            <Form.Item name="difficulty" className="justify-center">
              <Select
                defaultValue="EASY"
                style={{ width: 200 }}
                onChange={handleDifficultyMenu}
              >
                <Option value="EASY">
                  <StarOutlined /> Easy
                </Option>
                <Option value="MEDIUM">
                  <StarOutlined /> <StarOutlined /> Medium
                </Option>
                <Option value="HARD">
                  <StarOutlined /> <StarOutlined /> <StarOutlined /> Hard
                </Option>
              </Select>
            </Form.Item>
          </div>
        </div>

        <Form.Item name="initialCode" className="justify-center">
          <TextArea showCount placeholder="Initial Code" rows={5} />
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
    </>
  );
};

export default CreateExerciseForm;
