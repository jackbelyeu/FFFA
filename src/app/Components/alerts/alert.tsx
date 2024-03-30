import React, { useState, useEffect } from "react";
import "./StickyAlert.css";

const StickyAlert = () => {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const hideAlert = localStorage.getItem("hideAlert");
    if (hideAlert === "true") {
      setShowAlert(false);
    } else {
      const timeout = setTimeout(() => {
        setShowAlert(false);
        localStorage.setItem("hideAlert", "true");
      }, 7 * 24 * 60 * 60 * 1000);

      return () => clearTimeout(timeout);
    }
  }, []);

  const dismissAlert = () => {
    setShowAlert(false);
    localStorage.setItem("hideAlert", "true");
  };

  return (
    showAlert && (
      <div className="sticky-alert">
        <p>Pickup game this Sunday at 3pm at SLU Intramural field</p>
        <button onClick={dismissAlert}>Dismiss</button>
      </div>
    )
  );
};

export default StickyAlert;
