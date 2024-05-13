"use client"; // Ensure it's a client-only component
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import React, { useState, useEffect } from "react";

function MyNavbar() {
  const [teams, setTeams] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setActiveTab(window.location.pathname);
    }

    // Fetch teams data
    fetch("/api/teams")
      .then((res) => res.json())
      .then((data) => {
        setTeams(data.teams);
      });
  }, []);

  const handleNavClick = (path: string) => {
    setActiveTab(path); // Update active tab when a link is clicked
  };

  const isActive = (path: string) => activeTab === path;

  return (
    <Navbar
      bg="primary"
      collapseOnSelect
      expand="lg"
      sticky="top"
      data-bs-theme="dark"
    >
      <Container>
        <Navbar.Brand
          href="/"
          onClick={() => handleNavClick("/")}
          {...(isActive("/") ? { active: true } : {})} // Conditionally set `active`
        >
          Flagrant Fowl Futbol Association
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              href="/"
              onClick={() => handleNavClick("/")}
              {...(isActive("/") ? { active: true } : {})}
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="/learnmore"
              onClick={() => handleNavClick("/learnmore")}
              {...(isActive("/learnmore") ? { active: true } : {})}
            >
              Learn More
            </Nav.Link>
            <NavDropdown
              title="Teams"
              id="basic-nav-dropdown"
              {...(isActive("/teams") ? { active: true } : {})} // Avoiding warning
            >
              {teams.map((team, index) => (
                <NavDropdown.Item
                  key={index}
                  href={`/${team}`}
                  onClick={() => handleNavClick(`/${team}`)}
                  {...(isActive(`/${team}`) ? { active: true } : {})}
                >
                  {team}
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            <Nav.Link
              href="/matchSchedule"
              onClick={() => handleNavClick("/matchSchedule")}
              {...(isActive("/matchSchedule") ? { active: true } : {})}
            >
              Match Schedule
            </Nav.Link>
            <NavDropdown title="Login">
              <NavDropdown.Item
                href="/organiserlogin"
                onClick={() => handleNavClick("/organiserlogin")}
                {...(isActive("/organiserlogin") ? { active: true } : {})}
              >
                Organizer Login
              </NavDropdown.Item>
              <NavDropdown.Item
                href="/PlayerLogin"
                onClick={() => handleNavClick("/PlayerLogin")}
                {...(isActive("/PlayerLogin") ? { active: true } : {})}
              >
                Player Login
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
