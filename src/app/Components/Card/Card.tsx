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

  const handleCommitmentChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newCommitment = e.target.value;
    setCommitment(newCommitment);
    console.log(newCommitment);
    await updatePlayerData({ player_commitment: newCommitment });
  };

  const handlePositionChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newPosition = e.target.value;
    setPosition(newPosition);
    console.log(newPosition);
    await updatePlayerData({ player_position: newPosition });
  };

  const updatePlayerData = async (data: {
    player_commitment?: string;
    player_position?: string;
  }) => {
    try {
      const response = await fetch(`/api/${player_team}/rooster`, {
        method: "POST",
        body: JSON.stringify({
          player_name,
          ...data,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to update player data");
      }
    } catch (error) {
      console.error(error);
    }
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
      <p>Commitment: {commitment}</p>
      <select value={commitment} onChange={handleCommitmentChange}>
        <option value="Full time">Full Time</option>
        <option value="Part time">Part Time</option>
      </select>
      <p>Position: {position}</p>
      <select value={position} onChange={handlePositionChange}>
        <option value="Goal Keeper">Goalkeeper</option>
        <option value="Defender">Defender</option>
        <option value="Midfielder">Midfielder</option>
        <option value="Forward">Forward</option>
      </select>
    </div>
  );
};

export default Card;
