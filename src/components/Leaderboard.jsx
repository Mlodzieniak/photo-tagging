/* eslint-disable react/prop-types */
import React from "react";
import "./styles/Leaderboard.css";

function Leaderboard({ players, correctPlayerIndex }) {
  return (
    <div className="leaderboard">
      <h2 className="title">Leaderboard</h2>
      {players.map((player, index) => (
        <div
          key={player.id}
          className={`player ${
            index === correctPlayerIndex ? "correct-player" : ""
          }`}
        >
          <span className="position">{index + 1}</span>
          <span className="name">{player.name}</span>
          <span className="time">
            {player.time.minutes}m {player.time.seconds}s
          </span>
        </div>
      ))}
    </div>
  );
}

export default Leaderboard;
