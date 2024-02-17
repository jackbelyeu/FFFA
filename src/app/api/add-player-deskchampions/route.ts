import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const team = searchParams.get("team");
  const wins=searchParams.get("wins");
  const draws=searchParams.get("draws");
  const loses=searchParams.get("loses");
  const goalsDiff=searchParams.get("goalsDiff");
  const points=searchParams.get("points");

  try {
    if (!team) throw new Error("Team required");
    await sql`INSERT INTO FinalStandings (Team,Wins,Draws,Loses,Goal_Difference,Points) VALUES (${team},${wins},${draws},${loses},${goalsDiff},${points});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const names = await sql`SELECT * FROM FinalStandings;`;
  return NextResponse.json({ names }, { status: 200 });
}
