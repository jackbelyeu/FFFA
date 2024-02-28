"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch("/api/points", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     team: row.team,
    //     wins: (document.getElementById(`wins_${row.team}`) as HTMLInputElement)
    //       ?.value,
    //     draws: (
    //       document.getElementById(`draws_${row.team}`) as HTMLInputElement
    //     )?.value,

    
    try {
      router.push("/organiserTable");
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  return (
    <center>
      <div className="formContainer">
        <div className="formWrapper">
          <span className="logo">Organizer Login</span>
          <form onSubmit={handleSubmit}>
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
          </form>
        </div>
      </div>
    </center>
  );
};

export default Login;
