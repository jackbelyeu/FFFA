"use client";
import React, { useEffect, useState } from "react";
import AlertDismisible from "@/app/Components/alerts/alert";
import Image from "next/image";
import Link from "next/link";

interface Row {
  team_name: string;
  total_matches: number;
  wins: number;
  draws: number;
  losses: number;
  goal_difference: number;
}

export default function Page() {
  const [pointsData, setPointsData] = useState<Row[]>([]);

  const fetchPointsData = async (teamId: string) => {
    try {
      const response = await fetch(`/api/standings?teamId=${teamId}`);
      const data = await response.json();
      setPointsData((prevData) => {
        const newData = data.standings.filter(
          (newRow: { team_name: string }) =>
            !prevData.some((prevRow) => prevRow.team_name === newRow.team_name)
        );
        return [...prevData, ...newData];
      });
    } catch (error) {
      console.error("Error fetching points data for teamId:", teamId, error);
    }
  };

  useEffect(() => {
    const teamIds = ["1", "2", "3", "4", "5", "6", "7"];
    teamIds.forEach(async (teamId) => {
      await fetchPointsData(teamId);
    });
  }, []);

  return (
    <div>
      <AlertDismisible />
      <center>
        <h1>Flagrant Fowl Futbol Association</h1>
        <h2> Current Standings</h2>
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
          {pointsData.map((row, index) => (
            <tr key={index}>
              <td>
                <Link href={`/schedule_roaster?team=${row.team_name}`}>
                  {row.team_name}
                </Link>
              </td>
              <td>
                <Image
                  src={`/logos/${row.team_name}.jpeg`}
                  alt={`Logo of ${row.team_name}`}
                  width={50}
                  height={50}
                />
              </td>
              <td>{row.wins}</td>
              <td>{row.draws}</td>
              <td>{row.losses}</td>
              <td>{row.goal_difference}</td>
              <td>{row.wins * 3 + row.draws * 1}</td>
              <td>{row.total_matches}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
