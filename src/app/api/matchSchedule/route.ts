import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const result = await sql`
      SELECT * FROM match_schedule ORDER BY date, time;
    `;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const { homeTeam, awayTeam, date, time, location } = await request.json();
  try {
  
    const existingMatch = await sql`
      SELECT * FROM match_schedule 
      WHERE home_team = ${homeTeam} AND away_team = ${awayTeam} AND date = ${date} AND time = ${time} AND location = ${location};
    `;
    if (existingMatch.rows.length > 0) {
      return NextResponse.json(
        { message: "Match already exists" },
        { status: 409 } // Conflict status code
      );
    }
    // If the match doesn't exist, proceed with insertion 
    await sql`
      INSERT INTO match_schedule (home_team, away_team, date, time, location,home_score,away_score) VALUES (${homeTeam}, ${awayTeam}, ${date}, ${time}, ${location},0,0);
    `;
    const result = await sql`
      SELECT * FROM match_schedule;
    `;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}