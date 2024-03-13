"use client";
import { useState } from "react";

export default function Page({
  searchParams,
}: {
  searchParams: {
    playername: string;
    position: string;
    commitment: string;
    club: string;
  };
}) {
  const [info, setInfo] = useState({
    name: searchParams.playername,
    commitment: searchParams.commitment || "fulltime", // Provide a default value if commitment is not provided
    position: searchParams.position || "forward", // Provide a default value if position is not provided
    club: searchParams.club || "", // Provide an empty string as default value for club
  });

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    console.log("Updated info:", info);
    try {
      const response = await fetch("/api/TeamStatus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      });

      if (response.ok) {
        alert("Data submitted successfully");
      } else {
        throw new Error("Failed to submit data");
      }
    } catch (error) {
      alert("Failed to submit the form. Please try again later.");
    }
  };

  return (
    <div>
      <h1>{searchParams.playername}</h1>
      <form onSubmit={handleSubmit}>
        <h1>Commitment:</h1>
        <select
          value={info.commitment}
          onChange={(e) => setInfo({ ...info, commitment: e.target.value })}
        >
          <option value="fulltime">Full-time</option>
          <option value="parttime">Part-time</option>
        </select>

        <select
          value={info.position}
          onChange={(e) => setInfo({ ...info, position: e.target.value })}
        >
          <option value="forward">Forward</option>
          <option value="midfielder">Midfielder</option>
          <option value="defender">Defender</option>
          <option value="goalkeeper">Goalkeeper</option>
        </select>
        <h1>Club:</h1>
        <input
          type="text"
          value={searchParams.club}
          onChange={(e) => setInfo({ ...info, club: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
