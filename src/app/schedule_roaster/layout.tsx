"use client";
import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import ScheduleRoasterContent from "./ScheduleRoasterContent";

const ScheduleRoasterLayout: React.FC = () => {
  const [team, setTeam] = useState<string>("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const teamParam = urlParams.get("team");
    if (teamParam) {
      setTeam(teamParam);
    }
  }, []);

  const teams = [
    { name: "Teams" },
    { name: "Mosquitoes" },
    { name: "Hyenas" },
    { name: "Grasskickers" },
    { name: "Emus" },
    { name: "PCFC" },
    { name: "Mockingbirds" },
  ];

  const handleTeamChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTeam = event.target.value;
    setTeam(selectedTeam);

    // Update the URL with the selected team
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('team', selectedTeam);
    window.history.pushState({ path: newUrl.href }, '', newUrl.href);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.heading}>
          <span className={styles.footballIcon}>&#9917;</span> Schedule & Roster
        </h1>
      </header>
      <div className={styles.teamSelection}>
        <label htmlFor="teamDropdown" className={styles.label}>
          Select a Team:
        </label>
        <select
          id="teamDropdown"
          onChange={handleTeamChange}
          value={team}
          className={styles.dropdown}
        >
          {teams.map((team, index) => (
            <option key={index} value={team.name}>
              {team.name}
            </option>
          ))}
        </select>
      </div>
      {team && <ScheduleRoasterContent team={team} />}
    </div>
  );
};

export default ScheduleRoasterLayout;