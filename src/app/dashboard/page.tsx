import { sql } from "@vercel/postgres";

export default async function Page() {
  const { rows } = await sql`SELECT * from DC`;

  return (
    <div>
      <h1>Hello, Dashboard Page!</h1>
      {rows.map((row) => (
        <div key={row.name}>{row.name}</div>
      ))}
    </div>
  );
}
