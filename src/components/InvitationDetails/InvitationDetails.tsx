import React, { useEffect, useState } from "react";
import { Divider, Tag, Collapse } from "antd";

import { Invitation } from "../../models/Invitation";
import { TechnicalTest } from "../../models/TechnicalTest";
import TechnicalTestDetails from "../TechnicalTestDetails/TechnicalTestDetails";

const { Panel } = Collapse;

interface Props {
  //   invitation: Invitation;
  invitationDetailsSelector: any;
}

const InvitationDetails = ({ invitationDetailsSelector }: Props) => {
  const [technicalTest, setTechnicalTest] = useState<TechnicalTest>();
  let invitation: Invitation = invitationDetailsSelector.invitationDetails;

  useEffect(() => {
    if (invitation) {
      setTechnicalTest(invitation.technicalTest!);
    }
  }, [invitation]);
  if (invitationDetailsSelector.success && invitation) {
    const createdDate = invitation.createdDate.split("T");
    const expirationDate = invitation.expirationDate.split("T");
    invitation = {
      ...invitation,
      createdDate: createdDate[0] + " " + createdDate[1].split(".")[0],
      expirationDate: expirationDate[0] + " " + expirationDate[1].split(".")[0],
    };
  }

  if (invitationDetailsSelector.isFetching) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <div className="mb-5">
          <h1 className="text-2xl font-bold">{invitation.subject}</h1>
        </div>
        <Divider />
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-sm mb-1">Invitation to:</h1>
            <p>{invitation.candidateEmail}</p>
          </div>
          <div>
            <h1 className="text-sm mb-1">Invited by:</h1>
            <p>
              {invitation.invitedBy.firstName} {invitation.invitedBy.lastName}
            </p>
          </div>
          <div>
            <h1 className="text-sm mb-1">Invited on:</h1>
            <p>{invitation.createdDate}</p>
          </div>
          <div>
            <h1 className="text-sm mb-1">Expiration date:</h1>
            <p>{invitation.expirationDate}</p>
          </div>
        </div>
        <div>
          <div>
            <h1 className="text-sm mb-1">Invitation Status: </h1>
            {invitation.state === "Rejected" && (
              <Tag color="red">{invitation.state}</Tag>
            )}
            {invitation.state === "Pending" && (
              <Tag color="lime">{invitation.state}</Tag>
            )}
            {invitation.state === "Accepted" && (
              <Tag color="green">{invitation.state}</Tag>
            )}
            {invitation.state === "Expired" && (
              <Tag color="magenta">{invitation.state}</Tag>
            )}
          </div>
          {invitation.rating && (
            <div>
              <h1 className="text-sm mb-1">Rating: </h1>
              <p>{invitation.rating}</p>
            </div>
          )}
        </div>
        <Divider />
        <Collapse accordion>
          {technicalTest && (
            <Panel
              header="The technical test for this invitation"
              key={technicalTest.id}
            >
              <TechnicalTestDetails technicalTest={technicalTest} />
            </Panel>
          )}
        </Collapse>
      </div>
    );
  }
};

export default InvitationDetails;
