"use client";
import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface RosterScheduleProps {
  params: {
    team: string;
  };
}
export default function RosterSchedule({ params }: RosterScheduleProps) {
  const [schedule, setSchedule] = useState([]);
  const [teamNames, setTeamNames] = useState<{ [key: number]: string }>({});
  const [selectedTeam, setSelectedTeam] = useState(0);
  const decodedTeamName = decodeURIComponent(params.team);
  const [players, setPlayers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch(`api/teams`)
      .then((res) => res.json())
      .then((data) => {
        const teamNames = data.teams;
        setTeamNames(teamNames);
        const selectedTeamId = Object.keys(teamNames).find(
          (teamId) => teamNames[teamId] === decodedTeamName
        );
        if (selectedTeamId) {
          setSelectedTeam(Number(selectedTeamId));
        }
      });
  }, [decodedTeamName]);

  useEffect(() => {
    fetch(`/api/${decodedTeamName}/schedule`)
      .then((res) => res.json())
      .then((data) => {
        setSchedule(data.rows);
      });
    const teamName = decodeURIComponent(decodedTeamName).toLowerCase();
    fetch(`/api/${teamName}/players`)
      .then((res) => res.json())
      .then((data) => {
        setPlayers(data.rows);
      });
  }, [decodedTeamName]);

  return (
    <div>
      <br />
      <h1>Schedule and Roster for {decodedTeamName}</h1>
      <br />
      <center>
      <h2>Select a Team:</h2>
      <select
        value={selectedTeam} 
        onChange={(e) => {
          const selectedTeam = Number(e.target.value);
          setSelectedTeam(selectedTeam);
          const teamName = decodeURIComponent(teamNames[selectedTeam]);
          router.push(`/${teamName}`);
        }}
      >
        {Object.entries(teamNames).map(([teamId, teamName]) => (
          <option key={teamId} value={teamId}>
            {teamName}
          </option>
        ))}
      </select>
      <br />
      <br />
      <Tabs
        defaultActiveKey="home"
        id="justify-tab-example"
        className="mb-3"
        justify
      >
        <Tab eventKey="home" title="Home">
          <div>
            <h2>Welcome to {decodedTeamName} </h2>
            <p>Here you can find the schedule and roster for the team</p>
            <Image
              src={`/logos/${decodedTeamName}.jpeg`}
              alt={`Logo of the ${decodedTeamName} team`}
              width={100}
              height={100}
            />
          </div>
        </Tab>
        <Tab eventKey="schedule" title="Schedule">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Location</th>
                <th>Opponent</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map(
                (match: {
                  match_id: string;
                  date: string;
                  time: string;
                  locationname: string;
                  awayteamname: string;
                  hometeamname: string;
                }) => (
                  <tr key={match.match_id}>
                    <td>{match.date.split("T")[0]}</td>
                    <td>{match.time}</td>
                    <td>{match.locationname}</td>
                    <td>
                      {match.hometeamname === decodedTeamName
                        ? match.awayteamname
                        : match.hometeamname}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </Tab>
        <Tab eventKey="longer-tab" title="Players">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Player Name</th>
                <th>Position</th>
                <th>Commitment</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player: { player_name: string; position: string;commitment:string }) => (
                <tr key={player.player_name}>
                  <td>
                    <Image
                      src={`/logos/${decodedTeamName}.jpeg`}
                      alt={`Logo of the ${decodedTeamName} team`}
                      width={50}
                      height={50}
                    />
                  </td>
                  <td>{player.player_name}</td>
                  <td>{player.position}</td>
                  <td>{player.commitment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Tab>
      </Tabs>
      </center>
    </div>
  );
}
