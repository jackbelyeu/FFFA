import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const match_id = await request.json();
  console.log(match_id);
  const result = await sql`
  delete from matches
  WHERE matchid = ${match_id.matchid};
`;
  return NextResponse.json(result);
}
