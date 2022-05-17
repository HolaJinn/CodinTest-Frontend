import React, { useEffect, useState } from "react";
import {
  CheckCircleOutlined,
  StarOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Form, Input, Button, Switch, Select, Tooltip } from "antd";
import { IExerciseRequest } from "../../modules/CompanyDashboard/models";
import { ExerciseDifficulty } from "../../models/ExerciceDifficulty";
import { ExerciseStatus } from "../../models/ExerciseStatus";
import { getAllTagsService } from "../../modules/CompanyDashboard/services/dashboardServices";

import RichTextEditor from "react-rte";

const { Option } = Select;

interface Props {
  exerciseRequest: IExerciseRequest;
  submitHandler: any;
}

const CreateExerciseForm = ({ exerciseRequest, submitHandler }: Props) => {
  const [timer, setTimer] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [timerValue, setTimerValue] = useState(0);
  const [difficulty, setDifficulty] = useState(ExerciseDifficulty.EASY);
  const [tags, setTags] = useState([]);

  const [textEditorValue, setTextEditorValue] = useState(() =>
    RichTextEditor.createEmptyValue()
  );

  const children: any[] = [];

  tags.map((tag: any) => {
    return children.push(<Option key={tag.id}>{tag.name}</Option>);
  });

  useEffect(() => {
    getAllTagsService().then((response) => setTags(response.data));
  });

  const onFinish = (values: IExerciseRequest) => {
    values.timerInMinute = timerValue;
    values.difficulty = difficulty;
    if (isPublic) {
      values.status = ExerciseStatus.PUBLIC;
    } else {
      values.status = ExerciseStatus.PRIVATE;
    }
    exerciseRequest.title = values.title;
    exerciseRequest.description = textEditorValue.toString("html");
    exerciseRequest.difficulty = values.difficulty;
    exerciseRequest.status = values.status;
    exerciseRequest.timerInMinute = values.timerInMinute;
    exerciseRequest.tags = values.tags;
    submitHandler();
  };

  const onFinishFailed = (error: any) => {
    console.log(error);
  };
  const changeTimerValue = (e: any) => {
    setTimerValue(e.target.value);
  };

  const handleDifficultyMenu = (e: any) => {
    console.log(e);
    setDifficulty(e);
  };

  const onSwitchChange = (checked: any) => {
    setTimer(checked);
  };

  const onStatusSwitchChange = (checked: any) => {
    setIsPublic(checked);
  };

  const handleTagChange = (value: any) => {
    console.log(value);
  };

  const handleChange = (value: any) => {
    setTextEditorValue(value);
  };

  return (
    <>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
        requiredMark="optional"
        layout="vertical"
      >
        <div className="flex justify-start">
          <div className="mr-10">
            <Form.Item
              name="timerInMinute"
              label="Timer"
              tooltip={{
                title: "Set timer for exercise",
                icon: <InfoCircleOutlined />,
              }}
            >
              <div className="my-1">
                <Tooltip title="Add timer to this exercise" placement="right">
                  <Switch
                    checkedChildren="Timer"
                    unCheckedChildren="No Timer"
                    onChange={onSwitchChange}
                  />
                </Tooltip>
              </div>
              <div className="flex items-center justify-center">
                <Input
                  style={{ width: 150 }}
                  type="number"
                  placeholder="Timer in minute"
                  disabled={!timer}
                  onChange={(e) => changeTimerValue(e)}
                  min={0}
                />
                <h2 className="ml-2">Minutes</h2>
              </div>
            </Form.Item>
          </div>
          <div>
            <Form.Item
              name="status"
              label="Exercise Status"
              tooltip={{
                title: "Set the status of this exercise",
                icon: <InfoCircleOutlined />,
              }}
            >
              <Tooltip
                title="Make this exercise public to everyone"
                placement="left"
              >
                <Switch
                  checkedChildren="public"
                  unCheckedChildren="private"
                  onChange={onStatusSwitchChange}
                />
              </Tooltip>
            </Form.Item>
          </div>
        </div>
        <div className="flex justify-start">
          <div className="w-5/12 mr-10">
            <Form.Item
              name="tags"
              label="Tags"
              tooltip={{
                title: "Choose tags for the exercise",
                icon: <InfoCircleOutlined />,
              }}
            >
              <Select
                showSearch
                mode="multiple"
                allowClear
                placeholder="Please select Tags"
                onChange={handleTagChange}
                optionFilterProp="children"
                filterOption={(input, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {children}
              </Select>
            </Form.Item>
          </div>
          <div>
            <Form.Item
              name="difficulty"
              className="justify-center"
              label="Difficulty"
              tooltip={{
                title: "Set the diffuculty of this exercise",
                icon: <InfoCircleOutlined />,
              }}
            >
              <Select
                defaultValue="Easy"
                style={{ width: 200 }}
                onChange={handleDifficultyMenu}
              >
                <Option value="Easy">
                  <StarOutlined /> Easy
                </Option>
                <Option value="Medium">
                  <StarOutlined /> <StarOutlined /> Medium
                </Option>
                <Option value="Hard">
                  <StarOutlined /> <StarOutlined /> <StarOutlined /> Hard
                </Option>
              </Select>
            </Form.Item>
          </div>
        </div>

        <Form.Item
          name="title"
          className="justify-center"
          label="Title"
          tooltip={{
            title: "Enter the title of the exercise",
            icon: <InfoCircleOutlined />,
          }}
          rules={[
            {
              required: true,
              message: "Please input the title!",
            },
          ]}
        >
          <Input placeholder="Exercise Title" />
        </Form.Item>
        <label
          title="Description"
          className="ant-form-item-required ant-form-item-required-mark-optional"
        >
          Description
        </label>
        <RichTextEditor value={textEditorValue} onChange={handleChange} />

        <Form.Item>
          <Button
            className="mt-5"
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
