import React from 'react';
import { sql } from "@vercel/postgres";
import dynamic from 'next/dynamic';

const MatchSchedule = dynamic(() => import('./MatchSchedule.client'), {
  ssr: false,
});

export default async function Page() {
  // const { rows } = await sql`SELECT * from players`;
  
  return (
    <div>
      <h1>Match Schedule</h1>
      <MatchSchedule />
    </div>
  );
}
