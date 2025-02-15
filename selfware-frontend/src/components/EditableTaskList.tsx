"use client";
import React, { useEffect, useState } from "react";
import {
  ArrowUturnLeftIcon,
  CheckCircleIcon,
  CheckIcon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"; // Ensure you have Heroicons installed
import dayjs from "dayjs";
import TaskClass from "@/modules/TaskClass";
import UserClass from "@/modules/UserClass";

interface EditableTaskListProps {
  user: UserClass;
}

const EditableTaskList: React.FC<EditableTaskListProps> = ({ user }) => {
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isUpdating, setUpdating] = useState(false); // Loading state
  const [taskList, setTaskList] = useState<TaskClass[]>([]);
  const [newTaskName, setNewTaskName] = useState<string>("");
  const [newTaskDate, setNewTaskDate] = useState<string>(
    dayjs().format("YYYY-MM-DD")
  );
  const [newTaskRemarks, setNewTaskRemarks] = useState<string>("");
  const [editIndex, setEditIndex] = useState<number | null>(null); // Track which task is in edit mode

  useEffect(() => {
    getTasksByDateFromDB(newTaskDate, user.id);
  }, [newTaskDate, user.id]);

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

  const deleteTaskByIdFromDB = async (taskId: number, userId: string) => {
    try {
      // Build the query parameters
      const params = new URLSearchParams();
      params.append("taskId", taskId.toString());
      params.append("userId", userId);

      // Send DELETE request to the backend
      const res = await fetch(`/api/tasks/delete_task?${params.toString()}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Throw an error if the response is not OK
      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(errorResponse.error || "Failed to delete task");
      }

      // Return the success message
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error deleting task:", error);
      throw new Error("Failed to delete task. Please try again.");
    }
  };

  const handleTaskChange = (
    taskId: number,
    updatedTask: Partial<TaskClass>
  ) => {
    setUpdating(true);
    const index = taskList.findIndex((task) => task.id === taskId);
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
    updateTaskByIdFromDB(updatedTasks[index]);
    setTaskList(updatedTasks);
  };

  const insertNewTaskToDB = async () => {
    // Create a new task instance with a temporary placeholder ID (-1)
    const newTask = new TaskClass(
      -1, // Placeholder ID (will be updated after backend response)
      user.id, // User ID from state or props
      newTaskName, // Name of the new task
      newTaskDate, // Date of the new task
      newTaskRemarks, // Remarks for the new task
      "0%", // Default completion status
      "Failure" // Default mark (empty for initial creation)
    );

    try {
      // Make an API call to save the task on the backend
      const res = await fetch("/api/tasks/add_task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      // Assuming the backend sends back the new task ID in the response
      const data = await res.json();

      // Update the task object with the real ID from the backend
      newTask.id = data.taskId;

      // Update the task list with the new task
      const updatedTasks = [...taskList, newTask];
      setTaskList(updatedTasks);

      // Reset the form inputs for the new task
      resetNewTaskInputs();

      console.log("Task added successfully:", newTask);
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task. Please try again.");
    }
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
      setUpdating(false);
    } catch (err) {
      console.error("Error during task update:", err);
    }
  };

  const resetNewTaskInputs = () => {
    setNewTaskName("");
    setNewTaskDate(dayjs().format("YYYY-MM-DD"));
    setNewTaskRemarks("");
  };

  const clickDelete = (taskId: number) => {
    deleteTaskByIdFromDB(taskId, user.id);
    // const updatedTasks = taskList.filter((_, i) => i !== index);
    const updatedTasks = taskList.filter((task) => task.id !== taskId);

    setTaskList(updatedTasks);
  };

  const toggleEdit = (index: number) => {
    if (editIndex === index) {
      setEditIndex(null); // Toggle off edit mode
    } else {
      setEditIndex(index); // Set the task as editable
    }
  };

  return (
    <div className="text-white my-6 space-y-4">
      <div className="flex space-x-2">
        <input
          type="text"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          placeholder="Task Name"
          className="flex-grow mr-2 w-full px-4 py-2 bg-white/10 text-black placeholder-gray-300 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          value={newTaskRemarks}
          onChange={(e) => setNewTaskRemarks(e.target.value)}
          placeholder="Remarks"
          className="flex-grow mr-2 w-full px-4 py-2 bg-white/10 text-black placeholder-gray-300 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button onClick={insertNewTaskToDB} className="text-white p-2 rounded">
          <PlusIcon className="h-6 w-6" />
        </button>
      </div>
      {isLoading ? (
        <div>The data is loading</div>
      ) : (
        <>
          {taskList.length > 0 && (
            <table className="w-full border-b">
              <thead>
                <tr className="border-b">
                  {/* <th className="text-left px-4 py-2 text-white font-bold">
                    <span className="m-2 block">ID</span>
                  </th> */}
                  <th className="text-left px-4 py-2 text-white font-bold">
                    <span className="m-2 block">Name</span>
                  </th>
                  <th className="text-left px-4 py-2 text-white font-bold">
                    <span className="m-2 block">Remarks</span>
                  </th>
                  <th className="text-left px-4 py-2 text-white font-bold">
                    <span className="m-2 block">Completion</span>
                  </th>
                  <th className="text-left px-4 py-2 text-white font-bold">
                    <span className="m-2 block">Mark</span>
                  </th>
                  <th className="text-left px-4 py-2 text-white font-bold">
                    <span className="m-2 block">Actions</span>
                  </th>
                </tr>
              </thead>

              <tbody>
                {taskList.map((task) => (
                  <tr key={task.id} className="hover:bg-white/15">
                    {/* Task ID */}
                    {/* <td className="text-white px-4 py-2">
                      <span className="m-2 block">{task.id}</span>
                    </td> */}
                    <td className="text-white px-4 py-2">
                      {editIndex === task.id ? (
                        <input
                          type="text"
                          value={task.name}
                          onChange={(e) =>
                            handleTaskChange(task.id, { name: e.target.value })
                          }
                          className="w-full bg-transparent text-white m-2 block" // Set input background to transparent
                        />
                      ) : (
                        <span className="m-2 block">{task.name}</span>
                      )}
                    </td>
                    <td className="text-white px-4 py-2">
                      {editIndex === task.id ? (
                        <input
                          type="text"
                          value={task.remarks ?? ""}
                          onChange={(e) =>
                            handleTaskChange(task.id, {
                              remarks: e.target.value,
                            })
                          }
                          className="w-full bg-transparent text-white m-2 block" // Set input background to transparent
                        />
                      ) : (
                        <span className="text-xs m-2 block">{task.remarks}</span>
                      )}
                    </td>
                    {/* Task Completion Bar */}
                    <td className="text-white px-2 py-2">
                      <div className="relative bg-white/45 rounded-lg h-6 m-2 block">
                        {/* Progress Bar Filler */}
                        <div
                          className="h-6 bg-green-400 rounded-lg transition-all duration-300"
                          style={{ width: `${task.completion}` }} // Added percentage symbol
                        ></div>

                        {/* Progress Text Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-white font-bold">
                            {task.completion}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="text-white px-4 py-2">
                      <span className="m-2 block">
                        {task.mark === "Failure" ? "None" : task.mark}
                      </span>
                    </td>
                    <td className="text-white px-4 py-2">
                      {editIndex === task.id ? (
                        <>
                          {isUpdating ? (
                            <>
                              <div className="flex space-x-2">
                                <ArrowUturnLeftIcon className="h-6 w-6 text-gray-300" />

                                <TrashIcon className="h-6 w-6 text-gray-300" />
                              </div>
                            </>
                          ) : (
                            <div className="flex space-x-2 m-2 block">
                              <button onClick={() => toggleEdit(task.id)}>
                                <ArrowUturnLeftIcon className="h-6 w-6 text-blue-500" />
                              </button>
                              <button onClick={() => clickDelete(task.id)}>
                                <TrashIcon className="h-6 w-6 text-red-500" />
                              </button>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="m-2 block">
                          <button onClick={() => toggleEdit(task.id)}>
                            <PencilSquareIcon className="h-6 w-6 text-white" />
                          </button>
                        </div>
                      )}
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

export default EditableTaskList;
