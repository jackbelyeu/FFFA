import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { deletelocation } = body;
    console.log(deletelocation);
    const result = await sql`
    DELETE FROM locations WHERE locationName = ${deletelocation};
    `;
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error updating player data:", error);
    return NextResponse.error();
  }
}
