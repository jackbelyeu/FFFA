import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const teamId = await request.json();
  try {
    const result = await sql`
      SELECT teamName FROM teams WHERE teamId = ${teamId};
    `;
    const teamName = result.rows.map((name) => name.teamName);
    return NextResponse.json({ teamName }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
