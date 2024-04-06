import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const params = new URLSearchParams(url.search);
    const teamId = params.get("teamId");

    const res = await sql`
      SELECT teamName FROM teams WHERE teamId = ${teamId};
    `;

    const teamName = res.rows.map((name) => name.teamname);
    console.log(teamName);

    return NextResponse.json({ teamName }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
