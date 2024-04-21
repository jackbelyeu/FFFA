import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import nextAuthMiddleware from "next-auth/middleware";

export async function GET(
  request: Request,
  { params }: { team: string; params: any }
) {
  try {
    const result = await sql`
      SELECT * FROM RSVP WHERE player_team = ${params.team}
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
    const { player_name, commitment, position, previous_club } = body;
    console.log(commitment)
    const result = await sql`
      UPDATE RSVP
      SET commitment = ${commitment},
          position = ${position},
          previous_club = ${previous_club}
          
      WHERE player_name = ${player_name} AND player_team = ${params.team};
    `;
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error updating player data:", error);
    return NextResponse.error();
  }
}
