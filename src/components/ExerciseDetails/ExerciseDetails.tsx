import React, { useEffect, useState } from "react";
//I called it TagDesign here to not make a confusion with the Tag model
import { Divider, Tag as TagDesign, Collapse } from "antd";
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { createFromIconfontCN } from "@ant-design/icons";

import { useSelector, RootStateOrAny } from "react-redux";
import { Exercise } from "../../models/Exercise";
import { TestCase } from "../../models/TestCase";
import { Tag } from "../../models/Tag";

const { Panel } = Collapse;

const IconFont = createFromIconfontCN({
  scriptUrl: [
    "//at.alicdn.com/t/font_1788044_0dwu4guekcwr.js", // icon-javascript, icon-java, icon-shoppingcart (overrided)
    "//at.alicdn.com/t/font_1788592_a5xf2bdic3u.js", // icon-shoppingcart, icon-python
  ],
});
const ExerciseDetails = () => {
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const exerciseSelector = useSelector(
    (state: RootStateOrAny) => state.fetchExerciseDetails
  );

  const exercise: Exercise = exerciseSelector.exerciseDetails;

  useEffect(() => {
    if (exercise) {
      setTestCases(exercise.testCases!);
      setTags(exercise.tags!);
    }
  }, [exercise]);

  if (exercise) {
    return (
      <div>
        <div className="mb-5">
          <h1 className="text-2xl font-bold">{exercise.title}</h1>
        </div>
        <div className="flex items-center">
          <div className="flex items-center mr-5">
            <ClockCircleOutlined />
            <h1 className="text-sm ml-2 mb-0">
              Recommended time: {exercise.timerInMinute} minutes
            </h1>
          </div>
          <div className="flex items-center mr-5">
            <StarOutlined />
            <h1 className="text-sm ml-2 mb-0">
              Diffiulty: {exercise.difficulty}
            </h1>
          </div>
          <div className="flex items-center mr-5">
            <CheckCircleOutlined />
            <h1 className="text-sm ml-2 mb-0">
              {testCases && testCases.length} test cases
            </h1>
          </div>
        </div>
        <div className="flex items-center mt-5">
          <h1 className="text-sm mb-0 mr-1">
            Programming Language: {exercise.programmingLanguageName}
          </h1>
          {exercise.programmingLanguageName && (
            <IconFont
              type={`icon-${exercise.programmingLanguageName!.toLowerCase()}`}
            />
          )}
        </div>
        <div className="mt-5">
          {tags &&
            tags.map((tag) => (
              <TagDesign color="geekblue">{tag.name}</TagDesign>
            ))}
        </div>
        <Divider />
        <div>
          <p>{exercise.description}</p>
        </div>
        <Divider />
        <div>
          <Collapse accordion>
            {testCases &&
              testCases.map((testCase) => (
                <Panel
                  header={testCase.name}
                  key={testCase.id}
                  extra={
                    testCase.sample
                      ? "This is a sample test case"
                      : "This is not a sample test case"
                  }
                >
                  <h1>Score:</h1>
                  <p>{testCase.score}</p>
                  <Divider />
                  <h1>Input:</h1>
                  <p>{testCase.input}</p>
                  <Divider />
                  <h1>Expected Output:</h1>
                  <p>{testCase.expectedOutput}</p>
                </Panel>
              ))}
          </Collapse>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default ExerciseDetails;
