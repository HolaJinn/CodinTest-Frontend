import { Button, Card, Popconfirm } from "antd";
import React from "react";
import { TechnicalTestItem } from "../../modules/CompanyDashboard/models";
import {
  UserOutlined,
  UnorderedListOutlined,
  ClockCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

interface Props {
  technicalTest: TechnicalTestItem;
  removeItem: any;
  inviteCandidate: any;
  showModal: any;
}

const TechnicalTestCard = ({
  technicalTest,
  removeItem,
  inviteCandidate,
  showModal,
}: Props) => {
  return (
    <div className="my-3">
      <Card
        title={technicalTest.title}
        className="border border-current rounded shadow-md my-5 px-12 py-4 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-300 cursor-pointer"
      >
        <div className="flex items-center justify-between">
          <div
            className="flex items-center justify-start w-full"
            onClick={() => {
              showModal(technicalTest.id);
            }}
          >
            <div className="flex">
              <UserOutlined style={{ fontSize: "20px" }} />
              <p className="text-md">{`${technicalTest.creator.firstName} ${technicalTest.creator.lastName}`}</p>
            </div>
            <div className="flex mx-5">
              <UnorderedListOutlined style={{ fontSize: "20px" }} />
              <p className="text-md mx-1">{`${technicalTest.exercises?.length}`}</p>
            </div>
            <div className="flex">
              <ClockCircleOutlined style={{ fontSize: "20px" }} />
              <p className="text-md mx-1">{`${technicalTest.timerInMinute} Minutes`}</p>
            </div>
          </div>
          <div className="flex items-center justify-end w-full">
            <Button icon={<EditOutlined />} />
            <Popconfirm
              title="Sure to delete this exercise"
              onConfirm={() => removeItem(technicalTest.id)}
            >
              <Button icon={<DeleteOutlined />} className="mx-3" />
            </Popconfirm>
            <Button
              icon={<UserAddOutlined />}
              onClick={() => inviteCandidate(technicalTest)}
            >
              Invite
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TechnicalTestCard;
