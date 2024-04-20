"use client";
import styles from "./addMatch.module.css";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Button from "react-bootstrap/Button";
import { toast } from "sonner";

interface AddMatchProps {
  onClose: () => void;
}

const AddMatch: React.FC<AddMatchProps> = ({ onClose }) => {
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [locations, setLocations] = useState<string[]>([]);
  const [teams, setTeams] = useState<string[]>([]);
  const [location, setLocation] = useState("");

  useEffect(() => {
    fetch("/api/teams")
      .then((res) => res.json())
      .then((data) => {
        setTeams(data.teams);
      });
    fetch("/api/locations")
      .then((res) => res.json())
      .then((data) => {
        setLocations(data.locations);
      });
  }, []);
  const addMatch = () => {
    if (!homeTeam || !awayTeam || !time || !date || !location) {
      alert("Please fill all the fields");
      return;
    }
    fetch("/api/matchSchedule", {
      method: "POST",
      body: JSON.stringify({
        homeTeam,
        awayTeam,
        time,
        date,
        location,
      }),
    });
    onClose();
    toast.success("Match added successfully");
  };
  const handleHomeTeamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setHomeTeam(e.target.value);
  };
  const handleAwayTeamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAwayTeam(e.target.value);
  };
  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocation(e.target.value);
  };

  return (
    <div className={styles.card}>
      <Button id="close" onClick={onClose} variant="danger">
        X
      </Button>
      <h2> Add Match</h2>
      <p>
        <Image
          src={`/logos/${homeTeam}.jpeg`}
          alt={`Logo of ${homeTeam}`}
          width={100}
          height={100}
          className={styles.logo}
        />
        <br />
        Home Team :
        <select value={homeTeam} onChange={handleHomeTeamChange}>
          <option value="">Select Home Team</option>
          {teams.map((team) => (
            <option key={team} value={team}>
              {team}
            </option>
          ))}
        </select>
        <br />
        vs
        <br />
        <Image
          src={`/logos/${awayTeam}.jpeg`}
          alt={`Logo of ${awayTeam}`}
          width={100}
          height={100}
          className={styles.logo}
        />
        <br />
        Away Team :
        <select value={awayTeam} onChange={handleAwayTeamChange}>
          <option value="">Select Away Team</option>
          {teams
            .filter((team) => team !== homeTeam)
            .map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
        </select>
      </p>
      <p>
        Time:
        <input type="time" onChange={(e) => setTime(e.target.value)} />
      </p>
      <p>
        Date:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </p>
      <p>
        Location:
        <select value={location} onChange={handleLocationChange}>
          <option value="">Select Location</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </p>
      <Button variant="success" onClick={addMatch}>
        Save
      </Button>
    </div>
  );
};

export default AddMatch;
