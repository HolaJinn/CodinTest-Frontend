import React from "react";
import { Button, Card } from "antd";
import { IInvitationItem } from "../../modules/CandidateDashboard/models";
import {
  UserOutlined,
  HomeOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";

interface Props {
  invitation: IInvitationItem;
}
const InvitationCard = ({ invitation }: Props) => {
  return (
    <div className="my-3">
      <Card
        title={invitation.subject}
        className="border border-current rounded shadow-md my-5 px-12 py-4 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-300 cursor-pointer"
      >
        <div className="flex item-center justify-between">
          <div className="flex itm-center justify-start">
            <div className="flex">
              <UserOutlined style={{ fontSize: "20px" }} />
              <p className="text-md mx-2">{`${invitation.invitedBy.firstName} ${invitation.invitedBy.lastName}`}</p>
            </div>
            <div className="flex mx-5">
              <HomeOutlined style={{ fontSize: "20px" }} />
              <p className="text-md mx-2">{`${invitation.company.name}`}</p>
            </div>
          </div>
          <Button icon={<PlayCircleOutlined />}>Start Test</Button>
        </div>
        <p>
          <b>Invited on:</b> {invitation.createdDate}
        </p>
        <p>
          <b>Expiration Date:</b> {invitation.expirationDate}
        </p>
      </Card>
    </div>
  );
};

export default InvitationCard;
