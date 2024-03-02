"use client";
import React, { useEffect, useState } from "react";
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

  const handleChange = async (event: any, row: Row) => {
    // console.log(row);
    // await fetch("/api/points", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     team: row.team,
    //     wins: (document.getElementById(`wins_${row.team}`) as HTMLInputElement)
    //       ?.value,
    //     draws: (
    //       document.getElementById(`draws_${row.team}`) as HTMLInputElement
    //     )?.value,
    //     loses: (
    //       document.getElementById(`loses_${row.team}`) as HTMLInputElement
    //     )?.value,
    //     goalsdifference: (
    //       document.getElementById(
    //         `goalsdifference_${row.team}`
    //       ) as HTMLInputElement
    //     )?.value,
    //   }),
    // });
    console.log("Harita");
  };

  const handleChange1 = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const year = parseInt(event.target.value);

    const filteredData = pointsData.filter((row) => row.year === year);
    setFilteredPointsData(filteredData);
  };

  return (
    <div>
      <h1>Flagrant Fowl Futbol Association</h1>
      <Link href="/dashboard">Go to Dashboard</Link> <br />
      <Link href="/learnmore">Learn More</Link>
      <h2>Final Standings</h2>
      <h3>Points Table</h3>
      <select onChange={handleChange1}>
        <option value="">Select Year</option>
        <option value="2024">2024</option>
        <option value="2023">2023</option>
      </select>
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
              <td>{row.team}</td>
              <td>
                <Image
                  src={`/logos/${row.team}.jpeg`}
                  alt={`Logo of ${row.team}`}
                  width={50}
                  height={50}
                />
              </td>
              <td>
                <input
                  defaultValue={row.wins}
                  id={`wins_${row.team}`}
                  onChange={(event) => handleChange(event, row)}
                ></input>
              </td>
              <td>
                <input
                  defaultValue={row.draws}
                  id={`draws_${row.team}`}
                  //onChange={(event) => handleChange(event, row)}
                ></input>
              </td>
              <td>
                <input
                  defaultValue={row.loses}
                  id={`loses_${row.team}`}
                  // onChange={(event) => handleChange(event, row)}
                ></input>
              </td>
              <td>
                <input
                  defaultValue={row.goalsdifference}
                  id={`goaldifference_${row.team}`}
                  //onChange={(event) => handleChange(event, row)}
                ></input>
              </td>
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
