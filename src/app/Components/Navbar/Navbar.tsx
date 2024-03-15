"use client";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function MyNavbar() {
  return (
    <Navbar
      bg="primary"
      collapseOnSelect
      expand="lg"
      sticky="top"
      data-bs-theme="dark"
    >
      <Container>
        <Navbar.Brand href="/">Flagrant Fowl Futbol Association</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/learnmore">Learn More</Nav.Link>
            <Nav.Link href="/matchSchedule">Match Schedule</Nav.Link>
            <Nav.Link href="/interest">Express Interest for 2024</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default MyNavbar;
