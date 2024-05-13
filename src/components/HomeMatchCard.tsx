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
  location: number;
}) {
  const [home_team, setHomeTeam] = useState(InitialHomeTeamId);
  const [away_team, setAwayTeam] = useState(initialAwayTeamId);
  const [time, setTime] = useState(initialTime);
  const [date, setDate] = useState(initialDate);
  const [location, setLocation] = useState(initialLocation);
  const [teamNames, setTeamNames] = useState<{ [key: number]: string }>({});
  const [locationNames, setLocationNames] = useState<{ [key: number]: string }>(
    {}
  );

  useEffect(() => {
    const fetchMatchData = async () => {
      const homeTeamName = await fetchTeamName(home_team);
      const awayTeamName = await fetchTeamName(away_team);
      const locationName = await fetchLocationName(location);
      setTeamNames({
        [home_team]: homeTeamName,
        [away_team]: awayTeamName,
      });
      setLocationNames({ [location]: locationName });
    };

    fetchMatchData();
  }, [home_team, away_team, location]);

  const fetchTeamName = async (teamId: number) => {
    const response = await fetch(`/api/getTeamNameById?teamId=${teamId}`);
    const data = await response.json();
    return data.teamName;
  };

  const fetchLocationName = async (locationId: number) => {
    const response = await fetch(
      `/api/getLocationNameById?locationId=${locationId}`
    );
    const data = await response.json();
    return data.locationName;
  };

  return (
    <div className={styles.card}>
      <h2>Match {match_id}</h2>
      <div className={styles.teamContainer}>
        <div className={styles.team}>
          <p>Home Team</p>
          <Image
            src={`/logos/${teamNames[home_team]}.jpeg`}
            alt={`Logo of ${home_team}`}
            width={100}
            height={100}
            className={styles.logo}
          />
          <p>{teamNames[home_team]}</p>
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
            src={`/logos/${teamNames[away_team]}.jpeg`}
            alt={`Logo of ${away_team}`}
            width={100}
            height={100}
            className={styles.logo}
          />
          <p>{teamNames[away_team]}</p>
        </div>
      </div>
      <p>Time: {time}</p>
      <p>Date: {new Date(date).toLocaleDateString()}</p>
      <p>Location: {locationNames[location]}</p>
    </div>
  );
}
