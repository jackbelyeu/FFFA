'use client';
import React, { useState } from "react";

const Points = () => {
  const [team1Data, setTeam1Data] = useState({}); // State variable for Team 1 data
  const [team2Data, setTeam2Data] = useState({}); // State variable for Team 2 data
  const [team1Result, setTeam1Result] = useState(""); // State variable for Team 1 result
  const [team2Result, setTeam2Result] = useState(""); // State variable for Team 2 result

  const handleSelectionChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
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

        // Update state variables with fetched data
        if (selectName === "points1") {
          setTeam1Data(fdata);
        } else {
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

  const handleSubmit = async() => {
    
    if(team1Result==="lose"&&team2Result==="win" || team1Result==="win"&&team2Result==="lose" || team1Result==="draw" && team2Result==="draw") {
      const updatedTeam1Data = { ...team1Data, matchesplayed: team1Data.matches_played + 1 };
      const updatedTeam2Data = { ...team2Data, matchesplayed: team2Data.matches_played + 1 };

        if(team1Result==="lose"&&team2Result==="win"){
          updatedTeam1Data.losses += 1;
          updatedTeam2Data.wins +=  1;
          updatedTeam2Data.points += 3
        }
        else if(team1Result==="win"&&team2Result==="lose") {
          updatedTeam2Data.losses += 1;
          updatedTeam1Data.wins +=  1;
          updatedTeam1Data.points += 3
        }
        else if(team1Result==="draw"&&team2Result==="draw") {
          updatedTeam1Data.points += 1;
          updatedTeam2Data.points += 1;
          updatedTeam2Data.draws  += 1;
          updatedTeam1Data.draws  += 1;
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

    }
    else {
      alert("invalid Selection Please check");
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="points1">Select Team 1:</label>
        <select id="points1" name="points1" onChange={handleSelectionChange}>
          <option value="">Select Team 1</option>
          <option value="mosquitoes">Mosquitoes</option>
          <option value="grasskickers">Grasskickers</option>
          <option value="emus">Emus</option>
          <option value="hyenas">Hyenas</option>
          <option value="mockingbirds">Mockingbirds</option>
        </select>
        <div>
          <label>Team 1 Result:</label>
          <input type="radio" name="team1Result" value="win" onChange={handleTeam1ResultChange} /> Win
          <input type="radio" name="team1Result" value="lose" onChange={handleTeam1ResultChange} /> Lose
          <input type="radio" name="team1Result" value="draw" onChange={handleTeam1ResultChange} /> Draw
        </div>
      </div>

      <div>
        <label htmlFor="points2">Select Team 2:</label>
        <select id="points2" name="points2" onChange={handleSelectionChange}>
          <option value="">Select Team 2</option>
          <option value="mosquitoes">Mosquitoes</option>
          <option value="grasskickers">Grasskickers</option>
          <option value="emus">Emus</option>
          <option value="hyenas">Hyenas</option>
          <option value="mockingbirds">Mockingbirds</option>
        </select>
        <div>
          <label>Team 2 Result:</label>
          <input type="radio" name="team2Result" value="win" onChange={handleTeam2ResultChange} /> Win
          <input type="radio" name="team2Result" value="lose" onChange={handleTeam2ResultChange} /> Lose
          <input type="radio" name="team2Result" value="draw" onChange={handleTeam2ResultChange} /> Draw
        </div>
      </div>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Points;
