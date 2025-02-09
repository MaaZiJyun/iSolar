"use client";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs"; // For date manipulation
import UserClass from "@/modules/UserClass";
import LoadingCircle from "@/components/LoadingCircle";
import { CheckIcon, SunIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Battery100Icon } from "@heroicons/react/24/solid";
import EditableTaskList, { Task } from "@/components/EditableTaskList";
import LightContainer from "@/components/LightContainer";

interface SquareInfo {
  date: string;
  tasks: Task[];
}

const SolarPanels: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isWidgetOpen, setIsWidgetOpen] = useState(false); // Widget state
  const [userData, setUserData] = useState<UserClass>(); // User data
  const [dateNum, setDateNum] = useState(1); // User data
  const [dates, setDates] = useState<string[]>(); // User data
  const [birthDate, setBirthDate] = useState<string>("2000-01-01"); // Replace with actual birth date
  const [currentDate, setCurrentDate] = useState<string>(
    dayjs().format("YYYY-MM-DD")
  );
  const [selectedDate, setSelectedDate] = useState<string>(currentDate);
  const [taskData, setTaskData] = useState<Record<string, Task[]>>({}); // Tasks mapped by date

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

  useEffect(() => {
    focusDate();
  }, [birthDate]);

  useEffect(() => {
    const dates = [];
    for (let i = 0; i < dateNum; i++) {
      dates.push(dayjs(birthDate).add(i, "day").format("YYYY-MM-DD"));
    }
    setDates(dates);
  }, [dateNum]);

  const focusDate = () => {
    const id = calculateLifeDay(birthDate, currentDate);
    setDateNum(id);
    const targetDiv = document.getElementById(`${id}`);
    if (targetDiv) {
      targetDiv.scrollIntoView({ behavior: "smooth" }); // Smooth scrolling
    }
  };

  // Handle square click
  const handleSquareClick = (date: string) => {
    setSelectedDate(date);
    setIsWidgetOpen(true);
  };

  const handleTaskChange = (tasks: Task[]) => {
    if (selectedDate === currentDate) {
      setTaskData((prev) => ({
        ...prev,
        [currentDate]: tasks,
      }));
    } else {
      setTaskData((prev) => ({
        ...prev,
        [selectedDate]: tasks,
      }));
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

  // Get tasks for the selected date
  const selectedTasks = taskData[selectedDate] || [];

  // Loading screen
  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
        <LoadingCircle />
      </div>
    );
  }

  return (
    <div className="flex bg-black text-white">
      <div className="w-full h-screen overflow-y-auto grid grid-cols-10 p-1">
        {dates?.map((date) => {
          const id = calculateLifeDay(birthDate, date);
          return (
            // <div
            //   key={date}
            //   id={`${id}`}
            //   className={`flex flex-col items-center justify-center aspect-square ${
            //     date === currentDate
            //       ? "bg-green-800" // Highlight current date
            //       : date === selectedDate
            //       ? "bg-white text-black" // Highlight selected date
            //       : ""
            //   } cursor-pointer transition duration-200 ease-in-out hover:bg-white hover:text-black`}
            //   onClick={() => handleSquareClick(date)}
            // >
            //   <p className="">{id}</p>
            // </div>
            <LightContainer
              key={date}
              id={`${id}`}
              date={date}
              selectedDate={selectedDate}
              selectedTasks={[]}
              name={"Cube"}
              percentage={45}
              status={"OPENING"}
            />
          );
        })}
      </div>
      <div
        className="absolute bottom-0 p-5 bg-yellow-500 hover:bg-yellow-500 hover:text-white"
        onClick={focusDate}
      >
        <SunIcon className="h-10 w-10" />
      </div>
    </div>
  );
};

export default SolarPanels;
