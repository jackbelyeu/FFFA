import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const result = await sql`
      SELECT * FROM matches ORDER BY date, time;
    `;
    const matches = result.rows;
    return NextResponse.json({ matches }, { status: 200 });
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
      SELECT * FROM matches 
      WHERE homeTeamId = (SELECT teamid FROM teams WHERE teamName = ${homeTeam}) AND awayTeamId = (SELECT teamid FROM teams WHERE teamName = ${awayTeam}) AND date = ${date} AND time = ${time} AND locationId = (SELECT locationId FROM locations WHERE locationName =${location});
    `;
    if (existingMatch.rows.length > 0) {
      return NextResponse.json(
        { message: "Match already exists" },
        { status: 409 } // Conflict status code
      );
    }
    // If the match doesn't exist, proceed with insertion
    await sql`
      INSERT INTO matches (homeTeamId, awayTeamId, homeTeamScore, awayTeamScore, date, time, locationId) VALUES ((SELECT teamid FROM teams WHERE teamName = ${homeTeam}), (SELECT teamid FROM teams WHERE teamName = ${awayTeam}), 0, 0, ${date}, ${time}, (SELECT locationId FROM locations WHERE locationName =${location}));
    `;
    const result = await sql`
      SELECT * FROM matches;
    `;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
