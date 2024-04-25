import React, { useState } from "react";
import { toast } from "sonner";

interface AddPlayerFormProps {
  team: string;
}

const AddPlayerForm: React.FC<AddPlayerFormProps> = ({ team }) => {
  const [playerName, setPlayerName] = useState("");
  const [commitment, setCommitment] = useState("");
  const [position, setPosition] = useState("");
  const [previousClub, setPreviousClub] = useState("");

  const handlePlayerSubmit = async () => {
    if (!playerName || !commitment || !position || !previousClub || !team) {
      toast.error("Please fill all fields before submitting.");
      return;
    }

    const payload = {
      player_name: playerName,
      commitment,
      position,
      previous_club: previousClub,
    };

    try {
      const response = await fetch(`/api/${team}/addnewplayer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success("Player added/updated successfully!");
        setPlayerName("");
        setCommitment("");
        setPosition("");
        setPreviousClub("");
      } else {
        const result = await response.json();
        toast.error(`Failed to add/update player: ${result.message}`);
      }
    } catch (error) {
      console.error("Failed to add/update player:", error);
      toast.error("Error connecting to server.");
    }
  };

  return (
    <div style={{ padding: "20px", margin: "20px" }}>
      <input
        type="text"
        placeholder="Player Name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        style={{ margin: "5px" }}
      />
      <input
        type="text"
        placeholder="Commitment"
        value={commitment}
        onChange={(e) => setCommitment(e.target.value)}
        style={{ margin: "5px" }}
      />
      <input
        type="text"
        placeholder="Position"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        style={{ margin: "5px" }}
      />
      <input
        type="text"
        placeholder="Previous Club"
        value={previousClub}
        onChange={(e) => setPreviousClub(e.target.value)}
        style={{ margin: "5px" }}
      />
      <button onClick={handlePlayerSubmit} style={{ margin: "5px" }}>
        Submit Player Details
      </button>
    </div>
  );
};

export default AddPlayerForm;
