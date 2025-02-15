"use client"; // Enables client-side rendering for this component
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import StarBackground from "@/components/StarBackground";
import TaskClass from "@/modules/TaskClass";
import {
  Battery0Icon,
  Battery100Icon,
  Battery50Icon,
} from "@heroicons/react/24/outline";
import LoadingCircle from "@/components/LoadingCircle";
import CubeClass from "@/modules/CubeClass";

const ChatPage = () => {
  const searchParams = useSearchParams();
  const date = searchParams.get("date") || "";
  const userId = searchParams.get("userId") || "";

  const [taskList, setTaskList] = useState<TaskClass[]>([]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [messages, setMessages] = useState<
    {
      type: "Message" | "Grades" | "Marks";
      sender: "system" | "user";
      text: string;
    }[]
  >([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // const ts = fetchTasks("1", "2");
    getTasksByDateFromDB(date, userId);
    // setTaskList(ts);
  }, [userId, date]);

  const getTasksByDateFromDB = async (date: string, userId: string) => {
    try {
      // Construct the query parameters
      const queryParams = new URLSearchParams({
        date, // Task date
        userId, // User ID
      });

      // Make the GET request
      const res = await fetch(`/api/tasks/get_task?${queryParams.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Handle non-OK responses
      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(errorResponse.error || "Failed to fetch tasks");
      }

      // Parse and return the results
      const data = await res.json();
      // console.log(data);
      // Convert each task object into an instance of TaskClass
      const tasks = data.map((task: any) => {
        return new TaskClass(
          task.id, // Task ID
          task.user_id, // User ID
          task.name, // Task name
          task.date, // Task date
          task.remarks, // Remarks
          task.completion, // Completion percentage
          task.mark // Mark
        );
      });

      // Set the task list state with the TaskClass instances
      setTaskList(tasks);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching tasks by date:", error);
      throw new Error("Failed to fetch tasks by date. Please try again.");
    }
  };

  useEffect(() => {
    if (taskList.length !== 0) {
      setMessages([
        {
          type: "Message",
          sender: "system",
          text: `Hello ~`,
        },
        {
          type: "Message",
          sender: "system",
          text: `Ready for review today?`,
        },
      ]);
      askForGrade(currentTaskIndex);
    } else {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          type: "Message",
          sender: "system",
          text: `You don't have any plans today.`,
        },
      ]);
    }
  }, [isLoading]);

  const askForGrade = (currentTaskIndex: number) => {
    if (currentTaskIndex < taskList.length) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          type: "Grades",
          sender: "system",
          text: `How's Progress of the Task ${currentTaskIndex + 1}: ${
            taskList[currentTaskIndex].name
          }?`,
        },
      ]);
    } else {
      addCube();
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          type: "Message",
          sender: "system",
          text: `You are all done!! (${currentTaskIndex}/${taskList.length})`,
        },
      ]);
    }
  };
  const askForMark = (currentTaskIndex: number) => {
    if (currentTaskIndex < taskList.length) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          type: "Marks",
          sender: "system",
          text: `How would you rate Task ${currentTaskIndex + 1}: ${
            taskList[currentTaskIndex].name
          }?`,
        },
      ]);
    } else {
      addCube();
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          type: "Message",
          sender: "system",
          text: `You are all done!! (${currentTaskIndex}/${taskList.length})`,
        },
      ]);
    }
  };

  const handleGrade = (grade: number) => {
    const updatedTasks = [...taskList];
    const existingTask = updatedTasks[currentTaskIndex];
    updatedTasks[currentTaskIndex] = new TaskClass(
      existingTask.id,
      existingTask.userId,
      existingTask.name,
      existingTask.date,
      existingTask.remarks,
      grade ? (`${grade}%` as "0%" | "50%" | "100%") : existingTask.completion,
      grade === 0 ? "Pass" : existingTask.mark
    );
    updateTaskByIdFromDB(updatedTasks[currentTaskIndex]);
    setTaskList(updatedTasks);
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        type: "Message",
        sender: "user",
        text: `Completed ${grade}% of the Task ${currentTaskIndex + 1}.`,
      },
    ]);
    // Update the current task index correctly
    // setCurrentTaskIndex((prevIndex) => {
    //   const newIndex = prevIndex + 1;
    //   // Ask for the next task's grade after updating the index
    //   askForGrade(newIndex); // Pass the new index if needed
    //   return newIndex;
    // });
    askForMark(currentTaskIndex)
  };
  const handleMark = (mark: number) => {
    const resultMap = new Map<number, string>([
      [1, "Failure"],
      [2, "Pass"],
      [3, "Satisfactory"],
      [4, "Good"],
      [5, "Excellent"],
    ]);
    const updatedTasks = [...taskList];
    const existingTask = updatedTasks[currentTaskIndex];
    updatedTasks[currentTaskIndex] = new TaskClass(
      existingTask.id,
      existingTask.userId,
      existingTask.name,
      existingTask.date,
      existingTask.remarks,
      existingTask.completion,
      resultMap.get(mark) as "" | "Failure" | "Pass" | "Satisfactory" | "Good" | "Excellent" || existingTask.mark
    );
    updateTaskByIdFromDB(updatedTasks[currentTaskIndex]);
    setTaskList(updatedTasks);
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        type: "Message",
        sender: "user",
        text: `Rated Task ${currentTaskIndex + 1} as ${resultMap.get(mark)}.`,
      },
    ]);
    // Update the current task index correctly
    setCurrentTaskIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      // Ask for the next task's grade after updating the index
      askForGrade(newIndex); // Pass the new index if needed
      return newIndex;
    });
  };

  const updateTaskByIdFromDB = async (updatedTask: TaskClass) => {
    try {
      // Send the PUT request to the update API
      const response = await fetch("/api/tasks/update_task", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });
      // Parse the response
      const data = await response.json();

      if (!response.ok) {
        // Handle error from the API if the update wasn't successful
        console.error("Error updating task:", data.error);
        return;
      }
      // setUpdating(false);
    } catch (err) {
      console.error("Error during task update:", err);
    }
  };

  const handleSendMessage = (): void => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        type: "Message",
        sender: "user",
        text: input,
      },
    ]);
    setInput(""); // Clear input after sending
    askForGrade(currentTaskIndex);
  };

  const getPercentage = (tasklist: TaskClass[]): number => {
    try {
      // Convert completion strings to numbers and calculate the total percentage
      var totalPercentage = 0;
      tasklist.forEach((t) => {
        totalPercentage += parseInt(t.completion.replace("%", ""), 10);
      });
      const averagePercentage = totalPercentage / tasklist.length;
      console.log(
        `${averagePercentage} = ${totalPercentage} / ${tasklist.length}`
      );

      // Return the average percentage as a properly formatted string (e.g., "60%")
      return averagePercentage;
    } catch (error: any) {
      console.error("Error calculating average percentage:", error.message);
      throw error; // Re-throw the error for handling if needed
    }
  };

  const addCube = async () => {
    const percentage = getPercentage(taskList);
    const newCube = new CubeClass(
      -1,
      userId,
      `CUBE-${userId}-${date}`,
      date,
      percentage,
      "CLOSED"
    );
    try {
      // Define the API endpoint
      const endpoint = "/api/cube/add_cube"; // Update with your API endpoint if different

      // Make the POST request to add the cube
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCube), // Send cube data as JSON
      });

      // Check if the response is successful
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add the cube");
      }

      // Parse the JSON response
      const data = await response.json();

      // Handle success
      console.log("Cube added successfully:", data);
      return data; // Return the response data (e.g., cubeId)
    } catch (error: any) {
      // Handle errors
      // console.error("Error adding cube:", error.message);
      // throw error; // Re-throw to allow further handling if needed
      updateCube();
    }
  };

  const getCubesByDate = async (date: string): Promise<CubeClass> => {
    const parsedDate = new Date(date);
    const year = parsedDate.getFullYear(); // Output: 2023
    const month = (parsedDate.getMonth() + 1) // Output: 10 (Month is zero-based, so +1 is needed)
      .toString() // Optional: Convert to string
      .padStart(2, "0"); // Optional: Ensure 2-digit format like "01", "02", etc.
    const day = parsedDate
      .getDate() // Output: 15
      .toString() // Optional
      .padStart(2, "0");
    try {
      // Build the query URL with the date string
      const url = `/api/cube/get_cube?year=${year}&month=${month}&day=${day}`;

      // Make the GET request to the API
      const response = await fetch(url, {
        method: "GET",
      });

      // Check if the response is okay
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch cubes");
      }

      // Parse the JSON data from the API response
      const { data } = await response.json();

      const cube = CubeClass.fromJson(data[0]);

      // Return the cube data
      return cube;
    } catch (error: any) {
      console.error("Error fetching cubes:", error.message);
      throw error; // Re-throw the error for external handling
    }
  };

  const updateCube = async () => {
    try {
      // Find the index of the task to update
      const newPercentage = getPercentage(taskList);
      const cube = await getCubesByDate(date);
      if (!cube) {
        throw new Error("Failed to update cube");
      }
      const updatedCube = new CubeClass(
        cube.id,
        cube.userId,
        cube.name,
        cube.date,
        newPercentage,
        cube.status
      );
      // console.log(cube);

      const response = await fetch("/api/cube/update_cube", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCube), // Convert object to JSON string
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update cube");
      }

      const data = await response.json();
      console.log("Cube updated successfully:", data.message);
    } catch (error: any) {
      console.error("Error updating task:", error.message);
      throw error; // Re-throw the error for handling if needed
    }
  };

  // Loading screen
  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
        <StarBackground />
        <LoadingCircle />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <StarBackground />
      <div className="w-2/3 flex flex-col justify-between h-screen">
        {/* Chat Body */}
        <div className="w-full h-full my-32 overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === "system" ? "justify-start" : "justify-end"
              } mb-4`}
            >
              <div
                className={`rounded-lg px-4 py-2 ${
                  message.sender === "system"
                    ? "bg-white/40 text-gray-200"
                    : "bg-white/80 text-black"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          {/* Render grading buttons if the message type is "Grades" */}
          {messages.length > 0 &&
            messages[messages.length - 1].type === "Grades" && (
              <div className=" mt-4 ">
                <div className="flex items-center justify-center text-lg mt-4">
                  <div className="px-4">Select the battery as your effort:</div>
                </div>
                <div className="flex items-center justify-center">
                  <button
                    onClick={() => handleGrade(0)}
                    className="text-red-500 px-4 py-2 rounded-lg mr-2"
                  >
                    <Battery0Icon className="h-10 w-10" />
                  </button>
                  <button
                    onClick={() => handleGrade(50)}
                    className="text-yellow-500 px-4 py-2 rounded-lg mr-2"
                  >
                    <Battery50Icon className="h-10 w-10" />
                  </button>
                  <button
                    onClick={() => handleGrade(100)}
                    className="text-green-500 px-4 py-2 rounded-lg"
                  >
                    <Battery100Icon className="h-10 w-10" />
                  </button>
                </div>
              </div>
            )}
          {/* Render grading buttons if the message type is "Grades" */}
          {messages.length > 0 &&
            messages[messages.length - 1].type === "Marks" && (
              <div className=" mt-4 ">
                <div className="flex items-center justify-center text-lg mt-4">
                  <div className="px-4">Evaluate your Mark:</div>
                </div>
                <div className="flex text-3xl space-x-4 items-center justify-center">
                  <button
                    onClick={() => handleMark(5)}
                    className="text-red-500 px-4 py-2 rounded-lg"
                  >
                    A
                  </button>
                  <button
                    onClick={() => handleMark(4)}
                    className="text-yellow-500 px-4 py-2 rounded-lg"
                  >
                    B
                  </button>
                  <button
                    onClick={() => handleMark(3)}
                    className="text-green-500 px-4 py-2 rounded-lg"
                  >
                    C
                  </button>
                  <button
                    onClick={() => handleMark(2)}
                    className="text-blue-500 px-4 py-2 rounded-lg"
                  >
                    D
                  </button>
                  <button
                    onClick={() => handleMark(1)}
                    className="text-purple-500 px-4 py-2 rounded-lg"
                  >
                    F
                  </button>
                </div>
              </div>
            )}
        </div>

        {/* Chat Input
        <div className="flex w-full p-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your message..."
            className="flex-1 bg-white/15 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={() => handleSendMessage()}
            className="ml-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Send
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ChatPage;
