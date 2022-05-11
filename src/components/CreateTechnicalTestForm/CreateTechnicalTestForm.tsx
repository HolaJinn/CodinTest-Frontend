import { Form, Input, Button, Switch, Tooltip } from "antd";
import { CheckCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import { ITechnicalTestRequest } from "../../modules/CompanyDashboard/models";

import RichTextEditor from "react-rte";

interface Props {
  technicalTestRequest: ITechnicalTestRequest;
  submitHandler: any;
}

const CreateTechnicalTestForm = ({
  technicalTestRequest,
  submitHandler,
}: Props) => {
  const [timer, setTimer] = useState(false);
  const [timerValue, setTimerValue] = useState(0);

  const [textEditorValue, setTextEditorValue] = useState(() =>
    RichTextEditor.createEmptyValue()
  );

  const onSwitchChange = (checked: any) => {
    setTimer(checked);
  };

  const changeTimerValue = (e: any) => {
    setTimerValue(e.target.value);
  };

  const onFinish = (values: ITechnicalTestRequest) => {
    values.timerInMinute = timerValue;
    technicalTestRequest.title = values.title;
    technicalTestRequest.description = textEditorValue.toString("html");
    technicalTestRequest.timerInMinute = values.timerInMinute;
    submitHandler();
  };

  const onFinishFailed = (error: any) => {
    console.log(error);
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
                title: "Set timer for technical test",
                icon: <InfoCircleOutlined />,
              }}
            >
              <div className="my-1">
                <Tooltip
                  title="Add timer to this technical test"
                  placement="right"
                >
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
        </div>
        <Form.Item
          name="title"
          className="justify-center"
          label="Title"
          tooltip={{
            title: "Enter the title of the technical test",
            icon: <InfoCircleOutlined />,
          }}
          rules={[
            {
              required: true,
              message: "Please input the title!",
            },
          ]}
        >
          <Input placeholder="Technical Test Title" />
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

export default CreateTechnicalTestForm;
