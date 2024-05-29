import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const standingsRes = await sql`
    SELECT 
    t.teamname,
    team_stats.Wins,
    team_stats.Draws,
    team_stats.Losses,
    team_stats.Goal_Difference,
    team_stats.Points,
    team_stats.Matches_Played
FROM (
    SELECT 
        teamid,
        SUM(CASE WHEN points = 3 THEN 1 ELSE 0 END) AS Wins,
        SUM(CASE WHEN points = 1 THEN 1 ELSE 0 END) AS Draws,
        SUM(CASE WHEN points = 0 THEN 1 ELSE 0 END) AS Losses,
        SUM(goals_for) - SUM(goals_against) AS Goal_Difference,
        SUM(points) AS Points,
        COUNT(*) AS Matches_Played
    FROM (
        SELECT 
            hometeamid AS teamid,
            CASE
                WHEN hometeamscore > awayteamscore THEN 3
                WHEN hometeamscore = awayteamscore THEN 1
                ELSE 0
            END AS points,
            hometeamscore AS goals_for,
            awayteamscore AS goals_against
        FROM matches
        UNION ALL
        SELECT 
            awayteamid AS teamid,
            CASE
                WHEN awayteamscore > hometeamscore THEN 3
                WHEN awayteamscore = hometeamscore THEN 1
                ELSE 0
            END AS points,
            awayteamscore AS goals_for,
            hometeamscore AS goals_against
        FROM matches
    ) AS match_points
    GROUP BY teamid
) AS team_stats
JOIN teams t ON team_stats.teamid = t.teamid
ORDER BY team_stats.Points DESC, team_stats.Goal_Difference DESC;
`;
    return NextResponse.json({ standings: standingsRes.rows });
  } catch (error) {
    return NextResponse.error();
  }
}
