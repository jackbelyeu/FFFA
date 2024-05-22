"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSheet = () => setIsOpen((prev) => !prev);
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
    <nav className="flex items-center justify-between bg-primary p-4">
      {/* Brand name on the left */}
      <div className="text-white text-lg font-bold">
        Flagrant Fowl Futbol Association
      </div>

      {/* Navigation Links in the center */}
      <div className="flex space-x-6">
        <Link href="/" className="text-white no-underline hover:text-gray-300">
          Home
        </Link>

        {/* Teams Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <span className="text-white cursor-pointer hover:text-gray-300">
              Teams
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {teams.map((team, index) => (
              <DropdownMenuItem key={index} asChild>
                <Link href={`/${team}`}>{team}</Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Link
          href="/schedule"
          className="text-white no-underline hover:text-gray-300"
        >
          Match Schedule
        </Link>
      </div>

      <div>
        {" "}
        {/* Login Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="bg-white text-black hover:bg-gray-300"
            >
              Login
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <Link
                href="/organiserlogin"
                onClick={() => handleNavClick("/organiserlogin")}
                className={isActive("/organiserlogin") ? "active" : ""}
              >
                Organizer Login
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/PlayerLogin"
                onClick={() => handleNavClick("/PlayerLogin")}
                className={isActive("/PlayerLogin") ? "active" : ""}
              >
                Player Login
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
