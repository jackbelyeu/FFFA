import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const result = await sql`CREATE TABLE Roster (
      PlayerID SERIAL PRIMARY KEY,
      Player_Name varchar(255),
      Team_Name varchar(255)
    );`;
    console.log(result);
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
