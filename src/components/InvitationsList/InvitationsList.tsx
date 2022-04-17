import React from "react";
import { IInvitationItem } from "../../modules/CandidateDashboard/models";
import InvitationCard from "../InvitationCard/InvitationCard";

interface Props {
  invitationsList: IInvitationItem[];
  startTestClick: any;
  rejectTestClick: any;
}

const InvitationsList = ({
  invitationsList,
  startTestClick,
  rejectTestClick,
}: Props) => {
  return (
    <>
      {invitationsList.map((invitation: IInvitationItem, index: number) => {
        return (
          <InvitationCard
            key={index}
            invitation={invitation}
            startTestClick={startTestClick}
            rejectTestClick={rejectTestClick}
          />
        );
      })}
    </>
  );
};

export default InvitationsList;
