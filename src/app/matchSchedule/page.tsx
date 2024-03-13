"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import AddMatch from "@/app/Components/scheduleCard/addMatch";
import Match from "@/app/Components/scheduleCard/match";
import styles from "./styles.module.css";
import {signOut } from "next-auth/react";


const MatchSchedule = () => {
  const [showAddMatch, setShowAddMatch] = useState(false);
  const [rows, setRows] = useState([]);

  const handleAddMatchClick = () => {
    setShowAddMatch(true);
  };
  useEffect(() => {
    fetch("api/matchSchedule")
      .then((res) => res.json())
      .then((data) => {
        const matchRows = data.result.rows;
        setRows(matchRows);
      });
  }, []);
  return (
    <div>
      <button className={styles.signOutButton} onClick={() => signOut()}>Sign Out</button>
      <h1>Match Schedule</h1>
      {rows.map((row: { match_id: string, home_team: string, away_team: string,time:string,  date:string, location:string }) => (
        <Match
          key={row.match_id}
          match_id={row.match_id}
          home_team={row.home_team}
          away_team={row.away_team}
          time={row.time}
          date={row.date}
          location={row.location}
        />
      ))}
      {!showAddMatch && (
        <button className={styles.addMatchButton}onClick={handleAddMatchClick}>Add Match</button>
      )}
      {showAddMatch && <AddMatch onClose={() => setShowAddMatch(false)} />}
    </div>
  );
};

export default MatchSchedule;
