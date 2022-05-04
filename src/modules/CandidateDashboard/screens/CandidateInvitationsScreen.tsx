import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Col,
  Drawer,
  Empty,
  Input,
  Pagination,
  Radio,
  Select,
} from "antd";
import { FilterOutlined } from "@ant-design/icons";
import InvitationsList from "../../../components/InvitationsList/InvitationsList";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { fetchCurrentUserInvitations } from "../store/slices/fetchCurrentUserInvitationsSlice";
import { IInvitationItem } from "../models";
import { Invitation } from "../../../models/Invitation";
import { acceptInvitation } from "../store/slices/acceptInvitationSlice";
import { rejectInvitation } from "../store/slices/rejectInvitationSlice";

const { Option } = Select;
const { Search } = Input;

const CandidateInvitationsScreen = () => {
  const [sortBy, setSortBy] = useState("Most recent to least recent");

  const [drawerVisibility, setDrawerVisibility] = useState(false);

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

  const showDrawer = () => {
    setDrawerVisibility(!drawerVisibility);
  };

  const onSearch = (e: any) => {
    setInputSearch(e);
  };

  const onRadioChange = (e: any) => {
    setInvitationState(e.target.value);
  };

  const onPageChange = (page: number, pageSize: number) => {
    setPage(page - 1);
  };

  const onStartTestClicked = (invitationId: number) => {
    dispatch(acceptInvitation(invitationId));
    window.location.reload();
  };

  const onRejectTestClicked = (invitationId: number) => {
    dispatch(rejectInvitation(invitationId));
    window.location.reload();
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
          <Drawer
            title="Filter exercises"
            placement="left"
            closable={false}
            onClose={showDrawer}
            visible={drawerVisibility}
            getContainer={false}
            style={{ position: "absolute" }}
          >
            <div>
              <div className="mb-5">
                <h1 className="text-xl">Search by keywords</h1>
                <Search
                  placeholder="input search"
                  onSearch={onSearch}
                  defaultValue={inputSearch}
                />
              </div>
              <div className="mb-5">
                <h1 className="text-xl">Sort By</h1>
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
                  <Option value="Title">Title</Option>
                  <Option value="TimerInMinute">Timer</Option>
                </Select>
              </div>
            </div>
          </Drawer>
          <Col offset={5} span={14}>
            <Button
              size="large"
              shape="round"
              icon={<FilterOutlined />}
              onClick={(e) => showDrawer()}
            >
              Filter Invitations
            </Button>
            <div className="flex items-center justify-start my-5">
              <div>
                <h1 className="text-xl">Invitation State</h1>
              </div>
              <div className="mx-5">
                <Radio.Group onChange={onRadioChange} value={invitationState}>
                  <Radio value="Pending">Pending</Radio>
                  <Radio value="Accepted">Accepted</Radio>
                  <Radio value="Rejected">Rejected</Radio>
                  <Radio value="Expired">Expired</Radio>
                </Radio.Group>
              </div>
            </div>

            <div>
              {invitationsList.length === 0 && (
                <Empty description={"No invitations found"} />
              )}
              <InvitationsList
                invitationsList={invitationsList}
                startTestClick={onStartTestClicked}
                rejectTestClick={onRejectTestClicked}
              />
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
