import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Col,
  Select,
  Table,
  Input,
  Space,
  Popconfirm,
} from "antd";
import {
  FileAddOutlined,
  DeleteOutlined,
  FolderViewOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { IRecruiterItem } from "../models";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { fetchRecruiters } from "../store/slices/fetchRecruitersSlice";
import { IUser } from "../../../models/User";

const { Option } = Select;
const { Search } = Input;
const RecruitesScreen = () => {
  const [sortBy, setSortBy] = useState("Most recent to least recent");

  const [page, setPage] = useState(0);
  const [limit] = useState(10);
  const [order, setOrder] = useState("ASC");
  const [properties, setProperties] = useState("id");
  const [inputSearch, setInputSearch] = useState("");

  const user: IUser = JSON.parse(localStorage.getItem("user") || "{}");

  const userRole: any = user.role;

  let recruitersList: IRecruiterItem[] = [];

  const dispatch = useDispatch();
  const recruiterSelector = useSelector(
    (state: RootStateOrAny) => state.fetchRecruiters
  );

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
    };
    dispatch(fetchRecruiters(filterOption));
  }, [dispatch, page, limit, order, properties, inputSearch]);

  if (recruiterSelector.recruitersList.content) {
    recruitersList = recruiterSelector.recruitersList.content.map(
      (recruiter: IRecruiterItem, index: number) => {
        return {
          ...recruiter,
          key: index,
          roleName: recruiter.roleName.toString().toLocaleLowerCase(),
        };
      }
    );
  }

  const totalElements = recruiterSelector.recruitersList.totalElements;

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Role",
      dataIndex: "roleName",
      key: "roleName",
    },
    {
      title: "Role In Company",
      dataIndex: "roleInCompany",
      key: "roleInCompany",
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
          {userRole.name === "OWNER" && (
            <Popconfirm
              title="Sure to delete this recruiter"
              // onConfirm={() => removeItem(record.key)}
            >
              <Button icon={<DeleteOutlined />} />
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  const navigate = useNavigate();
  return (
    <div className="flex flex-col">
      <div className="p-5 bg-gray-100">
        <Col offset={3}>
          <Breadcrumb separator=">">
            <Breadcrumb.Item href="/company/details">
              Company Details
            </Breadcrumb.Item>
            <Breadcrumb.Item>Recruiters</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </div>
      <div className="px-5">
        <Col offset={5} span={14}>
          <div className="flex justify-end my-5">
            <Button
              size="large"
              shape="round"
              icon={<FileAddOutlined />}
              onClick={(e) => navigate("/company/add-recruiter")}
            >
              Add new recruiter
            </Button>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex justify-between items-center">
              <div className="m-0 p-0">
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
                  <Option value="firstName">First Name</Option>
                  <Option value="lastName">Last Name</Option>
                </Select>
              </div>
            </div>

            <div>
              <Search
                placeholder="input search"
                onSearch={onSearch}
                defaultValue={inputSearch}
              />
            </div>
          </div>
          <div className="mt-5">
            <Table
              columns={columns}
              dataSource={recruitersList}
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

export default RecruitesScreen;
