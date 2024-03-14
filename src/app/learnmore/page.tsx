"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import soccerPic from "../../images/soccer.png";

const SendEmailButton = () => {
  const sendEmail = () => {
    const emailAddress = "maltucker@gmail.com";
    const subject = "Express Interest in 2024 Season";
    const body = "I am interested in the 2024 season";
    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
  };
  return <button onClick={sendEmail}>Contact Organizer</button>;
};
export default function LearnMore() {
  return (
    <div>
      <h1>Hello, Learn More Page!</h1>
      <p>Find out more about the 2023 season.</p>
      <Image src={soccerPic} alt="Soccer" width={800} height={600} />
      <br />
      <SendEmailButton />
      <center>
        <Link href="/interest">Express Interest for 2024</Link>
        {" or "}
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSdePwew3zR-kj-D512n-0biefdlnWeOPOXVXuOBAEv1y_qmFg/viewform?authuser=0"
          target="_blank"
        >
          Google Form
        </a>
      </center>
    </div>
  );
}
