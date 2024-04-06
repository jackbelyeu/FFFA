import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const params = new URLSearchParams(url.search);
    const locationId = params.get("locationId");

    const res = await sql`
      SELECT locationName FROM locations WHERE locationId = ${locationId};
    `;

    const locationName = res.rows.map((name) => name.locationname);
    console.log(locationName);

    return NextResponse.json({ locationName }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
