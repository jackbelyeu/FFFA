"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";

interface MatchProps {
  match_id: string;
  home_team: number;
  away_team: number;
  time: string;
  date: string;
  location: number;
}

function MatchCard({
  home_team: initialHomeTeamId,
  away_team: initialAwayTeamId,
  time: initialTime,
  date: initialDate,
  location: initialLocation,
}: MatchProps) {
  const [homeTeam, setHomeTeam] = useState(initialHomeTeamId);
  const [awayTeam, setAwayTeam] = useState(initialAwayTeamId);
  const [time, setTime] = useState(initialTime);
  const [date, setDate] = useState(initialDate);
  const [location, setLocation] = useState(initialLocation);
  const [teamNames, setTeamNames] = useState<{ [key: number]: string }>({});
  const [locationNames, setLocationNames] = useState<{ [key: number]: string }>(
    {}
  );

  useEffect(() => {
    const fetchMatchData = async () => {
      const homeTeamName = await fetchTeamName(homeTeam);
      const awayTeamName = await fetchTeamName(awayTeam);
      const locationName = await fetchLocationName(location);
      setTeamNames({ [homeTeam]: homeTeamName, [awayTeam]: awayTeamName });
      setLocationNames({ [location]: locationName });
    };

    fetchMatchData();
  }, [homeTeam, awayTeam, location]);

  const fetchTeamName = async (teamId: number) => {
    const response = await fetch(`/api/getTeamNameById?teamId=${teamId}`);
    const data = await response.json();
    return data.teamName;
  };

  const fetchLocationName = async (locationId: number) => {
    const response = await fetch(
      `/api/getLocationNameById?locationId=${locationId}`
    );
    const data = await response.json();
    return data.locationName;
  };

  return (
    <div className="mx-auto w-[70vh] text-center text-white space-y-1">
      <div className="h-1"></div>
      <div className="flex justify-between items-center">
        <div className="transition-transform duration-300 hover:scale-110">
          <Link href={`/${teamNames[homeTeam]}`}>
            <Image
              src={`/logos/${teamNames[homeTeam]}.jpeg`}
              alt={`Logo of ${homeTeam}`}
              width={176}
              height={176}
              className="rounded-full mx-auto"
            />
          </Link>
        </div>
        <div>
          <Image
            src={`/images/vs.png`}
            alt="VS"
            width={200}
            height={200}
            className="mx-auto"
          />
        </div>
        <div className="space-y-2 rounded-lg">
          <div className="transition-transform duration-300 hover:scale-110">
            <Link href={`/${teamNames[homeTeam]}`}>
              <Image
                src={`/logos/${teamNames[awayTeam]}.jpeg`}
                alt={`Logo of ${awayTeam}`}
                width={176}
                height={176}
                className="rounded-full mx-auto"
              />
            </Link>
          </div>
        </div>
      </div>
      <p>
        <b>Location:</b> {locationNames[location]}
      </p>
    </div>
  );
}

export default MatchCard;
