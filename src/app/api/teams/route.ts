import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  return sql`SELECT * FROM Elevate;`
    .then(({ rows }) => rows)
    .then((rows) => NextResponse.json(rows));
}
