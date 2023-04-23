/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import "./styles/Leaderboard.css";
import { Link } from "react-router-dom";
import { getDoc, doc, collection, getFirestore } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

function Leaderboard({ correctPlayerIndex, firebaseApp }) {
  const [players, setPlayers] = useState([]);
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
    }
  }
  useEffect(() => {
    getLeaderboard();
  }, []);

  return (
    <div className="leaderboard">
      <h2 className="title">Leaderboard</h2>
      <ol type="1">
        {players.slice(0, 5).map(([player, time], index) => (
          <li key={uuidv4()} className="player">
            <span className="position">{index + 1}</span>
            <span className="name">{player}</span>
            <span className="time">{time}s</span>
          </li>
        ))}
      </ol>
      <span>You rank: {correctPlayerIndex + 1}</span>
      <Link to="/">
        <button type="button" className="go-home-btn">
          Go Home
        </button>
      </Link>
    </div>
  );
}

export default Leaderboard;
