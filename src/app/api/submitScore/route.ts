import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { match_id, home_team, away_team, homeScore, awayScore } = await request.json();
  console.log(match_id, home_team, away_team, homeScore, awayScore);

  if (homeScore < awayScore) {
    await sql`
      UPDATE match_schedule
      SET winner = ${away_team}
      WHERE match_id = ${match_id};
    `;
  } else if (homeScore > awayScore) {
    await sql`
      UPDATE match_schedule
      SET winner = ${home_team}
      WHERE match_id = ${match_id};
    `;
  } else {
    await sql`
      UPDATE match_schedule
      SET winner = 'Draw'
      WHERE match_id = ${match_id};
    `;
  }

  const result = await sql`
    UPDATE match_schedule
    SET home_score = ${homeScore},
        away_score = ${awayScore}
    WHERE match_id = ${match_id};
  `;

  return NextResponse.json(result);
}
