import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Extract the query parameters from the request URL
    const searchParams = new URLSearchParams(request.url.split('?')[1]);

    // Extract the selected team and year from the query parameters
    const team = searchParams.get('team');
    const year = searchParams.get('year');

    console.log("Team:", team);

    // Use parameterized query to fetch data based on the selected team and year
    const result = await sql`SELECT * FROM standings WHERE team = ${team}`;
    console.log(result);
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
