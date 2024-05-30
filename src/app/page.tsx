"use client";
import React, { useEffect, useState } from "react";
import AlertDismissible from "@/app/Components/Alert/Alert";
import Image from "next/image";
import ffaLogo from "@/images/logo.jpeg";
import bgfield from "@/images/field.png";
import { HomeCarousel } from "@/app/Components/HomeCarousel";
import StandingsTable from "@/app/Components/StandingsTable/StandingsTable";
import Footer from "@/app/Components/Footer/Footer";

interface Row {
  teamname: string;
  matches_played: number;
  wins: number;
  draws: number;
  losses: number;
  goal_difference: number;
  points: number;
}

interface StandingsResponse {
  standings: Row[];
  teams: string[];
}

type ISOString = string;

export default function Page() {
  const [pointsData, setPointsData] = useState<Row[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    fetch("/api/standings")
      .then((res) => res.json())
      .then((data: StandingsResponse) => {
        setPointsData(data.standings);
      })
      .catch((error) => {
        setError("Failed to load standings data.");
      });
  }
  , []);
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
      </div>
      <div>
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
            <h1 className="text-center text-2xl font-bold text-blue-500">Flagrant Fowl Futbol Association</h1>
            <h1 className="text-center text-2xl font-bold text-blue-500">Current Standings</h1>
          </center>
          <StandingsTable pointsData={pointsData} />
        </div>
      </div>
    </div>
  );
}
