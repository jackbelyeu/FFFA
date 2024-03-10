import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const result = await sql`CREATE TABLE Elevate (
      Team varchar(255) UNIQUE,
      Wins int,
      Draws int,
      Lost int,
      GD int,
      Points int GENERATED ALWAYS AS (3 * Wins + 1 * Draws) STORED,
      Logo bytea
    );`;
    console.log(result);
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}



