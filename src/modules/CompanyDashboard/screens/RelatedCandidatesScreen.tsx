import { Breadcrumb, Col, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { IUser } from "../../../models/User";
import { IRelatedCandidateItem } from "../models";
import { fetchRelatedCandiates } from "../store/slices/fetchRelatedCandidates";

const RelatedCandidatesScreen = () => {
  const [page, setPage] = useState(0);
  const [limit] = useState(10);
  const [order, setOrder] = useState("ASC");

  let relatedCandidatesList: IRelatedCandidateItem[] = [];

  const dispatch = useDispatch();
  const relatedCandidatesSelector = useSelector(
    (state: RootStateOrAny) => state.fetchRelatedCandidates
  );
  const totalElements =
    relatedCandidatesSelector.relatedCandidatesList.totalElements;

  const onPageChange = (page: number, pageSize: number) => {
    setPage(page - 1);
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
