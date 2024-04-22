import React, { useState } from "react";
import styles from "./addMatch.module.css";
import Image from "next/image";
import { useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { toast } from "sonner";

export default function OrganiserMatch({
  matchid,
  home_team: initialHomeTeam,
  away_team: initialAwayTeam,
  time: initialTime,
  date: initialDate,
  location: initialLocation,
}: {
  matchid: string;
  home_team: string;
  away_team: string;
  time: string;
  date: string;
  location: string;
}) {
  const [editing, setEditing] = useState(false);
  const [home_team, setHomeTeam] = useState(initialHomeTeam);
  const [away_team, setAwayTeam] = useState(initialAwayTeam);
  const [time, setTime] = useState(initialTime);
  const [date, setDate] = useState(initialDate);
  const [location, setLocation] = useState(initialLocation);
  const [locationNames, setLocationNames] = useState<string[]>([]);
  const [teams, setTeams] = useState<string[]>([]);
  const [hometeamscore, setHomeTeamScore] = useState(0);
  const [awayteamscore, setAwayTeamScore] = useState(0);
  const [scoresSubmitted, setScoresSubmitted] = useState(false);

  useEffect(() => {
    fetch("/api/teams")
      .then((res) => res.json())
      .then((data) => {
        setTeams(data.teams);
      });
    fetch("api/locations")
      .then((res) => res.json())
      .then((data) => {
        const locationNames = data.locations;
        setLocationNames(locationNames);
      });

    fetch("/api/matchSchedule")
      .then((res) => res.json())
      .then((data) => {
        const matchRows = data.matches;
        matchRows.forEach(
          (row: {
            matchid: string;
            hometeamid: string;
            awayteamid: string;
            hometeamscore: number;
            awayteamscore: number;
          }) => {
            if (row.matchid === matchid) {
              setHomeTeamScore(row.hometeamscore);
              setAwayTeamScore(row.awayteamscore);
            }
          }
        );
      });
  }, [initialTime, initialDate, initialLocation, matchid]);
 
  const handleEdit = () => {
    setEditing(true);
  };
  const handleSubmit = () => {
    const confirmation = window.confirm(
      `Are you sure you want to submit the score for match ${matchid} ? \n ${home_team} ${hometeamscore} - ${awayteamscore} ${away_team} \n This action cannot be undone.`
    );
    if (!confirmation) {
      return;
    }
    fetch("/api/submitScore", {
      method: "POST",
      body: JSON.stringify({
        matchid,
        away_team,
        home_team,
        hometeamscore,
        awayteamscore,
      }),
    })
      .then(() => setScoresSubmitted(true))
      .catch((error) => console.error("Error submitting scores:", error));
    toast.success("Scores submitted successfully");
  };
  const handleSave = async () => {
    try {
      const response = await fetch("/api/editMatch", {
        method: "POST",
        body: JSON.stringify({
          matchid,
          home_team,
          away_team,
          time,
          date,
          location,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to update match");
      }
      setEditing(false);
    } catch (error) {
      console.error("Error updating match:", error);
    }
    window.location.reload();
    toast.success("Match updated successfully");
  };
  const handleDelete = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to Delete Match?"
    );
    if (!confirmation) {
      return;
    }
    try {
      const response = await fetch("/api/deleteMatch", {
        method: "POST",
        body: JSON.stringify({
          matchid,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to delete match");
      }
    } catch (error) {
      console.error("Error deleting match:", error);
    }
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    toast.success("Match deleted successfully");
  };

  const handleCancel = () => {
    setHomeTeam(initialHomeTeam);
    setAwayTeam(initialAwayTeam);
    setTime(initialTime);
    setDate(initialDate);
    setLocation(initialLocation);
    setEditing(false);
  };

  const handleHomeScoreIncrement = () => {
    setHomeTeamScore(hometeamscore + 1);
    fetch("/api/updateScore" ,{
      method: "POST",
      body: JSON.stringify({
        matchid,
        hometeamscore: hometeamscore + 1,
        awayteamscore,
      }),
    });
  };

  const handleAwayScoreIncrement = () => {
    setAwayTeamScore(awayteamscore + 1);
    fetch("/api/updateScore", {
      method: "POST",
      body: JSON.stringify({
        matchid,
        hometeamscore,
        awayteamscore: awayteamscore + 1,
      }),
    });
  };
  const handleHomeScoreDecrement = () => {
    if (hometeamscore > 0) {
      setHomeTeamScore(hometeamscore - 1);
    }
    fetch("/api/updateScore", {
      method: "POST",
      body: JSON.stringify({
        matchid,
        hometeamscore: hometeamscore - 1,
        awayteamscore,
      }),
    });
  };
  const handleAwayScoreDecrement = () => {
    if (awayteamscore > 0) {
      setAwayTeamScore(awayteamscore - 1);
    }
    fetch("/api/updateScore", {
      method: "POST",
      body: JSON.stringify({
        matchid,
        hometeamscore,
        awayScore: awayteamscore - 1,
      }),
    });
  };
  return (
    <div className={styles.card}>
      <h2>Match {matchid}</h2>
      <Image
        src={`/logos/${home_team}.jpeg`}
        alt={`Logo of ${home_team}`}
        width={100}
        height={100}
        className={styles.logo}
      />
      <p>
        Home Team: 
        {editing ? (
          <select onChange={(e) => setHomeTeam(e.target.value)}>
            {teams.map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
        ) : (
          <span
            className={hometeamscore > awayteamscore ? styles.winningTeam : ""}
          >
            {home_team}
          </span>
        )}
      </p>
      <p>vs</p>
      <Image
        src={`/logos/${away_team}.jpeg`}
        alt={`Logo of ${away_team}`}
        width={100}
        height={100}
        className={styles.logo}
      />
      <p>
      Away Team:
        {editing ? (
          <select id="awayteam" onChange={(e) => setAwayTeam(e.target.value)}>
            {teams
              .filter((team) => team !== home_team)
              .map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
          </select>
        ) : (
          <span
            className={awayteamscore > hometeamscore ? styles.winningTeam : ""}
          >
              {away_team}
          </span>
        )}
      </p>
      <p>
        Time:{" "}
        {editing ? (
          <input
            type="time"
            onChange={(e) => setTime(e.target.value)}
            value={time}
          />
        ) : (
          time
        )}
      </p>
      <p>
        Date:{" "}
        {editing ? (
          <input
            type="date"
            onChange={(e) => setDate(e.target.value)}
            value={date.substring(0, 10)}
          />
        ) : (
          date.substring(5, 7) +
          "/" +
          date.substring(8, 10) +
          "/" +
          date.substring(0, 4)
        )}
      </p>
      <p>
        Location:{" "}
        {editing ? (
          <select onChange={(e) => setLocation(e.target.value)}>
            {locationNames.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        ) : (
          location
        )}
      </p>
      {editing ? (
        <>
          <Button variant="success" onClick={handleSave}>
            Save
          </Button>
          <Button variant="primary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </>
      ) : (
        <Button variant="primary" onClick={handleEdit}>
          Edit Match Details
        </Button>
      )}
      <div className={styles.score}>
        <p>Score</p>
        <Button variant="danger" onClick={handleHomeScoreDecrement}>
          -
        </Button>
        <span>
          {home_team.toUpperCase()} :<big> {hometeamscore}</big>
        </span>
        <Button variant="success" onClick={handleHomeScoreIncrement}>
          +
        </Button>
        <br />
        <br />
        <span>
          <Button variant="danger" onClick={handleAwayScoreDecrement}>
            -
          </Button>
          {away_team.toUpperCase()} : <big>{awayteamscore}</big>
          <Button variant="success" onClick={handleAwayScoreIncrement}>
            +
          </Button>
        </span>
        <br />
        <br />
        <Button variant="primary" onClick={handleSubmit}>
          {" "}
          Submit Score
        </Button>
      </div>
      {scoresSubmitted && (
        <Alert variant="success">Scores submitted successfully</Alert>
      )}
    </div>
  );
}
