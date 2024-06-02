"use client";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import Image from "next/image";
import { toast } from "sonner";

interface AddMatchProps {
  onClose: () => void;
}

const AddMatch: React.FC<AddMatchProps> = ({ onClose }) => {
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [locations, setLocations] = useState<string[]>([]);
  const [teams, setTeams] = useState<string[]>([]);
  const [location, setLocation] = useState("");

  useEffect(() => {
    fetch("/api/teams")
      .then((res) => res.json())
      .then((data) => {
        setTeams(data.teams);
      });
    fetch("/api/locations")
      .then((res) => res.json())
      .then((data) => {
        setLocations(data.locations);
      });
  }, []);
  const addMatch = () => {
    if (!homeTeam || !awayTeam || !time || !date || !location) {
      alert("Please fill all the fields");
      return;
    }
    fetch("/api/matchSchedule", {
      method: "POST",
      body: JSON.stringify({
        homeTeam,
        awayTeam,
        time,
        date,
        location,
      }),
    });
    onClose();
    toast.success("Match added successfully");
  };
  const handleHomeTeamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setHomeTeam(e.target.value);
  };
  const handleAwayTeamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAwayTeam(e.target.value);
  };
  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocation(e.target.value);
  };

  return (
    <div className="max-w-sm mx-auto bg-[#009879] border-5 border-black shadow-md rounded-lg overflow-hidden my-4">
      <Button id="close"
        variant="danger"
        onClick={onClose}
        className="mt-3"
      >
        X
      </Button>
      <h2 className="text-center text-xl font-medium text-blue-500"> Add Match</h2>
      <p>
        <Image
          src={`/logos/${homeTeam}.jpeg`}
          alt={`Logo of ${homeTeam}`}
          width={100}
          height={100}
          className="rounded-full"
        />
        <br />
        Home Team :
        <select
          className="w-full sm:w-auto mb-4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={homeTeam}
          onChange={handleHomeTeamChange}
        >
          <option value="">Select Home Team</option>
          {teams.map((team) => (
            <option key={team} value={team}>
              {team}
            </option>
          ))}
        </select>
        <br />
        vs
        <br />
        <Image
          src={`/logos/${awayTeam}.jpeg`}
          alt={`Logo of ${awayTeam}`}
          width={100}
          height={100}
          className="rounded-full"
        />
        <br />
        Away Team :
        <select
          className="w-full sm:w-auto mb-4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={awayTeam}
          onChange={handleAwayTeamChange}
        >
          <option value="">Select Away Team</option>
          {teams
            .filter((team) => team !== homeTeam)
            .map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
        </select>
      </p>
      <p>
        Time:
        <input
          className="border-2 border-gray-300 rounded-lg p-2 m-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
          type="time"
          onChange={(e) => setTime(e.target.value)}
        />
      </p>
      <p>
        Date:
        <input
          className="border-2 border-gray-300 rounded-lg p-2 m-1 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black-bolder"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </p>
      <p>
        Location:
        <select
          className="w-full sm:w-auto mb-4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={location}
          onChange={handleLocationChange}
        >
          <option value="">Select Location</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </p>
      <Button className="mb-3"
      variant="success"
       onClick={addMatch}>
        Save
      </Button>

    </div>
  );
};

export default AddMatch;
