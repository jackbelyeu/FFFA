// pages/api/update-status.ts

import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";
import { playeravail } from "../schema/playeravail";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      // Parse and validate the request body
      const updates = req.body.map((update: any) => playeravail.parse(update));

      // Process each validated update
      for (const { playerId, date, status } of updates) {
        // Convert the date string to a format acceptable by SQL database
        const dateString = new Date(date).toISOString();
        await sql`
          UPDATE Mosquitoes 
          SET status = ${status}, date = ${dateString} 
          WHERE playerid = ${playerId};
        `;
      }

      res.status(200).json({ message: "Statuses updated successfully" });
    } catch (error) {
      console.error("Error updating statuses:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end("Method Not Allowed");
  }
}
