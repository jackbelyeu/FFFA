import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // All tables in the database
    const result = await sql`
      SELECT * from RISERS_RSVP
      where player_team = 'hyenas'
      ; 
    `;

    return NextResponse.json({ result }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
