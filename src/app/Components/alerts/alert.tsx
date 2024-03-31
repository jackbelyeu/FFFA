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

  if (show) {
    return (
      <Alert variant="info" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>{message}</Alert.Heading>
      </Alert>
    );
  }
}
export default AlertDismissible;
