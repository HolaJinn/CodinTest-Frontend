import React from "react";
import { useSelector, RootStateOrAny } from "react-redux";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { ExecutionResult } from "../../../models/ExercutionResult";

const ExecutionResults = () => {
  const codeExecutionResultSelector = useSelector(
    (state: RootStateOrAny) => state.runTest
  );
  let executionResults: ExecutionResult[] = [];

  if (codeExecutionResultSelector.executionResult) {
    executionResults = codeExecutionResultSelector.executionResult;
  }

  if (
    !codeExecutionResultSelector.isExecuting &&
    codeExecutionResultSelector.success === true &&
    executionResults.length > 0
  ) {
    return (
      <div className="mx-5">
        <div className="flex items-start justify-start">
          {executionResults.map(
            (executionResult: ExecutionResult, index: number) => {
              return (
                <div
                  className={`${
                    executionResult.status.description === "Accepted"
                      ? "bg-green-300"
                      : "bg-red-300"
                  } 'border border-current mr-5 p-2 rounded-lg text-center text-sm'`}
                >
                  <div className="flex items-center justify-center">
                    <h1 className="mb-0 mr-2">Test Case {index + 1}</h1>
                    {executionResult.status.description === "Accepted" ? (
                      <CheckCircleOutlined />
                    ) : (
                      <CloseCircleOutlined />
                    )}
                  </div>
                  <div className="px-3 py-1">
                    <h1>Output: {executionResult.stdout}</h1>
                    <h1>Execution time: {executionResult.time}s</h1>
                    <h1>Status: {executionResult.status.description}</h1>
                    {executionResult.stderr && (
                      <h1>Error: {executionResult.stderr}</h1>
                    )}
                    {executionResult.compileOutput && (
                      <h1>Error: {executionResult.compileOutput}</h1>
                    )}
                    {executionResult.message && (
                      <h1>Error: {executionResult.message}</h1>
                    )}
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    );
  } else if (codeExecutionResultSelector.isExecuting === true) {
    return (
      <div className="mx-5">
        <h1 className="text-md">Executing...</h1>
      </div>
    );
  } else if (
    !codeExecutionResultSelector.isExecuting &&
    codeExecutionResultSelector.error === false &&
    codeExecutionResultSelector.message.length > 0
  ) {
    return <div>{codeExecutionResultSelector.message}</div>;
  } else {
    return (
      <div className="mx-5">
        <h1 className="text-md">
          Press "Run Code" button to test the sample test cases
        </h1>
      </div>
    );
  }
};

export default ExecutionResults;
