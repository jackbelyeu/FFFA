"use client";
//import React from 'react';

import { sql } from "@vercel/postgres";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function Schedule() {
  const router = useRouter();
  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/get-sch");
        const data = await response.json();
        setScheduleData(data.result.rows);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleEditClick = () => {
    router.push("/edit_sch_security"); // Redirect to the login page
  };

  return (
    <div>
      <h1>Schedule</h1>
      <button onClick={handleEditClick} className="button">
        Edit schedule
      </button>
      <button onClick={() => router.push("/")} className="button">
        Go to Main Page
      </button>
      <table>
        <tbody>
          {scheduleData.map((match, index) => (
            <React.Fragment key={index}>
              <tr>
                <td
                  colSpan="4"
                  style={{ backgroundColor: "#009879", color: "#ffffff" }}
                >
                  Matchday {match.matchday} of 38
                </td>
              </tr>
              <tr>
                <td>{match.hometeam}</td>
                <td>vs</td>
                <td>{match.awayteam}</td>
              </tr>
              <tr>
                <td>{match.matchdate}</td>
                <td>{match.matchtime}</td>
                <td>{match.location}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Schedule;
