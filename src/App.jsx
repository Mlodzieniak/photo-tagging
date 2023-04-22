import React, { useState, useEffect } from "react";
import "./App.css";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, updateDoc, doc } from "firebase/firestore";
import {
  HashRouter as Router,
  Routes,
  Route,
  // useNavigate,
} from "react-router-dom";
import Game from "./components/Game";
import WelcomePage from "./components/WelcomePage";
import Leaderboard from "./components/Leaderboard";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyABksPd_kbV_p3647KCEEkj1yjgr4Hgkmc",
  authDomain: "photo-tagging-app-be03b.firebaseapp.com",
  projectId: "photo-tagging-app-be03b",
  storageBucket: "photo-tagging-app-be03b.appspot.com",
  messagingSenderId: "396255562252",
  appId: "1:396255562252:web:6f5909cfe719802d263c29",
  measurementId: "G-R21BFDEG1T",
});

function App() {
  const [player, setPlayer] = useState(null);
  const [time, setTime] = useState(null);
  // const navigate = useNavigate();
  const setPlayerName = (name) => {
    setPlayer(name);
  };
  const setPlayerTime = (playerTime) => {
    setTime(playerTime);
  };
  const db = getFirestore(firebaseApp);
  useEffect(() => {
    async function updateLeaderboard() {
      const leaderboard = await doc(
        collection(db, "leaderboard"),
        "leaderboard"
      );
      updateDoc(leaderboard, { [player]: time });
    }
    if (player && time) updateLeaderboard();
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
            <Leaderboard firebaseApp={firebaseApp} correctPlayerIndex={1} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
