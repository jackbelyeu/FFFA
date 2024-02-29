"use client";
import { useEffect, useState } from "react";
import Card from "../../Components/Card/Card";
import Image from "next/image";
import styles from "./styles.module.css";
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

const fetchData = async (team: string, setRsvpData: any, setLoading: any) => {
  try {
    setLoading(true);
    const response = await fetch(`/api/${team}/rsvp`);
    const data = await response.json();
    const rows = data.rows;
    setRsvpData(rows);
  } catch (error) {
    console.error("Error fetching RSVP data:", error);
  } finally {
    setLoading(false);
  }
};

export default function RSVP({ params }: RSVPProps) {
  const [rsvpData, setRsvpData] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData(params.team, setRsvpData, setLoading);
  }, [params.team]);

  return loading ? (
    <LoadingMessage />
  ) : validTeams.includes(params.team) ? (
    <ValidTeamContent params={params} rsvpData={rsvpData} />
  ) : (
    <InvalidTeamContent params={params} />
  );
}

const LoadingMessage = () => (
  <main>
    <h1>... Updating Give me a Second..</h1>
  </main>
);

const ValidTeamContent = ({
  params,
  rsvpData,
}: {
  params: { team: string };
  rsvpData: Row[];
}) => (
  <main>
    <h1>ROOSTER FOR {params.team.toUpperCase()}</h1>
    <TeamLogo team={params.team} />
    <br />
    <PlayerTable params={params} rsvpData={rsvpData} />
  </main>
);

const InvalidTeamContent = ({ params }: { params: { team: string } }) => (
  <main>
    <h1>Invalid Team</h1>
    <p>Sorry 🙃, No RSVP for {params.team.toUpperCase()} </p>
    We will be adding more teams soon.
    <h1>😊</h1>
  </main>
);

const TeamLogo = ({ team }: { team: string }) => (
  <Image
    src={`/logos/${team}.jpeg`}
    alt="Team logo"
    width={100}
    height={100}
    style={{
      display: "flex",
      margin: "auto",
      marginBottom: "-20px",
    }}
  />
);
const PlayerTable = ({
  params,
  rsvpData,
}: {
  params: { team: string };
  rsvpData: Row[];
}) => (
  <center>
    <div className={styles.cardContainer}>
      {rsvpData.map((row) => (
        <Card
          key={row.player_name}
          player_name={row.player_name}
          player_commitment="Full Time"
          player_position="Mid Fielder"
          player_team={params.team}
        />
      ))}
    </div>
    <button
      style={{
        margin: "10px",
        backgroundColor: "green",
        color: "white",
        width: "150px",
        height: "50px",
      }}
    >
      Add Player
    </button>
    <button
      style={{
        margin: "10px",
        backgroundColor: "red",
        color: "white",
        width: "150px",
        height: "50px",
      }}
    >
      Remove Player
    </button>
  </center>
);
