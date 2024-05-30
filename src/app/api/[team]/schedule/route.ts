import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { team: string; params: any }
) {
  try {
    const result = await sql`
      SELECT
        m.matchid,
        t1.teamname AS hometeamname,
        t2.teamname AS awayteamname,
        m.date,
        m.time,
        l.locationname
      FROM
        matches m
      JOIN
        teams t1 ON m.hometeamid = t1.teamid
      JOIN
        teams t2 ON m.awayteamid = t2.teamid
      JOIN
        locations l ON m.locationid = l.locationid
      WHERE
      t1.teamname = ${params.team} OR t2.teamname = ${params.team}
      order by m.date desc, m.time desc 
      ;
    `;
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching match data:", error);
    return NextResponse.json({ error: "Error fetching match data" }, { status: 500 });
  }
}
