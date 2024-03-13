import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { match_id, home_team, away_team, time, date, location } =
    await request.json();
  console.log(match_id, home_team, away_team, time, date, location);
  const result = await sql`
  UPDATE match_schedule
  SET home_team = ${home_team},
      away_team = ${away_team},
      time = ${time},
      date = ${date},
      location = ${location}
  WHERE match_id = ${match_id};
`;

  return NextResponse.json(result);
}
