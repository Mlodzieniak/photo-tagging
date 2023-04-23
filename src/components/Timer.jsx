/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from "react";
import propTypes from "prop-types";

function Timer({ stopTimer, setPlayerTime, rounds }) {
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
  useEffect(() => {
    setIsActive(true);
  }, []);
  useEffect(() => {
    if (stopTimer) {
      setIsActive(false);
      const totalTime = minutes * 60 + seconds;
      setPlayerTime(totalTime);
    }
  }, [stopTimer]);
  useEffect(() => {
    setMinutes(0);
    setSeconds(0);
    setIsActive(true);
  }, [rounds]);

  return (
    <div>
      <h1>{`${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`}</h1>
    </div>
  );
}
Timer.propTypes = {
  stopTimer: propTypes.bool.isRequired,
  setPlayerTime: propTypes.func.isRequired,
  rounds: propTypes.number.isRequired,
};

export default Timer;
