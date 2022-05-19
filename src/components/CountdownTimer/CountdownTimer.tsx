import Text from "antd/lib/typography/Text";
import React, { useEffect, useState } from "react";

interface Props {
  timerInMinute: number;
}
const CountdownTimer = ({ timerInMinute }: Props) => {
  const initialTimer = {
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  if (timerInMinute >= 60) {
    initialTimer.hours = Math.floor(timerInMinute / 60);
    initialTimer.minutes = timerInMinute % 60;
  } else if (timerInMinute < 60) {
    initialTimer.hours = 0;
    initialTimer.minutes = timerInMinute;
  }

  const [timer, setTimer] = useState(initialTimer);

  const [displayTimer, setDisplayTimer] = useState({
    hours:
      timer.hours.toString().length < 2
        ? "0" + timer.hours
        : timer.hours.toString(),
    minutes:
      timer.minutes.toString().length < 2
        ? "0" + timer.minutes
        : timer.minutes.toString(),
    seconds:
      timer.seconds.toString().length < 2
        ? "0" + timer.seconds
        : timer.seconds.toString(),
  });

  const [isTimeOver, setIsTimeOver] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      let { hours, minutes, seconds } = timer;
      if (hours === 0 && minutes === 0 && seconds === 0) {
        setIsTimeOver(true);
        return;
      }
      if (seconds === 0) {
        seconds = 59;
        minutes--;
        if (minutes === 0 && hours !== 0) {
          minutes = 59;
          if (hours > 0) {
            hours--;
          }
        }
      }
      seconds--;
      setTimer({ hours, minutes, seconds });
      if (hours.toString().length < 2) {
        setDisplayTimer({
          hours: "0" + hours.toString(),
          minutes: minutes.toString(),
          seconds: seconds.toString(),
        });
      }
      if (minutes.toString().length < 2) {
        setDisplayTimer({
          hours: "0" + hours.toString(),
          minutes: "0" + minutes.toString(),
          seconds: seconds.toString(),
        });
      }
      if (seconds.toString().length < 2) {
        setDisplayTimer({
          ...displayTimer,
          seconds: "0" + seconds.toString(),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, displayTimer]);

  return (
    <div>
      <span>
        {!isTimeOver && (
          <Text type="success" className="font-bold">
            {displayTimer.hours} : {displayTimer.minutes} :{" "}
            {displayTimer.seconds}
          </Text>
        )}
        {isTimeOver && (
          <Text className="text-md font-bold" type="danger">
            Time is over
          </Text>
        )}
      </span>
    </div>
  );
};

export default CountdownTimer;
