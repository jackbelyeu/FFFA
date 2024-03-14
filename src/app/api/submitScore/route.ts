import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { match_id, home_team, away_team, homeScore, awayScore } = await request.json();
    const standings = await sql`
      select * from standings;
    `;
    const match = await sql`
      select * from match_schedule WHERE match_id = ${match_id};
    `;
    if (standings.rowCount === 0 || match.rowCount === 0) {
      return NextResponse.json({ success: false, message: 'Invalid match or standings.' });
    }

    const homeTeam = standings.rows.find((team) => team.team === home_team);
    const awayTeam = standings.rows.find((team) => team.team === away_team);
    if (!homeTeam || !awayTeam) {
      return NextResponse.json({ success: false, message: 'Invalid match or standings.' });
    }

    // if winner is home_team, home_team gets 3 points
    // if winner is away_team, away_team gets 3 points
    // if winner is Draw, both teams get 1 point
    // matches_played is incremented by 1 for both teams

    if (homeScore < awayScore) {
      await sql`
        update standings
        set matches_played = matches_played + 1,
            wins = wins + 1,
            points = points + 3,
            goal_difference = goal_difference + ${awayScore - homeScore}
        where team = ${away_team};
      `;
      await sql`
        update standings
        set matches_played = matches_played + 1,
            losses = losses + 1,
            goal_difference = goal_difference + ${homeScore - awayScore}
        where team = ${home_team};
      `;
    } else if (homeScore > awayScore) {
      await sql`
        update standings
        set matches_played = matches_played + 1,
            wins = wins + 1,
            points = points + 3,
            goal_difference = goal_difference + ${homeScore - awayScore}
        where team = ${home_team};
      `;
      await sql`
        update standings
        set matches_played = matches_played + 1,
            losses = losses + 1,
            goal_difference = goal_difference + ${awayScore - homeScore}
        where team = ${away_team};
      `;
    } else {
      await sql`
        update standings
        set matches_played = matches_played + 1,
            draws = draws + 1,
            points = points + 1
        where team = ${home_team};
      `;
      await sql`
        update standings
        set matches_played = matches_played + 1,
            draws = draws + 1,
            points = points + 1
        where team = ${away_team};
      `;
    }


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
      update match_schedule
      set winner = ${winner},
          gd = ${gd},
          home_score = ${homeScore},
          away_score = ${awayScore}
      where match_id = ${match_id};
    `;

    return NextResponse.json({ success: true, message: 'Match result updated successfully.' });
  } catch (error) {
    console.error('Error updating match result:', error);
    return NextResponse.json({ success: false, message: 'An error occurred while updating match result.' });
  }
}
