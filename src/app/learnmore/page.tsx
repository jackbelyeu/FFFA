"use client";
import React from "react";
import Image from "next/image";
import soccerPic from "../../images/soccer.png";
import Button from "react-bootstrap/Button";

const SendEmailButton = () => {
  const sendEmail = () => {
    const emailAddress = "maltucker@gmail.com";
    const subject = "Express Interest in 2024 Season";
    const body = "I am interested in the 2024 season";
    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
  };
  return (
    <Button variant="outline-success" onClick={sendEmail}>
      Contact Organizer
    </Button>
  );
};
export default function LearnMore() {
  return (
    <div>
      <br />
      <h1>Hello, Learn More Page!</h1>
      <p>Find out more about the 2023 season.</p>
      <Image src={soccerPic} alt="Soccer" width={800} height={600} />
      <br />
      <SendEmailButton />
    </div>
  );
}
