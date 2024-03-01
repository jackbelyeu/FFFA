import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { team: string; params: any }
) {
  try {
    const result = await sql`
      SELECT * FROM risers_rsvp WHERE player_team = ${params.team}
      ORDER BY id ASC;
    `;
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching RSVP data:", error);
    return NextResponse.error(); 
  }
}

export async function POST(
  request: Request,
  { params }: { team: string; params: any }
) {
  try {
    const body = await request.json();
    const { player_name, commitment, position } = body;
    const result = await sql`
      UPDATE risers_rsvp
      SET commitment = ${commitment},
          position = ${position}
      WHERE player_name = ${player_name} AND player_team = ${params.team};
    `;
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error updating player data:", error);
    return NextResponse.error(); 
  }
}
