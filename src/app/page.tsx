"use client";

import React, { useEffect, useState } from "react";
import StickyAlert from "./Components/alerts/alert";

import Image from "next/image";
import Link from "next/link";

interface Row {
  team: string;

  wins: number;

  draws: number;

  loses: number;

  goalsdifference: number;

  points: number;

  year: number;

  matchesplayed: number;
}

export default function Page() {
  const [pointsData, setPointsData] = useState<Row[]>([]);

  const [filteredPointsData, setFilteredPointsData] = useState<Row[]>([]);

  const fetchPointsData = async () => {
    try {
      const response = await fetch("/api/points");

      const data = await response.json();

      setPointsData(data.result.rows);
    } catch (error) {
      console.error("Error fetching points data:", error);
    }
  };

  useEffect(() => {
    fetchPointsData();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const year = parseInt(event.target.value);

    const filteredData = pointsData.filter((row) => row.year === year);

    setFilteredPointsData(filteredData);
  };

  return (
    <div>
      <StickyAlert />
      <center>
        {" "}
        <h1>Flagrant Fowl Futbol Association</h1>
        <h2>2023 Final Standings</h2>
        <select onChange={handleChange}>
          <option value="">Select Year</option>

          <option value="2024">2024</option>

          <option value="2023">2023</option>
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

            <th>Goals Difference</th>

            <th>Points</th>

            <th>Matches Played</th>
          </tr>
        </thead>

        <tbody>
          {filteredPointsData.map((row, index) => (
            <tr key={index}>
              <td>
                <Link href={`/schedule_roaster?team=${row.team}`}>
                  {row.team}
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

              <td>{row.loses}</td>

              <td>{row.goalsdifference}</td>

              <td>{row.points}</td>

              <td>{row.matchesplayed}</td>
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
