"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Row {
  hometeam: string;
  awayteam: string;
  date: string;
  time: string;
  location: string;
  matchday: number;
}

// TeamLogo component
const TeamLogo: React.FC<{ teamName: string }> = ({ teamName }) => (
  <p
    style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
  >
    <Image
      src={`/logos/${teamName}.jpeg`}
      alt={`Logo of ${teamName}`}
      width={25}
      height={25}
    />
    <span style={{ marginLeft: "8px" }}>{teamName}</span>
  </p>
);

export default function SchedulePage() {
  const [scheduleData, setScheduleData] = useState<Row[]>([]);
  const [filteredScheduleData, setFilteredScheduleData] = useState<Row[]>([]);

  const fetchScheduleData = async () => {
    try {
      const response = await fetch("/api/schedule-Table");
      const data = await response.json();
      setScheduleData(data.result.rows);
      setFilteredScheduleData(data.result.rows); // Set filtered data initially
    } catch (error) {
      console.error("Error fetching schedule data:", error);
    }
  };

  useEffect(() => {
    fetchScheduleData();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMatchDay = parseInt(event.target.value);
    let filteredData: Row[] = [];

    if (selectedMatchDay === 0) {
      // Show all match days
      filteredData = scheduleData;
    } else {
      // Filter based on selected match day
      filteredData = scheduleData.filter(
        (row) => row.matchday === selectedMatchDay
      );
    }

    setFilteredScheduleData(filteredData);
  };

  return (
    <div>
      <h1>Flagrant Fowl Futbol Association</h1>
      <h1>Schedule</h1>
      <select onChange={handleChange}>
        <option value="0">All Match Days</option>
        {Array.from(new Set(scheduleData.map((row) => row.matchday))).map(
          (matchday, index) => (
            <option key={index} value={matchday}>
              Match Day {matchday}
            </option>
          )
        )}
      </select>

      <table>
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>Teams</th>
            <th style={{ textAlign: "center" }}>Venue</th>
          </tr>
        </thead>
        <tbody>
          {filteredScheduleData.map((row, index) => (
            <tr key={index}>
              <td style={{ textAlign: "center" }}>
                <TeamLogo teamName={row.hometeam} />
                <p>
                  <span> vs. </span>
                </p>
                <TeamLogo teamName={row.awayteam} />
              </td>
              <td style={{ textAlign: "center" }}>
                <p>Date: {row.date}</p>
                <p>Time: {row.time}</p>
                <p>Location: {row.location}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
