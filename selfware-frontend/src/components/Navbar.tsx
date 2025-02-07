"use client";
import React from "react";
import { useRouter } from "next/navigation";
import LogoutButton from "./LogoutButton";
// If you're using React Router, import `useNavigate` from "react-router-dom".

const Navbar: React.FC = () => {
  const router = useRouter(); // Next.js router instance
  const userData = localStorage.getItem("DATA:USER");

  // Function to perform navigation
  const navigate = (path: string) => {
    router.push(path); // Navigate to the given path
  };

  return (
    <nav className="text-white py-4 px-6 fixed top-0 left-0 w-full z-40">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Title */}
        <span
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          iSolar
        </span>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <button
            className="hover:text-yellow-400 transition"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>
          <button
            className="hover:text-yellow-400 transition"
            onClick={() => navigate("/solar-panels")}
          >
            Power Station
          </button>
          <button
            className="hover:text-yellow-400 transition"
            onClick={() => navigate("/solar-system")}
          >
            Solar System
          </button>
        </div>

        {/* Logout Button */}
        <div>
          {userData ? (
            <LogoutButton />
          ) : (
            <button className="btn btn-signin" onClick={() => navigate("/sign_in")}>
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
