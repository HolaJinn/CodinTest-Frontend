import {
  Breadcrumb,
  Input,
  Button,
  Select,
  Empty,
  Space,
  Spin,
  Table,
  Col,
  Checkbox,
  Steps,
  Alert,
} from "antd";
import { useNavigate } from "react-router-dom";
import {
  FileAddOutlined,
  CheckCircleOutlined,
  LoadingOutlined,
  FolderViewOutlined,
} from "@ant-design/icons";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { fetchExercises } from "../store/slices/fetchExerciseSlice";
import { Exercise } from "../../../models/Exercise";
import { getAllTagsService } from "../services/dashboardServices";
import { IAddExercisesToTechnicalTest } from "../models";
import { addExercisesToTechnicalTest } from "../store/slices/addExercisesToTechnicalTestSlice";

const { Search } = Input;
const { Option } = Select;
const { Step } = Steps;

interface ExerciseItem extends Exercise {
  key: React.Key;
}

const AddExercisesToTechnicalTest = () => {
  const [selectedExercises, setSelectedExercises] = useState<number[]>([]);

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRow: ExerciseItem[]) => {
      console.log("Select", selectedRowKeys, "SelectedRow", selectedRow);
      setSelectedExercises(selectedRowKeys as number[]);
    },
  };

  const [sortBy, setSortBy] = useState("Most recent to least recent");
  const [page, setPage] = useState(0);
  const [limit] = useState(10);
  const [order, setOrder] = useState("ASC");
  const [properties, setProperties] = useState("id");
  const [inputSearch, setInputSearch] = useState("");
  const [createdByMe, setCreatedByMe] = useState(false);

  const [tags, setTags] = useState("");

  const [tagsList, setTagsList] = useState([]);

  const children: any[] = [];

  let exercises: ExerciseItem[] = [];

  const dispatch = useDispatch();
  const exercisesSelector = useSelector(
    (state: RootStateOrAny) => state.fetchExercises
  );
  const technicalTestSelector = useSelector(
    (state: RootStateOrAny) => state.createTechnicalTest.technicalTest
  );
  const creationState = useSelector(
    (state: RootStateOrAny) => state.addExerciseToTechnicalTest
  );

  const addExercisesToTechnicalTestRequest: IAddExercisesToTechnicalTest = {
    technicalTestId: technicalTestSelector.id,
    exercises: selectedExercises,
  };

  const totalElements: number = exercisesSelector.exercisesList.totalElements;

  const navigate = useNavigate();

  tagsList.map((tag: any) => {
    return children.push(<Option key={tag.id}>{tag.name}</Option>);
  });

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

  const onBoxChecked = (e: any) => {
    setCreatedByMe(e.target.checked);
  };

  const onSearch = (e: any) => {
    setInputSearch(e);
  };

  const handleTagChange = (value: any) => {
    setTags((prev) => "");
    const x: string = value.toString();
    for (let i = 0; i < value.length; i++) {
      console.log(value[i].toString());
      x.concat(value[i].toString(), ",");
    }
    console.log("x", x);
    setTags((prev) => prev.concat(x));
    console.log("final tags", tags);
  };

  const onPageChange = (page: number, pageSize: number) => {
    setPage(page - 1);
  };

  const submitHandler = () => {
    console.log(selectedExercises);
    dispatch(addExercisesToTechnicalTest(addExercisesToTechnicalTestRequest));
    navigate("/company/technical-tests");
  };

  useEffect(() => {
    getAllTagsService().then((response) => setTagsList(response.data));
  });

  useEffect(() => {
    const filterOption: Record<string, string> = {
      page: page.toString(),
      limit: limit.toString(),
      order,
      properties,
      search: inputSearch,
      createdByMe: createdByMe.toString(),
    };
    dispatch(fetchExercises(filterOption));
  }, [dispatch, page, limit, properties, order, inputSearch, createdByMe]);

  if (!exercisesSelector.isFetching) {
    const list: Exercise[] = exercisesSelector.exercisesList.content;
    exercises = [];

    if (list) {
      for (let i = 0; i < list.length; i++) {
        let item = list[i];
        const date = item.createdDate.split("T");
        const exerciseItem: ExerciseItem = {
          key: item.id,
          id: item.id,
          title: item.title,
          description: item.description,
          creatorId: item.creatorId,
          difficulty: item.difficulty,
          status: item.status,
          programmingLanguageName: item.programmingLanguageName,
          createdDate: date[0] + " " + date[1].split(".")[0],
          timerInMinute: item.timerInMinute,
          initialCode: item.initialCode,
        };
        exercises.push(exerciseItem);
      }
    }
  }

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Timer In Minute",
      dataIndex: "timerInMinute",
      key: "timerInMinute",
    },
    {
      title: "Difficulty",
      dataIndex: "difficulty",
      key: "difficulty",
      filters: [
        {
          text: "Easy",
          value: "Easy",
        },
        {
          text: "Medium",
          value: "Medium",
        },
        {
          text: "Hard",
          value: "Hard",
        },
      ],
      onFilter: (value: any, record: any) =>
        record.difficulty.startsWith(value),
      filterSearch: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        {
          text: "Public",
          value: "Public",
        },
        {
          text: "Private",
          value: "Private",
        },
      ],
      onFilter: (value: any, record: any) =>
        record.difficulty.startsWith(value),
      filterSearch: true,
    },
    {
      title: "Programming Language",
      dataIndex: "programmingLanguageName",
      key: "programmingLanguageName",
    },
    {
      title: "Created Date",
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
        </Space>
      ),
    },
  ];

  if (exercisesSelector.isFetching) {
    return (
      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
    );
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="p-5 bg-gray-100">
          <Col offset={3}>
            <Breadcrumb separator=">">
              <Breadcrumb.Item href="/company/technical-tests">
                Technical Tests
              </Breadcrumb.Item>
              <Breadcrumb.Item>Create Technical Test</Breadcrumb.Item>
              <Breadcrumb.Item>Add Exercises</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </div>
        <div className="px-5">
          <Col offset={3} span={18}>
            <div className="px-5 py-2 bg-gray-150">
              <Steps current={1} percent={60}>
                <Step title="Finished" description="Provide details" />
                <Step title="In Progress" description="Provide exercises" />
              </Steps>
            </div>
          </Col>
          <Col offset={2} span={20}>
            <div className="border border-current rounded shadow-xl my-5 py-5">
              <Col offset={5} span={14}>
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
                        <Option value="Title">Title</Option>
                        <Option value="TimerInMinute">Timer</Option>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Checkbox checked={createdByMe} onChange={onBoxChecked}>
                      Created By Me
                    </Checkbox>
                  </div>
                  <div>
                    <Search placeholder="input search" onSearch={onSearch} />
                  </div>
                </div>
              </Col>
              <Col offset={5} span={14}>
                <div className="w-5/12">
                  <Select
                    showSearch
                    mode="multiple"
                    allowClear
                    placeholder="Please select Tags"
                    style={{ width: "100%" }}
                    onChange={handleTagChange}
                    optionFilterProp="children"
                    filterOption={(input, option: any) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {children}
                  </Select>
                </div>
              </Col>
              <div className="my-10 flex flex-col items-center justify-center">
                {exercisesSelector.success &&
                  exercisesSelector.exercisesList.content.length === 0 && (
                    <>
                      <Empty />
                      <Button
                        className="my-5"
                        size="large"
                        shape="round"
                        icon={<FileAddOutlined />}
                        onClick={(e) => navigate("/company/create-exercise")}
                      >
                        Create Exercise Now
                      </Button>
                    </>
                  )}
                {exercisesSelector.success &&
                  exercisesSelector.exercisesList.content.length !== 0 && (
                    <>
                      <Table
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={exercises}
                        rowKey="id"
                        className="min-w-1200"
                        pagination={{
                          current: page + 1,
                          total: totalElements,
                          pageSize: limit,
                          onChange: onPageChange,
                        }}
                      />
                      <div>
                        <Button
                          size="large"
                          type="ghost"
                          htmlType="submit"
                          icon={<CheckCircleOutlined />}
                          onClick={submitHandler}
                        >
                          Submit
                        </Button>
                      </div>
                      {creationState &&
                        creationState.success &&
                        navigate("/company/technical-tests")}
                      {creationState && creationState.error && (
                        <Alert type="error" message={creationState.message} />
                      )}
                    </>
                  )}
              </div>
            </div>
          </Col>
        </div>
      </div>
    </>
  );
};

export default AddExercisesToTechnicalTest;