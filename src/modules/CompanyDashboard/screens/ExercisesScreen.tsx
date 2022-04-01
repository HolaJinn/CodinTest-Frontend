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
  const [order, setOrder] = useState("ASC");
  const [properties, setProperties] = useState("id");
  const [inputSearch, setInputSearch] = useState("");

  const [exercises, setExercises] = useState<Exercise[]>([]);

  const dispatch = useDispatch();
  const exercisesSelector = useSelector(
    (state: RootStateOrAny) => state.fetchExercises
  );

  const navigate = useNavigate();

  // console.log("List>>", exercisesSelector.exercisesList.content);
  const list = exercisesSelector.exercisesList.content;

  // if (list && list.length !== 0) {
  //   list.map(
  //     (item: Exercise) =>
  //       (item.createdDate = new Date().toISOString().split("T")[0])
  //   );
  // }

  // if (list) {
  //   setExercises(list);
  //   console.log(exercises);
  //   // list.map((item: Exercise) => {
  //   //   const date = item.createdDate.split("T");
  //   //   return (item.createdDate = date[0] + " " + date[1]);
  //   // });
  // }

  const handleSort = (e: any) => {
    if (e === "Creation Date") {
      setProperties("CreatedDate");
    } else {
      setProperties(e);
    }
  };

  const onSearch = (e: any) => {
    console.log(e);
    setInputSearch(e);
  };

  useEffect(() => {
    const filterOption: Record<string, string> = {
      page: "0",
      limit: "10",
      order,
      properties,
      title: inputSearch,
    };
    dispatch(fetchExercises(filterOption));
    if (list) {
      setExercises(exercisesSelector.exercisesList.content);
      console.log(exercises);
    }
  }, [dispatch, properties, order, inputSearch]);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
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
          <Popconfirm
            title="Sure to delete this test case?"
            // onConfirm={() => removeItem(record.key)}
          >
            <Button icon={<DeleteOutlined />}>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="flex flex-col">
        <div className="p-5 bg-gray-100">
          <Breadcrumb separator=">">
            <Breadcrumb.Item>Exercises</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="px-5">
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
          <Col offset={5} span={14}>
            <div className="flex justify-between items-center">
              <div className="flex justify-between items-center">
                <div className="m-0 p-0">
                  <h1 className="text-xl">Sort By</h1>
                </div>
                <div className="mx-5">
                  <Select
                    defaultValue="Creation Date"
                    style={{ width: 140 }}
                    onChange={handleSort}
                  >
                    <Option value="Creation Date">Creation Date</Option>
                    <Option value="Title">Title</Option>
                  </Select>
                </div>
              </div>
              <div>
                <Search placeholder="input search" onSearch={onSearch} />
              </div>
            </div>
          </Col>
          <div className="my-10 flex flex-col items-center justify-center">
            {exercisesSelector.isFetching && (
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
              />
            )}
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
                <Table columns={columns} dataSource={list} rowKey="id" />
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ExercisesScreen;
