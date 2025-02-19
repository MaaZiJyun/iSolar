"use client";
import React, { useState, useEffect } from "react";
import UserClass from "@/modules/UserClass";
import LoadingCircle from "@/components/LoadingCircle";
import StarBackground from "@/components/StarBackground";
import OrbitDemo from "@/components/OrbitDemo";

export interface Planet {
  name: string;
  size: number;
  distance: number;
  color: string;
}

const SolarPanels: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<UserClass>();
  const [birthDate, setBirthDate] = useState(""); // User's birth date
  const [lifePercentage, setLifePercentage] = useState(100); // Remaining life percentage
  const [planets, setPlanets] = useState<Planet[]>([]);
  const totalDays = 30000; // Assumed star lifespan in days
  useEffect(() => {
    const fetchUserData = () => {
      try {
        const storedData = localStorage.getItem("DATA:USER");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setUserData(UserClass.fromJson(parsedData));
          setPlanets(examples);
        }
      } catch (error) {
        console.log("error on userdata");
      }
    };
    setTimeout(fetchUserData, 500);
  }, []);

  // Update birth date and loading state when user data is loaded
  useEffect(() => {
    if (userData) {
      console.log(userData.toJson());
      setBirthDate(userData.dateOfBirth || "");
      setIsLoading(false); // Mark loading as complete
    }
  }, [userData]);

  // Calculate remaining life percentage
  useEffect(() => {
    if (birthDate) {
      const birth = new Date(birthDate);
      const today = new Date();
      const daysLived = Math.floor(
        (today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24)
      );
      const remainingPercentage = Math.max(
        0,
        ((totalDays - daysLived) / totalDays) * 100
      );
      setLifePercentage(remainingPercentage);
      console.log("remainingPercentage", remainingPercentage);
    }
  }, [birthDate]);

  // size: values, distance: relationship strength, color: attitute

  const examples = [
    { name: "Mercury", size: 10, distance: 50, color: "#b0b0b0" },
    { name: "Venus", size: 14, distance: 80, color: "#fac569" },
    { name: "Earth", size: 16, distance: 110, color: "#3c99dc" },
    { name: "Mars", size: 12, distance: 150, color: "#d14b4b" },
    { name: "Jupiter", size: 30, distance: 200, color: "#d4a759" },
    { name: "Saturn", size: 26, distance: 260, color: "#edd79b" },
    { name: "Uranus", size: 20, distance: 320, color: "#9ad7f6" },
    { name: "Neptune", size: 18, distance: 380, color: "#6477d0" },
  ];

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <StarBackground />
        <LoadingCircle />
      </div>
    );
  } else
    return (
      <div className="flex">
        <StarBackground />
        <div className="w-full h-screen">
          <OrbitDemo planets={planets} lifePercentage={lifePercentage} />
        </div>
      </div>
    );
};

export default SolarPanels;
