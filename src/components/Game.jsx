/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import MainImage from "./MainImage";
import Timer from "./Timer";
import ImageGallery from "./ImageGallery";

function Game({ firebaseApp, setPlayerTime, player }) {
  const [foundChar, setFoundChar] = useState([]);
  const [timerRuns, setTimerRuns] = useState(true);
  const [rounds, setRounds] = useState(0);
  const navigate = useNavigate();
  const dialogRef = useRef();

  const stopTimer = () => {
    setTimerRuns(false);
  };

  const checkWin = () => {
    if (foundChar.length === 3) {
      stopTimer();
      dialogRef.current.showModal();
    }
  };

  const addCharacter = (char) => {
    if (!foundChar.includes(char)) {
      setFoundChar([...foundChar, char]);
    }
  };
  const resetGame = () => {
    setFoundChar([]);
    setRounds(rounds + 1);
    setTimerRuns(true);
    dialogRef.current.close();
  };

  useEffect(() => {
    checkWin();
  }, [foundChar]);

  useEffect(() => {
    if (window.location.hash === "#/play" && !player) {
      navigate("/");
    }
  }, [player]);

  return (
    <div className="App">
      <Timer
        stopTimer={!timerRuns}
        setPlayerTime={setPlayerTime}
        rounds={rounds}
      />

      <div className="gallery-mainimage-wrapper">
        <ImageGallery
          firebaseApp={firebaseApp}
          foundChar={foundChar}
          direction="column"
        />
        <MainImage firebaseApp={firebaseApp} addCharacter={addCharacter} />
      </div>

      <dialog className="endgame-dialog" ref={dialogRef}>
        <button type="button" className="play-again-btn" onClick={resetGame}>
          Play again
        </button>
        <Link to="/leaderboard">
          <button type="button" className="leaderboard-btn">
            To leaderboard
          </button>
        </Link>
      </dialog>
    </div>
  );
}

export default Game;
