"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LogoutButton from "./LogoutButton";
import LocalStorage from "@/utils/LocalStorage";
import UserClass from "@/modules/UserClass";
// If you're using React Router, import `useNavigate` from "react-router-dom".

const Navbar: React.FC = () => {
  const router = useRouter(); // Next.js router instance
  // const [isLoading, setIsLoading] = useState(true); // Loading state
  const [userData, setUserData] = useState<UserClass>(); // User data

  useEffect(() => {
    try {
      const storedData = localStorage.getItem("DATA:USER");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        console.log(parsedData);
        setUserData(UserClass.fromJson(parsedData));
      }
    } catch (error) {}
  }, []);

  // Function to perform navigation
  const navigate = (path: string) => {
    router.push(path); // Navigate to the given path
  };

  return (
    <nav className="bg-black-white-10 backdrop-blur-sm py-4 px-6 fixed top-0 left-0 w-full z-40">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Title */}
        <span
          className="text-3xl font-bold cursor-pointer text-yellow-500"
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
            Solar Status
          </button>
          <button
            className="hover:text-yellow-400 transition"
            onClick={() => navigate("/solar-panels")}
          >
            Solar Panels
          </button>
          <button
            className="hover:text-yellow-400 transition"
            onClick={() => navigate("/solar-orbits")}
          >
            Solar Orbits
          </button>
        </div>

        {/* Logout Button */}
        <div>
          {userData ? (
            <LogoutButton />
          ) : (
            // <LogoutButton />
            <button
              className="btn btn-signin"
              onClick={() => navigate("/sign_in")}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
