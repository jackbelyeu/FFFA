// Import your database client library (e.g., @vercel/postgres)
import { sql } from "@vercel/postgres";

// Example Express route handler to update player availability
export default async function updatePlayerAvailability(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // Extract playerId, gameDate, and availability from the request body
    const { playerId, gameDate, availability } = req.body;
    console.log(`${availability}`)
    console.log(`${playerId}`)
    // Update the player availability in the database
    await sql`
      UPDATE grasskickers
      SET status = ${availability}
      WHERE playerid = ${playerId} 
    `;

    // Send a success response
    res.status(200).json({ message: "Player availability updated successfully" });
  } catch (error) {
    console.error("Error updating player availability:", error);
    // Send an error response
    res.status(500).json({ message: "Internal Server Error" });
  }
}
