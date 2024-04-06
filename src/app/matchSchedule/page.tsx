"use client";
import React, { useState, useEffect } from "react";
import Match from "@/app/Components/scheduleCard/match";
import Accordion from "react-bootstrap/Accordion";

const MatchSchedule = () => {
  const [rows, setRows] = useState([]);
  const [todayMatches, setTodayMatches] = useState([]);
  const [pastMatches, setPastMatches] = useState([]);
  const [futureMatches, setFutureMatches] = useState([]);
  const [todayDate, setTodayDate] = useState(
    new Date().toISOString().substring(0, 10)
  );

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

  useEffect(() => {
    fetch("api/matchSchedule")
      .then((res) => res.json())
      .then((data) => {
        const matchRows = data.matches;
        setRows(matchRows);

        // Get the current date in UTC
        const todayUTC = new Date(new Date().toUTCString());
        const centralOffset = -5 * 60 * 60 * 1000;
        const todayCentral = new Date(todayUTC.getTime() + centralOffset);
        const todayDate = todayCentral.toISOString().split("T")[0];
        const todayMatches = matchRows.filter(
          (row: any) => row.date.substring(0, 10) === todayDate
        );
        setTodayMatches(todayMatches);
        const pastMatches = matchRows.filter(
          (row: any) => row.date.substring(0, 10) < todayDate
        );
        setPastMatches(pastMatches);
        const futureMatches = matchRows.filter(
          (row: any) => row.date.substring(0, 10) > todayDate
        );
        setFutureMatches(futureMatches);
      });
  }, []);

  return (
    <div>
      <center>
        <br />
        <h1>Match Schedule</h1>
        {todayMatches.length < 1 &&
          futureMatches.length < 1 &&
          pastMatches.length < 1 && <h2>No matches scheduled</h2>}
        {todayMatches.length == 0 && <h2>No Matches Today</h2>}

        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <h2>Today&apos;s Matches</h2>
            </Accordion.Header>
            <Accordion.Body>
              {todayMatches.length > 0 && (
                <>
                  {todayMatches.map(async (row: any) => {
                    const homeTeamName = await fetchTeamName(row.hometeamid);
                    const awayTeamName = await fetchTeamName(row.awayteamid);
                    const locationName = await fetchLocationName(
                      row.locationid
                    );
                    return (
                      <Match
                        key={row.matchid}
                        match_id={row.matchid}
                        home_team={homeTeamName}
                        away_team={awayTeamName}
                        time={row.time}
                        date={row.date}
                        location={locationName}
                      />
                    );
                  })}
                </>
              )}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <h2>Upcoming Matches</h2>
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
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              <h2>Past Matches</h2>
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
