import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Checkbox,
  Col,
  Drawer,
  Input,
  Pagination,
  Select,
} from "antd";
import { FileAddOutlined, FilterOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { fetchTechnicalTests } from "../store/slices/fetchTechnicalTestsSlice";
import { TechnicalTest } from "../../../models/TechnicalTest";
import TechnicalTestsList from "../../../components/TechnicalTestsList/TechnicalTestsList";
import { TechnicalTestItem } from "../models";
import { deleteTechnicalTest } from "../store/slices/deleteTechnicalTestSlice";

const { Option } = Select;
const { Search } = Input;

const TechnicalTestsScreen = () => {
  const [sortBy, setSortBy] = useState("Most recent to least recent");

  const [drawerVisibility, setDrawerVisibility] = useState(false);

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

  const onPageChange = (page: number, pageSize: number) => {
    setPage(page - 1);
  };

  const removeItem = (id: number) => {
    dispatch(deleteTechnicalTest(id));
    window.location.reload();
  };

  const inviteCandidate = (technicalTest: TechnicalTestItem) => {
    navigate(`/company/technical-tests/${technicalTest.id}/invite-candidate`);
    localStorage.setItem("technicalTest", JSON.stringify(technicalTest));
  };

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
          <Drawer
            title="Filter technical tests"
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
              <div className="mb-5">
                <Checkbox checked={createdByMe} onChange={onBoxChecked}>
                  Created By Me
                </Checkbox>
              </div>
            </div>
          </Drawer>
          <Col offset={5} span={14}>
            <div className="flex justify-between my-5">
              <Button
                size="large"
                shape="round"
                icon={<FilterOutlined />}
                onClick={(e) => showDrawer()}
              >
                Filter Tests
              </Button>
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
              <TechnicalTestsList
                technicalTests={technicalTests}
                removeItem={removeItem}
                inviteCandidate={inviteCandidate}
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

export default TechnicalTestsScreen;
