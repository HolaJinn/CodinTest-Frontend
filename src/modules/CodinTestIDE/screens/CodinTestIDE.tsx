import React, { useEffect, useState } from "react";
import { Col } from "antd";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import RichTextEditor from "react-rte";
import CodeEditor from "../components/CodeEditor/CodeEditor";
import { Exercise } from "../../../models/Exercise";
import CountdownTimer from "../../../components/CountdownTimer/CountdownTimer";

const CodinTestIDE = () => {
  const exerciseDetailsSelector = useSelector(
    (state: RootStateOrAny) => state.fetchExerciseDetails
  );
  const exercise: Exercise = exerciseDetailsSelector.exerciseDetails;

  const [textEditorValue] = useState(() =>
    RichTextEditor.createValueFromString(exercise.description, "html")
  );

  useEffect(() => {}, [exercise]);

  if (!exerciseDetailsSelector.isFetching && exercise) {
    return (
      <div>
        <div className="flex justify-around p-2">
          <h1 className="text-xl">{exercise.title}</h1>
          <h2 className="Text-xl">Timer: {exercise.timerInMinute}</h2>
          <CountdownTimer timerInMinute={exercise.timerInMinute} />
          {/* <CountdownTimer timerInMinute={1} /> */}
        </div>
        <div className="flex items-start">
          <div className="border border-current mx-2 min-w-max h-96">
            {exercise && exercise.description && (
              <RichTextEditor readOnly value={textEditorValue} />
            )}
          </div>
          <div className="border border-current mx-1 min-w-max">
            <CodeEditor initialCode={exercise.initialCode} />
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading..</div>;
  }
};

export default CodinTestIDE;
