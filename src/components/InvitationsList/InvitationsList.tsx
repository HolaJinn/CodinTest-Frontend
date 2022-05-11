import React from "react";
import { IInvitationItem } from "../../modules/CandidateDashboard/models";
import InvitationCard from "../InvitationCard/InvitationCard";

interface Props {
  invitationsList: IInvitationItem[];
  startTestClick: any;
  rejectTestClick: any;
  showModal: any;
}

const InvitationsList = ({
  invitationsList,
  startTestClick,
  rejectTestClick,
  showModal,
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
            showModal={showModal}
          />
        );
      })}
    </>
  );
};

export default InvitationsList;
