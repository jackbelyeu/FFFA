import Link from "next/link";
import { sql } from "@vercel/postgres";
import Image from "next/image";

export default async function Page() {
  try {
    const { rows } = await sql`SELECT * FROM mosquitoes;`;
    const sortedRows = [...rows].sort((a, b) => b.points - a.points);
    return (
      <div>
        <h1>Team Mosquitoes</h1>
        <p>State your availability for the next Match</p>
        <table>
          <thead>
            <tr>
              <th>Player Name</th>
              <th>Status</th>
              <th>Date</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {sortedRows.map((row, index) => (
              <tr key={index}>
                <td>{row.playername}</td>
                <td>{row.status}</td>
                <td>{row.date}</td>
                <td>{row.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } catch (error) {
    console.error("Error while fecting data from DB");
  }
}
