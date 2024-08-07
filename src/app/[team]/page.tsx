"use client";
import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Image from "next/image";
import Spinner from "react-bootstrap/Spinner";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const convertTo12HourFormat = (time24:string) => {
    const [hours, minutes] = time24.split(':');
    let hours12 = parseInt(hours);
    const ampm = hours12 >= 12 ? 'PM' : 'AM';
    hours12 = hours12 % 12 || 12; 
    return `${hours12}:${minutes} ${ampm}`;
  };
  

  useEffect(() => {
    fetch(`/api/teams`)
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
      })
      .catch((error) => {
        console.error("Error fetching team data:", error);
        toast.error("Failed to load team data.");
      });
  }, [decodedTeamName]);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`/api/${decodedTeamName}/schedule`).then((res) => res.json()),
      fetch(`/api/${decodedTeamName.toLowerCase()}/players`).then((res) =>
        res.json()
      ),
    ])
      .then(([scheduleData, playersData]) => {
        setSchedule(scheduleData.rows);
        setPlayers(playersData.rows);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error("Failed to load schedule or player data.");
      })
      .finally(() => setLoading(false));
  }, [decodedTeamName]);

  return (
    <div className="container mx-auto p-4">
      <Toaster />
      <h1 className="text-center text-2xl font-medium text-blue-500">
        Schedule and Roster
      </h1>
      <div className="my-4 text-center">
        <h2 className="text-lg font-medium text-blue-500">Select a Team:</h2>
        <select
          value={selectedTeam}
          onChange={(e) => {
            const selectedTeam = Number(e.target.value);
            setSelectedTeam(selectedTeam);
            const teamName = decodeURIComponent(teamNames[selectedTeam]);
            router.push(`/${teamName}`);
          }}
          className="text-center text-lg font-medium text-blue-500 border-2 border-green-500 rounded-md p-2"
        >
          {Object.entries(teamNames).map(([teamId, teamName]) => (
            <option key={teamId} value={teamId}>
              {teamName}
            </option>
          ))}
        </select>
      </div>
      <div className="my-4 text-center">
        <h1 className="text-xl font-medium text-gray-500">
          View <Link href={`/${params.team.toLowerCase()}/roster`}>Roster</Link>
        </h1>
      </div>
      {loading ? (
        <div className="flex justify-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Tabs defaultActiveKey="schedule" id="justify-tab-example" className="mb-3" justify>
          <Tab eventKey="home" title="Home">
            <div className="text-center">
              <h2>Welcome to {decodedTeamName}</h2>
              <p>Here you can find the schedule and roster for the team</p>
              <Image
                src={`/logos/${decodedTeamName}.jpeg`}
                alt={`Logo of the ${decodedTeamName} team`}
                width={100}
                height={100}
                className="mx-auto"
              />
            </div>
          </Tab>
          <Tab eventKey="schedule" title="Schedule">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Opponent
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
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
                        <td className="px-6 py-4 whitespace-nowrap text-center border-b-2">
                          {match.date.split("T")[0]}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center border-b-2">
                          {convertTo12HourFormat(match.time)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center border-b-2">
                          {match.locationname}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center border-b-2">
                          {match.hometeamname === decodedTeamName
                            ? match.awayteamname
                            : match.hometeamname}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </Tab>
          <Tab eventKey="longer-tab" title="Players">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th></th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                      Player Name
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                      Position
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                      Commitment
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {players.map(
                    (player: {
                      player_name: string;
                      position: string;
                      commitment: string;
                    }) => (
                      <tr key={player.player_name}>
                        <td className="px-6 py-4 whitespace-nowrap border-b-2 flex justify-center items-center">
                          <Image
                            src={`/logos/${decodedTeamName}.jpeg`}
                            alt={`Logo of the ${decodedTeamName} team`}
                            width={70}
                            height={70}
                            className="mx-auto"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center border-b-2">
                          {player.player_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center border-b-2">
                          {player.position}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center border-b-2">
                          {player.commitment}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </Tab>
        </Tabs>
      )}
    </div>
  );
}
