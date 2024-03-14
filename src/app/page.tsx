import Link from "next/link";
import { sql } from "@vercel/postgres";
import Image from "next/image";

export default async function Page() {
  try {
    const { rows } = await sql`
     select * from StanDings order by points desc, goal_difference desc, wins desc, team asc;
    `;
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
              <th>MP</th>
            </tr>
          </thead>
          <tbody>
            {sortedRows.map((row, index) => (
              <tr key={index}>
                <td>{row.team.toUpperCase()}</td>
                <td>
                  <Image
                    src={`/logos/${row.team.toLowerCase()}.jpeg`}
                    alt={`Logo of ${row.team}`}
                    width={50}
                    height={50}
                  />
                </td>
                <td>{row.wins}</td>
                <td>{row.draws}</td>
                <td>{row.losses}</td>
                <td>{row.goal_difference}</td>
                <td>{row.points}</td>
                <td>{row.matches_played}</td>
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
