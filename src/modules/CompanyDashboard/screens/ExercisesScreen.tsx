import { Breadcrumb, Input, Button, Select, Empty } from "antd";
import { useNavigate } from "react-router-dom";
import { FileAddOutlined } from "@ant-design/icons";

const { Search } = Input;
const { Option } = Select;

const ExercisesScreen = () => {
  const navigate = useNavigate();

  const handleClick = (e: any) => {
    console.log(e);
  };

  const onSearch = (e: any) => {
    console.log(e);
  };
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
          <div className="flex justify-between items-center">
            <div className="flex justify-between items-center">
              <div className="m-0 p-0">
                <h1 className="text-xl">Sort By</h1>
              </div>
              <div className="mx-5">
                <Select
                  defaultValue="Creation Date"
                  style={{ width: 140 }}
                  onChange={handleClick}
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
          <div className="my-10 flex flex-col items-center justify-center">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default ExercisesScreen;
