import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const playerName = searchParams.get("playerName");
  const teamName = searchParams.get("teamName");

  try {
    if (!playerName || !teamName)
      throw new Error("Player and team names required");
    await sql`INSERT INTO Roster (Player_Name, Team_Name) VALUES (${playerName}, ${teamName});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const teamroster = await sql`SELECT * FROM Roster;`;
  return NextResponse.json({ teamroster }, { status: 200 });
}
