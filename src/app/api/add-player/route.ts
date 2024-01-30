import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  try {
    if (!name) throw new Error("Name required");
    await sql`INSERT INTO Players (Name) VALUES (${name});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const names = await sql`SELECT * FROM Players;`;
  return NextResponse.json({ names }, { status: 200 });
}
