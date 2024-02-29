// Card.tsx

import React, { useState } from "react";
import Image from "next/image";
import styles from "./Card.module.css";

const Card = ({
  player_name,
  player_commitment,
  player_position,
  player_team,
}: {
  player_name: string;
  player_commitment: string;
  player_position: string;
  player_team: string;
}) => {
  const [commitment, setCommitment] = useState(player_commitment);
  const [position, setPosition] = useState(player_position);

  const handleCommitmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCommitment(e.target.value);
    console.log(e.target.value);
  };

  const handlePositionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPosition(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div className={styles.card}>
      <Image
        src={`/logos/${player_team}.jpeg`}
        alt={`Logo of ${player_name}`}
        width={100}
        height={100}
        className={styles.logo}
      />
      <h2>{player_name}</h2>
      <p>Commitment: {player_commitment}</p>
      <select value={player_commitment} onChange={handleCommitmentChange}>
        <option value="fulltime">Full Time</option>
        <option value="parttime">Part Time</option>
      </select>
      <p>Position: {player_position}</p>
      <select value={player_position} onChange={handlePositionChange}>
        <option value="goalkeeper">Goalkeeper</option>
        <option value="defender">Defender</option>
        <option value="midfielder">Midfielder</option>
        <option value="forward">Forward</option>
      </select>
      <br />
    </div>
  );
};

export default Card;
