import React, { useState, useEffect } from 'react';

interface StickyAlertProps {
  message: string; // Explicitly declare the type of message as string
}

const StickyAlert: React.FC<StickyAlertProps> = ({ message }) => {
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

  return (
    showAlert && (
      <div className="sticky-alert">
        <p>{message}</p>
        <button onClick={() => setShowAlert(false)}>Dismiss</button>
      </div>
    )
  );
};

export default StickyAlert;
