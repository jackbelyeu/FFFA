//import React from "react";
import Link from "next/link";
import Image from "next/image";
import { sql } from "@vercel/postgres";
//import { useRouter } from 'next/navigation';

export default async function Page() {
  try {
    //const router = useRouter();
    const { rows } = await sql`SELECT * FROM Elevate;`;
    const sortedRows = [...rows].sort((a, b) => b.points - a.points);

    //const handleEditStandingsClick = () => {
    // Navigate to the login page for password prompt
    //router.push('/edit_standings_security');
    //};

    return (
      <div>
        <h1>Flagrant Fowl Futbol Association</h1>
        <Link href="/dashboard" passHref>
          <button className="button">Go to Dashboard</button>
        </Link>{" "}
        <Link href="/learnmore" passHref>
          <button className="button">Learn More</button>
        </Link>{" "}
        <Link href="/2023" passHref>
          <button className="button">2023 Final Standings</button>
        </Link>{" "}
        <Link href="/2024" passHref>
          <button className="button">2024 Final Standings</button>
        </Link>{" "}
        <Link href="/edit_standings_security" passHref>
          <button className="button">Edit Standings</button>
        </Link>{" "}
        <Link href="/Sch" passHref>
          <button className="button">Match Schedule</button>
        </Link>{" "}
        <h2>2023 Final Standings</h2>
        <table>
          <thead>
            <tr>
              <th>Team</th>
              <th></th>
              <th>Matches Played</th>
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
                <td>{row.wins + row.draws + row.lost}</td>
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
