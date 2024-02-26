// Note that 'sql' must be properly configured to work with your database.
import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
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
}
