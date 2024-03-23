import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const playerName = searchParams.get("playerName");

  try {
    await sql`
      DELETE FROM Roster
      WHERE Player_Name = ${playerName};
    `;

    const teamroster = await sql`SELECT * FROM Roster;`;

    return NextResponse.json({ teamroster }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
