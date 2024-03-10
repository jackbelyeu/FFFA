// import { sql } from "@vercel/postgres";
// import { NextResponse } from "next/server";

// export async function GET(request: Request) {
 
//   try {
    
    

//     const result = await sql`DELETE FROM Teams`;
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }

//   const teams = await sql`SELECT * FROM teams;`;
//   return NextResponse.json({ teams }, { status: 200 });
// }


import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const team = searchParams.get("team");

  try {
    
    await sql`
      DELETE FROM Elevate
      WHERE Team = ${team};
    `;

    
    const teams = await sql`SELECT * FROM Elevate;`;

    return NextResponse.json({ teams }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
