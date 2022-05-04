import React, { useEffect, useState } from "react";
import { IInvitationItem } from "../../models";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCurrentUserInvitations } from "../../store/slices/fetchCurrentUserInvitationsSlice";
import { Invitation } from "../../../../models/Invitation";
import { Button, Card, Empty } from "antd";

const ShortcutInvitations = () => {
  const [page] = useState(0);
  const [limit] = useState(3);
  const [order] = useState("DESC");
  const [properties] = useState("createdDate");
  const [invitationState] = useState("Pending");
  let invitationsList: IInvitationItem[] = [];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const invitationsSelector = useSelector(
    (state: RootStateOrAny) => state.fetchCurrentUserInvitations
  );

  useEffect(() => {
    const filterOption: Record<string, string> = {
      page: page.toString(),
      limit: limit.toString(),
      order,
      properties,
      state: invitationState,
    };
    dispatch(fetchCurrentUserInvitations(filterOption));
  }, [dispatch, page, limit, order, properties, invitationState]);
  if (invitationsSelector.invitationsList.content) {
    invitationsList = invitationsSelector.invitationsList.content.map(
      (invitation: Invitation, index: number) => {
        const createdDate = invitation.createdDate.split("T");
        const expirationDate = invitation.expirationDate.split("T");
        return {
          ...invitation,
          key: index,
          createdDate: createdDate[0] + " " + createdDate[1].split(".")[0],
          expirationDate:
            expirationDate[0] + " " + expirationDate[1].split(".")[0],
        };
      }
    );
  }

  return (
    <>
      <Card
        title="Your pending invitations"
        className="border border-current rounded shadow-md my-5 px-12 py-2"
        extra={
          <Button onClick={() => navigate("/candidate/invitations")}>
            Show all
          </Button>
        }
      >
        {invitationsList.length === 0 && (
          <Empty description={"You have no pending invitations"} />
        )}
        {invitationsList.map((invitation: IInvitationItem) => (
          <div key={invitation.id} className="border border-current mb-3 p-2">
            <div className="flex ">
              <h1 className="mr-2">Invited Candidate: </h1>
              <p>{invitation.candidateEmail}</p>
            </div>
            <div className="flex ">
              <h1 className="mr-2">Invited on: </h1>
              <p>{invitation.createdDate}</p>
            </div>
            <div className="flex ">
              <h1 className="mr-2">Subject: </h1>
              <p>{invitation.subject}</p>
            </div>
            <div className="flex ">
              <h1 className="mr-2">Invitation State: </h1>
              <p>{invitation.state}</p>
            </div>
          </div>
        ))}
      </Card>
    </>
  );
};

export default ShortcutInvitations;
