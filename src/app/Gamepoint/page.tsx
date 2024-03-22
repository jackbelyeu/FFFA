"use client";
import React, { useState } from "react";
import "./Points.css"; // Importing the CSS file
import { url } from "inspector";

const Points = () => {
  const [team1Data, setTeam1Data] = useState({});
  const [team2Data, setTeam2Data] = useState({});
  const [team1Result, setTeam1Result] = useState("");
  const [team2Result, setTeam2Result] = useState("");
  const [team1Logo, setTeam1Logo] = useState(""); // State to hold the team1 logo path
  const [team2Logo, setTeam2Logo] = useState(""); //
  const handleSelectionChange = async (event) => {
    const selectedValue = event.target.value;
    const selectName = event.target.name;
    console.log(`Selected ${selectName}:`, selectedValue);
    try {
      const response = await fetch(`/api/teamdata?team=${selectedValue}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      const fdata = data.result.rows[0];
      console.log(fdata);

      if (selectName === "points1") {
        setTeam1Logo(`/logos/${selectedValue}.jpeg`);
        setTeam1Data(fdata);
      } else {
        setTeam2Logo(`/logos/${selectedValue}.jpeg`);
        setTeam2Data(fdata);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleTeam1ResultChange = (event) => {
    setTeam1Result(event.target.value);
  };

  const handleTeam2ResultChange = (event) => {
    setTeam2Result(event.target.value);
  };

  const handleSubmit = async () => {
    if (
      (team1Result === "lose" && team2Result === "win") ||
      (team1Result === "win" && team2Result === "lose") ||
      (team1Result === "draw" && team2Result === "draw")
    ) {
      const updatedTeam1Data = {
        ...team1Data,
        matches_played: team1Data.matches_played + 1,
      };
      const updatedTeam2Data = {
        ...team2Data,
        matches_played: team2Data.matches_played + 1,
      };

      if (team1Result === "lose" && team2Result === "win") {
        console.log("team1lost");
        updatedTeam1Data.losses += 1;
        updatedTeam2Data.wins += 1;
        updatedTeam2Data.points += 3;
      } else if (team1Result === "win" && team2Result === "lose") {
        console.log("team2Lost");
        updatedTeam2Data.losses += 1;
        updatedTeam1Data.wins += 1;
        updatedTeam1Data.points += 3;
      } else if (team1Result === "draw" && team2Result === "draw") {
        updatedTeam1Data.points += 1;
        updatedTeam2Data.points += 1;
        updatedTeam2Data.draws += 1;
        updatedTeam1Data.draws += 1;
      }
      console.log(updatedTeam1Data);
      console.log(updatedTeam2Data);
      try {
        const response = await fetch("/api/points", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTeam1Data),
        });

        if (response.ok) {
          alert("Data submitted successfully");
          window.location.href = 'http://localhost:3000';
        } else {
          throw new Error("Failed to submit data");
        }
      } catch (error) {
        alert("Failed to submit the form. Please try again later.");
      }
      try {
        const response = await fetch("/api/points", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTeam2Data),
        });

        if (response.ok) {
          alert("Data submitted successfully");
        } else {
          throw new Error("Failed to submit data");
        }
      } catch (error) {
        alert("Failed to submit the form. Please try again later.");
      }
    } else {
      alert("invalid Selection Please check");
    }
  };

  return (
    <div className="points-container">
           <div className="sample-container">
  <div className="sample">
    <img src={team1Logo} alt="" />
  </div>
  <div className="sample">
  <img src="logos/vs.jpg" alt="" />
  </div>
  <div className="sample">
    <img src={team2Logo} alt="" />
  </div>
</div>
      <div className="select-container">
        <label htmlFor="points1">Select Team 1:</label>
        <select id="points1" name="points1" onChange={handleSelectionChange}>
          <option value="">Select Team 1</option>
          <option value="mosquitoes">Mosquitoes</option>
          <option value="grasskickers">Grasskickers</option>
          <option value="emus">Emus</option>
          <option value="hyenas">Hyenas</option>
          <option value="mockingbirds">Mockingbirds</option>
        </select>
        <div className="result-container">
          <label>Team 1 Result:</label>
          <input
            type="radio"
            name="team1Result"
            value="win"
            onChange={handleTeam1ResultChange}
          />{" "}
          Win
          <input
            type="radio"
            name="team1Result"
            value="lose"
            onChange={handleTeam1ResultChange}
          />{" "}
          Lose
          <input
            type="radio"
            name="team1Result"
            value="draw"
            onChange={handleTeam1ResultChange}
          />{" "}
          Draw
        </div>
      </div>
      <div>
      </div>
      <div className="select-container">
        <label htmlFor="points2">Select Team 2:</label>
        <select id="points2" name="points2" onChange={handleSelectionChange}>
          <option value="">Select Team 2</option>
          <option value="mosquitoes">Mosquitoes</option>
          <option value="grasskickers">Grasskickers</option>
          <option value="emus">Emus</option>
          <option value="hyenas">Hyenas</option>
          <option value="mockingbirds">Mockingbirds</option>
        </select>
        <div className="result-container">
          <label>Team 2 Result:</label>
          <input
            type="radio"
            name="team2Result"
            value="win"
            onChange={handleTeam2ResultChange}
          />{" "}
          Win
          <input
            type="radio"
            name="team2Result"
            value="lose"
            onChange={handleTeam2ResultChange}
          />{" "}
          Lose
          <input
            type="radio"
            name="team2Result"
            value="draw"
            onChange={handleTeam2ResultChange}
          />{" "}
          Draw
        </div>
      </div>

      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default Points;
