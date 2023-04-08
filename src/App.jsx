import React from "react";
import "./App.css";
import firebase from "firebase/compat/app";
import "firebase/firestore";
// import { useCollectionData } from "react-firebase-hooks/firestore";
import MainImage from "./components/MainImage";

firebase.initializeApp({
  apiKey: "AIzaSyABksPd_kbV_p3647KCEEkj1yjgr4Hgkmc",
  authDomain: "photo-tagging-app-be03b.firebaseapp.com",
  projectId: "photo-tagging-app-be03b",
  storageBucket: "photo-tagging-app-be03b.appspot.com",
  messagingSenderId: "396255562252",
  appId: "1:396255562252:web:6f5909cfe719802d263c29",
  measurementId: "G-R21BFDEG1T",
});
const db = firebase.firestore();
function App() {
  return (
    <div className="App">
      <h1>Hello World!</h1>
      <MainImage />
    </div>
  );
}

export default App;
