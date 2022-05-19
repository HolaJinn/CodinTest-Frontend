import React from "react";
import { Divider } from "antd";
import { TestCase } from "../../../models/TestCase";

interface Props {
  sampleTestCases: TestCase[];
}
const SampleTestCases = ({ sampleTestCases }: Props) => {
  return (
    <div>
      {sampleTestCases.map((testCase: TestCase, index: number) => {
        return (
          <div className="mx-5" key={index}>
            <div>
              <h1>Input</h1>
              <p>{testCase.input}</p>
            </div>
            <div>
              <h1>Expected Output</h1>
              <p>{testCase.expectedOutput}</p>
            </div>
            <Divider />
          </div>
        );
      })}
    </div>
  );
};

export default SampleTestCases;
