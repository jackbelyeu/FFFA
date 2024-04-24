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

interface StandingsResponse {
  standings: Row[];
  teams: string[];
}

export default function Page() {
  const [pointsData, setPointsData] = useState<Row[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStandingsData = async () => {
      try {
        const response = await fetch("/api/standings");
        const data: StandingsResponse = await response.json();

        if (!data.standings) {
          throw new Error("Standings data is missing");
        }

        const teamMap: { [key: string]: Row } = {};
        data.standings.forEach((row) => {
          teamMap[row.team_name] = row;
        });

        const allTeams: Row[] = data.teams.map((teamName) => {
          return teamMap[teamName] || {
            team_name: teamName,
            total_matches: 0,
            wins: 0,
            draws: 0,
            losses: 0,
            goal_difference: 0,
          };
        });

        const sortedTeams = allTeams.sort((a, b) => {
          const pointsA = a.wins * 3 + a.draws * 1;
          const pointsB = b.wins * 3 + b.draws * 1;
          return pointsB - pointsA;
        });

        setPointsData(sortedTeams);
      } catch (error) {
        setError("Failed to fetch standings data");
        console.error("Error fetching standings data:", error);
      }
    };

    fetchStandingsData();
  }, []);

  return (
    <div>
      <AlertDismisible />
      <center>
        <h1>Flagrant Fowl Futbol Association</h1>
        <h2>Current Standings</h2>
      </center>

      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th></th>
            <th>Wins</th>
            <th>Draws</th>
            <th>Losses</th>
            <th>Goal Difference</th>
            <th>Points</th>
            <th>Matches Played</th>
          </tr>
        </thead>
        <tbody>
          {pointsData.map((row, index) => (
            <tr key={index}>
              <td>
                <Link href={`/${row.team_name}`}>{row.team_name}</Link>
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

