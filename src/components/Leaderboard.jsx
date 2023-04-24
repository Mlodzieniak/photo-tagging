/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import "./styles/Leaderboard.css";
import { Link } from "react-router-dom";
import { getDoc, doc, collection, getFirestore } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

function Leaderboard({ firebaseApp, playerName, playerTime }) {
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(null);

  const db = getFirestore(firebaseApp);
  async function getLeaderboard() {
    const leaderboard = await getDoc(
      doc(collection(db, "leaderboard"), "leaderboard")
    );
    if (leaderboard.exists()) {
      const unsortedPlayers = leaderboard.data();
      const sortedPlayers = Object.entries(unsortedPlayers).sort(
        (a, b) => a[1] - b[1]
      );

      // sortedPlayers is now an array of arrays, with each sub-array containing a player key-value pair
      setPlayers(sortedPlayers);
      const index = sortedPlayers.findIndex((x) => x[0] === playerName);
      setCurrentPlayerIndex(index);
    }
  }
  useEffect(() => {
    getLeaderboard();
  }, []);

  return (
    <div className="leaderboard">
      <h2 className="title">Leaderboard</h2>
      <ol type="1" className="top10">
        {players.slice(0, 10).map(([player, time], index) => (
          <li
            key={uuidv4()}
            className={`player ${
              index === currentPlayerIndex ? "correct-player" : null
            }`}
          >
            <span className="position">{index + 1}</span>
            <span className="name">{player}</span>
            <span className="time">{time}s</span>
          </li>
        ))}
        {currentPlayerIndex > 10 ? (
          <li key={uuidv4()} className="player correct-player">
            <span className="position">{currentPlayerIndex + 1}</span>
            <span className="name">{playerName}</span>
            <span className="time">{playerTime}s</span>
          </li>
        ) : null}
      </ol>
      {/* <span>You rank: {currentPlayerIndex + 1}</span> */}

      <Link to="/">
        <button type="button" className="play-again-btn go-home-btn">
          Go Home
        </button>
      </Link>
    </div>
  );
}

export default Leaderboard;
