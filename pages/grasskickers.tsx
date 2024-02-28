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
  const [checkedCount, setCheckedCount] = useState(0);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await fetch('/api/checkAuth');
        if (response.ok) {
          setLoggedIn(true);
        } else {
          Router.push('/login');
        }
      } catch (error) {
        console.error('Error checking authentication status:', error);
      }
    };

    checkLoggedIn();

    // Calculate initial count based on pre-existing checked checkboxes
    const initialCount = initialData.filter(player => player.status === 'Yes').length;
    setCheckedCount(initialCount);
    localStorage.setItem('checkedCount', initialCount.toString());
  }, [initialData]);

  const handleAvailabilityUpdate = async (playerId: number, gameDate: string, updatedAvailability: boolean) => {
    try {
      await fetch('/api/updatePlayerAvailability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          playerId,
          gameDate,
          availability: updatedAvailability ? 'Yes' : 'No',
        }),
      });
      // Update the count of checked checkboxes and store it in local storage
      const newCount = updatedAvailability ? checkedCount + 1 : checkedCount - 1;
      setCheckedCount(newCount);
      localStorage.setItem('checkedCount', newCount.toString());
    } catch (error) {
      console.error('Error updating player availability:', error);
    }
  };

  const handleCheckboxChange = (playerId: number, gameDate: string, isChecked: boolean) => {
    handleAvailabilityUpdate(playerId, gameDate, isChecked);
  };

  return (
    <div>
      {loggedIn && (
        <>
          <h1>Player Availability</h1>
          <img style={{ width: '10%', height: '10%', objectFit: 'cover' }} src={"logos/Grasskickers.jpeg"} alt="" />
          <h2>Player Availability for Games</h2>
          <table>
            <thead>
              <tr>
                <th>Player Name</th>
                <th>Game Date</th>
                <th>Availability ({checkedCount})</th>
              </tr>
            </thead>
            <tbody>
              {initialData.map((player, index) => (
                <tr key={index}>
                  <td>{player.playername}</td>
                  <td>{player.date}</td>
                  <td>
                    <input
                      type="checkbox"
                      defaultChecked={player.status === 'Yes'}
                      onChange={(e) => handleCheckboxChange(player.playerid, player.date, e.target.checked)}
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
    const { rows } = await sql`select * from grasskickers;`;
    const formattedData = rows.map((row) => ({
      ...row,
      date: row.date.toISOString(),
    }));
    return { props: { initialData: formattedData } };
  } catch (error) {
    console.error('Error fetching data from the database:', error);
    return { props: { initialData: [] } };
  }
}
