import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Card.module.css";

const Card = ({
  player_name,
  commitment,
  position,
  player_team,
  previous_club,
}: {
  player_name: string;
  commitment: string;
  position: string;
  player_team: string;
  previous_club: string;
}) => {
  const [localCommitment, setLocalCommitment] = useState(commitment);
  const [localPosition, setLocalPosition] = useState(position);
  const [localPreviousClub, setLocalPreviousClub] = useState(previous_club);

  useEffect(() => {
    const getPlayerData = async () => {
      try {
        const response = await fetch(`/api/${player_team}/roster`);
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
        setLocalPreviousClub(playerData.previous_club);
      } catch (error) {
        console.error(error);
      }
    };
    getPlayerData();
  }, [player_name, player_team,previous_club]);

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
      previous_club: localPreviousClub,
    });
  };
  const handlePreviousClubChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newPreviousClub = e.target.value;
    setLocalPreviousClub(newPreviousClub);
    await updatePlayerData({
      previous_club: newPreviousClub,
      commitment: localCommitment,
      position: localPosition,
    });
  };
  

  const updatePlayerData = async (data: {
    commitment?: string;
    position?: string;
    previous_club?: string;
  }) => {
    try {
      const response = await fetch(`/api/${player_team}/roster`, {
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
      <p>Previous Club: {localPreviousClub}</p>
      <select
        value={localPreviousClub}
        onChange={handlePreviousClubChange}
        id={`previous_club-${player_name}`}
      >
         <option value="Mosquitoes">Mosquitoes</option>
            <option value="Hyenas">Hyenas</option>
            <option value="Chickens">Chickens</option>
            <option value="Grasskickeers ">Grasskickers</option>
            <option value="Mockingbirds">Mockingbirds</option>
            <option value="Emus">Emus</option>
        
      </select>

    </div>
  );
};

export default Card;
