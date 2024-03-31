import { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";

function AlertDismissible() {
  const [show, setShow] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchAlert = async () => {
      try {
        const response = await fetch("/api/alert");
        const data = await response.json();
        const alert_text = data.rows[0].alert_text;
        console.log(alert_text);
        setMessage(alert_text);
      } catch (error) {
        console.error("Error fetching alert:", error);
      }
    };
    fetchAlert();
  }, []);

  useEffect(() => {
    const lastShown = localStorage.getItem("alertLastShown");
    if (lastShown) {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      if (new Date(lastShown) < sevenDaysAgo) {
        setShow(false);
      }
    }
  }, []);

  const handleClose = () => {
    setShow(false);
    localStorage.setItem("alertLastShown", new Date().toISOString());
  };

  if (show && message) {
    return (
      <Alert variant="info" onClose={handleClose} dismissible>
        <Alert.Heading>{message}</Alert.Heading>
      </Alert>
    );
  } else {
    return null;
  }
}

export default AlertDismissible;
