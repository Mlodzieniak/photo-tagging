/* eslint-disable react/prop-types */
import React from "react";
import MainImage from "./MainImage";
import Timer from "./Timer";
import ImageGallery from "./ImageGallery";

function Game({ firebaseApp }) {
  return (
    <div className="App">
      <ImageGallery firebaseApp={firebaseApp} />
      <Timer />
      <MainImage />
    </div>
  );
}

export default Game;
