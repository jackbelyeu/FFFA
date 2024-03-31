"use client";
import React, { useState, useEffect } from "react";
import AddMatch from "@/app/Components/scheduleCard/addMatch";
import OrganiserMatch from "@/app/Components/scheduleCard/matchscore";
import Button from "react-bootstrap/Button";

const OrganiserMatchSchedule = () => {
  const [showAddMatch, setShowAddMatch] = useState(false);
  const [rows, setRows] = useState([]);
  const [todayMatches, setTodayMatches] = useState([]);
  const [pastMatches, setPastMatches] = useState([]);
  const [futureMatches, setFutureMatches] = useState([]);
  const [alert, setAlert] = useState("");
  const [todayDate, setTodayDate] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const handleAddMatchClick = () => {
    setShowAddMatch(true);
  };

  const handleAddAlert = (e: any) => {
    fetch("/api/alert", {
      method: "POST",
      body: JSON.stringify({
        alert: alert,
      }),
    });
  };

  useEffect(() => {
    fetch("api/matchSchedule")
      .then((res) => res.json())
      .then((data) => {
        const matchRows = data.result.rows;
        setRows(matchRows);

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
        <h1>Organiser Dashboard</h1>
        <input
          type="text"
          placeholder="Enter Alert"
          onChange={(e) => setAlert(e.target.value)}
        />
        <Button variant="primary" onClick={handleAddAlert}>
          Add Alert
        </Button>

        <br />
        <Button variant="danger" href="/api/auth/signout">
          Sign Out
        </Button>

        <h1>Match Schedule</h1>
        {todayMatches.length < 1 &&
          futureMatches.length < 1 &&
          pastMatches.length < 1 && <h2>No matches scheduled</h2>}
        {todayMatches.length == 0 && <h2>No Matches Today</h2>}
        {todayMatches.length > 0 && (
          <>
            <h2>Today&apos;s Matches</h2>
            {todayMatches.map((row: any) => (
              <OrganiserMatch
                key={row.match_id}
                match_id={row.match_id}
                home_team={row.home_team}
                away_team={row.away_team}
                time={row.time}
                date={row.date}
                location={row.location}
              />
            ))}
          </>
        )}
        {futureMatches.length > 0 && (
          <>
            <h2>Upcoming Matches</h2>
            {futureMatches.map((row: any) => (
              <OrganiserMatch
                key={row.match_id}
                match_id={row.match_id}
                home_team={row.home_team}
                away_team={row.away_team}
                time={row.time}
                date={row.date}
                location={row.location}
              />
            ))}
          </>
        )}
        {pastMatches.length > 0 && (
          <>
            <h2>Past Matches</h2>
            {pastMatches.map((row: any) => (
              <OrganiserMatch
                key={row.match_id}
                match_id={row.match_id}
                home_team={row.home_team}
                away_team={row.away_team}
                time={row.time}
                date={row.date}
                location={row.location}
              />
            ))}
          </>
        )}
        {!showAddMatch && (
          <Button variant="outline-success" onClick={handleAddMatchClick}>
            Add Match
          </Button>
        )}
        {showAddMatch && <AddMatch onClose={() => setShowAddMatch(false)} />}
      </center>
      <br />
    </div>
  );
};

export default OrganiserMatchSchedule;