import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { team: string; params: any }
) {
  try {
    const body = await request.json();
    const { player_name } = body;
    const result = await sql`
      DELETE FROM risers_rsvp
      WHERE player_name = ${player_name} AND player_team = ${params.team};
    `;
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error updating player data:", error);
    return NextResponse.error(); 
  }
}

