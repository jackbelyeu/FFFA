import Link from "next/link";
import React from "react";
import Image from "next/image";
import soccerPic from "../../images/soccer.png";

export default function LearnMore() {
  return (
    <center>
      <div>
        <h1>Hello, Learn More Page!</h1>
        <p>Find out more about the 2023 season.</p>
        <Image src={soccerPic} alt="Soccer" width="800" height="500" />
        <br />
        <Link href="/interest">Express Interest</Link>
      </div>
    </center>
  );
}
