import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Card, Col } from "antd";
import { FileAddOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { fetchTechnicalTests } from "../store/slices/fetchTechnicalTestsSlice";
import { TechnicalTest } from "../../../models/TechnicalTest";
import TechnicalTestsList from "../../../components/TechnicalTestsList/TechnicalTestsList";
import { TechnicalTestItem } from "../models";

const TechnicalTestsScreen = () => {
  const [sortBy, setSortBy] = useState("Most recent to least recent");

  const [page, setPage] = useState(0);
  const [limit] = useState(10);
  const [order, setOrder] = useState("ASC");
  const [properties, setProperties] = useState("id");
  const [inputSearch, setInputSearch] = useState("");
  const [createdByMe, setCreatedByMe] = useState(false);

  let technicalTests: TechnicalTestItem[] = [];

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const technicalTestsSelector = useSelector(
    (state: RootStateOrAny) => state.fetchTechnicalTests
  );

  const totalElements = technicalTestsSelector.technicalTestsList.totalElements;

  useEffect(() => {
    const filterOption: Record<string, string> = {
      page: page.toString(),
      limit: limit.toString(),
      order,
      properties,
      title: inputSearch,
      createdByMe: createdByMe.toString(),
    };
    dispatch(fetchTechnicalTests(filterOption));
  }, [dispatch, page, limit, properties, order, inputSearch, createdByMe]);

  if (technicalTestsSelector.technicalTestsList.content) {
    technicalTests = technicalTestsSelector.technicalTestsList.content.map(
      (technicalTest: TechnicalTest, index: number) => {
        return {
          ...technicalTest,
          key: index,
        };
      }
    );
    console.log(technicalTests);
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="p-5 bg-gray-100">
          <Col offset={3}>
            <Breadcrumb separator=">">
              <Breadcrumb.Item>Tests</Breadcrumb.Item>
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
                onClick={(e) => navigate("/company/create-technical-test")}
              >
                Create Test
              </Button>
            </div>
            <div>
              <TechnicalTestsList technicalTests={technicalTests} />
            </div>
          </Col>
        </div>
      </div>
    </>
  );
};

export default TechnicalTestsScreen;
