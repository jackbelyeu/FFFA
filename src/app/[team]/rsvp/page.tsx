"use client";
import React from "react";
import RsvpDropdown from "./RsvpDropdown";
import { fixedTeams, fixedHyenas } from "./constants";

interface RsvpPageProps {
  params: { team: string };
}

interface RsvpState {
  [player: string]: {
    [date: string]: string;
  };
}

const RsvpPage: React.FC<RsvpPageProps> = ({ params }) => {
  const [rsvp, setRsvp] = React.useState<RsvpState>({
    MattPhilip: {
      oct10: "ifneeded",
      oct11: "ifneeded",
      oct12: "ifneeded",
      oct13: "ifneeded",
    },
    BaileyPreib: {
      oct10: "ifneeded",
      oct11: "ifneeded",
      oct12: "ifneeded",
      oct13: "ifneeded",
    },
    MollyDahlquist: {
      oct10: "ifneeded",
      oct11: "ifneeded",
      oct12: "ifneeded",
      oct13: "ifneeded",
    },
    PaulMcCaughey: {
      oct10: "ifneeded",
      oct11: "ifneeded",
      oct12: "ifneeded",
      oct13: "ifneeded",
    },
    JordanMcCain: {
      oct10: "ifneeded",
      oct11: "ifneeded",
      oct12: "ifneeded",
      oct13: "ifneeded",
    },
    JoshJulian: {
      oct10: "ifneeded",
      oct11: "ifneeded",
      oct12: "ifneeded",
      oct13: "ifneeded",
    },
    MattLang: {
      oct10: "ifneeded",
      oct11: "ifneeded",
      oct12: "ifneeded",
      oct13: "ifneeded",
    },
    TimDugan: {
      oct10: "ifneeded",
      oct11: "ifneeded",
      oct12: "ifneeded",
      oct13: "ifneeded",
    },
  });
  console.log(rsvp);
  const isValidTeam = fixedTeams.includes(params.team);

  const handleRsvpChange = (
    playerName: string,
    date: string,
    value: string
  ) => {
    setRsvp((prevRsvp) => ({
      ...prevRsvp,
      [playerName]: {
        ...prevRsvp[playerName],
        [date]: value,
      },
    }));
  };

  return (
    <div>
      <h1>Hello, Rsvp Page!</h1>
      {isValidTeam ? (
        <div>
          <p>RSVP for {params.team.toUpperCase()}</p>
          <table>
            <thead>
              <tr>
                <th>Player</th>
                <th>Oct 10th</th>
                <th>Oct 11th</th>
                <th>Oct 12th</th>
                <th>Oct 13th</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(rsvp).map((playerName) => (
                <tr key={playerName}>
                  <td>{playerName}</td>
                  {Object.keys(rsvp[playerName]).map((date) => (
                    <td key={date}>
                      <RsvpDropdown
                        value={rsvp[playerName][date]}
                        onChange={(value) =>
                          handleRsvpChange(playerName, date, value)
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // If the team is not valid, show an error page
        <div>
          <h1>404</h1>
          <p>Team not found</p>
        </div>
      )}
    </div>
  );
};

export default RsvpPage;
