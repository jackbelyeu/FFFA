"use client";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import React, { useState, useEffect } from "react";

function MyNavbar() {
  const [teams, setTeams] = useState<string[]>([]);
  useEffect(() => {
    fetch("/api/teams")
      .then((res) => res.json())
      .then((data) => {
        setTeams(data.teams);
      });
  }, []);
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
            <NavDropdown title="Teams" id="basic-nav-dropdown">
              {teams.map((team, index) => (
                <NavDropdown.Item key={index} href={`/${team}`}>
                  {team}
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            <Nav.Link href="/matchSchedule">Match Schedule</Nav.Link>
            <Nav.Link href="/organiserlogin">Organiser Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default MyNavbar;
