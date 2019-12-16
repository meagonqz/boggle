import React, { useState, useEffect } from "react";
import "./stylesheets/Timer.css";

const Timer = ({ totalTime, timesUp }) => {
  const [time, setTime] = useState(totalTime);
  useEffect(
    () => {
      if (time === 0) {
        timesUp();
        setTime(totalTime);
      }
      const timer = setInterval(() => setTime(time => time - 1), 1000);
      return () => clearInterval(timer);
    },
    [time]
  );
  return <div className="Timer">{time}</div>;
};
export default Timer;
