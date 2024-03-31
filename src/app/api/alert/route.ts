import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const alert = await request.json();
  const alert_text = alert.alert;
  const result =
    await sql`INSERT INTO alerts (alert_text,alert_time) VALUES (${alert_text},now())`;
  return NextResponse.json(result);
}

export async function GET() {
  const response =
    await sql`SELECT * FROM alerts ORDER BY alert_time DESC LIMIT 1`;
  return NextResponse.json(response);
}
