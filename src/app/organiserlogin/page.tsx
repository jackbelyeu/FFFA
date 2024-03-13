"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async () => {
    // Replace these with your predefined email and password
    const predefinedEmail = "harithaparmar23@gmail.com";
    const predefinedPassword = "Password";

    if (email === predefinedEmail && password === predefinedPassword) {
      try {
        // Perform any additional authentication logic if needed
        setLoggedIn(true);
      } catch (error) {
        console.error("Authentication error:", error);
        setError("An error occurred during authentication.");
      }
    } else {
      setError("You are not an organizer, so you are not authenticated.");
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "150px",
        backgroundColor: "darkblue",
        padding: "20px",
        borderRadius: "10px",
        color: "white",
      }}
    >
      <div
        style={{
          border: "1px solid #ccc",
          padding: "50px",
          width: "350px",
          margin: "auto",
        }}
      >
        <h1 style={{ color: "green" }}>Flagrant Fowl Futbol Association</h1>
        <span
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "20px",
            display: "block",
          }}
        >
          Organizer Login
        </span>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              backgroundColor: "white",
              color: "black",
            }}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              backgroundColor: "white",
              color: "black",
            }}
          />
          <br />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "8px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            Sign in
          </button>
          {error && (
            <div style={{ color: "red", marginTop: "10px" }}>{error}</div>
          )}
        </form>

        {loggedIn && (
          <div style={{ marginTop: "20px" }}>
            <p>Choose an option:</p>
            <a
              href="/organiserTable"
              style={{
                display: "block",
                marginBottom: "5px",
                color: "#007bff",
                textDecoration: "none",
              }}
            >
              Go to Organizer Table
            </a>
            <br />
            <a
              href="/organiserSchedule"
              style={{
                display: "block",
                marginBottom: "5px",
                color: "#007bff",
                textDecoration: "none",
              }}
            >
              Go to Schedule
            </a>
          </div>
        )}
      </div>
    </div>

  );
};

export default Login;
