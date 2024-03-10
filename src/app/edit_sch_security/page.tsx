"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Login: React.FC = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const correctPassword = "Hello"; // Set your actual password here

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (password === correctPassword) {
      router.push("/Edit-sch");
    } else {
      alert("Incorrect password!");
      setPassword(""); // Clear the password field
    }
  };

  return (
    <div>
      <h1>Login to Edit Schedule</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
