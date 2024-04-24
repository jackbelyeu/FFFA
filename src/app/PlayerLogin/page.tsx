'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
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
    <div style={{ margin: "20px"}}>
      <h1>Please Select your Team to Login</h1>
      <div className="container">
        <div className="row" style={{ padding: "20px" }}>
          {teams.map((team, index) => (
            <div className="col-md-4" key={index}>
              <div className="card border-0">
                <div className="card-body p-0">
                  <Link href={`/${team.toLowerCase().replace(/\s+/g, '')}/rsvp`}>
                    <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={`logos/${team}.jpeg`} alt={team} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
