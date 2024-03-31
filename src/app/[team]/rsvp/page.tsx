"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import people from "/src/images/people.jpeg";
import Spinner from "react-bootstrap/Spinner";
import { Toaster, toast } from "sonner";
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
    toast.success("RSVP updated successfully")
      
  };

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
        <h1>Loading...</h1>
        <center>
          <Spinner animation="border" size="sm" />
          <Spinner animation="border" />
          <Spinner animation="grow" size="sm" />
          <Spinner animation="grow" />
        </center>
      </main>
    );
  }
  const validTeamContent = (
    <main>
      <h1>RSVP FOR {params.team.toUpperCase()}</h1>
      <Toaster richColors closeButton />
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
              <th
                style={{
                  textAlign: "center",

                  fontWeight: "bold",
                }}
              >
                Oct 8
                <br />
                <Image
                  src={people}
                  alt="correct"
                  width={20}
                  height={20}
                  style={{
                    display: "flex",
                    margin: "auto",
                    marginBottom: "-20px",
                    marginLeft: "13px",
                  }}
                />
                {rsvpData.filter((row) => row.oct_8 === "YES").length}
              </th>
              <th
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Oct 15
                <br />
                <Image
                  src={people}
                  alt="correct"
                  width={20}
                  height={20}
                  style={{
                    display: "flex",
                    margin: "auto",
                    marginBottom: "-20px",
                    marginLeft: "13px",
                  }}
                />
                {rsvpData.filter((row) => row.oct_15 === "YES").length}
              </th>
              <th
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Oct 22
                <br />
                <Image
                  src={people}
                  alt="correct"
                  width={20}
                  height={20}
                  style={{
                    display: "flex",
                    margin: "auto",
                    marginBottom: "-20px",
                    marginLeft: "13px",
                  }}
                />
                {rsvpData.filter((row) => row.oct_22 === "YES").length}
              </th>
              <th
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Oct 29
                <br />
                <Image
                  src={people}
                  alt="correct"
                  width={20}
                  height={20}
                  style={{
                    display: "flex",
                    margin: "auto",
                    marginBottom: "-20px",
                    marginLeft: "13px",
                  }}
                />
                {rsvpData.filter((row) => row.oct_29 === "YES").length}
              </th>
              <th
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Nov 5
                <br />
                <Image
                  src={people}
                  alt="correct"
                  width={20}
                  height={20}
                  style={{
                    display: "flex",
                    margin: "auto",
                    marginBottom: "-20px",
                    marginLeft: "13px",
                  }}
                />
                {rsvpData.filter((row) => row.nov_5 === "YES").length}
              </th>
              <th
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Nov 12
                <br />
                <Image
                  src={people}
                  alt="correct"
                  width={20}
                  height={20}
                  style={{
                    display: "flex",
                    margin: "auto",
                    marginBottom: "-20px",
                    marginLeft: "13px",
                  }}
                />
                {rsvpData.filter((row) => row.nov_12 === "YES").length}
              </th>
              <th
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Nov 19
                <br />
                <Image
                  src={people}
                  alt="correct"
                  width={20}
                  height={20}
                  style={{
                    display: "flex",
                    margin: "auto",
                    marginBottom: "-20px",
                    marginLeft: "13px",
                  }}
                />
                {rsvpData.filter((row) => row.nov_19 === "YES").length}
              </th>
              <th
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Nov 26
                <br />
                <Image
                  src={people}
                  alt="correct"
                  width={20}
                  height={20}
                  style={{
                    display: "flex",
                    margin: "auto",
                    marginBottom: "-20px",
                    marginLeft: "13px",
                  }}
                />
                {rsvpData.filter((row) => row.nov_26 === "YES").length}
              </th>
            </tr>
          </thead>
          <tbody>
            {rsvpData.map((row) => (
              <tr key={row.player_name}>
                <td style={{ textAlign: "center", fontWeight: "bold" }}>
                  {row.player_name}
                </td>
                <td>
                  <select
                    defaultValue={row.oct_8}
                    id={`oct_8_${row.player_name}`}
                    onChange={(event) => handleChange(event, row)}
                  >
                    <option value="YES">Yes</option>
                    <option value="NO">No</option>
                    <option value="If Needed">If Needed</option>
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
                    <option value="If Needed">If Needed</option>
                    <option value="pending">Pending</option>
                  </select>
                </td>
                <td>
                  <select
                    defaultValue={row.oct_22}
                    id={`oct_22_${row.player_name}`}
                    onChange={(event) => handleChange(event, row)}
                  >
                    <option value="YES">Yes</option>
                    <option value="NO">No</option>
                    <option value="If Needed">If Needed</option>
                    <option value="pending">Pending</option>
                  </select>
                </td>
                <td>
                  <select
                    defaultValue={row.oct_29}
                    id={`oct_29_${row.player_name}`}
                    onChange={(event) => handleChange(event, row)}
                  >
                    <option value="YES">Yes</option>
                    <option value="NO">No</option>
                    <option value="If Needed">If Needed</option>
                    <option value="pending">Pending</option>
                  </select>
                </td>
                <td>
                  <select
                    defaultValue={row.nov_5}
                    id={`nov_5_${row.player_name}`}
                    onChange={(event) => handleChange(event, row)}
                  >
                    <option value="YES">Yes</option>
                    <option value="NO">No</option>
                    <option value="If Needed">If Needed</option>
                    <option value="pending">Pending</option>
                  </select>
                </td>
                <td>
                  <select
                    defaultValue={row.nov_12}
                    id={`nov_12_${row.player_name}`}
                    onChange={(event) => handleChange(event, row)}
                  >
                    <option value="YES">Yes</option>
                    <option value="NO">No</option>
                    <option value="If Needed">If Needed</option>
                    <option value="pending">Pending</option>
                  </select>
                </td>
                <td>
                  <select
                    defaultValue={row.nov_19}
                    id={`nov_19_${row.player_name}`}
                    onChange={(event) => handleChange(event, row)}
                  >
                    <option value="YES">Yes</option>
                    <option value="NO">No</option>
                    <option value="If Needed">If Needed</option>
                    <option value="pending">Pending</option>
                  </select>
                </td>
                <td>
                  <select
                    defaultValue={row.nov_26}
                    id={`nov_26_${row.player_name}`}
                    onChange={(event) => handleChange(event, row)}
                  >
                    <option value="YES">Yes</option>
                    <option value="NO">No</option>
                    <option value="If Needed">If Needed</option>
                    <option value="pending">Pending</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
