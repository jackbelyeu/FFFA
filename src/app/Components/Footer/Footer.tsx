"use client";
import React from "react";

export default function Footer() {
  const sendEmail = () => {
    const emailAddress = "maltucker@gmail.com";
    const subject = "Express Interest in 2024 Season";
    const body = "I am interested in the 2024 season";
    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
  };
  return (
    <footer className="bg-primary flex items-center justify-between p-3 mt-3 shadow dark:bg-gray-800 w-full">
    <div className="w-full mx-auto max-w-screen-xl flex flex-col items-center justify-center">
      <ul className="flex flex-wrap justify-center items-center mt-2 mb-2 text-large font-large text-white dark:text-white sm:mt-0">
        <li>
          <a href="#" className="hover:underline me-4 md:me-5 text-white">
            About
          </a>
        </li>
        <li>
          <a
            href="#"
            className="hover:underline me-4 md:me-5 text-white"
            onClick={sendEmail}
          >
            Contact Organizer
          </a>
        </li>
      </ul>
    </div>
  </footer>
  );
}
