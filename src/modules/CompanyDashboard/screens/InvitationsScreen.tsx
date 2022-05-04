import React, { useEffect, useState } from "react";
import {
  Col,
  Breadcrumb,
  Select,
  Radio,
  Input,
  Space,
  Button,
  Popconfirm,
  Table,
  Checkbox,
  Drawer,
} from "antd";
import {
  DeleteOutlined,
  FolderViewOutlined,
  EditOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { IInvitationItem } from "../models";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { fetchInvitations } from "../store/slices/fetchInvitationsSlice";
import { Invitation } from "../../../models/Invitation";

const { Option } = Select;
const { Search } = Input;

const InvitationsScreen = () => {
  const [sortBy, setSortBy] = useState("Most recent to least recent");

  const [drawerVisibility, setDrawerVisibility] = useState(false);

  const [page, setPage] = useState(0);
  const [limit] = useState(10);
  const [order, setOrder] = useState("ASC");
  const [properties, setProperties] = useState("id");
  const [createdByMe, setCreatedByMe] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  const [invitationState, setInvitationState] = useState("All");

  let invitationsList: IInvitationItem[] = [];

  const dispatch = useDispatch();
  const invitationsSelector = useSelector(
    (state: RootStateOrAny) => state.fetchInvitations
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

  const onBoxChecked = (e: any) => {
    setCreatedByMe(e.target.checked);
  };

  const onSearch = (e: any) => {
    setInputSearch(e);
  };

  const onRadioChange = (e: any) => {
    if (e.target.value === "All") {
      setInvitationState("All");
    } else {
      setInvitationState(e.target.value);
    }
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
      createdByMe: createdByMe.toString(),
      search: inputSearch,
      state: invitationState,
    };
    dispatch(fetchInvitations(filterOption));
  }, [
    dispatch,
    page,
    limit,
    order,
    properties,
    createdByMe,
    inputSearch,
    invitationState,
  ]);

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

  const columns = [
    {
      title: "Candidate",
      dataIndex: "candidateEmail",
      key: "candidateEmail",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Invitation Date",
      dataIndex: "createdDate",
      key: "createdDate",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: { key: React.Key }) => (
        <Space size="middle">
          <Button
            color="white"
            className="bg-gray-800"
            icon={<FolderViewOutlined />}
          />
          <Button icon={<EditOutlined />} />
          <Popconfirm title="Sure to delete this exercise">
            <Button icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
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
          title="Filter invitations"
          placement="left"
          closable={true}
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
            <div className="mb-5">
              <Checkbox checked={createdByMe} onChange={onBoxChecked}>
                Created By Me
              </Checkbox>
            </div>
            <div>
              <div>
                <h1 className="text-xl">Invitation State</h1>
              </div>
              <div className="mx-5 flex flex-col items-center justify-start my-5">
                <Radio.Group onChange={onRadioChange} value={invitationState}>
                  <Radio value="All">All</Radio>
                  <Radio value="Pending">Pending</Radio>
                  <Radio value="Accepted">Accepted</Radio>
                  <Radio value="Rejected">Rejected</Radio>
                  <Radio value="Expired">Expired</Radio>
                </Radio.Group>
              </div>
            </div>
          </div>
        </Drawer>
        <Col offset={5} span={14}>
          <div className="flex justify-start my-5">
            <Button
              size="large"
              shape="round"
              icon={<FilterOutlined />}
              onClick={(e) => showDrawer()}
            >
              Filter Invitations
            </Button>
          </div>
          <div>
            <Table
              columns={columns}
              dataSource={invitationsList}
              rowKey="id"
              className="min-w-1200"
              pagination={{
                current: page + 1,
                total: totalElements,
                pageSize: limit,
                onChange: onPageChange,
              }}
            />
          </div>
        </Col>
      </div>
    </div>
  );
};

export default InvitationsScreen;
