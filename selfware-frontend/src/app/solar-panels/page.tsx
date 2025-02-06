"use client";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs"; // For date manipulation

interface EditableTaskListProps {
  tasks: Task[];
  onChange: (tasks: Task[]) => void;
}

const EditableTaskList: React.FC<EditableTaskListProps> = ({
  tasks,
  onChange,
}) => {
  const [taskList, setTaskList] = useState<Task[]>(tasks);

  const handleTaskChange = (index: number, newDescription: string) => {
    const updatedTasks = [...taskList];
    updatedTasks[index].description = newDescription;
    setTaskList(updatedTasks);
    onChange(updatedTasks);
  };

  const handleAddTask = () => {
    const newTask: Task = { id: Date.now(), description: "" };
    const updatedTasks = [...taskList, newTask];
    setTaskList(updatedTasks);
    onChange(updatedTasks);
  };

  const handleDeleteTask = (index: number) => {
    const updatedTasks = taskList.filter((_, i) => i !== index);
    setTaskList(updatedTasks);
    onChange(updatedTasks);
  };

  return (
    <div>
      {taskList.map((task, index) => (
        <div key={task.id} className="flex items-center mb-2">
          <input
            type="text"
            value={task.description}
            onChange={(e) => handleTaskChange(index, e.target.value)}
            className="border p-1 flex-grow mr-2"
          />
          <button
            onClick={() => handleDeleteTask(index)}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}
      <button
        onClick={handleAddTask}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Task
      </button>
    </div>
  );
};

interface ReadOnlyTaskListProps {
  tasks: Task[];
}

const ReadOnlyTaskList: React.FC<ReadOnlyTaskListProps> = ({ tasks }) => {
  return (
    <ul>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <li key={task.id} className="mb-1">
            - {task.description}
          </li>
        ))
      ) : (
        <p>No tasks for this date.</p>
      )}
    </ul>
  );
};

interface Task {
  id: number;
  description: string;
}

interface SquareInfo {
  date: string;
  tasks: Task[];
}

const SolarPanels: React.FC = () => {
  const [birthDate, setBirthDate] = useState<string>("2000-01-01"); // Replace with actual birth date
  const [currentDate, setCurrentDate] = useState<string>(
    dayjs().format("YYYY-MM-DD")
  );
  const [selectedDate, setSelectedDate] = useState<string>(currentDate);
  const [taskData, setTaskData] = useState<Record<string, Task[]>>({}); // Tasks mapped by date

  // Generate 1000 dates starting from the birth date
  const generateDates = () => {
    const dates = [];
    for (let i = 0; i < 30000; i++) {
      dates.push(dayjs(birthDate).add(i, "day").format("YYYY-MM-DD"));
    }
    return dates;
  };

  const dates = generateDates();

  // Handle square click
  const handleSquareClick = (date: string) => {
    setSelectedDate(date);
  };

  // Handle task changes for the current date
  const handleTaskChange = (newTasks: Task[]) => {
    if (selectedDate === currentDate) {
      setTaskData((prev) => ({
        ...prev,
        [currentDate]: newTasks,
      }));
    }
  };

  // Get tasks for the selected date
  const selectedTasks = taskData[selectedDate] || [];

  return (
    <div className="flex h-screen px-6 py-24 bg-black">
      {/* Left Section: Scrollable Grid with Black Background */}
      <div className="w-full h-full overflow-y-auto grid grid-cols-100 p-1">
        {dates.map((date) => (
          <div
            key={date}
            className={`aspect-square bg-white ${
              date === currentDate
                ? "bg-green-500" // Highlight current date
                : date === selectedDate
                ? "bg-green-500" // Highlight selected date
                : "opacity-20"
            } cursor-pointer transition duration-200 ease-in-out hover:bg-white`}
            onClick={() => handleSquareClick(date)}
          ></div>
        ))}
      </div>

      {/* Right Section: Info Panel */}
      <div className="w-1/4 text-white p-4 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Square Information</h2>
        {selectedDate ? (
          <div>
            <p className="mb-2">Date: {selectedDate}</p>
            <h3 className="text-lg font-semibold mb-2">Tasks:</h3>
            {selectedDate === currentDate ? (
              <EditableTaskList
                tasks={selectedTasks}
                onChange={handleTaskChange}
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
  );
};

export default SolarPanels;
