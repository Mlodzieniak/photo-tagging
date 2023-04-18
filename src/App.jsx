import React from "react";
import "./App.css";
import { initializeApp } from "firebase/app";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

// import { useCollectionData } from "react-firebase-hooks/firestore";
// import MainImage from "./components/MainImage";
// import Timer from "./components/Timer";
// import ImageGallery from "./components/ImageGallery";
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
const players = [
  { id: "CHUHCUCJ", name: "DOMINIK", time: { minutes: 1, seconds: 4 } },
  { id: "duffd", name: "Milena", time: { minutes: 2, seconds: 40 } },
];
function App() {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/play" element={<Game firebaseApp={firebaseApp} />} />
        <Route
          path="/leaderboard"
          element={<Leaderboard players={players} correctPlayerIndex={1} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
