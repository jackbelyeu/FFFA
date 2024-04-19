import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    let {matchid, hometeamscore, awayteamscore} = await request.json();
    if (hometeamscore === undefined) {
      hometeamscore = 0;
    }
    if (awayteamscore === undefined) {
      awayteamscore = 0;
    }
    const result = await sql`
    UPDATE matches
    SET hometeamscore = ${hometeamscore},
        awayteamscore = ${awayteamscore}
    WHERE matchid = ${matchid};
  `;
    return NextResponse.json(result);
  }

