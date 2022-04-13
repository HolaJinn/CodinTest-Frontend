import React, { useEffect, useState } from "react";
import { Breadcrumb, Col, Input, Pagination, Radio, Select } from "antd";
import InvitationsList from "../../../components/InvitationsList/InvitationsList";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { string } from "yup";
import { fetchCurrentUserInvitations } from "../store/slices/fetchCurrentUserInvitationsSlice";
import { IInvitationItem } from "../models";
import { Invitation } from "../../../models/Invitation";

const { Option } = Select;
const { Search } = Input;

const CandidateInvitationsScreen = () => {
  const [sortBy, setSortBy] = useState("Most recent to least recent");

  const [page, setPage] = useState(0);
  const [limit] = useState(10);
  const [order, setOrder] = useState("ASC");
  const [properties, setProperties] = useState("id");
  const [inputSearch, setInputSearch] = useState("");
  const [invitationState, setInvitationState] = useState("Pending");

  let invitationsList: IInvitationItem[] = [];

  const dispatch = useDispatch();
  const invitationsSelector = useSelector(
    (state: RootStateOrAny) => state.fetchCurrentUserInvitations
  );

  const totalElements = invitationsSelector.invitationsList.totalElements;

  const handleSort = (e: any) => {
    if (e === "Most recent to least recent") {
      setProperties("CreatedDate");
      setOrder("ASC");
    } else if (e === "Least recent to most recent") {
      setProperties("CreatedDate");
      setOrder("DESC");
    } else {
      setProperties(e);
    }
    setSortBy(e);
  };

  const onSearch = (e: any) => {
    setInputSearch(e);
  };

  const onRadioChange = (e: any) => {
    console.log(e.target.value);
    setInvitationState(e.target.value);
  };

  const onPageChange = (page: number, pageSize: number) => {
    setPage(page - 1);
  };

  useEffect(() => {
    const filterOption: Record<string, string> = {
      page: page.toString(),
      limit: limit.toString(),
      order,
      properties,
      search: inputSearch,
      state: invitationState,
    };
    dispatch(fetchCurrentUserInvitations(filterOption));
  }, [dispatch, page, limit, order, properties, inputSearch, invitationState]);

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
      <div className="flex flex-col">
        <div className="p-5 bg-gray-100">
          <Col offset={3}>
            <Breadcrumb separator=">">
              <Breadcrumb.Item>Invitations</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </div>
        <div className="py-5">
          <Col offset={5} span={14}>
            <div className="flex justify-between items-center">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-xl">Sort By</h1>
                </div>
                <div className="mx-5">
                  <Select
                    defaultValue={sortBy}
                    style={{ width: 250 }}
                    onChange={handleSort}
                  >
                    <Option value="Most recent to least recent">
                      Most recent to least recent
                    </Option>
                    <Option value="Least recent to most recent">
                      Least recent to most recent
                    </Option>
                  </Select>
                </div>
              </div>
              <div>
                <Search placeholder="input search" onSearch={onSearch} />
              </div>
            </div>
            <div className="flex items-center justify-start my-5">
              <div>
                <h1 className="text-xl">Invitation State</h1>
              </div>
              <div className="mx-5">
                <Radio.Group onChange={onRadioChange} value={invitationState}>
                  <Radio value="Pending">Pending</Radio>
                  <Radio value="Accepted">Accepted</Radio>
                  <Radio value="Rejected">Rejected</Radio>
                  <Radio value="Done">Done</Radio>
                </Radio.Group>
              </div>
            </div>

            <div>
              <InvitationsList invitationsList={invitationsList} />
            </div>
            <div className="flex justify-end my-10">
              <Pagination
                current={page + 1}
                total={totalElements}
                pageSize={limit}
                onChange={onPageChange}
              />
            </div>
          </Col>
        </div>
      </div>
    </>
  );
};

export default CandidateInvitationsScreen;
