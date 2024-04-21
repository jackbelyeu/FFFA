import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const newlocation = await request.json();
  console.log(newlocation.newlocation);

  const result =
    await sql`INSERT INTO locations (locationName) VALUES (${newlocation.newlocation})`;
  return NextResponse.json(result);
}
