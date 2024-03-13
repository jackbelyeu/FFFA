import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { match_id, home_team, away_team, homeScore, awayScore } = await request.json();

    let winner;
    let gd;

    if (homeScore < awayScore) {
      winner = away_team;
      gd = awayScore - homeScore;
    } else if (homeScore > awayScore) {
      winner = home_team;
      gd = homeScore - awayScore;
    } else {
      winner = 'Draw';
      gd = homeScore - awayScore;
    }

    await sql`
      UPDATE match_schedule
      SET winner = ${winner},
          gd = ${gd},
          home_score = ${homeScore},
          away_score = ${awayScore}
      WHERE match_id = ${match_id};
    `;

    return NextResponse.json({ success: true, message: 'Match result updated successfully.' });
  } catch (error) {
    console.error('Error updating match result:', error);
    return NextResponse.json({ success: false, message: 'An error occurred while updating match result.' });
  }
}
