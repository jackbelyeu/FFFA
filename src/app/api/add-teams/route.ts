import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const PlayerName = searchParams.get("PlayerName");
  const Status = searchParams.get("Status");

  try {
    if (!PlayerName) throw new Error("Player names required");
    await sql`INSERT INTO Mockingbirds
    (PlayerName ) VALUES (${PlayerName});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const pets = await sql`SELECT * FROM Mockingbirds;`;
  return NextResponse.json({ pets }, { status: 200 });
}
