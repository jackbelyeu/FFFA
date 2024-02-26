"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// structure of the player data
interface Player {
  playerid: number;
  playername: string;
  status: string | null; // status can either string or null
  date: Date | null; // date can in string or null
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
  interface Availability {
    [key: string]: string;
  }

  const [availability, setAvailability] = useState<Availability>({});

  //fetch player from DB
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch("/api/hyenas");
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
    setAvailability((prev) => ({
      ...prev,
      [`${playerId}_${date}`]: newStatus,
    }));
    //saveStatus(playerId, date, newStatus);
  };

  //save the options
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Convert the availability state into an array of updates
    const updates = Object.entries(availability).map(([key, status]) => {
      const [playerId, date] = key.split("_");
      return {
        playerId: parseInt(playerId, 10), // Convert playerId back to a number
        date,
        status,
      };
    });

    // Filter out any entries where a status hasn't been selected (if "Select" is a default or placeholder value)
    const validUpdates = updates.filter((update) => update.status !== "Select");

    // Assuming your API can handle an array of updates
    try {
      const response = await fetch("/api/update-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validUpdates),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Handle the response
      const result = await response.json();
      console.log("Availability updated successfully:", result);
      // Here you can handle post-update logic, such as notifying the user of success
    } catch (error) {
      console.error("Error while updating availability:", error);
      // Here you should handle errors, such as notifying the user of failure
    }
  };

  return (
    <div>
      <h1>Team Hyenas</h1>
      <p>State your availability for the next Match</p>
      <form onSubmit={handleSubmit}>
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
                {dates.map((date) => (
                  <td key={date}>
                    <select
                      value={availability[`${player.playerid}_${date}`] || ""}
                      onChange={(e) =>
                        handleStatusChange(
                          player.playerid,
                          date,
                          e.target.value
                        )
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
        <button type="submit">Submit Availability</button>
      </form>
    </div>
  );
};

export default Page;
