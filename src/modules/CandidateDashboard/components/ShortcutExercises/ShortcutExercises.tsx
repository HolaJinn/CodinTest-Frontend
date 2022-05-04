import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { fetchExercises } from "../../../CompanyDashboard/store/slices/fetchExerciseSlice";
import { Exercise } from "../../../../models/Exercise";
import { ExerciseItem } from "../../models";
import { Button, Card, Empty, Modal } from "antd";
import { ClockCircleOutlined, StarOutlined } from "@ant-design/icons";
import { createFromIconfontCN } from "@ant-design/icons";
import { fetchExerciseDetails } from "../../../CompanyDashboard/store/slices/fetchExerciseDetailsSlice";
import ExerciseDetails from "../../../../components/ExerciseDetails/ExerciseDetails";

const IconFont = createFromIconfontCN({
  scriptUrl: [
    "//at.alicdn.com/t/font_1788044_0dwu4guekcwr.js", // icon-javascript, icon-java, icon-shoppingcart (overrided)
    "//at.alicdn.com/t/font_1788592_a5xf2bdic3u.js", // icon-shoppingcart, icon-python
  ],
});

const ShortcutExercises = () => {
  const [page] = useState(0);
  const [limit] = useState(3);
  const [order] = useState("DESC");
  const [properties] = useState("createdDate");
  const [status] = useState("Public");

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [exerciseDetailsId, setExerciseDetailsId] = useState<React.Key>();

  let exercises: ExerciseItem[] = [];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const exercisesSelector = useSelector(
    (state: RootStateOrAny) => state.fetchExercises
  );

  const showModal = (key: React.Key) => {
    setExerciseDetailsId(key);
    dispatch(fetchExerciseDetails(key.toString()));
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  useEffect(() => {
    const filterOptions: Record<string, string> = {
      page: page.toString(),
      limit: limit.toString(),
      order,
      properties,
      status,
    };
    dispatch(fetchExercises(filterOptions));
  }, [dispatch, page, limit, properties, order, status]);

  if (!exercisesSelector.isFetching) {
    const list: Exercise[] = exercisesSelector.exercisesList.content;
    exercises = [];

    if (list) {
      for (let i = 0; i < list.length; i++) {
        let item = list[i];
        const date = item.createdDate.split("T");
        const exerciseItem: ExerciseItem = {
          key: item.id,
          id: item.id,
          title: item.title,
          description: item.description,
          creatorId: item.creatorId,
          difficulty: item.difficulty,
          status: item.status,
          programmingLanguageName: item.programmingLanguageName,
          createdDate: date[0] + " " + date[1].split(".")[0],
          timerInMinute: item.timerInMinute,
          initialCode: item.initialCode,
        };
        exercises.push(exerciseItem);
      }
    }
  }

  return (
    <>
      <Card
        title="Exercises that might interest you"
        className="border border-current rounded shadow-md my-5 px-12 py-2"
        extra={
          <Button onClick={() => navigate("/candidate/exercises")}>
            Show all
          </Button>
        }
      >
        {exercises.length === 0 && (
          <Empty description={"There is no new exercises"} />
        )}
        {exercises.map((exercise: ExerciseItem, index: number) => (
          <div
            key={index}
            className="border border-current mb-3 p-2 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-300 cursor-pointer"
            onClick={() => showModal(exercise.id)}
          >
            <h1 className="text-md font-bold">{exercise.title}</h1>
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
          </div>
        ))}
      </Card>
      <Modal
        title="Exercise Details"
        visible={isModalVisible}
        onCancel={handleCancel}
        width={1000}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
        ]}
      >
        <ExerciseDetails />
      </Modal>
    </>
  );
};

export default ShortcutExercises;
