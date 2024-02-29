"use client";
import { useEffect, useState } from "react";
import Card from "../../Components/Card/Card";
import Image from "next/image";
import styles from "./styles.module.css";
interface RoosterProps {
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

interface CardProps {
  player_name: string;
  player_commitment: string;
  player_position: string;
}

const fetchData = async (team: string, setRoosterData: any, setLoading: any) => {
  try {
    setLoading(true);
    const response = await fetch(`/api/${team}/rooster`);
    const data = await response.json();
    const rows = data.rows;
    console.log(rows);
    setRoosterData(rows);
  } catch (error) {
    console.error("Error fetching RSVP data:", error);
  } finally {
    setLoading(false);
  }
};

export default function Rooster({ params }: RoosterProps) {
  const [roosterData, setRoosterData] = useState<CardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData(params.team, setRoosterData, setLoading);
  }, [params.team]);

  return loading ? (
    <LoadingMessage />
  ) : validTeams.includes(params.team) ? (
    <ValidTeamContent params={params} roosterData={roosterData} />
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
  roosterData,
}: {
  params: { team: string };
  roosterData: CardProps[];
}) => (
  <main>
    <h1>ROOSTER FOR {params.team.toUpperCase()}</h1>
    <TeamLogo team={params.team} />
    <br />
    <PlayerCards params={params} roosterData={roosterData}/>
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
const PlayerCards = ({
  params,
  roosterData,
}: {
  params: { team: string };
  roosterData: CardProps[];
}) => (
  <center>
    <div className={styles.cardContainer}>
      {roosterData.map((row) => (
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
      onClick={
        () => {
          console.log("Add Player");
      }
      }
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
      onClick={
        () => {
          console.log("Remove Player");
      }
      }
    >
      Remove Player
    </button>
  </center>
);
