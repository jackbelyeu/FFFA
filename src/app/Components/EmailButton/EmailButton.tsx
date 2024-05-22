import Button from "react-bootstrap/Button";

const EmailButton = () => {
  const sendEmail = () => {
    const emailAddress = "maltucker@gmail.com";
    const subject = "Express Interest in 2024 Season";
    const body = "I am interested in the 2024 season";
    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
  };
  return (
    <Button variant="outline-success" onClick={sendEmail}>
      Contact Organizer
    </Button>
  );
};

export default EmailButton;
