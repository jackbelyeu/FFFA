"use client";
import React, { useState } from "react";
import Image from "next/image";

interface Match {
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  location: string;
  matchDay: number;
}

// TeamLogo component
const TeamLogo: React.FC<{ teamName: string }> = ({ teamName }) => (
  <p
    style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
  >
    <Image
      src={`/logos/${teamName}.jpeg`}
      alt={`Logo of ${teamName}`}
      width={25}
      height={25}
    />
    <span style={{ marginLeft: "8px" }}>{teamName}</span>
  </p>
);

const SchedulePage: React.FC = () => {
  const [newMatch, setNewMatch] = useState<Match>({
    homeTeam: "",
    awayTeam: "",
    date: "",
    time: "",
    location: "",
    matchDay: 1,
  });

  const [scheduleData, setScheduleData] = useState<Match[]>([
    {
      homeTeam: "Mosquitoes",
      awayTeam: "Emus",
      date: "2024-03-01",
      time: "15:00",
      location: "Stadium A",
      matchDay: 1,
    },
    {
      homeTeam: "Hyenas",
      awayTeam: "Grasskickers",
      date: "2024-03-01",
      time: "17:00",
      location: "Stadium B",
      matchDay: 1,
    },
    {
      homeTeam: "Mockingbirds",
      awayTeam: "PCFC",
      date: "2024-03-02",
      time: "14:30",
      location: "Stadium C",
      matchDay: 2,
    },
  ]);

  const uniqueMatchDays = Array.from(
    new Set(scheduleData.map((match) => match.matchDay))
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMatch((prevMatch) => ({ ...prevMatch, [name]: value }));
  };

  const handleAddMatch = () => {
    setScheduleData((prevSchedule) => [...prevSchedule, newMatch]);
    setNewMatch({
      homeTeam: "",
      awayTeam: "",
      date: "",
      time: "",
      location: "",
      matchDay: 1,
    });
  };

  const handleEditMatch = (index: number, field: string, value: string) => {
    setScheduleData((prevSchedule) => {
      const updatedSchedule = [...prevSchedule];
      updatedSchedule[index] = { ...updatedSchedule[index], [field]: value };
      return updatedSchedule;
    });
  };

  return (
    <div>
      <h1>Flagrant Fowl Futbol Association</h1>
      <h1>Schedule</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "10px",
          }}
        >
          <label>Home Team:</label>
          <input
            type="text"
            name="homeTeam"
            value={newMatch.homeTeam}
            onChange={handleInputChange}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "10px",
          }}
        >
          <label>Away Team:</label>
          <input
            type="text"
            name="awayTeam"
            value={newMatch.awayTeam}
            onChange={handleInputChange}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "10px",
          }}
        >
          <label>Date:</label>
          <input
            type="text"
            name="date"
            value={newMatch.date}
            onChange={handleInputChange}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "10px",
          }}
        >
          <label>Time:</label>
          <input
            type="text"
            name="time"
            value={newMatch.time}
            onChange={handleInputChange}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "10px",
          }}
        >
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={newMatch.location}
            onChange={handleInputChange}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "10px",
          }}
        >
          <label>Match Day:</label>
          <input
            type="number"
            name="matchDay"
            value={newMatch.matchDay}
            onChange={handleInputChange}
          />
        </div>
        <button onClick={handleAddMatch}>Add Match</button>
      </div>

      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>Match Teams</th>
            <th style={{ textAlign: "center" }}>Venue</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {uniqueMatchDays.map((matchDay) => (
            <React.Fragment key={matchDay}>
              <tr>
                <td
                  colSpan={3}
                  style={{ textAlign: "center", backgroundColor: "#e0e0e0" }}
                >
                  Match Day {matchDay}
                </td>
              </tr>
              {scheduleData
                .filter((match) => match.matchDay === matchDay)
                .map((match, index) => (
                  <tr key={index}>
                    <td style={{ textAlign: "center" }}>
                      <TeamLogo teamName={match.homeTeam} />
                      <p>
                        <span> vs. </span>
                      </p>
                      <TeamLogo teamName={match.awayTeam} />
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <p>Date: {match.date}</p>
                      <p>Time: {match.time}</p>
                      <p>Location: {match.location}</p>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <button
                        onClick={() =>
                          handleEditMatch(
                            index,
                            "homeTeam",
                            prompt("Edit Home Team", match.homeTeam) ||
                              match.homeTeam
                          )
                        }
                      >
                        Edit Home Team
                      </button>
                      <button
                        onClick={() =>
                          handleEditMatch(
                            index,
                            "awayTeam",
                            prompt("Edit Away Team", match.awayTeam) ||
                              match.awayTeam
                          )
                        }
                      >
                        Edit Away Team
                      </button>
                      <button
                        onClick={() =>
                          handleEditMatch(
                            index,
                            "date",
                            prompt("Edit Date", match.date) || match.date
                          )
                        }
                      >
                        Edit Date
                      </button>
                      <button
                        onClick={() =>
                          handleEditMatch(
                            index,
                            "time",
                            prompt("Edit Time", match.time) || match.time
                          )
                        }
                      >
                        Edit Time
                      </button>
                      <button
                        onClick={() =>
                          handleEditMatch(
                            index,
                            "location",
                            prompt("Edit Location", match.location) ||
                              match.location
                          )
                        }
                      >
                        Edit Location
                      </button>
                    </td>
                  </tr>
                ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SchedulePage;
