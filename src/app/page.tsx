"use client";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

interface Row {
  team: string;
  wins: number;
  draws: number;
  losses: number;
  goal_difference: number;
  points: number;
  year: number;
  matches_played: number;
}

export default function Page() {
  const [pointsData, setPointsData] = useState<Row[]>([]);
  const [filteredPointsData, setFilteredPointsData] = useState<Row[]>([]);
  const [year, setYear] = useState(2024);

  const fetchPointsData = async () => {
    try {
      const response = await fetch("/api/standings");
      const data = await response.json();
      setPointsData(data.result.rows);
    } catch (error) {
      console.error("Error fetching points data:", error);
    }
  };

  useEffect(() => {
    fetchPointsData();
  }, []);

  useEffect(() => {
    const filteredData = pointsData.filter((row) => row.year === 2024);
    setFilteredPointsData(filteredData);
  }, [pointsData]); // Update filteredPointsData when pointsData changes

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const year = parseInt(event.target.value);
    setYear(year);
    const filteredData = pointsData.filter((row) => row.year === year);
    setFilteredPointsData(filteredData);
  };

  return (
    <div>
      <StickyAlert message="Pickup game this Sunday at 3pm at SLU Intramural field" />

      <center>
        <h1>Flagrant Fowl Futbol Association</h1>
        <h2> {year} Final Standings</h2>

        <select onChange={handleChange}>
          {Array.from(new Set(pointsData.map((row) => row.year))).map(
            (year) => (
              <option key={year} value={year}>
                {year}
              </option>
            )
          )}
        </select>
      </center>

      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th></th>
            <th>Wins</th>
            <th>Draws</th>
            <th>Loses</th>
            <th>Goal Difference</th>
            <th>Points</th>
            <th>Matches Played</th>
          </tr>
        </thead>
        <tbody>
          {filteredPointsData.map((row, index) => (
            <tr key={index}>
              <td>
                <Link href={`/schedule_roaster?team=${row.team}`}>
                  {row.team.toUpperCase()}
                </Link>
              </td>
              <td>
                <Image
                  src={`/logos/${row.team.toLowerCase()}.jpeg`}
                  alt={`Logo of ${row.team}`}
                  width={50}
                  height={50}
                />
              </td>
              <td>{row.wins}</td>
              <td>{row.draws}</td>
              <td>{row.losses}</td>
              <td>{row.goal_difference}</td>
              <td>{row.points}</td>
              <td>{row.matches_played}</td>
            </tr>
          ))}
          {filteredPointsData.length === 0 && (
            <tr>
              <td colSpan={8}>Please Select a year to get the Points</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
