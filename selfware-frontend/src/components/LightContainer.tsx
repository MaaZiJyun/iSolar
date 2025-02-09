"use client";
import React, { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline"; // Ensure you have Heroicons installed
import EditableTaskList, { Task } from "./EditableTaskList"; // Import your EditableTaskList component
import dayjs from "dayjs";
import "@/app/styles/light-container-style.css"

interface ReadOnlyTaskListProps {
  tasks: Task[];
}

const ReadOnlyTaskList: React.FC<ReadOnlyTaskListProps> = ({ tasks }) => {
  return (
    <ul>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <li key={task.id} className="mb-1">
            - {task.remarks}
          </li>
        ))
      ) : (
        <p>No tasks for this date.</p>
      )}
    </ul>
  );
};

interface LightContainerProps {
  id: string; // Unique identifier for the container
  name: string;
  percentage: number;
  status: "OPENING" | "CLOSED";
  date: string; // The date represented by this container
  selectedDate: string; // The currently selected date
  selectedTasks: any[]; // Replace with your actual task type
}

const LightContainer: React.FC<LightContainerProps> = ({
  id,
  name,
  percentage,
  status,
  date,
  selectedDate,
  selectedTasks,
}) => {
  const [isWidgetOpen, setIsWidgetOpen] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState<string>(
    dayjs().format("YYYY-MM-DD")
  );
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const handleContainerClick = () => {
    setIsWidgetOpen(true); // Open the widget when the square is clicked
  };

  // Function to determine the background classes
  const getBackgroundClass = (date: string, currentDate: string, selectedDate: string) => {
    if (date === currentDate) {
      return "opening-bg"; // Apply animation class for current date
    } else if (date === selectedDate) {
      return getColorByPercentage(percentage); // Highlight selected date
    }
    return ""; // Default case
  };

  const getColorByPercentage = (percentage: number): string => {
    if (percentage >= 100) {
      return "bg-green-500"; // Complete
    } else if (percentage >= 75) {
      return "bg-green-400"; // Almost complete
    } else if (percentage >= 50) {
      return "bg-yellow-300"; // Halfway
    } else if (percentage >= 25) {
      return "bg-orange-300"; // Making progress
    } else {
      return "bg-red-300"; // Very little progress
    }
  };

  return (
    <div>
      <div
        key={date}
        id={`${id}`}
        className={`flex flex-col items-center justify-center aspect-square ${getBackgroundClass(
          date,
          currentDate,
          selectedDate
        )} cursor-pointer transition duration-200 ease-in-out hover:bg-white hover:text-black`}
        onClick={handleContainerClick}
      >
        <p className="">{id}</p>
      </div>

      {isWidgetOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/45 backdrop-blur-sm z-50">
          <div className="bg-white/20 p-6 rounded-xl text-white shadow-lg">
            <div>
              <h2 className="text-xl font-bold mb-4">Square Information</h2>
              {selectedDate ? (
                <div>
                  <p className="mb-2">Date: {selectedDate}</p>
                  {date === currentDate ? (
                    <EditableTaskList
                      tasks={selectedTasks}
                      onChange={() => {}} // Placeholder for onChange handler
                    />
                  ) : (
                    <ReadOnlyTaskList tasks={selectedTasks} />
                  )}
                </div>
              ) : (
                <p>Select a square to see its details.</p>
              )}
            </div>
          </div>
          <button
            className="absolute top-0 mt-8 px-4 py-2 hover:text-red-500"
            onClick={() => setIsWidgetOpen(false)}
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
      )}
    </div>
  );
};

export default LightContainer;
