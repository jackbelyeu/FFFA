"use client";
import React, { useState, useEffect, cache } from "react";
import AddMatch from "@/app/Components/scheduleCard/addMatch";
import OrganiserMatch from "@/app/Components/scheduleCard/matchscore";
import Button from "react-bootstrap/Button";
import { Toaster, toast } from "sonner";
const OrganiserMatchSchedule = () => {
  const [showAddMatch, setShowAddMatch] = useState(false);
  const [rows, setRows] = useState([]);
  const [todayMatches, setTodayMatches] = useState([]);
  const [pastMatches, setPastMatches] = useState([]);
  const [futureMatches, setFutureMatches] = useState([]);
  const [alert, setAlert] = useState("");
  const [newlocation, setNewLocation] = useState("");
  const [todayDate, setTodayDate] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [locations, setLocations] = useState<string[]>([]);
  const [deletelocation, setDeleteLocation] = useState("");
  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDeleteLocation(e.target.value);
  };
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
    toast.success("Alert added successfully");
  };
  const handleAddNewLocation = (e: any) => {
    fetch("/api/addlocation", {
      method: "POST",
      body: JSON.stringify({
        newlocation: newlocation,
      }),
    });
    toast.success("New Location added successfully");
  };
  const handleDeleteLocation = (e: any) => {
    fetch("/api/deletelocation", {
      method: "POST",
      body: JSON.stringify({
        deletelocation: deletelocation,
      }),
    });
    toast.success("Location Deleted successfully");
  };
  useEffect(() => {
    fetch("api/organizer", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch organizer data");
        }
        return res.json();
      })
      .then((data) => {
        const matchRows = data.matches;
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
      })
      .catch((error) => {
        console.error("Error fetching organizer data:", error);
      });
    fetch("api/locations", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch locations data");
        }
        return res.json();
      })
      .then((data) => {
        const locationRows = data.locations;
        setLocations(locationRows);
      })
      .catch((error) => {
        console.error("Error fetching locations data:", error);
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
          style={{ margin: "10px", padding: "5px" }}
        />
        <Button
          variant="primary"
          onClick={handleAddAlert}
          style={{ margin: "10px", padding: "5px" }}
        >
          Add Alert
        </Button>
        <br />
        <input
          type="text"
          placeholder="Enter Location"
          onChange={(e) => setNewLocation(e.target.value)}
          style={{ margin: "10px", padding: "5px" }}
        />
        <Button
          variant="primary"
          onClick={handleAddNewLocation}
          style={{ margin: "10px", padding: "5px" }}
        >
          Add Location
        </Button>
        <br />
        <select
          onChange={handleLocationChange}
          style={{ margin: "10px", padding: "5px" }}
        >
          <option value="">Select Location to Delete</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
        <Button
          variant="danger"
          onClick={handleDeleteLocation}
          style={{ margin: "10px", padding: "5px" }}
        >
          Delete Location
        </Button>
        <br />
        <Button variant="danger" href="/api/auth/signout">
          Sign Out
        </Button>
        <Toaster richColors />
        <h1>Match Schedule</h1>
        {!showAddMatch && (
          <Button variant="outline-success" onClick={handleAddMatchClick}>
            Add Match
          </Button>
        )}
        {showAddMatch && <AddMatch onClose={() => setShowAddMatch(false)} />}
        {todayMatches.length < 1 &&
          futureMatches.length < 1 &&
          pastMatches.length < 1 && <h2>No matches scheduled</h2>}
        {todayMatches.length == 0 && <h2>No Matches Today</h2>}
        {todayMatches.length > 0 && (
          <div>
            <h2>Today&apos;s Matches</h2>
            {todayMatches.map((row: any) => (
              <OrganiserMatch
                key={row.matchid}
                matchid={row.matchid}
                home_team={row.hometeamname}
                away_team={row.awayteamname}
                time={row.time}
                date={row.date}
                location={row.locationname}
              />
            ))}
          </div>
        )}
        {futureMatches.length > 0 && (
          <>
            <h2>Upcoming Matches</h2>
            {futureMatches.map((row: any) => (
              <OrganiserMatch
                key={row.matchid}
                matchid={row.matchid}
                home_team={row.hometeamname}
                away_team={row.awayteamname}
                time={row.time}
                date={row.date}
                location={row.locationname}
              />
            ))}
          </>
        )}
        {pastMatches.length > 0 && (
          <>
            <h2>Past Matches</h2>
            {pastMatches.map((row: any) => (
              <OrganiserMatch
                key={row.matchid}
                matchid={row.matchid}
                home_team={row.hometeamname}
                away_team={row.awayteamname}
                time={row.time}
                date={row.date}
                location={row.locationname}
              />
            ))}
          </>
        )}
      </center>
    </div>
  );
};
export default OrganiserMatchSchedule;
