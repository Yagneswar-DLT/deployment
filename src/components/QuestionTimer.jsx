import { useEffect, useState } from "react";

export default function QuestionTimer({ timeOut, onTimeout, mode }) {
  const [remainingTime, setRemainingTime] = useState(timeOut);

  useEffect(() => {
    const timerr = setTimeout(onTimeout, timeOut);

    return () => {
      clearTimeout(timerr);
    };
  }, [timeOut, onTimeout]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prev) => prev - 100);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <progress
      id="question-time"
      max={timeOut}
      value={remainingTime}
      className={mode}
    />
  );
}
