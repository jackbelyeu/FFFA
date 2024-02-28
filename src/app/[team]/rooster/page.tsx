"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

interface RSVPProps {
  params: {
    team: string;
  };
}

const validTeams = [
  "emus",
  "mockingbirds",
  "chickens",
  "mosquitoes",
  "grasskickers",
  "hyenas",
];

interface Row {
  player_name: string;
  oct_8: string;
  oct_15: string;
  oct_22: string;
  oct_29: string;
  nov_5: string;
  nov_12: string;
  nov_19: string;
  nov_26: string;
}

export default function RSVP({ params }: RSVPProps) {
  const [rsvpData, setRsvpData] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  // const handleChange = async (event: any, row: Row) => {
  //   await fetch(`/api/${params.team}/rsvp`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       player_name: row.player_name,
  //     }),
  //   });
  //   window.location.reload();
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/${params.team}/rsvp`);
        const data = await response.json();
        const rows = data.rows;
        setRsvpData(rows);
      } catch (error) {
        console.error("Error fetching RSVP data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.team]);

  if (loading) {
    return (
      <main>
        <h1>... Updating Give me a Second..</h1>
      </main>
    );
  }
  const validTeamContent = (
    <main>
      <h1>ROOSTER FOR {params.team.toUpperCase()}</h1>
      <Image
        src={`/logos/${params.team}.jpeg`}
        alt="Team logo"
        width={100}
        height={100}
        style={{
          display: "flex",
          margin: "auto",
          marginBottom: "-20px",
        }}
      />
      <center>
        <table
          style={{
            marginLeft: "-1%",
            marginTop: "5%",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Player
              </th>
              <th>Position</th>
              <th>Commitment Level</th>
            </tr>
          </thead>
          <tbody>
            {rsvpData.map((row) => (
              <tr key={row.player_name}>
                <td style={{ textAlign: "center", fontWeight: "bold" }}>
                  {row.player_name}
                </td>
                <td>
                  <select>
                    <option value="Goalkeeper">Goalkeeper</option>
                    <option value="Defender">Defender</option>
                    <option value="Midfielder">Midfielder</option>
                    <option value="Forward">Forward</option>
                  </select>
                </td>
                <td>
                  <select>
                    <option value="fulltime">Full Time</option>
                    <option value="parttime">Part Time</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button>Add Player</button>
        <button>Remove Player</button>
      </center>
    </main>
  );

  const invalidTeamContent = (
    <main>
      <h1>Invalid Team</h1>
      <p>Sorry 🙃, No RSVP for {params.team.toUpperCase()} </p>
      We will be adding more teams soon.
      <h1>😊</h1>
    </main>
  );

  return validTeams.includes(params.team)
    ? validTeamContent
    : invalidTeamContent;
}
