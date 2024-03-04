import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // const result = await sql` CREATE TABLE MatchSchedule(
    //     HomeTeam varchar(255),
    //     AwayTeam varchar(255),
    //     Date varchar(255),
    //     Time varchar(255),
    //     Location varchar(255),
    //     MatchDay int
    // );`;

    // const result =
    //   await sql`INSERT INTO MatchSchedule(HomeTeam,AwayTeam,Date,Time,Location,MatchDay)
    //   VALUES ('Mosquitoes','Emus','2024-03-01','15:00','Stadium A',1),
    //   ('Hyenas','Grasskickers','2024-03-01','17:00','Stadium B',1),
    //   ('Mockingbirds','PCFC','2024-03-02','14:00','Stadium C',2);`;

    const result =
      await sql`SELECT * FROM MatchSchedule ORDER BY  MatchDay ASC;`;

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { homeTeam, awayTeam, date, time, location, matchDay } =
    await request.json();
  console.log(homeTeam, awayTeam, date, time, location, matchDay);
  const result = await sql`
   INSERT INTO MatchSchedule (HomeTeam, AwayTeam, Date, Time, Location, MatchDay)
   VALUES (${homeTeam}, ${awayTeam}, ${date}, ${time}, ${location}, ${matchDay})
  `;
  return NextResponse.json(result);
  //return NextResponse.json({ status: 200 });
}
