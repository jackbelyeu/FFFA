import { sql } from "@vercel/postgres";
import Link from "next/link";

// Define interface for club logos
interface ClubLogos {
  [key: string]: string;
}

// Object containing club logos
const clubLogos: ClubLogos = {
  Mosquitoes: "/logos/Mosquitoes.jpeg",
  Hyenas: "/logos/Hyenas.jpeg",
  PaceyChickens: "/logos/Pacey_Chickens.jpeg",
  Grasskickers: "/logos/Grasskickers.jpeg",
  Emus: "/logos/Emus.jpeg",
  Mockingbirds: "/logos/Mockingbirds.jpeg",
  // Add more club logos as needed
};
export default async function Page({
  searchParams,
}: {
  searchParams: {
    teamname: string;
  };
}) {
  // if (searchParams.teamname=="PCFC"){
  //   let searchParams.teamname="Pacey_Chickens";

  // }
  // Fetch data from database
  const { rows } =
    await sql`SELECT * from playerinfo where club= ${searchParams.teamname}`;
  console.log(searchParams.teamname);

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Navigation */}
      <nav
        style={{
          background: "#333",
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem",
          alignItems: "center",
        }}
      >
        {/* Display club logo */}
        <img
          src={clubLogos[searchParams.teamname]}
          width="100"
          height="100"
          style={{ transition: "transform 0.3s ease" }}
        />
        {/* Display team name */}
        <h1
          style={{
            marginLeft: "1rem",
            fontSize: "1.5rem",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          Welcome to {searchParams.teamname} Roster
        </h1>
      </nav>

      {/* Display player cards */}
      <div
        className="card-container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          padding: "1rem",
        }}
      >
        {rows.map((row) => (
          <div
            className="card"
            key={row.playername}
            style={{
              background: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(10px)",
              borderRadius: "10px",
              overflow: "hidden",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              margin: "10px",
              padding: "10px",
              width: "calc(25% - 20px)", // Adjust as necessary for your layout
            }}
          >
            {/* Link for player image */}
            <Link
              href={{
                pathname: "/RSVP",
                query: { playername: row.playername },
              }}
            >
              {/* Player image */}
              <div>
                <img
                  src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  style={{
                    width: "100px",
                    height: "100px",
                    display: "block",
                  }}
                  alt="Player"
                />
              </div>
            </Link>
            {/* Player details */}
            <div style={{ color: "black" }}>
              <p>{row.playername}</p>
              <p>{row.position}</p>
              <p>{row.commitment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
