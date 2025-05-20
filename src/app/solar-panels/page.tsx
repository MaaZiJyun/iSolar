"use client";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import UserClass from "@/modules/UserClass";
import Cube from "@/components/Cube";
import CubeClass from "@/modules/CubeClass";
import StarBackground from "@/components/StarBackground";
import LoadingPage from "@/components/LoadingPage";

const SolarPanels: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<UserClass>();
  const [birthDate, setBirthDate] = useState("2025-02-01");
  const [dateNum, setDateNum] = useState(35);
  const [dates, setDates] = useState<string[]>([]);
  const [existingCubeList, setExistingCubeList] = useState<CubeClass[]>([]);
  const [cubeList, setCubeList] = useState<CubeClass[]>([]);
  const [processing, setProcessing] = useState(0);

  const currentDate = dayjs().format("YYYY-MM-DD");

  useEffect(() => {
    const totalDuration = 1500;
    const interval = setInterval(() => {
      setProcessing((prev) => {
        const next = prev + 100 / (totalDuration / 100);
        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }
        return next;
      });
    }, 100);

    const timeout = setTimeout(() => {
      const storedData = localStorage.getItem("DATA:USER");
      if (storedData) {
        try {
          const parsed = JSON.parse(storedData);
          setUserData(UserClass.fromJson(parsed));
        } catch (e) {
          console.error("Error parsing user data:", e);
        }
      }
      setIsLoading(false);
    }, totalDuration);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (!userData) return;
    setBirthDate(userData.dateOfBirth || "");
    fetchAndSetCubes(userData);
  }, [userData]);

  useEffect(() => {
    if (!userData) return;
    const list = dates.map((date) => {
      const existing = existingCubeList.find(
        (c) => c.date.split("T")[0] === date
      );
      return existing || new CubeClass(-1, userData.id, "My Cube", date, 0, "OPENING");
    });
    setCubeList(list);
  }, [existingCubeList, dates, userData]);

  const fetchAndSetCubes = async (user: UserClass) => {
    const shownDates = Array.from({ length: dateNum }, (_, i) =>
      dayjs(currentDate).subtract(i, "day").format("YYYY-MM-DD")
    ).reverse();
    setDates(shownDates.reverse());
    const cubes = await getCubesById(user.id);
    setExistingCubeList(cubes);
  };

  const calculateLifeDay = (birth: string, target: string) => {
    const start = new Date(birth);
    const end = new Date(target);
    if (end < start) return -1;
    return Math.floor((end.getTime() - start.getTime()) / 86400000) + 1;
  };

  const getCubesById = async (userId: string): Promise<CubeClass[]> => {
    try {
      const res = await fetch(`/api/cube/get_all_cubes?userId=${userId}`);
      if (!res.ok) throw new Error("Failed to fetch cubes");
      const { data } = await res.json();
      return data.map((item: any) => CubeClass.fromJson(item));
    } catch (e: any) {
      console.error("Error fetching cubes:", e.message);
      return [];
    }
  };

  if (isLoading || !userData) {
    return <LoadingPage processing={processing} />;
  }

  return (
    <div className="flex">
      <StarBackground />
      <div className="w-full h-screen overflow-y-auto">
        <div className="grid grid-cols-7 p-24">
          {dates.map((date, i) => (
            <Cube
              key={calculateLifeDay(birthDate, date)}
              order={calculateLifeDay(birthDate, date)}
              user={userData}
              cube={cubeList[i]}
            />
          ))}
        </div>
        <div className="h-12" />
      </div>
    </div>
  );
};

export default SolarPanels;
