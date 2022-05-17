import React, { useState } from "react";
import { Form, Button, Select, Tooltip } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { IInitialCodeRequest } from "../../modules/CompanyDashboard/models";
import { ProgrammingLanguage } from "../../models/ProgrammingLanguage";
import { useSelector, RootStateOrAny } from "react-redux";
import CodeEditor from "../CodeEditor/CodeEditor";

const { Option } = Select;

interface Props {
  initialCodeRequest: IInitialCodeRequest;
  submitHandler: any;
}

const InitialCodeForm = ({ initialCodeRequest, submitHandler }: Props) => {
  const programmingLanguageList = useSelector(
    (state: RootStateOrAny) => state.programmingLanguage.list
  );

  const [language, setLanguage] = useState("Java");
  const [initialCode, setInitialCode] = useState(
    'public class Main {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}'
  );

  const children: any[] = [];

  programmingLanguageList.map((programmingLanguage: ProgrammingLanguage) => {
    return children.push(
      <Option key={programmingLanguage.name}>{programmingLanguage.name}</Option>
    );
  });

  const onFinish = (values: any) => {
    console.log(initialCode);
    initialCodeRequest.programmingLanguage = language;
    initialCodeRequest.initialCode = initialCode;
    submitHandler();
  };

  const onFinishFailed = () => {};

  const handleLanguageMenu = (value: string) => {
    setLanguage(value);
  };

  return (
    <>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
      >
        <div>
          <Form.Item name="programmingLanguage" className="justify-center">
            <Tooltip title="Provide programming language" placement="right">
              <Select
                defaultValue={language}
                showSearch
                placeholder="Select a programming language"
                style={{ width: 300 }}
                onChange={handleLanguageMenu}
                optionFilterProp="children"
                filterOption={(input, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {children}
              </Select>
            </Tooltip>
          </Form.Item>

          <Form.Item name="initialCode" className="justify-center">
            <CodeEditor language={language} setInitialCode={setInitialCode} />
          </Form.Item>
          <Form.Item>
            <Button
              size="large"
              type="ghost"
              htmlType="submit"
              icon={<CheckCircleOutlined />}
            >
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
};

export default InitialCodeForm;
