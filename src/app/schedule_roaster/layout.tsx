"use client"
import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";

const ScheduleRoasterLayout: React.FC<{ team: string }> = ({ team }) => {
  const [selectedTeam, setSelectedTeam] = useState<string>(team ? team.toString() : "");
  const [scheduleData, setScheduleData] = useState<any[]>([]);
  const [rosterData, setRosterData] = useState<any[]>([]); 
  const urlParams = new URLSearchParams(window.location.search);
  const teamParam = urlParams.get('team');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const teamParam = urlParams.get('team');
    if (teamParam) {
      const formattedTeam = teamParam.charAt(0).toUpperCase() + teamParam.slice(1).toLowerCase();
      setSelectedTeam(formattedTeam);
      fetchScheduleAndRosterData(formattedTeam);
    }
  }, []);

  // Function to fetch schedule and roster data
const fetchScheduleAndRosterData = async (teamName:string) => {
  try {
    const scheduleResponse = await fetch(`/api/sch1?teamName=${teamName}`);
    const scheduleData = await scheduleResponse.json();
    setScheduleData(scheduleData.result.rows);

    const rosterResponse = await fetch(`/api/roster1?teamName=${teamName}`);
    const rosterData = await rosterResponse.json();
    setRosterData(rosterData.result.rows);
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};

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
    const team = event.target.value;
    setSelectedTeam(team);
    if (team !== "Teams") {
      try {
        const response = await fetch(`/api/sch1?teamName=${team}`);
        const data = await response.json();
        setScheduleData(data.result.rows);

        const rosterResponse = await fetch(`/api/roster1?teamName=${team}`);
        const rosterData = await rosterResponse.json();
        setRosterData(rosterData.result.rows);

        // Update the URL with the selected team
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set('team', team);
        window.history.pushState({ path: newUrl.href }, '', newUrl.href);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      setScheduleData([]);
      setRosterData([]);

      // If the "Teams" option is selected, remove the team parameter from the URL
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete('team');
      window.history.pushState({ path: newUrl.href }, '', newUrl.href);
    }
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
          value={selectedTeam}
          className={styles.dropdown}
        >
          {teams.map((team, index) => (
            <option key={index} value={team.name}>
              {team.name}
            </option>
          ))}
        </select>
      </div>
      {selectedTeam !== "Teams" && (
        <div className={styles.content}>
          <div className={styles.scheduleSection}>
            <h2 className={styles.sectionHeading}>
              <span className={styles.footballIcon}>&#9917;</span> Schedule for {selectedTeam}
            </h2>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Opponent</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {scheduleData &&
                  scheduleData.map((game, index) => (
                    <tr key={index}>
                      <td>{game.matchdate}</td>
                      <td>{game.matchtime}</td>
                      <td>{game.hometeam == selectedTeam || game.hometeam == teamParam ? game.awayteam : game.hometeam}</td>
                      <td>{game.location}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className={styles.rosterSection}>
            <h2 className={styles.sectionHeading}>
              <span className={styles.footballIcon}>&#9917;</span> Roster for {selectedTeam}
            </h2>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Player ID</th>
                  <th>Player Name</th>
                  <th>Oct 8</th>
                  <th>Oct 15</th>
                  <th>Oct 22</th>
                  <th>Oct 29</th>
                  <th>Nov 5</th>
                  <th>Nov 12</th>
                  <th>Nov 19</th>
                  <th>Nov 26</th>
                  <th>Commitment</th>
                  <th>Position</th>
                  <th>Previous Club</th>
                </tr>
              </thead>
              <tbody>
                {rosterData &&
                  rosterData.map((player, index) => (
                    <tr key={index}>
                      <td>{player.id}</td>
                      <td>{player.player_name}</td>
                      <td>{player.oct_8}</td>
                      <td>{player.oct_15}</td>
                      <td>{player.oct_22}</td>
                      <td>{player.oct_29}</td>
                      <td>{player.nov_5}</td>
                      <td>{player.nov_12}</td>
                      <td>{player.nov_19}</td>
                      <td>{player.nov_26}</td>
                      <td>{player.commitment}</td>
                      <td>{player.position}</td>
                      <td>{player.previous_club}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleRoasterLayout;