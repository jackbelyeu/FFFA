"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

function Schedule() {
  const [scheduleData, setScheduleData] = useState([]);
  const [rosterData, setRosterData] = useState([]);

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const response = await fetch("/api/get-schmosquitoes");
        const data = await response.json();
        setScheduleData(data.result.rows);
      } catch (error) {
        console.error("Error fetching schedule data:", error);
      }
    };

    const fetchRosterData = async () => {
      try {
        const response = await fetch("/api/get-mosquitoes");
        const data = await response.json();
        setRosterData(data.result.rows);
      } catch (error) {
        console.error("Error fetching roster data:", error);
      }
    };

    fetchScheduleData();
    fetchRosterData();
  }, []); // Empty dependency array ensures the effect runs once on mount

  return (
    <div>
      <h1>Team Mosquitoes</h1>
      <h1>Roster</h1>
      <table>
        <thead>
          <tr>
            <th>Player ID</th>
            <th>Player Name</th>
            <th>Team Name</th>
          </tr>
        </thead>
        <tbody>
          {rosterData.map((player) => (
            <tr key={player.playerid}>
              <td>{player.playerid}</td>
              <td>{player.player_name}</td>
              <td>{player.team_name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1>Schedule</h1>

      <table>
        <thead>
          <tr>
            <th>Home Team</th>
            <th>Away Team</th>
            <th>Match Date</th>
            <th>Match Time</th>
            <th>Location</th>
            <th>Match Day</th>
            <th>Match ID</th>
          </tr>
        </thead>
        <tbody>
          {scheduleData.map((match) => (
            <tr key={match.matchdate}>
              <td>{match.hometeam}</td>
              <td>{match.awayteam}</td>
              <td>{match.matchdate}</td>
              <td>{match.matchtime}</td>
              <td>{match.location}</td>
              <td>{match.matchday}</td>
              <td>{match.matchid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Schedule;
