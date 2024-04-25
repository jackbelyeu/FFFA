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

interface SortState {
  field: keyof Row | undefined;
  direction: "ascending" | "descending";
}

export default function Page() {
  const [pointsData, setPointsData] = useState<Row[]>([]);
  const [sortState, setSortState] = useState<SortState>({
    field: undefined,
    direction: "ascending",
  });

  // Sorting function
  const sortData = (field: keyof Row) => {
    setSortState((prevState) => {
      const isAsc =
        prevState.field === field && prevState.direction === "ascending";
      return { field, direction: isAsc ? "descending" : "ascending" };
    });
  };

  useEffect(() => {
    if (!sortState.field) return; // Return early if sortState.field is null

    const sortedData = [...pointsData].sort((a, b) => {
      // TypeScript will now trust that sortState.field is not null
      const valueA = a[sortState.field!];
      const valueB = b[sortState.field!];
      if (valueA < valueB) return sortState.direction === "ascending" ? -1 : 1;
      if (valueA > valueB) return sortState.direction === "ascending" ? 1 : -1;
      return 0;
    });

    setPointsData(sortedData);
  }, [sortState, pointsData]);

  const fetchPointsData = async (teamId: string) => {
    try {
      const response = await fetch(`/api/standings?teamId=${teamId}`);
      const data = await response.json();
      setPointsData((prevData) => {
        const newData = data.standings.filter(
          (newRow: { team_name: string }) =>
            !prevData.some((prevRow) => prevRow.team_name === newRow.team_name)
        );
        const sortedData = [...prevData, ...newData].sort((a, b) => {
          const pointsA = a.wins * 3 + a.draws * 1;
          const pointsB = b.wins * 3 + b.draws * 1;
          return pointsB - pointsA;
        });
        return sortedData;
      });
    } catch (error) {
      console.error("Error fetching points data for teamId:", teamId, error);
    }
  };
  useEffect(() => {
    const teamIds = ["1", "2", "3", "4", "5", "6", "7"];
    teamIds.forEach((teamId) => {
      fetchPointsData(teamId);
    });
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
            <th onClick={() => sortData("team_name")}>Team</th>
            <th></th>
            <th onClick={() => sortData("wins")}>Wins</th>
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
              <td>{row.wins * 3 + row.draws}</td>
              <td>{row.total_matches}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
