"use client";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function MyNavbar() {
  return (
    <Navbar bg="primary"  sticky="top" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">Flagrant Fowl Futbol Association</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/dashboard">Daashboard</Nav.Link>
          <Nav.Link href="/learnmore">Learn More</Nav.Link>
          <Nav.Link href="/matchSchedule">Match Schedule</Nav.Link>
          <Nav.Link href="/interest">Express Interest for 2024</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
export default MyNavbar;
