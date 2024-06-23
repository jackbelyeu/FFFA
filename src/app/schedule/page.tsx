"use client";
import React, { useState, useEffect } from "react";
import Match from "@/app/Components/scheduleCard/match";
import Accordion from "react-bootstrap/Accordion";

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

const MatchSchedule = () => {
  const [pastMatches, setPastMatches] = useState<matchRow[]>([]);
  const [futureMatches, setFutureMatches] = useState<matchRow[]>([]);
  const [todayDate, setTodayDate] = useState(
    new Date().toISOString().substring(0, 10)
  );

  useEffect(() => {
    fetch("api/matchSchedule")
      .then((response) => response.json())
      .then((data) => {
        const matchRows: matchRow[] = data.matches;

        // Get the current date in UTC
        const todayUTC = new Date(new Date().toUTCString());
        const centralOffset = -5 * 60 * 60 * 1000;
        const todayCentral = new Date(todayUTC.getTime() + centralOffset);
        const todayDate = todayCentral.toISOString().split("T")[0];

        const pastMatches = matchRows.filter(
          (row: matchRow) => row.date.split("T")[0] < todayDate
        );
        setPastMatches(pastMatches.reverse());

        const futureMatches = matchRows.filter(
          (row: matchRow) => row.date.split("T")[0] >= todayDate
        );
        setFutureMatches(futureMatches);
      });
  }, []);

  return (
    <div>
      <center>
        <br />
        <h1 className="text-center text-2xl font-medium text-blue-500">
          Match Schedule
        </h1>
        {futureMatches.length < 1 && pastMatches.length < 1 && (
          <h2 className="text-center text-xl font-medium text-blue-500">
            No matches scheduled
          </h2>
        )}

        <Accordion defaultActiveKey={["0"]} alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <h2 className="text-center text-xl font-medium text-blue-500">
                Upcoming Matches
              </h2>
            </Accordion.Header>
            <Accordion.Body>
              {futureMatches.length > 0 && (
                <>
                  {futureMatches.map((row: any) => (
                    <Match
                      key={row.matchid}
                      match_id={row.matchid}
                      home_team={row.hometeamid}
                      away_team={row.awayteamid}
                      time={row.time}
                      date={row.date}
                      location={row.locationid}
                    />
                  ))}
                </>
              )}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <h2 className="text-center text-xl font-medium text-blue-500">
                Past Matches
              </h2>
            </Accordion.Header>
            <Accordion.Body>
              {pastMatches.length > 0 && (
                <>
                  {pastMatches.map((row: any) => (
                    <Match
                      key={row.matchid}
                      match_id={row.matchid}
                      home_team={row.hometeamid}
                      away_team={row.awayteamid}
                      time={row.time}
                      date={row.date}
                      location={row.locationid}
                    />
                  ))}
                </>
              )}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </center>
      <br />
    </div>
  );
};

export default MatchSchedule;
