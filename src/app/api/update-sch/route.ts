import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { matchID, teamNameA, teamNameB, matchDate, matchTime, location, matchDay } = await request.json();

  if (!matchID || !teamNameA || !teamNameB || isNaN(matchDay)) {
    return NextResponse.json({ error: "Incomplete or invalid data" }, { status: 500 });
  }

  // Assuming you want to update a specific match based on MatchID
  await sql`
    UPDATE ElevateSch
    SET HomeTeam = ${teamNameA}, AwayTeam = ${teamNameB}, MatchDate = ${matchDate},
        MatchTime = ${matchTime}, Location = ${location}, MatchDay = ${matchDay}
    WHERE MatchID = ${matchID};
  `;

  const updatedMatches = await sql`SELECT * FROM ElevateSch;`;

  return NextResponse.json({ matches: updatedMatches }, { status: 200 });
}
