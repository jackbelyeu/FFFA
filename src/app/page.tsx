"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface Row {
  team: string;
  wins: number;
  draws: number;
  loses: number;
  goalsdifference: number;
  points: number;
  year: number;
  matchesplayed: number;
}

export default function Page() {
  const [pointsData, setPointsData] = useState<Row[]>([]);
  const [uniqueTeams, setUniqueTeams] = useState<string[]>([]);
  const [filteredPointsData, setFilteredPointsData] = useState<Row[]>([]);
  const router = useRouter();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const fetchPointsData = async () => {
    try {
      const response = await fetch("/api/points");
      const data = await response.json();
      setPointsData(data.result.rows);

      // Create a list of unique teams
      const teamNames = data.result.rows.map((row: Row) => row.team);
      const teamSet = new Set(teamNames);
      setUniqueTeams(Array.from(teamSet) as string[]); // Cast to string[]
    } catch (error) {
      console.error("Error fetching points data:", error);
    }
  };

  useEffect(() => {
    fetchPointsData();

    document.body.classList.add("with-sidebar");

    return () => {
      document.body.classList.remove("with-sidebar");
    };
  }, []);

  const handleChangeYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const year = parseInt(event.target.value);
    const filteredData = pointsData.filter((row) => row.year === year);
    setFilteredPointsData(filteredData);
  };

  const handleSelectTeam = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const teamName = event.target.value;
    if (teamName === "Mosquitoes") {
      router.push("/Mosquitoes"); // Directly navigate to Mosquitoes page
    } else if (teamName === "Hyenas") {
      router.push("/Hyenas"); // Directly navigate to Mosquitoes page
    } else if (teamName === "Emus") {
      router.push("/Emus"); // Directly navigate to Mosquitoes page
    } else if (teamName === "Grasskickers") {
      router.push("/Grasskickers"); // Directly navigate to Mosquitoes page
    } else if (teamName === "Mockingbirds") {
      router.push("/Mockingbirds"); // Directly navigate to Mosquitoes page
    } else if (teamName === "PCFC") {
      router.push("/PCFC"); // Directly navigate to Mosquitoes page
    } else {
      router.push(createTeamPageLink(teamName));
    }
  };

  // This function will generate the URL to the team's main page
  const createTeamPageLink = (teamName: string) => {
    return `/${encodeURIComponent(teamName.replace(/\s+/g, "-"))}`;
  };

  return (
    <div className="page-layout">
      {/* Button to toggle the sidebar */}
      <button
        className="sidebar-toggle"
        onClick={() => setIsSidebarVisible(!isSidebarVisible)}
      >
        {/* Styled div for three dots */}
        <div className="dots-icon">⋮</div>
      </button>

      {/* Conditional rendering of the sidebar based on its visibility state */}
      {isSidebarVisible && (
        <nav className="sidebar">
          <Link href="/learnmore">Learn More</Link>
          <Link href="/Sch">Match Schedule</Link>
          <select onChange={handleSelectTeam} defaultValue="">
            <option value="" disabled>
              Teams
            </option>
            {uniqueTeams.map((team, index) => (
              <option key={index} value={team}>
                {team}
              </option>
            ))}
          </select>
           
        </nav>
      )}
      <main className="main-content">
        <h1>Flagrant Fowl Futbol Association</h1>
        <h2>Final Standings</h2>
        <h3>Points Table</h3>
        <select onChange={handleChangeYear}>
          <option value="">Select Year</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
        </select>
        <table>
          <thead>
            <tr>
              <th>Team</th>
              <th></th>
              <th>Wins</th>
              <th>Draws</th>
              <th>Loses</th>
              <th>Goals Difference</th>
              <th>Points</th>
              <th>Matches Played</th>
            </tr>
          </thead>
          <tbody>
            {filteredPointsData.map((row, index) => (
              <tr key={index}>
                <td>
                  {/* Correct usage of Link with child a tag */}
                  <Link
                    href={createTeamPageLink(row.team)}
                    className="team-link"
                  >
                    {row.team}
                  </Link>
                </td>
                <td>
                  <Image
                    src={`/logos/${row.team}.jpeg`}
                    alt={`Logo of ${row.team}`}
                    width={50}
                    height={50}
                  />
                </td>
                <td>{row.wins}</td>
                <td>{row.draws}</td>
                <td>{row.loses}</td>
                <td>{row.goalsdifference}</td>
                <td>{row.points}</td>
                <td>{row.wins + row.draws + row.loses}</td>
              </tr>
            ))}
            {filteredPointsData.length === 0 && (
              <tr>
                <td colSpan={8}>Please Select a year to get the Points</td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
}
