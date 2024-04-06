import React, { useState, useEffect } from "react";
import styles from "./addMatch.module.css";
import Image from "next/image";

export default function Match({
  match_id,
  home_team: InitialHomeTeamId,
  away_team: initialAwayTeamId,
  time: initialTime,
  date: initialDate,
  location: initialLocation,
}: {
  match_id: string;
  home_team: number;
  away_team: number;
  time: string;
  date: string;
  location: string;
}) {
  const [home_team, setHomeTeam] = useState(InitialHomeTeamId);
  const [away_team, setAwayTeam] = useState(initialAwayTeamId);
  const [time, setTime] = useState(initialTime);
  const [date, setDate] = useState(initialDate);
  const [location, setLocation] = useState(initialLocation);
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);

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
          <p>{home_team}</p>
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
          <p>{away_team}</p>
        </div>
      </div>
      <p>Time: {time}</p>
      <p>Date: {new Date(date).toLocaleDateString()}</p>
      <p>Location: {location}</p>
    </div>
  );
}
