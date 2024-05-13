"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Row {
  team_name: string;
  total_matches: number;
  wins: number;
  draws: number;
  losses: number;
  goal_difference: number;
}

interface TeamStandingsProps {
  pointsData: Row[];
}

export default function TeamStandings({ pointsData }: TeamStandingsProps) {
  return (
    <div className="z-10 flex justify-center items-center">
      <table className="border-collapse mx-auto my-4 w-full max-w-4xl bg-black bg-opacity-50 text-white rounded-lg">
        <thead>
          <tr>
            {/* Table Headers */}
            {[
              "Team",
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
            const isLastRow = index === pointsData.length - 1;
            return (
              <tr key={index} className="text-center">
                <td
                  className={`border-b border-slate-300 p-2 sm:p-3 ${
                    isLastRow ? "rounded-bl-lg" : ""
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <div className="transition-transform duration-300 hover:scale-110">
                      <Link href={`/${row.team_name}`}>
                        <Image
                          src={`/logos/${row.team_name}.jpeg`}
                          alt={`Logo of ${row.team_name}`}
                          width={75}
                          height={75}
                          className="w-full h-auto"
                        />
                      </Link>
                    </div>
                  </div>
                </td>
                {["wins", "draws", "losses", "goal_difference"].map(
                  (key, i) => (
                    <td
                      key={i}
                      className="p-2 sm:p-3 min-w-[50px] sm:min-w-[100px] border-b border-slate-300"
                    >
                      {row[key as keyof Row]}
                    </td>
                  )
                )}
                <td className="p-2 sm:p-3 min-w-[50px] sm:min-w-[100px] border-b border-slate-300">
                  {row.wins * 3 + row.draws}
                </td>
                <td
                  className={`p-2 sm:p-3 min-w-[50px] sm:min-w-[100px] border-b border-slate-300 ${
                    isLastRow ? "rounded-br-lg" : ""
                  }`}
                >
                  {row.total_matches}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
