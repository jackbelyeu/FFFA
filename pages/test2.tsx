import Link from "next/link";
import { sql } from "@vercel/postgres";


interface Player {
  id: number;
  player_name: string;
  game_date: string;
  availability: string;
}

interface Props {
  initialData: Player[];
}

export default function Test2({ initialData }: Props) {
  const handleAvailabilityUpdate = async (playerId: number, gameDate: string, updatedAvailability: boolean) => {
    try {
      console.log("Player ID:", playerId); // Log player_id
      await fetch('/api/updatePlayerAvailability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          playerId,
          gameDate,
          availability: updatedAvailability ? "Yes" : "No", // Convert boolean to string
        }),
      });
      // Optionally, refresh the data on the page to reflect the update
      location.reload(); // Reload the page to reflect changes
    } catch (error) {
      console.error("Error updating player availability:", error);
    }
  };

  return (
    <div>
      <h1>Player Availability</h1>
      <Link href="/dashboard">Go to Dashboard</Link>{" "}
      <Link href="/learnmore">Learn More</Link>{" "}
      <Link href="/test2">Test</Link>
      <h2>Player Availability for Games</h2>
      
      <table>
        <thead>
          <tr>
            {/* <th>id</th> */}
            <th>Player Name</th>
            <th>Game Date</th>
            <th>Availability</th>
          </tr>
        </thead>
        <tbody>
          {initialData.map((player, index) => (
            <tr key={index}>
                {/* <td>{player.id}</td> */}
              <td>{player.player_name}</td>
              <td>{new Date(player.game_date).toLocaleString()}</td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={player.availability === "Yes"}
                   // Set checked based on availability
                  onChange={(e) => handleAvailabilityUpdate(player.id, player.game_date, e.target.checked)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const { rows } = await sql`select * from player_availability;`;
    const formattedData = rows.map((row) => ({
      ...row,
      game_date: row.game_date.toISOString(),
      
    }));
    return { props: { initialData: formattedData } };
  } catch (error) {
    console.error("Error fetching data from the database:", error);
    return { props: { initialData: [] } };
  }
}
