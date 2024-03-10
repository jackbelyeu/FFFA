// import React, { useState } from 'react';

// interface TeamData {
//   teamName: string;
//   wins: number;
//   draws: number;
//   losses: number;
//   gd: number;
// }

// const UpdateForm: React.FC = () => {
//   const [formData, setFormData] = useState<TeamData>({
//     teamName: '',
//     wins: 0,
//     draws: 0,
//     losses: 0,
//     gd: 0,
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       console.log('Request Data:', JSON.stringify(formData));
//       const response = await fetch('/api/update-teams', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('Updated data:', data);
//         // You can handle success, e.g., show a success message.
//       } else {
//         const errorData = await response.json();
//         console.error('Error updating data:', errorData);
//         // Handle error, e.g., show an error message.
//       }
//     } catch (error) {
//       console.error('Error updating data:', error);
//       // Handle error, e.g., show an error message.
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Team Name:
//         <input type="text" name="teamName" value={formData.teamName} onChange={handleChange} />
//       </label>
//       <br />
//       <label>
//         Wins:
//         <input type="number" name="wins" value={formData.wins} onChange={handleChange} />
//       </label>
//       <br />
//       <label>
//         Draws:
//         <input type="number" name="draws" value={formData.draws} onChange={handleChange} />
//       </label>
//       <br />
//       <label>
//         Losses:
//         <input type="number" name="losses" value={formData.losses} onChange={handleChange} />
//       </label>
//       <br />
//       <label>
//         Goal Difference:
//         <input type="number" name="gd" value={formData.gd} onChange={handleChange} />
//       </label>
//       <br />
//       <button type="submit">Update Data</button>
//     </form>
//   );
// };

// export default UpdateForm;

"use client";
import React, { useState } from "react";
import Link from "next/link";

interface TeamData {
  teamName: string;
  wins: number;
  draws: number;
  losses: number;
  gd: number;
}

const UpdateForm: React.FC = () => {
  const [formData, setFormData] = useState<TeamData>({
    teamName: "",
    wins: 0,
    draws: 0,
    losses: 0,
    gd: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log("Request Data:", JSON.stringify(formData));
      const response = await fetch("/api/update-teams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Updated data:", data);
        // You can handle success, e.g., show a success message.
      } else {
        const errorData = await response.json();
        console.error("Error updating data:", errorData);
        // Handle error, e.g., show an error message.
      }
    } catch (error) {
      console.error("Error updating data:", error);
      // Handle error, e.g., show an error message.
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "wins" ? +value : value,
    }));
  };

  return (
    <div style={{ margin: "20px" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#009879",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ width: "140px" }}>Team Name:</span>
            <input
              type="text"
              name="teamName"
              value={formData.teamName}
              onChange={handleChange}
              style={{
                flexGrow: 1,
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ddd",
              }}
            />
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ width: "140px" }}>Wins:</span>
            <input
              type="number"
              name="wins"
              value={formData.wins}
              onChange={handleChange}
              style={{
                flexGrow: 1,
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ddd",
              }}
            />
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ width: "140px" }}>Draws:</span>
            <input
              type="number"
              name="draws"
              value={formData.draws}
              onChange={handleChange}
              style={{
                flexGrow: 1,
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ddd",
              }}
            />
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ width: "140px" }}>Losses:</span>
            <input
              type="number"
              name="losses"
              value={formData.losses}
              onChange={handleChange}
              style={{
                flexGrow: 1,
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ddd",
              }}
            />
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ width: "140px" }}>Goal Difference:</span>
            <input
              type="number"
              name="gd"
              value={formData.gd}
              onChange={handleChange}
              style={{
                flexGrow: 1,
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ddd",
              }}
            />
          </label>
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Update Data
        </button>
      </form>
      <Link href="/" passHref>
        <button className="button">Go to Main Page</button>
      </Link>{" "}
    </div>
  );
};

export default UpdateForm;
