"use client";

import GlassWindow from "@/components/GlassWindow";
import LoadingCircle from "@/components/LoadingCircle";
import LogoutButton from "@/components/LogoutButton";
import StarBackground from "@/components/StarBackground";
import StarComponent from "@/components/StarComponent";
import { starProperties } from "@/data/starProperties";
import UserClass from "@/modules/UserClass";
import React, { useState, useEffect, useRef } from "react";

export default function StarLifecycle() {
  // States
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [userData, setUserData] = useState<UserClass>(); // User data
  const [birthDate, setBirthDate] = useState(""); // User's birth date
  const [lifePercentage, setLifePercentage] = useState(100); // Remaining life percentage
  const [elapsedTime, setElapsedTime] = useState(""); // Dynamic timer
  const [isWidgetOpen, setIsWidgetOpen] = useState(false); // Widget state

  const [timeLeft, setTimeLeft] = useState<{
    days: any;
    hours: any;
    minutes: any;
    seconds: any;
  }>();

  const totalDays = 30000; // Assumed star lifespan in days

  // Fetch user data from localStorage
  useEffect(() => {
    const fetchUserData = () => {
      try {
        const storedData = localStorage.getItem("DATA:USER");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          console.log(parsedData);
          setUserData(UserClass.fromJson(parsedData));
        }
      } catch (error) {}
    };

    setTimeout(fetchUserData, 500); // Simulate 1-second loading time
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
      setElapsedTime(`${daysLived} Days`);
      const remainingPercentage = Math.max(
        0,
        ((totalDays - daysLived) / totalDays) * 100
      );
      setLifePercentage(remainingPercentage);
      console.log("remainingPercentage", remainingPercentage);

      const interval = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1); // Update every millisecond

      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [birthDate]);

  const calculateTimeLeft = () => {
    const birthdate = new Date(birthDate);
    const targetDate = new Date(
      birthdate.getTime() + totalDays * 24 * 60 * 60 * 1000
    ); // Add 30,000 days
    const now = new Date();

    const diff = targetDate.getTime() - now.getTime(); // Time difference in milliseconds

    if (diff <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      };
    }

    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
    const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((diff % (60 * 1000)) / 1000);
    const time = { days, hours, minutes, seconds };
    return time;
  };

  const formatTime = (time: {
    days: any;
    hours: any;
    minutes: any;
    seconds: any;
  }) => {
    const { days, hours, minutes, seconds } = time;

    return `${days} ${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  // Define the return type of the function
  const getStarProperties = (lifePercentage: number) => {
    if (lifePercentage > 75) {
      return starProperties[0];
    } else if (lifePercentage > 50) {
      return starProperties[1];
    } else if (lifePercentage > 25) {
      return starProperties[2];
    } else if (lifePercentage > 1) {
      return starProperties[3];
    } else {
      return starProperties[4];
    }
  };

  const prop = getStarProperties(lifePercentage);

  // Loading screen
  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <StarBackground />
        <LoadingCircle />
      </div>
    );
  }

  // Main content
  return (
    <div className="flex flex-col items-center justify-center">
      <StarBackground />
      {/* Main content */}
      <div className="flex flex-col h-screen w-full z-10 items-center justify-center text-center py-32">
        <p className="text-md mb-2">
          Number of days remaining before the star demise:
        </p>
        <h1 className="text-6xl text-yellow-500 font-bold mb-8 z-50">
          {timeLeft && `${formatTime(timeLeft)}`}
        </h1>

        <div
          className="my-6 hover:cursor-pointer"
          onClick={() => setIsWidgetOpen(true)}
        >
          <StarComponent lifePercentage={lifePercentage} sizeChange={true} />
        </div>

        <p className="text-3xl mt-8">Stage {prop.name}</p>
        <p className="mt-4 text-lg">Remaining: {lifePercentage.toFixed(1)}%</p>
      </div>
      <GlassWindow isOpen={isWidgetOpen} onClose={() => setIsWidgetOpen(false)}>
        <h2 className="text-2xl mb-8">
          Hello There,{" "}
          <span className="text-yellow-500 font-bold">{userData?.username}</span>
        </h2>
        <p>Email: {userData?.email}</p>
        <p>Date of Birth: {birthDate.toString().split('T')[0]}</p>
        <p>Bio: {userData?.bio}</p>
        <p className="text-sm mt-4">Your star has been running {elapsedTime}</p>
      </GlassWindow>

      {/* <div className="h-screen w-full relative z-10 text-center py-32 bg-white"><p>这是一个关于恒星生命周期的详细信息窗口。</p></div> */}
    </div>
  );
}
