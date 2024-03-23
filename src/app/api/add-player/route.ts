import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
   const result =await sql`INSERT INTO DESKCHAMP(EMAIL,PASSWORD) VALUES ('harita','harita');
    `;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  // const names = await sql`SELECT * FROM Players;`;
  // return NextResponse.json({ names }, { status: 200 });
}
