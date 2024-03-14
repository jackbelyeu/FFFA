import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const result = await sql`
      select * from standings;
    `;
    const uniqueTeams = result.rows.map((row: any) => row.player_team);
    return NextResponse.json({ uniqueTeams }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
