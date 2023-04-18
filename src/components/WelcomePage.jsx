import React from "react";
import { Link } from "react-router-dom";
import ImageGallery from "./ImageGallery";

function WelcomePage() {
  return (
    <div className="welcome-page">
      <h1 className="title">Welcome to Photo Tagging Game!</h1>
      <p className="description">
        Can you identify the objects in our photos? Test your skills and compete
        against your friends.
      </p>
      <p className="description">
        Your object is to find following characters:
      </p>
      <ImageGallery />
      <Link to="/play">
        <button className="start-game-button" type="button">
          Start Game
        </button>
      </Link>
    </div>
  );
}

export default WelcomePage;
