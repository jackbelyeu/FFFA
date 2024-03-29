import React, { useState, useEffect } from "react";
import "./StickyAlert.css"; // Import CSS file for styling

const StickyAlert = () => {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowAlert(false);
      localStorage.setItem("hideAlert", "true");
    }, 7 * 24 * 60 * 60 * 1000); // Hide after seven days

    return () => clearTimeout(timeout);
  }, []);

  const dismissAlert = () => {
    setShowAlert(false);
    localStorage.setItem("hideAlert", "true");
  };

  return (
    showAlert &&
    !localStorage.getItem("hideAlert") && (
      <div className="sticky-alert">
        <p>Pickup game this Sunday at 3pm at SLU Intramural field</p>
        <button onClick={dismissAlert}>Dismiss</button>
      </div>
    )
  );
};

export default StickyAlert;
