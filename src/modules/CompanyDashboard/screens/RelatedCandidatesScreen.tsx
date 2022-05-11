import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Col, Space, Table } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../../models/User";
import { IRelatedCandidateItem } from "../models";
import { fetchRelatedCandiates } from "../store/slices/fetchRelatedCandidates";

const RelatedCandidatesScreen = () => {
  const [page, setPage] = useState(0);
  const [limit] = useState(10);
  const [order] = useState("ASC");

  let relatedCandidatesList: IRelatedCandidateItem[] = [];

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const relatedCandidatesSelector = useSelector(
    (state: RootStateOrAny) => state.fetchRelatedCandidates
  );
  const totalElements =
    relatedCandidatesSelector.relatedCandidatesList.totalElements;

  const onPageChange = (page: number, pageSize: number) => {
    setPage(page - 1);
  };

  const sendInvitation = (key: React.Key) => {
    let x: any = key.valueOf();
    localStorage.setItem("wantToInvite", relatedCandidatesList[x].email);
    navigate("/company/technical-tests");
  };

  useEffect(() => {
    const filterOption: Record<string, string> = {
      page: page.toString(),
      limit: limit.toString(),
      order,
    };
    dispatch(fetchRelatedCandiates(filterOption));
  }, [dispatch, page, limit, order]);

  if (relatedCandidatesSelector.relatedCandidatesList.content) {
    relatedCandidatesList =
      relatedCandidatesSelector.relatedCandidatesList.content.map(
        (relatedCandidate: IUser, index: number) => {
          return {
            ...relatedCandidate,
            key: index,
          };
        }
      );
  }

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
      title: "Action",
      key: "action",
      render: (_: any, record: { key: React.Key }) => (
        <Space size="middle">
          <Button
            icon={<UserAddOutlined />}
            onClick={() => {
              sendInvitation(record.key);
            }}
          >
            Invite
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="p-5 bg-gray-100">
        <Col offset={3}>
          <Breadcrumb separator=">">
            <Breadcrumb.Item>Related Candidates</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </div>
      <div className="py-5">
        <Col offset={5} span={14}>
          <div>
            <Table
              columns={columns}
              dataSource={relatedCandidatesList}
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

export default RelatedCandidatesScreen;
