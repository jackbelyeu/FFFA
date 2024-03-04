import Link from "next/link";
import { sql } from "@vercel/postgres";
import Image from "next/image";

export default async function Page() {
  try {
    const { rows } = await sql`SELECT * FROM Elevate;`;
    const sortedRows = [...rows].sort((a, b) => b.points - a.points);

    return (
      <div>
        <h1>Flagrant Fowl Futbol Association</h1>
        <Link
          href="/dashboard"
          style={{
            textDecoration: "none",
            color: "white",
            backgroundColor: "#009879",
            padding: "10px",
            borderRadius: "5px",
            fontWeight: "bold",
          }}
        >
          Go to Dashboard
        </Link>{" "}
        <Link
          href="/learnmore"
          style={{
            textDecoration: "none",
            color: "white",
            backgroundColor: "#009879",
            padding: "10px",
            borderRadius: "5px",
            fontWeight: "bold",
          }}
        >
          Learn More
        </Link>
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
