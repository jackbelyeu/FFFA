"use client";
import Link from "next/link";
// import React, { useState } from 'react';

// interface UpdateFormData {
//   matchID: number;
//   teamNameA: string;
//   teamNameB: string;
//   matchDate: string;
//   matchTime: string;
//   location: string;
//   matchDay: number;
// }

// const UpdateForm: React.FC = () => {
//   const [formData, setFormData] = useState<UpdateFormData>({
//     matchID: 0,
//     teamNameA: '',
//     teamNameB: '',
//     matchDate: '',
//     matchTime: '',
//     location: '',
//     matchDay: 0,
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       console.log('Request Data:', JSON.stringify(formData));
//       const response = await fetch('/api/update-', {
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
//       [name]: name === 'matchDay' ? +value : value,
//     }));
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Match ID:
//         <input type="number" name="matchID" value={formData.matchID} onChange={handleChange} />
//       </label>
//       <br />
//       <label>
//         Home Team:
//         <input type="text" name="teamNameA" value={formData.teamNameA} onChange={handleChange} />
//       </label>
//       <br />
//       <label>
//         Away Team:
//         <input type="text" name="teamNameB" value={formData.teamNameB} onChange={handleChange} />
//       </label>
//       <br />
//       <label>
//         Match Date:
//         <input type="text" name="matchDate" value={formData.matchDate} onChange={handleChange} />
//       </label>
//       <br />
//       <label>
//         Match Time:
//         <input type="text" name="matchTime" value={formData.matchTime} onChange={handleChange} />
//       </label>
//       <br />
//       <label>
//         Location:
//         <input type="text" name="location" value={formData.location} onChange={handleChange} />
//       </label>
//       <br />
//       <label>
//         Match Day:
//         <input type="number" name="matchDay" value={formData.matchDay} onChange={handleChange} />
//       </label>
//       <br />
//       <button type="submit">Update Data</button>
//     </form>
//   );
// };

// export default UpdateForm;

import React, { useState } from "react";

interface MatchData {
  matchID?: number; // Optional for update
  teamNameA: string;
  teamNameB: string;
  matchDate: string;
  matchTime: string;
  location: string;
  matchDay: number;
}

const MatchForm: React.FC = () => {
  const [formData, setFormData] = useState<MatchData>({
    matchID: 0,
    teamNameA: "",
    teamNameB: "",
    matchDate: "",
    matchTime: "",
    location: "",
    matchDay: 0,
  });
  const [isAddMode, setIsAddMode] = useState(true);

  const handleAdd = async () => {
    try {
      console.log("Add Data:", JSON.stringify(formData));
      const response = await fetch("/api/add-sch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Added data:", data);
        // You can handle success, e.g., show a success message.
        setFormData({
          matchID: 0,
          teamNameA: "",
          teamNameB: "",
          matchDate: "",
          matchTime: "",
          location: "",
          matchDay: 0,
        });
      } else {
        const errorData = await response.json();
        console.error("Error adding data:", errorData);
        // Handle error, e.g., show an error message.
      }
    } catch (error) {
      console.error("Error adding data:", error);
      // Handle error, e.g., show an error message.
    }
  };

  const handleUpdate = async () => {
    try {
      console.log("Update Data:", JSON.stringify(formData));
      const response = await fetch("/api/update-sch", {
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
      [name]: name === "matchDay" || name === "matchID" ? +value : value,
    }));
  };

  const handleButtonClick = (isAdd: boolean) => {
    setIsAddMode(isAdd);
    setFormData({
      matchID: 0,
      teamNameA: "",
      teamNameB: "",
      matchDate: "",
      matchTime: "",
      location: "",
      matchDay: 0,
    });
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#0070f3",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    margin: "0 5px",
  };

  const inputStyle = {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    margin: "5px 0",
  };

  const labelStyle = {
    display: "block",
    margin: "10px 0",
  };

  // Adjusted styles
  const formContainerStyle = {
    backgroundColor: "#009879",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    border: "1px solid #ccc", // This adds the frame to the form
    maxWidth: "500px", // Adjust the form width as needed
    margin: "20px auto", // This centers the form in the page
  };

  return (
    <div>
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <button onClick={() => handleButtonClick(true)} style={buttonStyle}>
          Add Match
        </button>
        <button onClick={() => handleButtonClick(false)} style={buttonStyle}>
          Update Match
        </button>
      </div>
      {isAddMode ? (
        //   <form>
        //  <div style={formContainerStyle}>
        //       <label>
        //         Home Team:
        //         <input type="text" name="teamNameA" value={formData.teamNameA} onChange={handleChange} style={inputStyle} />
        //       </label>
        //     </div>
        //     <div style={formContainerStyle}>
        //       <label>
        //         Away Team:
        //         <input type="text" name="teamNameB" value={formData.teamNameB} onChange={handleChange} style={inputStyle} />
        //       </label>
        //     </div>
        //     <div style={formContainerStyle}>
        //       <label>
        //         Match Date:
        //         <input type="text" name="matchDate" value={formData.matchDate} onChange={handleChange} style={inputStyle} />
        //       </label>
        //     </div>
        //     <div style={formContainerStyle}>
        //       <label>
        //         Match Time:
        //         <input type="text" name="matchTime" value={formData.matchTime} onChange={handleChange} style={inputStyle} />
        //       </label>
        //     </div>
        //     <div style={formContainerStyle}>
        //       <label>
        //         Location:
        //         <input type="text" name="location" value={formData.location} onChange={handleChange} style={inputStyle} />
        //       </label>
        //     </div>
        //     <div style={formContainerStyle}>
        //       <label>
        //         Match Day:
        //         <input type="number" name="matchDay" value={formData.matchDay} onChange={handleChange} style={inputStyle} />
        //       </label>
        //     </div>
        //     <button type="button" onClick={handleAdd} style={buttonStyle}>Add Match</button>
        //   </form>

        <form
          style={{
            backgroundColor: "#009879",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            margin: "20px",
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
            <label
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <span style={{ width: "140px" }}>Home Team:</span>
              <input
                type="text"
                name="teamNameA"
                value={formData.teamNameA}
                onChange={handleChange}
                style={{
                  flexGrow: 1,
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                }}
              />
            </label>
            <label
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <span style={{ width: "140px" }}>Away Team:</span>
              <input
                type="text"
                name="teamNameB"
                value={formData.teamNameB}
                onChange={handleChange}
                style={{
                  flexGrow: 1,
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                }}
              />
            </label>
            <label
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <span style={{ width: "140px" }}>Match Date:</span>
              <input
                type="text"
                name="matchDate"
                value={formData.matchDate}
                onChange={handleChange}
                style={{
                  flexGrow: 1,
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                }}
              />
            </label>
            <label
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <span style={{ width: "140px" }}>Match Time:</span>
              <input
                type="text"
                name="matchTime"
                value={formData.matchTime}
                onChange={handleChange}
                style={{
                  flexGrow: 1,
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                }}
              />
            </label>
            <label
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <span style={{ width: "140px" }}>Location:</span>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                style={{
                  flexGrow: 1,
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                }}
              />
            </label>
            <label
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <span style={{ width: "140px" }}>Match Day:</span>
              <input
                type="number"
                name="matchDay"
                value={formData.matchDay}
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
            type="button"
            onClick={handleAdd}
            style={{
              padding: "10px",
              borderRadius: "4px",
              border: "none",
              backgroundColor: "#007bff",
              color: "white",
              cursor: "pointer",
            }}
          >
            Add Match
          </button>
        </form>
      ) : (
        <form
          style={{
            backgroundColor: "#009879",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            margin: "20px",
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
            <label
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <span style={{ width: "140px" }}>Match ID:</span>
              <input
                type="number"
                name="matchID"
                value={formData.matchID}
                onChange={handleChange}
                style={{
                  flexGrow: 1,
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                }}
              />
            </label>
            <label
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <span style={{ width: "140px" }}>Home Team:</span>
              <input
                type="text"
                name="teamNameA"
                value={formData.teamNameA}
                onChange={handleChange}
                style={{
                  flexGrow: 1,
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                }}
              />
            </label>
            <label
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <span style={{ width: "140px" }}>Away Team:</span>
              <input
                type="text"
                name="teamNameB"
                value={formData.teamNameB}
                onChange={handleChange}
                style={{
                  flexGrow: 1,
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                }}
              />
            </label>
            <label
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <span style={{ width: "140px" }}>Match Date:</span>
              <input
                type="text"
                name="matchDate"
                value={formData.matchDate}
                onChange={handleChange}
                style={{
                  flexGrow: 1,
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                }}
              />
            </label>
            <label
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <span style={{ width: "140px" }}>Match Time:</span>
              <input
                type="text"
                name="matchTime"
                value={formData.matchTime}
                onChange={handleChange}
                style={{
                  flexGrow: 1,
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                }}
              />
            </label>
            <label
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <span style={{ width: "140px" }}>Location:</span>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                style={{
                  flexGrow: 1,
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                }}
              />
            </label>
            <label
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <span style={{ width: "140px" }}>Match Day:</span>
              <input
                type="number"
                name="matchDay"
                value={formData.matchDay}
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
            type="button"
            onClick={handleUpdate}
            style={{
              padding: "10px",
              borderRadius: "4px",
              border: "none",
              backgroundColor: "#007bff",
              color: "white",
              cursor: "pointer",
            }}
          >
            Update Match
          </button>
        </form>
      )}
      <Link href="/" passHref>
        <button className="button">Go to Main Page</button>
      </Link>{" "}
    </div>
  );
};

export default MatchForm;
