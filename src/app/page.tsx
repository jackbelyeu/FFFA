"use client";
import Image from "next/image";
import Link from "next/link";
import { MouseEventHandler, useEffect, useState } from "react";

interface Team {
  team: string;
  wins: number;
  draws: number;
  lost: number;
  gd: number;
  points: number;
}

const linkStyle = {
  textDecoration: "none",
  color: "white",
  backgroundColor: "#009879",
  padding: "10px",
  borderRadius: "5px",
  fontWeight: "bold",
};

export default function Page() {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    fetch("api/teams")
      .then((res) => res.json())
      .then((data) => setTeams(data));
  }, []);

  return (
    <div>
      <h1>Flagrant Fowl Futbol Association</h1>
      <Link href="/dashboard" style={linkStyle}>
        Go to Dashboard
      </Link>{" "}
      <Link href="/learnmore" style={linkStyle}>
        Learn More
      </Link>{" "}
      <Link href="/organizer_login" style={linkStyle}>
        Admin
      </Link>
      <h2>2023 Final Standings</h2>
      <SortableTable
        rows={teams}
        renderHeader={({ sortBy }) => (
          <tr>
            <th onClick={sortBy("team")}>Team</th>
            <th></th>
            <th onClick={sortBy("wins")}>W</th>
            <th onClick={sortBy("draws")}>D</th>
            <th onClick={sortBy("lost")}>L</th>
            <th onClick={sortBy("gd")}>GD</th>
            <th onClick={sortBy("points")}>Pts</th>
          </tr>
        )}
        renderRow={({ draws, gd, lost, points, team, wins }) => (
          <tr key={team}>
            <td>{team}</td>
            <td>
              <Image
                src={`/logos/${team}.jpeg`}
                alt={`Logo of ${team}`}
                width={50}
                height={50}
              />
            </td>
            <td>{wins}</td>
            <td>{draws}</td>
            <td>{lost}</td>
            <td>{gd}</td>
            <td>{points}</td>
          </tr>
        )}
      />
    </div>
  );
}

interface SortableTableProps<T> {
  rows: T[];
  renderHeader: (u: {
    sortBy(key: keyof T): MouseEventHandler<Element>;
  }) => React.ReactNode;
  renderRow: (row: T, index: number, rows: T[]) => React.ReactNode;
}

export function SortableTable<T>({
  rows,
  renderHeader,
  renderRow,
}: SortableTableProps<T>) {
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(
    null
  );

  const toggleSortDirection = () =>
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");

  const sortBy = (column: keyof T) => () => {
    if (column === sortColumn) return toggleSortDirection();
    setSortColumn(column);
    setSortDirection(null);
  };

  const sortData =
    (sortKey: keyof T | null, sortDirection: "asc" | "desc" | null) =>
    (a: T, b: T) => {
      if (sortKey === null) return 0;
      if (sortDirection === null) return 0;
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      const order = sortDirection === "asc" ? 1 : -1;
      if (typeof aVal === "number" && typeof bVal === "number")
        return (aVal - bVal) * order;
      if (typeof aVal === "string" && typeof bVal === "string")
        return aVal.localeCompare(bVal) * order;
      return 0;
    };

  return (
    <table>
      <thead>{renderHeader({ sortBy })}</thead>
      <tbody>
        {rows.slice().sort(sortData(sortColumn, sortDirection)).map(renderRow)}
      </tbody>
    </table>
  );
}
