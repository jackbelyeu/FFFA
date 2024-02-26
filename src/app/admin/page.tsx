"use client";
import React, { useState } from "react";

export default function Admin() {
  const [year, setYear] = useState("");
  const [team, setTeam] = useState("");
  const [w, setW] = useState("");
  const [d, setD] = useState("");
  const [l, setL] = useState("");
  const [gd, setGD] = useState("");

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    if (name === "year") setYear(value);
    else if (name === "team") setTeam(value);
    else if (name === "w") setW(value);
    else if (name === "d") setD(value);
    else if (name === "l") setL(value);
    else if (name === "gd") setGD(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/edit-table", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          year,
          team,
          w,
          d,
          l,
          gd,
        }),
      });

      console.log("API called successfully"); // Log statement to confirm the API call

      if (!response.ok) {
        throw new Error("Failed to update football standings");
      }

      console.log("Football standings updated successfully");
      // Resetting the form after successful submission
      setYear("");
      setTeam("");
      setW("");
      setD("");
      setL("");
      setGD("");
      alert("Table Updated successfully!");
    } catch (error) {
      console.error("Error updating football standings:", error);
      alert("Table Update unsuccessfull!");
      // Handle error state or display an alert to the user
    }
  };

  return (
    <div>
      <h1>Welcome Admin</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Year:
          <input
            type="text"
            name="year"
            value={year}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Team:
          <input
            type="text"
            name="team"
            value={team}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          W:
          <input type="text" name="w" value={w} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          D:
          <input type="text" name="d" value={d} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          L:
          <input type="text" name="l" value={l} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          GD:
          <input
            type="text"
            name="gd"
            value={gd}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Submit </button>
      </form>
    </div>
  );
}
