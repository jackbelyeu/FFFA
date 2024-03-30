import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";

interface ScheduleRoasterContentProps {
  team: string;
}

const ScheduleRoasterContent: React.FC<ScheduleRoasterContentProps> = ({
  team,
}) => {
  const [selectedTeam, setSelectedTeam] = useState<string>(team);
  const [scheduleData, setScheduleData] = useState<any[]>([]);
  const [rosterData, setRosterData] = useState<any[]>([]);

  useEffect(() => {
    if (team) {
      setSelectedTeam(team);
      fetchScheduleAndRosterData(team);
    }
  }, [team]);

  const fetchScheduleAndRosterData = async (teamName: string) => {
    try {
      const scheduleResponse = await fetch(`/api/sch1?teamName=${teamName}`);
      const scheduleData = await scheduleResponse.json();
      setScheduleData(scheduleData.result.rows);

      const rosterResponse = await fetch(`/api/roster1?teamName=${teamName}`);
      const rosterData = await rosterResponse.json();
      setRosterData(rosterData.result.rows);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  return (
    <div className={styles.content}>
      <div className={styles.scheduleSection}>
        <h2 className={styles.sectionHeading}>
          <span className={styles.footballIcon}>&#9917;</span> Schedule for{" "}
          {selectedTeam}
        </h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Opponent</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {scheduleData &&
              scheduleData.map((game, index) => (
                <tr key={index}>
                  <td>{game.date.substring(0, 10)}</td>
                  <td>{game.time}</td>
                  <td>
                    {game.home_team === selectedTeam.toLowerCase()
                      ? game.away_team.toUpperCase()
                      : game.home_team.toUpperCase()}
                  </td>
                  <td>{game.location.toUpperCase()}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className={styles.rosterSection}>
        <h2 className={styles.sectionHeading}>
          <span className={styles.footballIcon}>&#9917;</span> Roster for{" "}
          {selectedTeam}
        </h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Player Name</th>
              <th>Oct 8</th>
              <th>Oct 15</th>
              <th>Oct 22</th>
              <th>Oct 29</th>
              <th>Nov 5</th>
              <th>Nov 12</th>
              <th>Nov 19</th>
              <th>Nov 26</th>
              <th>Commitment</th>
              <th>Position</th>
              <th>Previous Club</th>
            </tr>
          </thead>
          <tbody>
            {rosterData &&
              rosterData.map((player, index) => (
                <tr key={index}>
                  <td>{player.player_name}</td>
                  <td>{player.oct_8}</td>
                  <td>{player.oct_15}</td>
                  <td>{player.oct_22}</td>
                  <td>{player.oct_29}</td>
                  <td>{player.nov_5}</td>
                  <td>{player.nov_12}</td>
                  <td>{player.nov_19}</td>
                  <td>{player.nov_26}</td>
                  <td>{player.commitment}</td>
                  <td>{player.position}</td>
                  <td>{player.previous_club}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScheduleRoasterContent;
