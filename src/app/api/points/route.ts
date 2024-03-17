import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const result = await sql`SELECT * FROM DC  
    ORDER BY POINTS DESC;`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });

  }
}
export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log(data);
    const result = await sql`
    UPDATE standings
     SET wins = ${data.wins},
         losses = ${data.losses},
         draws = ${data.draws},
         matches_played = ${data.matches_played},
         points = ${data.points}
     WHERE team = ${data.team};`
     console.log(result);
    return NextResponse.json(result);
  } catch (error) {
    // If an error occurs, respond with an error message
    return new Response(JSON.stringify({ error: "Failed to process data" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}


