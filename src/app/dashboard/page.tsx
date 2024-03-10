import { sql } from "@vercel/postgres";
import Link from "next/link";

export default async function Page() {
  const { rows } = await sql`SELECT * from players`;

  return (
    <div>
      <h1>Hello, Dashboard Page!</h1>
      <Link href="/Sch" passHref>
        <button className="button">Match Schedule</button>
      </Link>{" "}
      {rows.map((row) => (
        <div key={row.name}>{row.name}</div>
      ))}
    </div>
  );
}
