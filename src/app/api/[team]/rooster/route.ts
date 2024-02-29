import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { team: string; params: any }
) {
  const result = await sql`
   SELECT * FROM risers_rsvp where player_team = ${params.team}
   ORDER BY id ASC;
  `;
  return NextResponse.json(result);
}

export async function POST(
  request: Request,
  { params }: { team: string; params: any }
) {
  const { player_name, player_commitment, player_position } =
    await request.json();
  const result = await sql`
   UPDATE risers_rsvp
    SET player_commitment = ${player_commitment},
        player_position = ${player_position},
    WHERE player_name = ${player_name} AND player_team = ${params.team};
  `;
  return NextResponse.json(result);
}
