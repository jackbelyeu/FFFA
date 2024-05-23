'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import React from "react";

export default function Teams() {
  const [teams, setTeams] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/teams")
      .then((res) => res.json())
      .then((data) => {
        setTeams(data.teams);
      });
  }, []);
  return (
    <div className="m-5">
    <h1 className="text-center text-2xl font-bold mb-5">Please Select your Team to Login</h1>
    <div className="container mx-auto">
      <div className="flex flex-wrap -mx-4">
        {teams.map((team, index) => (
          <div className="w-full md:w-1/3 px-4 mb-8" key={index}>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Link href={`/${team.toLowerCase().replace(/\s+/g, '')}/rsvp`}>
                <div className="p-4 flex justify-center items-center">
                  <Image
                    src={`/logos/${team}.jpeg`}
                    alt={team}
                    width={200}
                    height={200}
                    className="rounded-full border-4 border-gray-200 shadow-lg"
                  />
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
}
