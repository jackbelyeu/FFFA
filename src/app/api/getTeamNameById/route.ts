import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { teamId } = body;

    const res = await sql`
    
    SELECT teamName FROM teams WHERE teamId = ${teamId};
  `;

    const teamName = res;
    return NextResponse.json({ teamName }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
