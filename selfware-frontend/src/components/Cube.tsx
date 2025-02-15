"use client";
import React, { useEffect, useState } from "react";
import { EyeIcon, LightBulbIcon, XMarkIcon } from "@heroicons/react/24/outline"; // Ensure you have Heroicons installed
import dayjs from "dayjs";
import "@/app/styles/light-container-style.css";
import CubeClass from "@/modules/CubeClass";
import EditableTaskList from "./EditableTaskList";
import UserClass from "@/modules/UserClass";
import ReadOnlyTaskList from "./ReadOnlyTaskList";
import TaskClass from "@/modules/TaskClass";
import { useRouter } from "next/navigation";

interface CubeProps {
  order: number;
  user: UserClass;
  cube: CubeClass; // Unique identifier for the container
}

const Cube: React.FC<CubeProps> = ({ order: key, user, cube }) => {
  const [isWidgetOpen, setIsWidgetOpen] = useState<boolean>(false);
  const [isWidgetHover, setIsWidgetHover] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState<string>(
    dayjs().format("YYYY-MM-DD")
  );
  const router = useRouter();

  const handleRedirect = () => {
    // Redirect to the chat page with date and userId as query parameters
    router.push(
      `/chat?date=${encodeURIComponent(cube.date)}&userId=${encodeURIComponent(
        user.id
      )}`
    );
  };

  // Function to determine the background classes
  const getBackgroundClass = (date: string, currentDate: string) => {
    if (date === currentDate && cube.percentage === 0) {
      return "opening-bg"; // Apply animation class for current date
    } else {
      return getColorByPercentage(cube.percentage); // Highlight selected date
    }
  };

  const getColorByPercentage = (percentage: number): string => {
    if (percentage >= 75) {
      return "bg-green-500/20"; // Almost complete
    } else if (percentage >= 50) {
      return "bg-yellow-500/20"; // Halfway
    } else if (percentage >= 25) {
      return "bg-orange-500/20"; // Making progress
    } else {
      return "bg-red-500/20"; // Very little progress
    }
  };

  if (cube) {
    return (
      <>
        <div
          id={`${key}`}
          className={`flex flex-col items-center justify-center aspect-square ${getBackgroundClass(
            cube.date,
            currentDate
          )} cursor-pointer transition duration-200 ease-in-out hover:bg-white/60 hover:text-black`}
          onClick={() => setIsWidgetOpen(true)}
        >
          <p className="text-6xl">
            {cube.percentage}
            <span className="text-sm">%</span>
          </p>
          <p className="text-xs">{cube.date}</p>
        </div>
        {isWidgetOpen && (
          <div className="fixed h-full w-full inset-0 flex items-center justify-center bg-black/45 backdrop-blur-sm">
            <div className="w-2/3 bg-white/20 backdrop-blur-md p-6 rounded-xl text-white shadow-lg">
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-4xl font-bold mb-4">
                      Energy Efficiency
                    </h2>
                    <p className="mb-2">Date: {cube.date}</p>
                  </div>
                  <div className="space-x-4">
                    {cube.date === currentDate && (
                      <button onClick={handleRedirect}>
                        <div className="border-2 rounded-xl p-2 hover:text-yellow-500 hover:border-yellow-500">
                          <LightBulbIcon className="h-10 w-10 " />
                        </div>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        console.log("asda");
                        setIsWidgetOpen(false);
                      }}
                    >
                      <div className="border-2 rounded-xl p-2 hover:text-red-500 hover:border-red-500">
                        <XMarkIcon className="h-10 w-10" />
                      </div>
                    </button>
                  </div>
                </div>

                <div>
                  {cube.date === currentDate ? (
                    <EditableTaskList user={user} />
                  ) : (
                    <ReadOnlyTaskList user={user} date={cube.date} />
                  )}
                  {/* <div>{cube.percentage}</div> */}
                  <div className="relative bg-white/20 rounded-lg h-6 m-2 block">
                    {/* Progress Bar Filler */}
                    <div
                      className="h-6 bg-white/45 rounded-lg transition-all duration-300"
                      style={{ width: `${cube.percentage}%` }} // Added percentage symbol
                    ></div>

                    {/* Progress Text Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-bold">
                        {cube.percentage}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  } else return <></>;
};

export default Cube;
