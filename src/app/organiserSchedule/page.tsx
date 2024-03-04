"use client";
import React, { useState } from "react";
import Image from "next/image";
import { match } from "assert";

interface Match {
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  location: string;
  matchDay: number;
}

const handleChange = async (event: any) => {
  await fetch(`/api/schedule-Table`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      homeTeam: (document.getElementById("homeTeam") as HTMLSelectElement)
        ?.value,
      awayTeam: (document.getElementById("awayTeam") as HTMLSelectElement)
        ?.value,
      date: (document.getElementById("date") as HTMLInputElement)?.value,
      time: (document.getElementById("time") as HTMLInputElement)?.value,
      location: (document.getElementById("location") as HTMLInputElement)
        ?.value,
      matchDay: (document.getElementById("matchDay") as HTMLInputElement)
        ?.value,
    }),
  });
};
const handleUpdate = async (event: any) => {
  await fetch(`/api/schedule-Table`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      homeTeam: (document.getElementById("homeTeam_id") as HTMLSelectElement)
        ?.value,
      awayTeam: (document.getElementById("awayTeam_id") as HTMLSelectElement)
        ?.value,
      date: (document.getElementById("date") as HTMLInputElement)?.value,
      time: (document.getElementById("time") as HTMLInputElement)?.value,
      location: (document.getElementById("location") as HTMLInputElement)
        ?.value,
      matchDay: (document.getElementById("matchDay") as HTMLInputElement)
        ?.value,
    }),
  });
};

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
          <select id="homeTeam">
            <option>Mosquitoes1</option>
            <option>Mosquitoes2</option>
            <option>Mosquitoes3</option>
          </select>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "10px",
          }}
        >
          <label>Away Team:</label>
          <select id="awayTeam">
            <option>Mosquitoes4</option>
            <option>Mosquitoes5</option>
            <option>Mosquitoes6</option>
          </select>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "10px",
          }}
        >
          <label>Date:</label>
          <input id="date" type="text" name="date" />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "10px",
          }}
        >
          <label>Time:</label>
          <input id="time" type="text" name="time" />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "10px",
          }}
        >
          <label>Location:</label>
          <input id="location" type="text" name="location" />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "10px",
          }}
        >
          <label>Match Day:</label>
          <input id="matchDay" type="number" name="matchDay" />
        </div>
        <button onClick={handleChange}>Add Match</button>
      </div>

      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>Match Teams</th>
            <th style={{ textAlign: "center" }}>Venue</th>
            {/* <th style={{ textAlign: "center" }}>Actions</th> */}
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
                      <select defaultValue={match.homeTeam} id="hometeam_id">
                        <option value="Mosquitoes">Mosquitoes</option>
                        <option value="Hyenas">Hyenas</option>
                        <option value="Mockingbirds">Mockingbirds</option>
                        <option value="PCFC">PCFC</option>
                        <option value="Emus">Emus</option>
                        <option value="Grasskickers">Grasskickers</option>
                      </select>
                      <p>
                        <span> vs. </span>
                      </p>
                      <TeamLogo teamName={match.awayTeam} />
                      <select defaultValue={match.awayTeam} id="awayteam_id">
                        <option value="Mosquitoes">Mosquitoes</option>
                        <option value="Hyenas">Hyenas</option>
                        <option value="Mockingbirds">Mockingbirds</option>
                        <option value="PCFC">PCFC</option>
                        <option value="Emus">Emus</option>
                        <option value="Grasskickers">Grasskickers</option>
                      </select>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <label>Date: </label>
                      <input
                        defaultValue={match.date}
                        id={`date_${match.matchDay}`}
                        type="date"
                      />
                      <br />
                      <label>Time: </label>
                      <input
                        defaultValue={match.time}
                        id={`time_${match.matchDay}`}
                        type="time"
                      />
                      <br />
                      <label>Location :</label>
                      <input type="text" id="location" value={match.location} />
                    </td>
                  </tr>
                ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <button onClick={handleUpdate}>Add Match</button>
    </div>
  );
};

export default SchedulePage;
