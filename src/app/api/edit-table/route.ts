import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const team = searchParams.get("team");
  const year = searchParams.get("year");
  const W = searchParams.get("W");
  const D = searchParams.get("D");
  const L = searchParams.get("L");
  const GD = searchParams.get("GD");
  const Logo_path = searchParams.get("Logo_path");

  try {
    if (!team || !year || !W || !D || !L || !GD)
      throw new Error("All fields are required");

    // Calculate Points
    const Points = parseInt(W) * 3 + 1 * parseInt(D);

    // Check if the team already exists for the specified year
    const existingTeam =
      await sql`SELECT * FROM football_standings WHERE Year = ${year} AND Team = ${team};`;
    if (existingTeam.rowCount > 0) {
      // Update the existing team's standings
      await sql`UPDATE football_standings 
                  SET W = ${W}, D = ${D}, L = ${L}, GD = ${GD}, Points = ${Points}, Logo_path = ${Logo_path}
                  WHERE Year = ${year} AND Team = ${team};`;
    } else {
      // Insert a new row for the team
      await sql`INSERT INTO football_standings (Year, Team, W, D, L, GD, Points, Logo_path) 
                  VALUES (${year}, ${team}, ${W}, ${D}, ${L}, ${GD}, ${Points}, ${Logo_path});`;
    }
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }

  try {
    const standings =
      await sql`SELECT * FROM football_standings WHERE Year = ${year};`;
    return NextResponse.json({ standings }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
