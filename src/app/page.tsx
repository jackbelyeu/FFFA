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

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const year = parseInt(event.target.value);

    const filteredData = pointsData.filter((row) => row.year === year);
    setFilteredPointsData(filteredData);
  };

    return (
      <div>
        <h1>Flagrant Fowl Futbol Association</h1>
        <Link href="/dashboard">Go to Dashboard</Link>
        {" "}
        <Link href="/learnmore">Learn More</Link>
        <h2>2023 Final Standings</h2>
        <table>
          <thead>
            <tr>
              <th>Team</th>
              <th></th>
              <th>W</th>
              <th>D</th>
              <th>L</th>
              <th>GD</th>
              <th>Pts</th>
            </tr>
          </thead>
          <tbody>
            {sortedRows.map((row, index) => (
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
                <td>{row.wins}</td>
                <td>{row.draws}</td>
                <td>{row.lost}</td>
                <td>{row.gd}</td>
                <td>{row.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } catch (error) {
    console.error("Error fetching data from the database:", error);

    return (
      <div>
        <h1>Hello</h1>
        <Link href="/dashboard">Go to Dashboard</Link>
        <p>
          Error fetching data from the database. Please check the console for
          more details.
        </p>
      </div>
    );
  }
}
