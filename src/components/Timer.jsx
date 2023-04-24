/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from "react";
import propTypes from "prop-types";

function Timer({ stopTimer, setPlayerTime, rounds }) {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [mSeconds, setMSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        if (mSeconds === 9) {
          setMSeconds(0);
          setSeconds(seconds + 1);
        } else if (seconds === 59) {
          setSeconds(0);
          setMinutes(minutes + 1);
        } else {
          setMSeconds(mSeconds + 1);
        }
      }, 100);
    } else if (!isActive && mSeconds !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, mSeconds, seconds]);

  useEffect(() => {
    setIsActive(true);
  }, []);
  useEffect(() => {
    if (stopTimer) {
      setIsActive(false);
      setPlayerTime(minutes * 60 + seconds + mSeconds / 10);
    }
  }, [stopTimer]);
  useEffect(() => {
    setMSeconds(0);
    setSeconds(0);
    setMinutes(0);
    setIsActive(true);
  }, [rounds]);

  return (
    <div>
      <h1>{`${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}.${mSeconds.toString()}`}</h1>
    </div>
  );
}
Timer.propTypes = {
  stopTimer: propTypes.bool.isRequired,
  setPlayerTime: propTypes.func.isRequired,
  rounds: propTypes.number.isRequired,
};

export default Timer;
