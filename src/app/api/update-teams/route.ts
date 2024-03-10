

import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

// export async function POST(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const teamName = searchParams.get("teamName");
//   const wins = Number(searchParams.get("wins"));
//   const draws = Number(searchParams.get("draws"));
//   const losses = Number(searchParams.get("losses"));
//   const gd = Number(searchParams.get("gd"));
//   console.log("in")
  
  

//   try {
//     if (!teamName || isNaN(wins) || isNaN(draws) || isNaN(losses) || isNaN(gd)) {
//       throw new Error("Incomplete or invalid data");
//     }

//     await sql`
//     UPDATE Elevate
//     SET Wins = ${wins}, Draws = ${draws}, Lost = ${losses}, GD = ${gd}
//     WHERE Team = ${teamName};
//   `;
   
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }

//   const teams = await sql`SELECT * FROM Elevate;`;
//   return NextResponse.json({ teams } , { status: 200 });
// }






export async function POST(request: Request) {
  const { teamName, wins, draws, losses, gd } = await request.json();

  if (!teamName || isNaN(wins) || isNaN(draws) || isNaN(losses) || isNaN(gd)) {
    return NextResponse.json({ error: "Incomplete or invalid data" }, { status: 500 });
  }

  await sql`
    UPDATE Elevate
    SET Wins = ${wins}, Draws = ${draws}, Lost = ${losses}, GD = ${gd}
    WHERE Team = ${teamName};
  `;

  const teams = await sql`SELECT * FROM Elevate;`;

  return NextResponse.json({ teams }, { status: 200 });
}




