// pages/schedule.tsx
import React from "react";
import Image from "next/image";
const SchedulePage: React.FC = () => {
  // Sample schedule data
  const scheduleData = [
    {
      homeTeam: "Home Team 1",
      awayTeam: "Away Team 1",

      date: "2024-03-01",
      time: "15:00",
      location: "Stadium A",
      matchDay: 1,
    },
    {
      homeTeam: "Home Team 1",
      awayTeam: "Away Team 1",

      date: "2024-03-01",
      time: "15:00",
      location: "Stadium A",
      matchDay: 2,
    },
    {
      homeTeam: "Home Team 1",
      awayTeam: "Away Team 1",

      date: "2024-03-01",
      time: "15:00",
      location: "Stadium A",
      matchDay: 2,
    },
    {
      homeTeam: "Home Team 1",
      awayTeam: "Away Team 1",

      date: "2024-03-01",
      time: "15:00",
      location: "Stadium A",
      matchDay: 2,
    },
    // Add more schedule data as needed
  ];

  return (
    <div>
      <h1>Flagrant Fowl Futbol Association</h1>
      <h1>Schedule</h1>

      <table>
        <thead>
          <tr>
            <th>Teams</th>
            <th>Venue</th>
          </tr>
        </thead>
        <tbody>
          {scheduleData.map((match, index) => (
            <tr key={index}>
              <td>
                <span>{match.homeTeam}</span>
                <span> vs. </span>
                <span>{match.awayTeam}</span>
              </td>
              <td>
                <p>Date: {match.date}</p>
                <p>Time: {match.time}</p>
                <p>Location: {match.location}</p>
                <p>Match Day: {match.matchDay}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SchedulePage;
