import React, { useState, useEffect } from "react";
import styles from "./addMatch.module.css";
import Image from "next/image";

export default function Match({
  match_id,
  home_team: initialHomeTeam,
  away_team: initialAwayTeam,
  time: initialTime,
  date: initialDate,
  location: initialLocation,
}: {
  match_id: string;
  home_team: string;
  away_team: string;
  time: string;
  date: string;
  location: string;
}) {
  const [home_team, setHomeTeam] = useState(initialHomeTeam);
  const [away_team, setAwayTeam] = useState(initialAwayTeam);
  const [time, setTime] = useState(initialTime);
  const [date, setDate] = useState(initialDate);
  const [location, setLocation] = useState(initialLocation);
  const [teams, setTeams] = useState<string[]>([]);
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [scoresSubmitted, setScoresSubmitted] = useState(false);

  useEffect(() => {
    fetch("/api/teams")
      .then((res) => res.json())
      .then((data) => {
        setTeams(data.uniqueTeams);
        setHomeTeam(initialHomeTeam);
      });

    fetch("/api/matchSchedule")
      .then((res) => res.json())
      .then((data) => {
        const matchRows = data.result.rows;
        matchRows.forEach(
          (row: {
            match_id: string;
            home_team: string;
            away_team: string;
            home_score: number;
            away_score: number;
          }) => {
            if (row.match_id === match_id) {
              setHomeScore(row.home_score);
              setAwayScore(row.away_score);
            }
          }
        );
      });
  }, [
    initialHomeTeam,
    initialAwayTeam,
    initialTime,
    initialDate,
    initialLocation,
    match_id,
  ]);

  return (
    <div className={styles.card}>
      <h2>Match {match_id}</h2>
      <div className={styles.teamContainer}>
        <div className={styles.team}>
          <p>Home Team</p>
          <Image
            src={`/logos/${home_team}.jpeg`}
            alt={`Logo of ${home_team}`}
            width={100}
            height={100}
            className={styles.logo}
          />
          <p>{home_team.toUpperCase()}</p>
        </div>
        <div>
          <Image
            src={`/images/vs.png`}
            alt={`Logo of ${home_team}`}
            width={100}
            height={100}
            className={styles.logo}
          />
        </div>
        <div className={styles.team}>
          <p>Away Team</p>
          <Image
            src={`/logos/${away_team}.jpeg`}
            alt={`Logo of ${away_team}`}
            width={100}
            height={100}
            className={styles.logo}
          />
          <p>{away_team.toUpperCase()}</p>
        </div>
      </div>
      <p>Time: {time}</p>
      <p>Date: {new Date(date).toLocaleDateString()}</p>
      <p>Location: {location}</p>
    </div>
  );
}
