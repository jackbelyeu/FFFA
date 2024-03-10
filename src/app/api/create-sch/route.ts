import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const result = await sql`CREATE TABLE ElevateSch (
      MatchID SERIAL PRIMARY KEY,
      HomeTeam VARCHAR(255),
      AwayTeam VARCHAR(255),
      MatchDate VARCHAR(255),
      MatchTime VARCHAR(255),
      Location VARCHAR(255),
      MatchDay INT NOT NULL 
  );
  `;
    console.log(result);
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}



