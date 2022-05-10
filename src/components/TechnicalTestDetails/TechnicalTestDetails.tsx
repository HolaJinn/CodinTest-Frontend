import React, { useEffect, useState } from "react";
import { Collapse } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { TechnicalTest } from "../../models/TechnicalTest";
import { Exercise } from "../../models/Exercise";
import ExerciseDetails from "../ExerciseDetails/ExerciseDetails";

const { Panel } = Collapse;

interface Props {
  technicalTest: TechnicalTest;
}

const TechnicalTestDetails = ({ technicalTest }: Props) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    if (technicalTest) {
      setExercises(technicalTest.exercises!);
    }
  }, [technicalTest]);

  if (technicalTest) {
    return (
      <div>
        <div className="mb-5">
          <h1 className="text-2xl font-bold">{technicalTest.title}</h1>
        </div>
        <div className="flex items-center mb-5">
          <div className="flex items-center mr-5">
            <ClockCircleOutlined />
            <h1 className="text-sm ml-2 mb-0">
              Recommended time: {technicalTest.timerInMinute} minutes
            </h1>
          </div>
        </div>
        {exercises && (
          <h2 className="text-xl">
            This technical test has {exercises.length} exercises.
          </h2>
        )}
        <Collapse accordion>
          {exercises &&
            exercises.map((exercise) => (
              <Panel key={exercise.id} header={exercise.title}>
                <ExerciseDetails exercise={exercise} />
              </Panel>
            ))}
        </Collapse>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default TechnicalTestDetails;
