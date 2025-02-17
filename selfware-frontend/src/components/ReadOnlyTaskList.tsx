"use client";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import TaskClass from "@/modules/TaskClass";
import UserClass from "@/modules/UserClass";

interface ReadOnlyTaskListProps {
  user: UserClass;
  date: string;
}

const ReadOnlyTaskList: React.FC<ReadOnlyTaskListProps> = ({ user, date }) => {
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [taskList, setTaskList] = useState<TaskClass[]>([]);
  const [taskDate, setTaskDate] = useState<string>(date);

  useEffect(() => {
    getTasksByDate(taskDate, user.id);
  }, [taskDate, user.id]);

  const getTasksByDate = async (date: string, userId: string) => {
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

  const handleTaskChange = (index: number, updatedTask: Partial<TaskClass>) => {
    const updatedTasks = [...taskList];
    const existingTask = updatedTasks[index];
    updatedTasks[index] = new TaskClass(
      existingTask.id,
      existingTask.userId,
      "name" in updatedTask ? updatedTask.name! : existingTask.name,
      "date" in updatedTask ? updatedTask.date! : existingTask.date,
      "remarks" in updatedTask ? updatedTask.remarks! : existingTask.remarks,
      "completion" in updatedTask
        ? updatedTask.completion!
        : existingTask.completion,
      "mark" in updatedTask ? updatedTask.mark! : existingTask.mark
    );
    setTaskList(updatedTasks);
  };

  return (
    <div className=" h-96 overflow-y-auto">
      {isLoading ? (
        <div>The data is loading</div>
      ) : (
        <>
          {taskList.length < 1 ? (
            <div className="flex items-center justify-center text-lg">
              You wasted your life
            </div>
          ) : (
            <table className="w-full border-b">
              <thead>
                <tr className="border-b">
                  <th className="text-left px-4 py-2 font-bold">
                    <span className="m-2 block">Name</span>
                  </th>
                  <th className="text-left px-4 py-2 font-bold">
                    <span className="m-2 block">Remarks</span>
                  </th>
                  <th className="text-left px-4 py-2 font-bold">
                    <span className="m-2 block">Completion</span>
                  </th>
                  <th className="text-left px-4 py-2 font-bold">
                    <span className="m-2 block">Mark</span>
                  </th>
                </tr>
              </thead>

              <tbody>
                {taskList.map((task) => (
                  <tr key={task.id} className="hover:bg-white/15">
                    <td className="px-4 py-2">
                      <span className="m-2 block">{task.name}</span>
                    </td>
                    <td className="px-4 py-2">
                      <span className="text-xs m-2 block">{task.remarks}</span>
                    </td>
                    {/* Task Completion Bar */}

                    <td className="px-4 py-2">
                      <div className="relative bg-black-white-50 rounded-lg h-6 m-2 block">
                        {/* Progress Bar Filler */}
                        <div
                          className="h-6 bg-yellow-500 rounded-lg transition-all duration-300"
                          style={{ width: `${task.completion}` }} // Added percentage symbol
                        ></div>

                        {/* Progress Text Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="font-bold">{task.completion}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <span className="m-2 block">
                        {task.mark === "Failure" ? "None" : task.mark}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default ReadOnlyTaskList;
