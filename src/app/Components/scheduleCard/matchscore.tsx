import React, { useState } from "react";
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
    <div className="max-w-sm mx-auto bg-[#009879] border-4 border-black shadow-md rounded-lg overflow-hidden my-4 text-white">
    <h2 className="text-center text-2xl font-medium text-blue-500">
      Match {matchid}
    </h2>
    <div className="flex justify-center items-center h-full my-2">
      <Image
        src={`/logos/${home_team}.jpeg`}
        alt={`Logo of ${home_team}`}
        width={100}
        height={100}
        className="mx-auto rounded-full border border-black"
      />
    </div>
    <p className="text-center">
      Home Team:{' '}
      {editing ? (
        <select
          onChange={(e) => setHomeTeam(e.target.value)}
          className="border-2 border-gray-300 rounded-lg p-2 m-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
        >
          {teams.map((team) => (
            <option key={team} value={team}>
              {team}
            </option>
          ))}
        </select>
      ) : (
        <span className={hometeamscore > awayteamscore ? 'text-black' : ''}>
          {home_team}
        </span>
      )}
    </p>
    <p className="text-center">vs</p>
    <div className="flex justify-center items-center h-full my-2">
      <Image
        src={`/logos/${away_team}.jpeg`}
        alt={`Logo of ${away_team}`}
        width={100}
        height={100}
        className="mx-auto rounded-full border border-black"
      />
    </div>
    <p className="text-center">
      Away Team:{' '}
      {editing ? (
        <select
          id="awayteam"
          onChange={(e) => setAwayTeam(e.target.value)}
          className="border-2 border-gray-300 rounded-lg p-2 m-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
        >
          {teams
            .filter((team) => team !== home_team)
            .map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
        </select>
      ) : (
        <span className={awayteamscore > hometeamscore ? 'text-black' : ''}>
          {away_team}
        </span>
      )}
    </p>
    <p className="text-center">
      Time:{' '}
      {editing ? (
        <input
          type="time"
          onChange={(e) => setTime(e.target.value)}
          value={time}
          className="border-2 border-gray-300 rounded-lg p-2 m-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
        />
      ) : (
        time
      )}
    </p>
    <p className="text-center">
      Date:{' '}
      {editing ? (
        <input
          type="date"
          onChange={(e) => setDate(e.target.value)}
          value={date.substring(0, 10)}
          className="border-2 border-gray-300 rounded-lg p-2 m-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
        />
      ) : (
        `${date.substring(5, 7)}/${date.substring(8, 10)}/${date.substring(0, 4)}`
      )}
    </p>
    <p className="text-center">
      Location:{' '}
      {editing ? (
        <select
          onChange={(e) => setLocation(e.target.value)}
          className="w-full sm:w-auto mb-4 px-3 py-2 border border-gray-300 text-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
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
      <div className="flex justify-around my-4">
        <Button variant="success" onClick={handleSave}>
          Save
        </Button>
        <Button variant="primary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    ) : (
      <div className="flex justify-center my-4">
        <Button variant="primary" onClick={handleEdit}>
          Edit Match Details
        </Button>
      </div>
    )}
    <div className="items-center h-full my-4">
    <p>Score</p>
      <div>
        <Button variant="danger" onClick={handleHomeScoreDecrement}>
          -
        </Button>
        <span className="mx-2">
          {home_team.toUpperCase()}: <strong>{hometeamscore}</strong>
        </span>
        <Button variant="success" onClick={handleHomeScoreIncrement}>
          +
        </Button>
      </div>
      <br />
      <div>
        <Button variant="danger" onClick={handleAwayScoreDecrement}>
          -
        </Button>
        <span className="mx-2">
          {away_team.toUpperCase()}: <strong>{awayteamscore}</strong>
        </span>
        <Button variant="success" onClick={handleAwayScoreIncrement}>
          +
        </Button>
      </div>
    </div>
    <div className="flex justify-center my-4">
      <Button variant="primary" onClick={handleSubmit}>
        Submit Score
      </Button>
    </div>
    {scoresSubmitted && (
      <div className="flex justify-center my-4">
        <Alert variant="success">Scores submitted successfully</Alert>
      </div>
    )}
  </div>
);
}
