import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { team: string; params: any }
) {
  // Extract the team name from the params
  let team = params.team.toLowerCase();

  // Check if team is "Pacey Chickens" and change it to "chickens"
  if (team === "pacey chickens") {
    team = "chickens";
  }

  try {
    const result = await sql`
      SELECT player_name, position, commitment
      FROM RSVP
      WHERE LOWER(player_team) = ${team}
      ORDER BY id ASC;
    `;
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
