import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { createFromIconfontCN } from "@ant-design/icons";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import RichTextEditor from "react-rte";
import CodeEditor from "../components/CodeEditor/CodeEditor";
import { Exercise } from "../../../models/Exercise";
import CountdownTimer from "../../../components/CountdownTimer/CountdownTimer";
import { IAnswerSubmission } from "../models";
import { executeCode } from "../store/slices/executeCodeSlice";

const IconFont = createFromIconfontCN({
  scriptUrl: [
    "//at.alicdn.com/t/font_1788044_0dwu4guekcwr.js", // icon-javascript, icon-java, icon-shoppingcart (overrided)
    "//at.alicdn.com/t/font_1788592_a5xf2bdic3u.js", // icon-shoppingcart, icon-python
  ],
});

const CodinTestIDE = () => {
  const exerciseDetailsSelector = useSelector(
    (state: RootStateOrAny) => state.fetchExerciseDetails
  );
  const exercise: Exercise = exerciseDetailsSelector.exerciseDetails;

  const [textEditorValue] = useState(() =>
    RichTextEditor.createValueFromString(exercise.description, "html")
  );
  const [sourceCode, setSourceCode] = useState(exercise.initialCode);
  const answerSubmission: IAnswerSubmission = {
    exerciseId: exercise.id,
    code: sourceCode,
    programmingLanguage: 62,
  };

  const dispatch = useDispatch();

  const submitCode = () => {
    console.log(answerSubmission);
    dispatch(executeCode(answerSubmission));
  };

  useEffect(() => {}, [exercise]);

  if (!exerciseDetailsSelector.isFetching && exercise) {
    return (
      <div>
        <div className="flex items-center justify-between mx-10 p-2">
          <div className="flex items-center">
            <h1 className="text-xl font-bold mb-0">{exercise.title}</h1>
            <div className="flex items-center ml-20">
              <h1 className="text-lg mb-0 mr-1">
                {exercise.programmingLanguageName}
              </h1>
              {exercise.programmingLanguageName && (
                <IconFont
                  type={`icon-${exercise.programmingLanguageName!.toLowerCase()}`}
                />
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className=" mx-5 flex items-center justify-between">
              <ClockCircleOutlined />
              <h2 className="Text-xl mx-2 mb-0">
                Timer: {exercise.timerInMinute} Minutes
              </h2>
            </div>

            <CountdownTimer timerInMinute={exercise.timerInMinute} />
            {/* <CountdownTimer timerInMinute={61} /> */}
          </div>
        </div>
        <Row>
          <Col span={10}>
            <div className="border border-current mx-2  h-96">
              {exercise && exercise.description && (
                <RichTextEditor readOnly value={textEditorValue} />
              )}
            </div>
          </Col>
          <Col span={14}>
            <div className="border border-current mx-1 min-w-max">
              <CodeEditor
                sourceCode={sourceCode}
                setSourceCode={setSourceCode}
                mode={exercise.programmingLanguageName}
              />
            </div>
          </Col>
        </Row>
        <div className="flex items-center justify-end p-5">
          <Button
            className="mt-5"
            size="large"
            type="ghost"
            htmlType="submit"
            onClick={() => submitCode()}
          >
            Submit
          </Button>
        </div>
      </div>
    );
  } else {
    return <div>Loading..</div>;
  }
};

export default CodinTestIDE;
