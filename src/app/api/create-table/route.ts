import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // All tables in the database
    // const result = await sql`
    // SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
    //   ;
    // `;
    const result = await sql`
    select * from Standings;
   `;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
