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
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/play" element={<Game firebaseApp={firebaseApp} />} />
        {/* <Route path="/leadeboard" element={}></Route> */}
      </Routes>
    </Router>
  );
}

export default App;
