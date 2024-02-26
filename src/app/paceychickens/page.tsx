"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
  const [sortedRows, setSortedRows] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/paceychickens");
        const data = await response.json();
        const rows = data.result.rows;
        const sorted = rows.sort((a, b) => b.points - a.points);
        setSortedRows(sorted);
      } catch (error) {
        console.error("Error while fetching data from API", error);
        setError("Error while fetching data. Please try again later.");
      }
    }

    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  // Proceed to render the page if there is no error
  return (
    <div>
      <h1>Team Pacey Chickens</h1>
      <p>State your availability for the next Match</p>
      <table>
        <thead>
          <tr>
            <th>Player Name</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row, index) => (
            <tr key={index}>
              <td>{row.playername}</td>
              <td>{row.status || "-"}</td>
              <td>
                {row.date ? new Date(row.date).toLocaleDateString() : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
