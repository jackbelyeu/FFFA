import { sql } from "@vercel/postgres";
import Link from "next/link";

export default async function Page() {
  const { rows } = await sql`SELECT * from DC`;

  return (
    <div>
      <Link href="/Schedule"> Match Schedule</Link>
      <h1>Hello, Dashboard Page!</h1>
      {rows.map((row) => (
        <div key={row.name}>{row.name}</div>
      ))}
    </div>
  );
}
