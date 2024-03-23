import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { team: string; params: any }
) {
  try {
    const body = await request.json();  
    const { player_name, commitment, position,previous_club } = body;
    console.log(previous_club)
    const existingRecord = await sql`
      SELECT * FROM RISERS_RSVP
      WHERE player_name = ${player_name}
      AND player_team = ${params.team}
    `;
    
    if (existingRecord && existingRecord.rowCount > 0) {
      const result = await sql`
        UPDATE RISERS_RSVP
        SET commitment = ${commitment},
        position = ${position},
        previous_club = ${previous_club}
        WHERE player_name = ${player_name}
        AND player_team = ${params.team}
      `;
      return NextResponse.json(result);
    }
    
    const result = await sql`
      INSERT INTO RISERS_RSVP(
        player_name, 
        player_team, 
        oct_8, 
        oct_15, 
        oct_22, 
        oct_29, 
        nov_5, 
        nov_12, 
        nov_19, 
        nov_26, 
        commitment, 
        position,
        previous_club
      )
      VALUES(
        ${player_name},
        ${params.team},
        'NO',
        'NO',
        'NO',
        'NO',
        'NO',
        'NO',
        'NO',
        'NO',
        ${commitment},
        ${position},
        ${previous_club}
      )
    `;
    
    return NextResponse.json(result);
  }
  catch (error) {
    console.error("Error updating player data:", error);
    return NextResponse.error(); 
  }
}
