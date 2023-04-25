import React, { useState, useEffect } from "react";
import "./App.css";
import { collection, updateDoc, doc, getDoc } from "firebase/firestore";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { db, firebaseApp } from "./firebase";
import Game from "./components/Game";
import WelcomePage from "./components/WelcomePage";
import Leaderboard from "./components/Leaderboard";

function App() {
  const [player, setPlayer] = useState(null);
  const [time, setTime] = useState(null);

  const setPlayerName = (name) => {
    setPlayer(name);
  };
  const setPlayerTime = (playerTime) => {
    setTime(playerTime);
  };
  async function updateLeaderboard() {
    const leaderboard = await doc(collection(db, "leaderboard"), "leaderboard");
    updateDoc(leaderboard, { [player]: time });
  }
  async function getLeaderboard() {
    const leaderboard = await getDoc(
      doc(collection(db, "leaderboard"), "leaderboard")
    );
    if (leaderboard.exists()) {
      if (Object.prototype.hasOwnProperty.call(leaderboard.data(), player)) {
        if (leaderboard.data()[player] > time) {
          updateLeaderboard();
        }
      } else {
        updateLeaderboard();
      }
    }
  }

  useEffect(() => {
    if (player && time) getLeaderboard();
  }, [time]);

  return (
    <Router basename="/">
      <Routes>
        <Route
          path="/"
          element={<WelcomePage setPlayerName={setPlayerName} />}
        />
        <Route
          path="/play"
          element={
            <Game
              firebaseApp={firebaseApp}
              setPlayerTime={setPlayerTime}
              player={player}
            />
          }
        />
        <Route
          path="/leaderboard"
          element={
            <Leaderboard
              firebaseApp={firebaseApp}
              playerName={player}
              playerTime={time}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
