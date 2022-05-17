import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Col,
  Drawer,
  Empty,
  Input,
  Modal,
  Select,
  Space,
  Spin,
  Table,
} from "antd";
import {
  FolderViewOutlined,
  LoadingOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Exercise } from "../../../models/Exercise";
import { fetchExerciseDetails } from "../../CompanyDashboard/store/slices/fetchExerciseDetailsSlice";
import { getAllTagsService } from "../../CompanyDashboard/services/dashboardServices";
import { fetchExercises } from "../../CompanyDashboard/store/slices/fetchExerciseSlice";
import ExerciseDetails from "../../../components/ExerciseDetails/ExerciseDetails";

interface ExerciseItem extends Exercise {
  key: React.Key;
}

const { Search } = Input;
const { Option } = Select;

const CandidateExercicsesScreen = () => {
  const [sortBy, setSortBy] = useState("Most recent to least recent");

  const [drawerVisibility, setDrawerVisibility] = useState(false);

  const [page, setPage] = useState(0);
  const [limit] = useState(10);
  const [order, setOrder] = useState("ASC");
  const [properties, setProperties] = useState("id");
  const [inputSearch, setInputSearch] = useState("");
  const [status] = useState("Public");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tags, setTags] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const [tagsList, setTagsList] = useState([]);

  const children: any[] = [];

  let exercises: ExerciseItem[] = [];

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const exercisesSelector = useSelector(
    (state: RootStateOrAny) => state.fetchExercises
  );
  const totalElements: number = exercisesSelector.exercisesList.totalElements;

  tagsList.map((tag: any) => {
    return children.push(<Option key={tag.id}>{tag.name}</Option>);
  });

  const exerciseDetailsSelector = useSelector(
    (state: RootStateOrAny) => state.fetchExerciseDetails
  );
  const exercise: Exercise = exerciseDetailsSelector.exerciseDetails;

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

  const handleTagChange = (value: any) => {
    console.log(value);
    setTags(value.toString());
    setSelectedTags(value);
    console.log(selectedTags);
  };

  const showDrawer = () => {
    setDrawerVisibility(!drawerVisibility);
  };

  const showModal = (key: React.Key) => {
    dispatch(fetchExerciseDetails(key.toString()));
    setIsModalVisible(true);
  };

  const passExercise = (key: React.Key) => {
    dispatch(fetchExerciseDetails(key.toString()));
    setTimeout(() => {
      navigate("/candidate/exercises/pass-exercise/" + key);
    }, 2000);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onPageChange = (page: number, pageSize: number) => {
    setPage(page - 1);
  };

  useEffect(() => {
    getAllTagsService().then((response) => setTagsList(response.data));
  });

  useEffect(() => {
    const filterOptions: Record<string, string> = {
      page: page.toString(),
      limit: limit.toString(),
      order,
      properties,
      search: inputSearch,
      status,
      tags,
    };
    dispatch(fetchExercises(filterOptions));
  }, [dispatch, page, limit, properties, order, inputSearch, status, tags]);

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
      onFilter: (value: any, record: any) => record.status.startsWith(value),
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
            onClick={() => showModal(record.key)}
          />
          <Button
            color="white"
            className="bg-gray-800"
            onClick={() => passExercise(record.key)}
          >
            Pass Exercise
          </Button>
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
              <Breadcrumb.Item>Exercises</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </div>
        <div className="px-5">
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
              <div className="mb-5">
                <h1 className="text-xl">Filter By</h1>
                <Select
                  showSearch
                  defaultValue={selectedTags}
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
                Filter Exercises
              </Button>
            </div>
          </Col>

          <div className="my-10 flex flex-col items-center justify-center">
            {exercises.length === 0 && (
              <Empty description={"There is no new exercises"} />
            )}
            {exercisesSelector.success &&
              exercisesSelector.exercisesList.content.length !== 0 && (
                <Table
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
              )}
            {!exerciseDetailsSelector.isFetching && exercise && (
              <Modal
                title="Exercise Details"
                visible={isModalVisible}
                onCancel={handleCancel}
                width={1000}
                footer={[
                  <Button key="cancel" onClick={handleCancel}>
                    Close
                  </Button>,
                ]}
              >
                <ExerciseDetails exercise={exercise} />
              </Modal>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CandidateExercicsesScreen;
