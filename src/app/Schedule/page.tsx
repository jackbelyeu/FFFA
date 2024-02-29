// pages/schedule.tsx
import React from "react";
import Image from "next/image";

// TeamLogo component
const TeamLogo: React.FC<{ teamName: string }> = ({ teamName }) => (
  <p style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
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
  // Sample schedule data
  const scheduleData = [
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
  
  ];

  const uniqueMatchDays = Array.from(new Set(scheduleData.map((match) => match.matchDay)));

  return (
    <div>
      <h1>Flagrant Fowl Futbol Association</h1>
      <h1>Schedule</h1>

      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>Match Teams</th>
            <th style={{ textAlign: "center" }}>Venue</th>
          </tr>
        </thead>
        <tbody>
          {uniqueMatchDays.map((matchDay) => (
            <React.Fragment key={matchDay}>
              <tr>
                <td colSpan={2} style={{ textAlign: "center", backgroundColor: "#e0e0e0" }}>
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
