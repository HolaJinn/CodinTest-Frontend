import React, { useState } from "react";
import { CheckCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Form, Input, Button, DatePicker, TimePicker } from "antd";
import moment from "moment";
import { IInvitationRequest } from "../../modules/CompanyDashboard/models";

const { TextArea } = Input;

interface Props {
  invitationRequest: IInvitationRequest;
  submitHandler: any;
}

const InvitationForm = ({ invitationRequest, submitHandler }: Props) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const onDateChange = (date: any) => {
    const dateString = moment(date).format("YYYY-MM-DD");
    setDate(dateString);
  };

  const onTimeChange = (time: any) => {
    const timeString = moment(time).format("HH:mm:ss");
    setTime(timeString);
  };
  const onFinish = (values: any) => {
    console.log(values);
    invitationRequest.expirationDate = date + "T" + time;
    invitationRequest.subject = values.subject;
    invitationRequest.candidateEmail = values.candidateEmail;
    invitationRequest.content = values.content;
    submitHandler();
  };
  const onFinishFailed = () => {};
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
        <div className="flex">
          <div className="mr-5">
            <Form.Item
              name="date"
              className="justify-center"
              label="Expiration Date"
              required
              tooltip={{
                title: "Enter the invitation's expiration date",
                icon: <InfoCircleOutlined />,
              }}
            >
              <>
                <DatePicker
                  style={{ width: "300px" }}
                  onChange={onDateChange}
                />
              </>
            </Form.Item>
          </div>
          <div>
            <Form.Item
              name="time"
              className="justify-center"
              label="Expiration Time"
              required
              tooltip={{
                title: "Enter the invitation's expiration time",
                icon: <InfoCircleOutlined />,
              }}
            >
              <TimePicker style={{ width: "300px" }} onChange={onTimeChange} />
            </Form.Item>
          </div>
        </div>
        <Form.Item
          name="candidateEmail"
          className="justify-center"
          label="Canidate Email"
          tooltip={{
            title: "Enter the candidate's email",
            icon: <InfoCircleOutlined />,
          }}
          rules={[
            {
              required: true,
              message: "Please input the candidate email!",
            },
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
          ]}
        >
          <Input placeholder="Candidate email" />
        </Form.Item>
        <Form.Item
          name="subject"
          className="justify-center"
          label="Subject"
          initialValue={invitationRequest.subject}
          tooltip={{
            title: "Enter the subejct of the invitation",
            icon: <InfoCircleOutlined />,
          }}
          rules={[
            {
              required: true,
              message: "Please input the subject!",
            },
          ]}
        >
          <Input placeholder="Invitation subject" />
        </Form.Item>

        <Form.Item
          name="content"
          className="justify-center"
          label="Content"
          tooltip={{
            title: "Enter the content of the invitation",
            icon: <InfoCircleOutlined />,
          }}
          rules={[
            {
              required: true,
              message: "Please input the content of the invitation!",
            },
          ]}
        >
          <TextArea showCount placeholder="Invitation content" rows={8} />
        </Form.Item>
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

export default InvitationForm;
