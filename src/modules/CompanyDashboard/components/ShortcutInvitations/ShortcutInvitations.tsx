import { Button, Card } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { Invitation } from "../../../../models/Invitation";
import { IInvitationItem } from "../../models";
import { fetchInvitations } from "../../store/slices/fetchInvitationsSlice";
import { useNavigate } from "react-router-dom";

const ShortcutInvitations = () => {
  const [page, setPage] = useState(0);
  const [limit] = useState(3);
  const [order, setOrder] = useState("DESC");
  const [properties, setProperties] = useState("createdDate");
  const [createdByMe, setCreatedByMe] = useState(true);
  const [invitationState, setInvitationState] = useState("All");

  let invitationsList: IInvitationItem[] = [];

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const invitationsSelector = useSelector(
    (state: RootStateOrAny) => state.fetchInvitations
  );

  useEffect(() => {
    const filterOption: Record<string, string> = {
      page: page.toString(),
      limit: limit.toString(),
      order,
      properties,
      createdByMe: createdByMe.toString(),
      state: invitationState,
    };
    dispatch(fetchInvitations(filterOption));
  }, [dispatch, page, limit, order, properties, createdByMe, invitationState]);
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
        title="Your latest invitations"
        className="border border-current rounded shadow-md my-5 px-12 py-2"
        extra={
          <Button onClick={() => navigate("/company/invitations")}>
            Show all
          </Button>
        }
      >
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
