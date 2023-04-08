import React, { useState, useEffect } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 59) {
          setSeconds(0);
          setMinutes(minutes + 1);
        } else {
          setSeconds(seconds + 1);
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <div>
      <h1>{`${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`}</h1>
      <button type="button" onClick={() => setIsActive(!isActive)}>
        {isActive ? "Stop" : "Start"}
      </button>
    </div>
  );
}

export default Timer;
