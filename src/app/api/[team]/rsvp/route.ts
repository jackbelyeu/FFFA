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
  console.log(result);
  return NextResponse.json(result);
}

export async function POST(
  request: Request,
  { params }: { team: string; params:any }
) {
  const {
    player_name,
    oct_8,
    oct_15,
    oct_22,
    oct_29,
    nov_5,
    nov_12,
    nov_19,
    nov_26,
  } = await request.json();
  const result = await sql`
   UPDATE risers_rsvp
    SET oct_8 = ${oct_8},
        oct_15 = ${oct_15},
        oct_22 = ${oct_22},
        oct_29 = ${oct_29},
        nov_5 = ${nov_5},
        nov_12 = ${nov_12},
        nov_19 = ${nov_19},
        nov_26 = ${nov_26}
    WHERE player_name = ${player_name} AND player_team = ${params.team};
  `;
  return NextResponse.json(result);
}
