"use client";
import React, { useEffect, useState } from "react";
import AlertDismissible from "@/app/Components/Alert/Alert";
import Image from "next/image";
import ffaLogo from "@/images/logo.jpeg";
import bgfield from "@/images/field.png";
import { HomeCarousel } from "@/components/HomeCarousel";
import TeamStandings from "@/components/TeamStandings";
import MatchCard from "@/components/MatchCard";
import EmailButton from "@/app/Components/EmailButton/EmailButton";

interface Row {
  team_name: string;
  total_matches: number;
  wins: number;
  draws: number;
  losses: number;
  goal_difference: number;
}

interface StandingsResponse {
  standings: Row[];
  teams: string[];
}

type ISOString = string;
type matchRow = {
  matchid: number;
  hometeamid: number;
  awayteamid: number;
  hometeamscore: number;
  awayteamscore: number;
  date: ISOString;
  time: string;
  locationid: number;
};

export default function Page() {
  const [pointsData, setPointsData] = useState<Row[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [todayMatches, setTodayMatches] = useState<matchRow[]>([]);
  const [pastMatches, setPastMatches] = useState<matchRow[]>([]);
  const [futureMatches, setFutureMatches] = useState<matchRow[]>([]);
  const [todayDate, setTodayDate] = useState(
    new Date().toISOString().substring(0, 10)
  );

  useEffect(() => {
    // Fetch match data
    fetch("/api/matchSchedule")
      .then((response) => response.json())
      .then((data) => {
        const matchRows: matchRow[] = data.matches;

        // Get the current date in UTC
        const todayUTC = new Date();
        const localOffset = todayUTC.getTimezoneOffset() * 60 * 1000;
        const todayLocal = new Date(todayUTC.getTime() - localOffset);
        const todayDate = todayLocal.toISOString().split("T")[0];
        setTodayDate(todayDate);

        // Categorize matches based on date
        const todayMatches = matchRows.filter(
          (row) => row.date.split("T")[0] === todayDate
        );
        const pastMatches = matchRows.filter(
          (row) => row.date.split("T")[0] < todayDate
        );
        const futureMatches = matchRows.filter(
          (row) => row.date.split("T")[0] > todayDate
        );

        // Set state
        setTodayMatches(todayMatches);
        setPastMatches(pastMatches);
        setFutureMatches(futureMatches);
      });
  }, []);
  useEffect(() => {
    const fetchStandingsData = async () => {
      try {
        const response = await fetch("/api/standings");
        const data: StandingsResponse = await response.json();

        if (!data.standings) throw new Error("Standings data is missing");

        const teamMap: { [key: string]: Row } = {};
        data.standings.forEach((row) => (teamMap[row.team_name] = row));

        const allTeams = data.teams.map(
          (teamName) =>
            teamMap[teamName] || {
              team_name: teamName,
              total_matches: 0,
              wins: 0,
              draws: 0,
              losses: 0,
              goal_difference: 0,
            }
        );

        setPointsData(
          allTeams.sort((a, b) => b.wins * 3 + b.draws - (a.wins * 3 + a.draws))
        );
      } catch (error) {
        setError("Failed to fetch standings data");
        console.error("Error fetching standings data:", error);
      }
    };

    fetchStandingsData();
  }, []);

  return (
    <div>
      <AlertDismissible />
      <div className="relative sm:h-[68vh] z-1">
        <HomeCarousel />
        <div className="absolute left-0 right-0 bottom-0 flex justify-center items-center z-2 text-white">
          {/* Team Logo */}
          <div className="rounded-full overflow-hidden inline-block max-w-[100%] mb-[-20%] sm:mb-[-60px]">
            <Image src={ffaLogo} alt="People playing Soccer in a field" />
          </div>
        </div>
        <div className="absolute left-0 right-0 bottom-0 flex justify-center items-center z-1 text-white">
          <div className="inline-block rounded-full w-full sm:w-screen sm:h-10 bg-mainColor mb-[-10%] sm:mb-[-12px]"></div>
        </div>
      </div>
      <div>
        <div>
          <div className="inline-block w-full h-64 z-1 bg-mainColor p-2">
            <div>
              {todayMatches.length > 0 ? (
                todayMatches.map((match) => (
                  <MatchCard
                    key={match.matchid}
                    match_id={match.matchid.toString()}
                    home_team={match.hometeamid}
                    away_team={match.awayteamid}
                    time={match.time}
                    date={match.date}
                    location={match.locationid}
                  />
                ))
              ) : (
                <p className="text-center">No matches today</p>
              )}
            </div>
          </div>
        </div>
        <div className="relative flex flex-col items-center justify-center min-h-screen">
          <div className="absolute inset-0">
            <Image
              src={bgfield}
              alt="Background Field"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="p-4"></div>
          <center className="z-10 text-white">
            <h1>Flagrant Fowl Futbol Association</h1>
            <h1>Current Standings</h1>
          </center>
          <TeamStandings pointsData={pointsData} />
        </div>
      </div>

      <EmailButton></EmailButton>
    </div>
  );
}
