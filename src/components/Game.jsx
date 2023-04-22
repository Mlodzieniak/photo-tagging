/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import MainImage from "./MainImage";
import Timer from "./Timer";
import ImageGallery from "./ImageGallery";

function Game({ firebaseApp, setPlayerTime }) {
  // Game logic
  const [foundChar, setFoundChar] = useState([]);
  const [timerRuns, setTimerRuns] = useState(true);
  const stopTimer = () => {
    setTimerRuns(false);
  };
  const checkWin = () => {
    if (foundChar.length === 3) {
      stopTimer();
    }
  };
  const addCharacter = (char) => {
    if (!foundChar.includes(char)) {
      setFoundChar([...foundChar, char]);
    }
  };

  useEffect(() => {
    checkWin();
  }, [foundChar]);

  return (
    <div className="App">
      <Timer stopTimer={!timerRuns} setPlayerTime={setPlayerTime} />

      <div className="gallery-mainimage-wrapper">
        <ImageGallery
          firebaseApp={firebaseApp}
          foundChar={foundChar}
          direction="column"
        />
        <MainImage firebaseApp={firebaseApp} addCharacter={addCharacter} />
      </div>
    </div>
  );
}

export default Game;
