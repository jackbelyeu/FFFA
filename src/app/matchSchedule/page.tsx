"use client";
import React, { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import AddMatch from "@/app/Components/scheduleCard/addMatch";
import Match from "@/app/Components/scheduleCard/match";
import styles from "./styles.module.css";

const MatchSchedule = () => {
  const [showAddMatch, setShowAddMatch] = useState(false);
  const [rows, setRows] = useState([]);
  const [todayMatches, setTodayMatches] = useState([]);
  const [pastMatches, setPastMatches] = useState([]);
  const [futureMatches, setFutureMatches] = useState([]);

  const handleAddMatchClick = () => {
    setShowAddMatch(true);
  };

  useEffect(() => {
    fetch("api/matchSchedule")
      .then((res) => res.json())
      .then((data) => {
        const matchRows = data.result.rows;
        setRows(matchRows);
        const today = new Date();
        const todayDate = today.toISOString().substring(0, 10);
        const todayMatches = matchRows.filter(
          (row: any) => row.date.substring(0, 10) === todayDate
        );
        setTodayMatches(todayMatches);
        const pastMatches = matchRows.filter(
          (row: any) => row.date.substring(0, 10) < todayDate
        );
        setPastMatches(pastMatches);
        const futureMatches = matchRows.filter(
          (row: any) => row.date.substring(0, 10) > todayDate
        );
        setFutureMatches(futureMatches);
      });
  }, []);

  return (
    <div>
      <button className={styles.signOutButton} onClick={() => signOut()}>
        Sign Out
      </button>
      <h1>Match Schedule</h1>

      {todayMatches.length > 0 && (
        <>
          <h2>Today&apos;s Matches</h2>
          {todayMatches.map((row: any) => (
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
        </>
      )}

      {futureMatches.length > 0 && (
        <>
          <h2>Upcoming Matches</h2>
          {futureMatches.map((row: any) => (
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
        </>
      )}

      {pastMatches.length > 0 && (
        <>
          <h2>Past Matches</h2>
          {pastMatches.map((row: any) => (
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
        </>
      )}
      {!showAddMatch && (
        <button className={styles.addMatchButton} onClick={handleAddMatchClick}>
          Add Match
        </button>
      )}
      {showAddMatch && <AddMatch onClose={() => setShowAddMatch(false)} />}
    </div>
  );
};

export default MatchSchedule;
