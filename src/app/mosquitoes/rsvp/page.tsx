"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// structure of the player data
interface Player {
  playerid: number;
  playername: string;
  status: string | null; // status can either string or null
  date: string | null; // date can in string or null
}

// generate dynamic dates
const getDynamicDates = (): string[] => {
  let dates = [];
  for (let i = 1; i <= 4; i++) {
    let date = new Date();
    date.setDate(date.getDate() + i);
    dates.push(date.toISOString().split("T")[0]);
  }
  return dates;
};

const Page: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [dates, setDates] = useState<string[]>(getDynamicDates());

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch("/api/teams");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setPlayers(json.result.rows);
      } catch (error) {
        console.error("Error while fetching data from DB:", error);
      }
    };

    fetchPlayers();
  }, []);
  // Define the logic to handle status change
  const handleStatusChange = (
    playerId: number,
    date: string,
    newStatus: string
  ) => {
    // Implementation to update the player's status
    // This would involve setting state and/or making an API call to update the database
  };

  return (
    <div>
      <h1>Team Mosquitoes</h1>
      <p>State your availability for the next Match</p>
      <table>
        <thead>
          <tr>
            <th>Player Name</th>
            {dates.map((date, index) => (
              <th key={index}>{date}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.playerid}>
              <td>{player.playername}</td>
              {dates.map((date, index) => (
                <td key={index}>
                  <select
                    value={player.status || ""}
                    onChange={(e) =>
                      handleStatusChange(player.playerid, date, e.target.value)
                    }
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="If Needed">If Needed</option>
                    <option value="Pending">Pending</option>
                  </select>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
