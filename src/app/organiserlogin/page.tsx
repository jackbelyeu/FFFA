// Assuming this is a TypeScript file
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
    <center>
      <div className="formContainer">
        <div className="formWrapper">
          <span className="logo">Organizer Login</span>
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
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button type="submit">Sign in</button>
            {error && <div className="error">{error}</div>}
          </form>

          {loggedIn && (
            <div>
              <p>Choose an option:</p>
              <a href="/organiserTable">Go to Organizer Table</a>
              <br />
              <a href="/organiserSchedule">Go to Schedule</a>
            </div>
          )}
        </div>
      </div>
    </center>
  );
};

export default Login;
