"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Row {
  teamname: string;
  matches_played: number;
  wins: number;
  draws: number;
  losses: number;
  goal_difference: number;
  points: number;
}

interface TeamStandingsProps {
  pointsData: Row[];
}

export default function StandingsTable({ pointsData }: TeamStandingsProps) {
  return (
    <div className="z-10 flex justify-center items-center">
      <table className="border-collapse mx-auto my-4 w-full max-w-4xl bg-black bg-opacity-50 text-white rounded-lg">
        <thead>
          <tr>
            {/* Table Headers */}
            {[
              "Team",
              "",
              "Wins",
              "Draws",
              "Losses",
              "Goal Difference",
              "Points",
              "Matches Played",
            ].map((header, idx) => (
              <th
                key={idx}
                className="p-2 sm:p-3 text-center min-h-[50px] sm:min-h-[80px] border-b border-slate-300"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pointsData.map((row, index) => {
            return (
              <tr key={index} className="border-b border-slate-300">
                <td className="p-2 sm:p-3 text-center">{row.teamname}</td>
                <td>
                  <Link href={`/${row.teamname}`}>
                    <Image
                      src={`/logos/${row.teamname}.jpeg`}
                      alt={row.teamname}
                      width={100}
                      height={100}
                      className="rounded-full border-4 border-gray-200 shadow-lg"
                    />
                  </Link>
                </td>
                <td className="p-2 sm:p-3 text-center">{row.wins}</td>
                <td className="p-2 sm:p-3 text-center">{row.draws}</td>
                <td className="p-2 sm:p-3 text-center">{row.losses}</td>
                <td className="p-2 sm:p-3 text-center">
                  {row.goal_difference}
                </td>
                <td className="p-2 sm:p-3 text-center">{row.points}</td>
                <td className="p-2 sm:p-3 text-center">{row.matches_played}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
