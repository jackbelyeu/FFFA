import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Card.module.css";

const Card = ({
  player_name,
  commitment,
  position,
  player_team,
}: {
  player_name: string;
  commitment: string;
  position: string;
  player_team: string;
}) => {
  const [localCommitment, setLocalCommitment] = useState(commitment);
  const [localPosition, setLocalPosition] = useState(position);

  useEffect(() => {
    const getPlayerData = async () => {
      try {
        const response = await fetch(`/api/${player_team}/rooster`);
        if (!response.ok) {
          throw new Error("Failed to fetch player data");
        }
        const data = await response.json();
        const playerData = data.rows.find(
          (player: { player_name: string }) =>
            player.player_name === player_name
        );
        if (!playerData) {
          throw new Error("Player not found");
        }
        setLocalCommitment(playerData.commitment);
        setLocalPosition(playerData.position);
      } catch (error) {
        console.error(error);
      }
    };
    getPlayerData();
  }, [player_name, player_team]);

  const handleCommitmentChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newCommitment = e.target.value;
    setLocalCommitment(newCommitment);
    await updatePlayerData({
      commitment: newCommitment,
      position: localPosition,
    });
  };

  const handlePositionChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newPosition = e.target.value;
    setLocalPosition(newPosition);
    await updatePlayerData({
      commitment: localCommitment,
      position: newPosition,
    });
  };

  const updatePlayerData = async (data: {
    commitment?: string;
    position?: string;
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
      <p>Commitment: {localCommitment}</p>
      <select
        value={localCommitment}
        onChange={handleCommitmentChange}
        id={`commitment-${player_name}`}
      >
        <option value="Full time">Full Time</option>
        <option value="Part time">Part Time</option>
      </select>
      <p>Position: {localPosition}</p>
      <select
        value={localPosition}
        onChange={handlePositionChange}
        id={`position-${player_name}`}
      >
        <option value="Goal Keeper">Goalkeeper</option>
        <option value="Defender">Defender</option>
        <option value="Midfielder">Midfielder</option>
        <option value="Forward">Forward</option>
      </select>
    </div>
  );
};

export default Card;
