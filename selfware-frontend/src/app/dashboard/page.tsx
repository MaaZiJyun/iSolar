"use client";

import GlassWindow from "@/components/GlassWindow";
import LoadingCircle from "@/components/LoadingCircle";
import LogoutButton from "@/components/LogoutButton";
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

  const totalDays = 30000; // Assumed star lifespan in days
  const canvasRef = useRef<HTMLCanvasElement | null>(null); // Canvas reference

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

  // Background animation (stars)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const stars: { x: number; y: number; radius: number }[] = [];
    const numStars = 200;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Generate stars
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
      });
    }

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const updateStars = () => {
      stars.forEach((star) => {
        star.y += 0.5;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });
    };

    const animate = () => {
      drawStars();
      updateStars();
      requestAnimationFrame(animate);
    };

    animate();

    // Handle resizing
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
    }
  }, [birthDate]);

  // Dynamic timer (elapsed time since birth)
  useEffect(() => {
    const birth = new Date(birthDate).getTime();

    const updateTimer = () => {
      const now = Date.now();
      const diff = now - birth;

      // Calculate time components
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      //   const milliseconds = Math.floor(diff % 1000);

      // Format elapsed time
      setElapsedTime(
        `${days} Days ${hours} Hours ${minutes} mins ${seconds} seconds`
      );
    };

    const timer = setInterval(updateTimer, 10); // Update every 10ms

    return () => clearInterval(timer);
  }, [birthDate]);

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
      <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
        ></canvas>
        <LoadingCircle />
      </div>
    );
  }

  // Main content
  return (
    <div className="flex flex-col items-center justify-center bg-black text-white">
      {/* Background canvas */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
      ></canvas>

      {/* Main content */}
      <div className="flex flex-col h-screen w-full z-10 items-center justify-center text-center py-32">
        <h1 className="text-6xl font-bold mb-6">Star Lifecycle</h1>
        <p className="text-lg mb-8">The star has been running {elapsedTime}</p>
        <StarComponent lifePercentage={lifePercentage} />
        <p className="text-3xl mt-8">Current Stage: {prop.name}</p>
        <p className="mt-4 text-lg">Remaining: {lifePercentage.toFixed(1)}%</p>
      </div>
      <GlassWindow isOpen={isWidgetOpen} onClose={() => setIsWidgetOpen(false)}>
        <h2 className="text-2xl font-bold mb-4">恒星详情</h2>
        <p>这是一个关于恒星生命周期的详细信息窗口。</p>
      </GlassWindow>

      {/* <div className="h-screen w-full relative z-10 text-center py-32 bg-white"><p>这是一个关于恒星生命周期的详细信息窗口。</p></div> */}
    </div>
  );
}
