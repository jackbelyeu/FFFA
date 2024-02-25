"use client";
import { useEffect, useState } from "react";

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
  const handleChange = async (event: any, row: Row) => {
    await fetch(`/api/${params.team}/rsvp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        player_name: row.player_name,
        oct_8: (
          document.getElementById(
            `oct_8_${row.player_name}`
          ) as HTMLInputElement
        )?.value,
        oct_15: (
          document.getElementById(
            `oct_15_${row.player_name}`
          ) as HTMLInputElement
        )?.value,
        oct_22: (
          document.getElementById(
            `oct_22_${row.player_name}`
          ) as HTMLInputElement
        )?.value,
        oct_29: (
          document.getElementById(
            `oct_29_${row.player_name}`
          ) as HTMLInputElement
        )?.value,
        nov_5: (
          document.getElementById(
            `nov_5_${row.player_name}`
          ) as HTMLInputElement
        )?.value,
        nov_12: (
          document.getElementById(
            `nov_12_${row.player_name}`
          ) as HTMLInputElement
        )?.value,
        nov_19: (
          document.getElementById(
            `nov_19_${row.player_name}`
          ) as HTMLInputElement
        )?.value,
        nov_26: (
          document.getElementById(
            `nov_26_${row.player_name}`
          ) as HTMLInputElement
        )?.value,
      }),
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/${params.team}/rsvp`);
        const data = await response.json();
        const rows = data.rows;
        setRsvpData(rows);
      } catch (error) {
        console.error("Error fetching RSVP data:", error);
      }
    };

    fetchData();
  }, [params.team]);

  const validTeamContent = (
    <main>
      <h1>RSVP FOR {params.team.toUpperCase()}</h1>
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>
              Oct 8
              <br />
              {rsvpData.filter((row) => row.oct_8 === "YES").length}
            </th>
            <th>
              Oct 15
              <br />
              {rsvpData.filter((row) => row.oct_15 === "YES").length}
            </th>
            <th>
              Oct 22
              <br />
              {rsvpData.filter((row) => row.oct_22 === "YES").length}
            </th>
            <th>
              Oct 29
              <br />
              {rsvpData.filter((row) => row.oct_29 === "YES").length}
            </th>
            <th>
              Nov 5
              <br />
              {rsvpData.filter((row) => row.nov_5 === "YES").length}
            </th>
            <th>
              Nov 12
              <br />
              {rsvpData.filter((row) => row.nov_12 === "YES").length}
            </th>
            <th>
              Nov 19
              <br />
              {rsvpData.filter((row) => row.nov_19 === "YES").length}
            </th>
            <th>
              Nov 26
              <br />
              {rsvpData.filter((row) => row.nov_26 === "YES").length}
            </th>
          </tr>
        </thead>
        <tbody>
          {rsvpData.map((row) => (
            <tr key={row.player_name}>
              <td>{row.player_name}</td>
              <td>
                <select
                  defaultValue={row.oct_8}
                  id={`oct_8_${row.player_name}`}
                  onChange={(event) => handleChange(event, row)}
                >
                  <option value="YES">Yes</option>
                  <option value="NO">No</option>
                  <option value="ifneeded">If Needed</option>
                  <option value="pending">Pending</option>
                </select>
              </td>
              <td>
                <select
                  defaultValue={row.oct_15}
                  id={`oct_15_${row.player_name}`}
                  onChange={(event) => handleChange(event, row)}
                >
                  <option value="YES">Yes</option>
                  <option value="NO">No</option>
                  <option value="ifneeded">If Needed</option>
                  <option value="pending">Pending</option>
                </select>
              </td>
              <td>
                <select
                  defaultValue={row.oct_22}
                  id={`oct_22_${row.player_name}`}
                  onChange={(event) => handleChange(event, row)}
                >
                  <option value="YES">YES</option>
                  <option value="NO">NO</option>
                  <option value="ifneeded">If Needed</option>
                  <option value="pending">Pending</option>
                </select>
              </td>
              <td>
                <select
                  defaultValue={row.oct_29}
                  id={`oct_29_${row.player_name}`}
                  onChange={(event) => handleChange(event, row)}
                >
                  <option value="YES">YES</option>
                  <option value="NO">NO</option>
                  <option value="ifneeded">If Needed</option>
                  <option value="pending">Pending</option>
                </select>
              </td>
              <td>
                <select
                  defaultValue={row.nov_5}
                  id={`nov_5_${row.player_name}`}
                  onChange={(event) => handleChange(event, row)}
                >
                  <option value="YES">YES</option>
                  <option value="NO">NO</option>
                  <option value="ifneeded">If Needed</option>
                  <option value="pending">Pending</option>
                </select>
              </td>
              <td>
                <select
                  defaultValue={row.nov_12}
                  id={`nov_12_${row.player_name}`}
                  onChange={(event) => handleChange(event, row)}
                >
                  <option value="YES">YES</option>
                  <option value="NO">NO</option>
                  <option value="ifneeded">If Needed</option>
                  <option value="pending">Pending</option>
                </select>
              </td>
              <td>
                <select
                  defaultValue={row.nov_19}
                  id={`nov_19_${row.player_name}`}
                  onChange={(event) => handleChange(event, row)}
                >
                  <option value="YES">YES</option>
                  <option value="NO">NO</option>
                  <option value="ifneeded">If Needed</option>
                  <option value="pending">Pending</option>
                </select>
              </td>
              <td>
                <select
                  defaultValue={row.nov_26}
                  id={`nov_26_${row.player_name}`}
                  onChange={(event) => handleChange(event, row)}
                >
                  <option value="YES">YES</option>
                  <option value="NO">NO</option>
                  <option value="ifneeded">If Needed</option>
                  <option value="pending">Pending</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
