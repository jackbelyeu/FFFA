import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const res = await sql`
      SELECT teamname AS team_name
      FROM teams
    `;

    const teams = res.rows.map((row: any) => row.team_name);

    const standingsRes = await sql`
      WITH TeamMatches AS (
        SELECT
          m.hometeamid AS teamid,
          m.hometeamscore AS team_score,
          m.awayteamscore AS opponent_score
        FROM
          matches m
        UNION ALL
        SELECT
          m.awayteamid AS teamid,
          m.awayteamscore AS team_score,
          m.hometeamscore AS opponent_score
        FROM
          matches m
      ),
      TeamStats AS (
        SELECT
          teamid,
          COUNT(*) AS total_matches,
          SUM(CASE
              WHEN team_score > opponent_score THEN 1
              ELSE 0
          END) AS wins,
          SUM(CASE
              WHEN team_score = opponent_score THEN 1
              ELSE 0
          END) AS draws,
          SUM(CASE
              WHEN team_score < opponent_score THEN 1
              ELSE 0
          END) AS losses,
          SUM(team_score) AS goals_scored,
          SUM(opponent_score) AS goals_conceded
        FROM
          TeamMatches
        GROUP BY
          teamid
      )
      SELECT
        t.teamname AS team_name,
        ts.total_matches,
        ts.wins,
        ts.draws,
        ts.losses,
        ts.goals_scored - ts.goals_conceded AS goal_difference
      FROM
        TeamStats ts
      JOIN
        teams t ON ts.teamid = t.teamid;
    `;

    const standings = standingsRes.rows;

    return NextResponse.json({ standings, teams }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

