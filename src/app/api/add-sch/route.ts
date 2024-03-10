// 

import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { teamNameA, teamNameB, matchDate, matchTime, location, matchDay } = await request.json();

  if (!teamNameA || !teamNameB || isNaN(matchDay)) {
    return NextResponse.json({ error: "Incomplete or invalid data" }, { status: 500 });
  }

  // Assuming you want to insert a new match
  await sql`
    INSERT INTO ElevateSch (HomeTeam, AwayTeam, MatchDate, MatchTime, Location, MatchDay)
    VALUES (${teamNameA}, ${teamNameB}, ${matchDate}, ${matchTime}, ${location}, ${matchDay});
  `;

  const updatedMatches = await sql`SELECT * FROM ElevateSch;`;

  return NextResponse.json({ matches: updatedMatches }, { status: 200 });
}
