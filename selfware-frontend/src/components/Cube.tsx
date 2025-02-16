"use client";
import React, { useEffect, useState } from "react";
import {
  EyeIcon,
  FaceFrownIcon,
  FaceSmileIcon,
  LightBulbIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"; // Ensure you have Heroicons installed
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
      return "text-green-500"; // Almost complete
    } else if (percentage >= 50) {
      return "text-yellow-500"; // Halfway
    } else if (percentage >= 25) {
      return "text-orange-500"; // Making progress
    } else {
      return "text-red-500"; // Very little progress
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
          {cube.date === currentDate ? (
            <div className="flex flex-col items-center">
              <p className="text-4xl">
                {cube.percentage.toFixed(1)}
                <span className="text-sm">%</span>
              </p>
              <p className="text-xs">{cube.date}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center opacity-45">
              {cube.id === -1 ? (
                <>
                  <p className="text-3xl">EMPTY</p>
                  <p className="text-xs">{cube.date}</p>
                </>
              ) : (
                <>
                  <p className="text-4xl">
                    {cube.percentage.toFixed(1)}
                    <span className="text-sm">%</span>
                  </p>
                  <p className="text-xs">{cube.date}</p>
                </>
              )}
            </div>
          )}
        </div>
        {isWidgetOpen && (
          <div className="bg-black-white-10 fixed h-full w-full inset-0 flex items-center justify-center backdrop-blur-sm z-50">
            <div className="w-2/3 bg-white/20 backdrop-blur-md p-6 rounded-xl shadow-lg">
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-4xl font-bold mb-2">
                      Energy Efficiency
                    </h2>
                    <p className="mb-2">{cube.date}</p>
                  </div>
                  <div className="space-x-4 mb-2">
                    {cube.date === currentDate && (
                      <button onClick={handleRedirect}>
                        <div className="rounded-xl p-2 hover:text-yellow-500 hover:border-yellow-500">
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
                      <div className="rounded-xl p-2 hover:text-red-500 hover:border-red-500">
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
                  <div className="relative bg-black-white-10 rounded-lg h-6 m-2 block">
                    {/* Progress Bar Filler */}
                    <div
                      className="h-6 bg-yellow-500 rounded-lg transition-all duration-300"
                      style={{ width: `${cube.percentage}%` }} // Added percentage symbol
                    ></div>

                    {/* Progress Text Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-bold">
                        {cube.percentage.toFixed(2)}%
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
