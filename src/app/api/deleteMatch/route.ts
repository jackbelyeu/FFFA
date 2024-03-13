import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
const match_id=  await request.json();
  const result = await sql`
  delete from match_schedule
  WHERE match_id = ${match_id.match_id};
`;
  return NextResponse.json(result);
}
