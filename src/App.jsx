import React from "react";
import "./App.css";
import { initializeApp } from "firebase/app";

// import { useCollectionData } from "react-firebase-hooks/firestore";
import MainImage from "./components/MainImage";
import Timer from "./components/Timer";
import ImageGallery from "./components/ImageGallery";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyABksPd_kbV_p3647KCEEkj1yjgr4Hgkmc",
  authDomain: "photo-tagging-app-be03b.firebaseapp.com",
  projectId: "photo-tagging-app-be03b",
  storageBucket: "photo-tagging-app-be03b.appspot.com",
  messagingSenderId: "396255562252",
  appId: "1:396255562252:web:6f5909cfe719802d263c29",
  measurementId: "G-R21BFDEG1T",
});
// const db = firebase.firestore();
function App() {
  return (
    <div className="App">
      <h1>Hello World!</h1>
      <ImageGallery firebaseApp={firebaseApp} />
      <Timer />
      <MainImage />
    </div>
  );
}

export default App;
