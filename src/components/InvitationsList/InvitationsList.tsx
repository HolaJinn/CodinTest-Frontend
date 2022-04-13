import React from "react";
import { IInvitationItem } from "../../modules/CandidateDashboard/models";
import InvitationCard from "../InvitationCard/InvitationCard";

interface Props {
  invitationsList: IInvitationItem[];
}

const InvitationsList = ({ invitationsList }: Props) => {
  return (
    <>
      {invitationsList.map((invitation: IInvitationItem, index: number) => {
        return <InvitationCard key={index} invitation={invitation} />;
      })}
    </>
  );
};

export default InvitationsList;
