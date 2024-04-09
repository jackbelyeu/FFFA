import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const result = await sql`
    SELECT m.matchid, m.hometeamid, ht.teamname AS hometeamname, m.awayteamid, at.teamname AS awayteamname, 
    m.hometeamscore, m.awayteamscore, m.date, m.time, l.locationname
FROM matches m
JOIN teams ht ON m.hometeamid = ht.teamid
JOIN teams at ON m.awayteamid = at.teamid
JOIN locations l ON m.locationid = l.locationid
ORDER BY m.date, m.time;
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
