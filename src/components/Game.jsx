/* eslint-disable react/prop-types */
import React from "react";
import MainImage from "./MainImage";
import Timer from "./Timer";
import ImageGallery from "./ImageGallery";

function Game({ firebaseApp }) {
  return (
    <div className="App">
      <Timer />

      <div className="gallery-mainimage-wrapper">
        <ImageGallery firebaseApp={firebaseApp} />
        <MainImage />
      </div>
    </div>
  );
}

export default Game;
