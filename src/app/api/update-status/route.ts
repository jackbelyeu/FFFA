import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { playerId, date, status } = req.body;
    try {
      await sql`
        UPDATE Mosquitoes 
        SET status = ${status}, date = ${date} 
        WHERE playerid = ${playerId};
      `;
      res.status(200).json({ message: "Status updated successfully" });
    } catch (error) {
      console.error("Error updating status:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end("Method Not Allowed");
  }
}
