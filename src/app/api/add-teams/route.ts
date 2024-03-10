

import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const teamName = searchParams.get("teamName");
  const wins = Number(searchParams.get("wins"));
  const draws = Number(searchParams.get("draws"));
  const losses = Number(searchParams.get("losses"));
  const gd = Number(searchParams.get("gd"));
  const logo = searchParams.get("logo");

  try {
    if (!teamName || isNaN(wins) || isNaN(draws) || isNaN(losses) || isNaN(gd)) {
      throw new Error("Incomplete or invalid data");
    }

    await sql`
      INSERT INTO Elevate (Team, Wins, Draws, Lost, GD, Logo)
      VALUES (${teamName}, ${wins}, ${draws}, ${losses}, ${gd}, ${logo});
      
    `;
    await sql`
    COMMIT;
    
  `;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const teams = await sql`SELECT * FROM Elevate;`;
  return NextResponse.json({ teams } , { status: 200 });
}
