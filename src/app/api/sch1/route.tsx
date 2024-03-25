import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const searchParams = new URLSearchParams(request.url.split('?')[1]);
  // Extract the selected team and year from the query parameters
  const teamName = searchParams.get('teamName');
  const team = teamName ? teamName.toLowerCase() : '';

  try {
    const result = await sql`
      SELECT *
      FROM elevatesch
      WHERE LOWER(hometeam) = ${team} OR LOWER(awayteam) = ${team}
    `;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}