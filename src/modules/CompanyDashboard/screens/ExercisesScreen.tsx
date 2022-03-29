import { Col, Row, Breadcrumb, Menu, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { FileAddOutlined } from "@ant-design/icons";

const { SubMenu } = Menu;
const { Search } = Input;
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
      <Row>
        <Col offset={3} span={18}>
          <div className="flex flex-col">
            <div className="my-5">
              <Breadcrumb separator=">">
                <Breadcrumb.Item>Exercises</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div className="flex justify-end my-5">
              {/* <button
                className="btn"
                onClick={(e) => navigate("/company/create-exercise")}
              >
                Create Exercise
              </button> */}
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
                  <h1 className="text-xl m-0">Sort By</h1>
                </div>
                <div>
                  <Menu
                    onClick={handleClick}
                    defaultSelectedKeys={["1"]}
                    mode="vertical"
                  >
                    <SubMenu title="Choose option" key="sub1">
                      <Menu.Item key="1">Creation Date</Menu.Item>
                      <Menu.Item key="2">Title</Menu.Item>
                    </SubMenu>
                  </Menu>
                </div>
              </div>
              <div>
                <Search placeholder="input search" onSearch={onSearch} />
              </div>
            </div>
            <div>Exercises List goes here</div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ExercisesScreen;
