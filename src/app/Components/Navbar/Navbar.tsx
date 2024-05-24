"use client";
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

    fetch("/api/teams")
      .then((res) => res.json())
      .then((data) => {
        setTeams(data.teams);
      });
  }, []);

  const handleNavClick = (path: string) => {
    setActiveTab(path);
  };

  const isActive = (path: string) => activeTab === path;

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-primary p-4 shadow-lg">
      <div className="text-white text-lg font-bold">
        Flagrant Fowl Futbol Association
      </div>

      <div className="hidden md:flex space-x-6">
        <Link href="/" className="text-white no-underline hover:text-gray-300">
          Home
        </Link>

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

      <div className="hidden md:flex">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="bg-white text-primary px-4 py-2 rounded-md hover:bg-secondary-dark">
              Login
            </button>
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

      <div className="flex md:hidden">
        <button
          className="text-white focus:outline-none"
          onClick={toggleSheet}
        >
          ☰
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-0 left-0 w-full bg-primary p-4 md:hidden">
          <div className="flex flex-col space-y-4">
            <Link href="/" className="text-white no-underline hover:text-gray-300" onClick={toggleSheet}>
              Home
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <span className="text-white cursor-pointer hover:text-gray-300">
                  Teams
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {teams.map((team, index) => (
                  <DropdownMenuItem key={index} asChild>
                    <Link href={`/${team}`} onClick={toggleSheet}>
                      {team}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/schedule" className="text-white no-underline hover:text-gray-300" onClick={toggleSheet}>
              Match Schedule
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="bg-white text-primary px-4 py-2 rounded-md hover:bg-secondary-dark">
                  Login
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/organiserlogin" onClick={() => { handleNavClick("/organiserlogin"); toggleSheet(); }} className={isActive("/organiserlogin") ? "active" : ""}>
                    Organizer Login
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/PlayerLogin" onClick={() => { handleNavClick("/PlayerLogin"); toggleSheet(); }} className={isActive("/PlayerLogin") ? "active" : ""}>
                    Player Login
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}
    </nav>
  );
}