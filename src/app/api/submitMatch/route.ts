import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const {match_id,homeScore,awayScore} = await request.json();
  const result = await sql`
  UPDATE match_schedule
  SET home_score = ${homeScore},
      away_score = ${awayScore}
  WHERE match_id = ${match_id};
`;
    return NextResponse.json(result);
  }

