import {
  Breadcrumb,
  Input,
  Button,
  Select,
  Empty,
  Space,
  Popconfirm,
  Spin,
  Table,
  Col,
} from "antd";
import { useNavigate } from "react-router-dom";
import {
  FileAddOutlined,
  DeleteOutlined,
  LoadingOutlined,
  FolderViewOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchExercises } from "../store/slices/fetchExerciseSlice";
import { Exercise } from "../../../models/Exercise";

const { Search } = Input;
const { Option } = Select;

interface ExerciseItem extends Exercise {
  key: React.Key;
}

const ExercisesScreen = () => {
  const [sortBy, setSortBy] = useState("Most recent to least recent");

  const [page, setPage] = useState(0);
  const [limit] = useState(10);
  const [order, setOrder] = useState("ASC");
  const [properties, setProperties] = useState("id");
  const [inputSearch, setInputSearch] = useState("");

  let exercises: ExerciseItem[] = [];

  const dispatch = useDispatch();
  const exercisesSelector = useSelector(
    (state: RootStateOrAny) => state.fetchExercises
  );
  const totalElements: number = exercisesSelector.exercisesList.totalElements;

  const navigate = useNavigate();

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
    console.log(page);
    console.log(pageSize);
    setPage(page - 1);
  };

  useEffect(() => {
    const filterOption: Record<string, string> = {
      page: page.toString(),
      limit: limit.toString(),
      order,
      properties,
      title: inputSearch,
    };
    dispatch(fetchExercises(filterOption));
  }, [dispatch, page, limit, properties, order, inputSearch]);

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
          <Button icon={<FolderViewOutlined />} />
          <Button icon={<EditOutlined />} />
          <Popconfirm
            title="Sure to delete this exercise"
            // onConfirm={() => removeItem(record.key)}
          >
            <Button icon={<DeleteOutlined />} />
          </Popconfirm>
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
          <Col offset={5} span={14}>
            <div className="flex justify-end my-5">
              <Button
                size="large"
                shape="round"
                icon={<FileAddOutlined />}
                onClick={(e) => navigate("/company/create-exercise")}
              >
                Create Exercise
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
                    <Option value="Title">Title</Option>
                    <Option value="TimerInMinute">Timer</Option>
                  </Select>
                </div>
              </div>
              <div>
                <Search placeholder="input search" onSearch={onSearch} />
              </div>
            </div>
          </Col>
          <div className="my-10 flex flex-col items-center justify-center">
            {/* {exercisesSelector.isFetching && (
                <Spin
                  indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                />
              )} */}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default ExercisesScreen;
