import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const result = await sql`CREATE TABLE FinalStandings ( Team varchar(255), Wins varchar(50), Draws varchar(50), Loses varchar(50), Goal_Difference varchar(50), Points varchar(100)  );`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
