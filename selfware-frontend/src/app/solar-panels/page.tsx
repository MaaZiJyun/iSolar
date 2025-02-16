"use client";
import React, { useState, useEffect, JSX } from "react";
import dayjs from "dayjs";
import UserClass from "@/modules/UserClass";
import LoadingCircle from "@/components/LoadingCircle";
import { SunIcon } from "@heroicons/react/24/outline"; // Removed unused icons
import Cube from "@/components/Cube";
import CubeClass from "@/modules/CubeClass";
import TaskClass from "@/modules/TaskClass";
import StarBackground from "@/components/StarBackground";

const SolarPanels: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<UserClass>();
  const [dateNum, setDateNum] = useState(100);
  const [dates, setDates] = useState<string[]>([]);
  const [existingCubeList, setExistingCubeList] = useState<CubeClass[]>([]);
  const [cubeList, setCubeList] = useState<CubeClass[]>([]);
  const [birthDate, setBirthDate] = useState<string>("2025-02-01");
  const [currentDate] = useState<string>(dayjs().format("YYYY-MM-DD"));
  const [selectedDate] = useState<string>(currentDate);

  useEffect(() => {
    const fetchUserData = () => {
      try {
        const storedData = localStorage.getItem("DATA:USER");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setUserData(UserClass.fromJson(parsedData));
        }
      } catch (error) {
        console.log("error on userdata");
      }
    };
    setTimeout(fetchUserData, 500);
  }, []);

  useEffect(() => {
    const effectAsync = async () => {
      if (userData) {
        setBirthDate(userData.dateOfBirth || "");
        await fetchAndSetCubes(userData);
        setIsLoading(false);
        console.log("loading finished");
      } else {
        console.log("wrong userdata");
      }
    };
    effectAsync();
  }, [userData]);

  useEffect(() => {
    if (userData) {
      const list: CubeClass[] = [];
      console.log("existingCubeList", existingCubeList);
      dates.forEach((date) => {
        const index = existingCubeList.findIndex((c: CubeClass) => {
          const cubeDate = c.date.split("T")[0]; // 提取日期部分
          return cubeDate === date;
        });
        if (index !== -1) {
          list.push(existingCubeList[index]);
        } else {
          list.push(
            new CubeClass(-1, userData?.id, "My Cube", date, 0, "OPENING")
          );
        }
      });
      console.log("list", list);
      setCubeList(list);
    }
  }, [existingCubeList, dates]);

  const fetchAndSetCubes = async (userData: UserClass) => {
    const shownDates = [];

    for (let i = 0; i < dateNum; i++) {
      shownDates.push(
        dayjs(currentDate).subtract(i, "day").format("YYYY-MM-DD")
      );
    }
    const reversedDates = shownDates.reverse();
    console.log("dates", reversedDates);
    setDates(reversedDates);
    const cubes = await getCubesById(userData.id);
    setExistingCubeList(cubes);
  };

  const focusDate = () => {
    const id = calculateLifeDay(birthDate, currentDate);
    setDateNum(id);
    const targetDiv = document.getElementById(`${id}`);
    if (targetDiv) {
      targetDiv.scrollIntoView({ behavior: "smooth" }); // Smooth scrolling
    }
  };

  // Function to calculate the life day
  const calculateLifeDay = (birthday: string, targetDate: string) => {
    const birthDate = new Date(birthday); // Convert birthday to Date object
    const target = new Date(targetDate); // Convert target date to Date object

    // Ensure target date is not earlier than the birthday
    if (target < birthDate) {
      return -1; // Return -1 to indicate an invalid date
    }

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = target.getTime() - birthDate.getTime();

    // Convert milliseconds to days (add 1 to count the birthday as the first day)
    const dayNumber =
      Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24)) + 1;

    return dayNumber;
  };

  const getCubesById = async (userId: string): Promise<CubeClass[]> => {
    try {
      // Build the query URL with the userId
      const url = `/api/cube/get_all_cubes?userId=${userId}`;

      // Make the GET request
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if the response is okay
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch cubes");
      }

      // Parse the JSON data from the API response
      const { data } = await response.json();

      // Convert each item in the data array into an instance of CubeClass
      const cubes = data.map((item: any) => CubeClass.fromJson(item));

      // Return the array of CubeClass instances
      return cubes;
    } catch (error: any) {
      console.error("Error fetching cubes:", error.message);

      // Return an empty array to handle errors gracefully
      return [];
    }
  };

  // Get tasks for the selected date
  // const selectedTasks = taskData[selectedDate] || [];

  // Loading screen
  if (isLoading || userData === undefined) {
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
        <div className="w-full h-screen overflow-y-auto">
          <div className="grid grid-cols-10">
            {dates.map((date, index) => {
              const key = calculateLifeDay(birthDate, date);
              return (
                <Cube
                  key={key}
                  order={key}
                  user={userData}
                  cube={cubeList[index]}
                />
              );
            })}
          </div>
          <div className="h-12"></div>
        </div>
        <div
          className="absolute flex w-full items-center justify-center bottom-0 bg-yellow-500 hover:bg-white hover:text-yellow-500 hover:cursor-pointer"
          onClick={focusDate}
        >
          <SunIcon className="h-10 w-10" />
        </div>
      </div>
    );
};

export default SolarPanels;
