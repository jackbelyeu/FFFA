"use client";
import React, { useState } from "react";
import "./styles.css"; // Import the CSS file

export default function Admin() {
  const [year, setYear] = useState("");
  const [team, setTeam] = useState("");
  const [w, setW] = useState("");
  const [d, setD] = useState("");
  const [l, setL] = useState("");
  const [gd, setGD] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
    setErrorMessage("");
    setSuccessMessage("");

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

      if (!response.ok) {
        throw new Error("Failed to update football standings");
      }

      setSuccessMessage("Football standings updated successfully");
      setYear("");
      setTeam("");
      setW("");
      setD("");
      setL("");
      setGD("");
    } catch (error) {
      setErrorMessage("Error updating football standings");
      console.error("Error updating football standings:", error);
    }
  };

  return (
    <div className="container">
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
        <label>
          Team:
          <input
            type="text"
            name="team"
            value={team}
            onChange={handleInputChange}
          />
        </label>
        <label>
          W:
          <input type="text" name="w" value={w} onChange={handleInputChange} />
        </label>
        <label>
          D:
          <input type="text" name="d" value={d} onChange={handleInputChange} />
        </label>
        <label>
          L:
          <input type="text" name="l" value={l} onChange={handleInputChange} />
        </label>
        <label>
          GD:
          <input
            type="text"
            name="gd"
            value={gd}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Submit</button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
      </form>
    </div>
  );
}
