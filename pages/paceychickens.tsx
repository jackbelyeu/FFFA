import { useState, useEffect } from 'react';
import Router from 'next/router';
import { sql } from "@vercel/postgres";
import "../styles/style.css";

interface Player {
  playerid: number;
  playername: string;
  status: string;
  date: string;
}

interface Props {
  initialData: Player[];
}

export default function Test2({ initialData }: Props) {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        // Perform a request to check the user's authentication status
        const response = await fetch('/api/checkAuth');
        if (response.ok) {
          // User is authenticated, set loggedIn state to true
          setLoggedIn(true);
        } else {
          // User is not authenticated, redirect to the login page
          Router.push('/login');
        }
      } catch (error) {
        console.error('Error checking authentication status:', error);
      }
    };

    checkLoggedIn();
  }, []);

  const handleAvailabilityUpdate = async (playerId: number, gameDate: string, updatedAvailability: boolean) => {
    try {
      console.log('Player ID:', playerId); // Log player_id
      await fetch('/api/updatePlayerAvailability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          playerId,
          gameDate,
          availability: updatedAvailability ? 'Yes' : 'No', // Convert boolean to string
        }),
      });
      // Optionally, refresh the data on the page to reflect the update
      location.reload(); // Reload the page to reflect changes
    } catch (error) {
      console.error('Error updating player availability:', error);
    }
  };

  return (
    <div>
      {loggedIn && (
        <>
          <h1>Player Availability</h1>
          <img style={{ width: '10%', height: '10%', objectFit: 'cover' }} src={"logos/PCFC.jpeg"} alt="" />
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
                  <td>{player.playername}</td>
                  <td>{player.date}</td>
                  <td>
                    <input
                      type="checkbox"
                      defaultChecked={player.status === 'Yes'}
                      // Set checked based on availability
                      onChange={(e) => handleAvailabilityUpdate(player.playerid, player.status, e.target.checked)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const { rows } = await sql`select * from paceychickens;`;
    const formattedData = rows.map((row) => ({
      ...row,
      // game_date: row.date.toISOString(),
    }));
    return { props: { initialData: formattedData } };
  } catch (error) {
    console.error('Error fetching data from the database:', error);
    return { props: { initialData: [] } };
  }
}