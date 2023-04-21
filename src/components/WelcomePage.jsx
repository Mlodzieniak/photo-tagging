/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import ImageGallery from "./ImageGallery";

function WelcomePage({ setPlayerName }) {
  const [name, setName] = useState("");

  const handleInputChange = (event) => {
    setName(event.target.value);
  };
  const startGame = () => {
    setPlayerName(name);
    console.log(name);
  };

  const isNameValid = name.length >= 3;

  return (
    <div className="welcome-page">
      <h1 className="title">Welcome to Photo Tagging Game!</h1>
      <p className="description">
        Can you find the characters in our photos? Test your skills and compete
        against your friends.
      </p>
      <p className="description">
        Your object is to find the following characters:
      </p>
      <ImageGallery direction="row" />
      <div>
        <label htmlFor="playerName">
          Enter your name:
          <input
            id="playerName"
            type="text"
            value={name}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <Link to="/play">
        <button
          className="start-game-button"
          type="button"
          disabled={!isNameValid}
          onClick={startGame}
        >
          Start Game
        </button>
      </Link>
    </div>
  );
}
WelcomePage.propTypes = {
  setPlayerName: propTypes.func.isRequired,
};

export default WelcomePage;
