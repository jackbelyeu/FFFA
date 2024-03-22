'use client';
import { useRouter } from "next/navigation";
import React, { useState } from "react"; // Import useState from React
import styles from './styles.module.css';

const Login = () => {
  const router = useRouter();
  const [emailValue, setEmailValue] = useState(""); // State for email value
  const [passwordValue, setPasswordValue] = useState(""); // State for password value
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Access emailValue and passwordValue states here
      console.log("Email:", emailValue);
      console.log("Password:", passwordValue);
  
      const response = await fetch('/api/OrganiserData');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log(data.result.rows);
  
      // Check if the entered email and password are present in data.result.rows
      const foundUser = data.result.rows.find((user: { email: string; password: string; }) => user.email === emailValue && user.password === passwordValue);
      if (foundUser) {
        console.log("User found:", foundUser);
        router.push("/Gamepoint");
        // Navigate or perform any action after successful login
      } else {
        console.log("User not found or invalid credentials");
        // Handle invalid credentials
      }
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };
  

  return (
    <div className={styles.container}>
      <h1 className={styles.logo}> WELCOME TO ORGANISER LOGIN</h1>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <span>Email Id:</span>
            <input style={{width:"100%"}}
              type="email"
              placeholder="Email"
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
            />
          </div> 
          <div className={styles.inputGroup}>
            <span>Password:</span>
            <input style={{width:"100%"}}
              type="password"
              placeholder="Password"
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
            />
          </div>
          <button className={styles.submitButton} type="submit">LogIn</button>
        </form>
      </div>
    </div>
  );
};


export default Login;
