"use client";
import React, { useEffect, useState } from "react";
import {
  ArrowDownTrayIcon,
  ArrowUturnLeftIcon,
  Battery0Icon,
  Battery100Icon,
  Battery50Icon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import TaskClass from "@/modules/TaskClass";
import UserClass from "@/modules/UserClass";

interface TaskListProps {
  user: UserClass;
  date?: string;
  editable?: boolean;
  showHeader?: boolean;
  height?: string;
}

const TaskList: React.FC<TaskListProps> = ({
  user,
  date = dayjs().format("YYYY-MM-DD"),
  editable = false,
  showHeader = true,
  height = "h-96",
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setUpdating] = useState(false);
  const [taskList, setTaskList] = useState<TaskClass[]>([]);
  const [newTaskName, setNewTaskName] = useState<string>("");
  const [newTaskDate, setNewTaskDate] = useState<string>(date);
  const [newTaskRemarks, setNewTaskRemarks] = useState<string>("");
  const [editIndex, setEditIndex] = useState<number | null>(null);

  interface NewTask {
    name: string;
    remarks: string;
  }

  const dailyTaskList: NewTask[] = [
    { name: "Eat on time", remarks: "Including breakfast, lunch and dinner" },
    { name: "Sleep on time", remarks: "Sleep and wake up early" },
    {
      name: "Drinking Water",
      remarks: "At least 8 cups of water need to be consumed daily",
    },
    { name: "Studying", remarks: "Learn something new everyday" },
    { name: "Communication", remarks: "Talk to people around" },
    { name: "Reading", remarks: "Read books or papers" },
    { name: "Violin", remarks: "Need to practice playing violin everyday" },
    { name: "Exercise", remarks: "Need to do exercise" },
    { name: "Writing", remarks: "Write down the ideas and thought for today" },
    { name: "Reflection", remarks: "Review what you have done today" },
  ];

  useEffect(() => {
    getTasksByDateFromDB(newTaskDate, user.id);
  }, [newTaskDate, user.id]);

  const importFrequentTaskList = async (list: NewTask[]) => {
    setIsLoading(true);
    const newTasks: TaskClass[] = [];
    await Promise.all(
      list.map(async (task) => {
        if (task.name && task.remarks) {
          const resTask = await insertNewTaskToDB(task.name, task.remarks);
          if (resTask) {
            newTasks.push(resTask);
          }
        }
      })
    );
    const updateTasks: TaskClass[] = [...taskList, ...newTasks];
    setTaskList(updateTasks);
    setIsLoading(false);
  };

  const submitNewTaskList = async (name: string, remarks: string) => {
    setIsLoading(true);
    const newTask = await insertNewTaskToDB(name, remarks);
    if (newTask) {
      const updatedTasks = [...taskList, newTask];
      setTaskList(updatedTasks);
    }
    resetNewTaskInputs();
    setIsLoading(false);
  };

  const getTasksByDateFromDB = async (date: string, userId: string) => {
    try {
      const queryParams = new URLSearchParams({ date, userId });
      const res = await fetch(`/api/tasks/get_task?${queryParams.toString()}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(errorResponse.error || "Failed to fetch tasks");
      }

      const data = await res.json();
      const tasks = data.map((task: any) => {
        return new TaskClass(
          task.id,
          task.user_id,
          task.name,
          task.date,
          task.remarks,
          task.completion,
          task.mark
        );
      });

      setTaskList(tasks);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching tasks by date:", error);
      throw new Error("Failed to fetch tasks by date. Please try again.");
    }
  };

  const deleteTaskByIdFromDB = async (taskId: number, userId: string) => {
    try {
      const params = new URLSearchParams();
      params.append("taskId", taskId.toString());
      params.append("userId", userId);

      const res = await fetch(`/api/tasks/delete_task?${params.toString()}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(errorResponse.error || "Failed to delete task");
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error deleting task:", error);
      throw new Error("Failed to delete task. Please try again.");
    }
  };

  const handleTaskChange = (taskId: number, updatedTask: Partial<TaskClass>) => {
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
      "completion" in updatedTask ? updatedTask.completion! : existingTask.completion,
      "mark" in updatedTask ? updatedTask.mark! : existingTask.mark
    );
    updateTaskByIdFromDB(updatedTasks[index]);
    setTaskList(updatedTasks);
  };

  const insertNewTaskToDB = async (
    newTaskName: string,
    newTaskRemarks: string
  ): Promise<TaskClass | undefined> => {
    const newTask = new TaskClass(
      -1,
      user.id,
      newTaskName,
      newTaskDate,
      newTaskRemarks,
      "0%",
      "Failure"
    );

    try {
      const res = await fetch("/api/tasks/add_task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });

      const data = await res.json();
      newTask.id = data.taskId;
      return newTask;
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task. Please try again.");
    }
  };

  const updateTaskByIdFromDB = async (updatedTask: TaskClass) => {
    try {
      const response = await fetch("/api/tasks/update_task", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });
      const data = await response.json();

      if (!response.ok) {
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
    setNewTaskRemarks("");
  };

  const clickDelete = (taskId: number) => {
    deleteTaskByIdFromDB(taskId, user.id);
    const updatedTasks = taskList.filter((task) => task.id !== taskId);
    setTaskList(updatedTasks);
  };

  const toggleEdit = (index: number) => {
    if (editIndex === index) {
      setEditIndex(null);
    } else {
      setEditIndex(index);
    }
  };

  return (
    <div className="my-6 space-y-4">
      {editable && showHeader && (
        <div className="flex items-center justify-center space-x-2">
          <div className="flex-grow">
            <label htmlFor="newTaskName" className="text-sm">
              Task Title
            </label>
            <input
              type="text"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
              className="bg-black-white-50 mr-2 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="flex-grow">
            <label htmlFor="newTaskName" className="text-sm">
              Remarks
            </label>
            <input
              type="text"
              value={newTaskRemarks}
              onChange={(e) => setNewTaskRemarks(e.target.value)}
              className="bg-black-white-50 mr-2 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="flex items-center justify-center">
            {isLoading ? (
              <>
                <div className="p-2 rounded text-gray-300">
                  <PlusIcon className="h-6 w-6" />
                  <label htmlFor="newTaskName" className="text-sm">
                    Add
                  </label>
                </div>
                {taskList.length < 1 && (
                  <div className="p-2 rounded text-gray-300">
                    <ArrowDownTrayIcon className="h-6 w-6" />
                    <label htmlFor="newTaskName" className="text-sm">
                      Import
                    </label>
                  </div>
                )}
              </>
            ) : (
              <>
                <button
                  onClick={() => submitNewTaskList(newTaskName, newTaskRemarks)}
                  className="p-2 rounded"
                >
                  <PlusIcon className="h-6 w-6" />
                  <label htmlFor="newTaskName" className="text-sm">
                    Add
                  </label>
                </button>
                {taskList.length < 1 && (
                  <button
                    onClick={() => importFrequentTaskList(dailyTaskList)}
                    className="p-2 rounded"
                  >
                    <ArrowDownTrayIcon className="h-6 w-6" />
                    <label htmlFor="newTaskName" className="text-sm">
                      Import
                    </label>
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}

      <div className={`${height} overflow-y-auto`}>
        {isLoading ? (
          <div className="flex w-full h-full items-center justify-center text-lg">
            Loading
          </div>
        ) : (
          <>
            {taskList.length < 1 ? (
              <div className="flex w-full h-full items-center justify-center text-lg">
                {editable ? "Haven't plan anything yet UwU" : "There is nothing left UwU"}
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
                    {editable && (
                      <th className="text-left px-4 py-2 font-bold">
                        <span className="m-2 block">Actions</span>
                      </th>
                    )}
                  </tr>
                </thead>

                <tbody>
                  {taskList.map((task) => (
                    <tr key={task.id} className={`hover:bg-white/15 ${!editable && task.mark === 'Failure' ? 'text-red-500' : ''}`}>
                      <td className="px-4 py-2">
                        {editable && editIndex === task.id ? (
                          <input
                            type="text"
                            value={task.name}
                            onChange={(e) =>
                              handleTaskChange(task.id, { name: e.target.value })
                            }
                            className="w-full bg-transparent m-2 block"
                          />
                        ) : (
                          <span className="m-2 block">{task.name}</span>
                        )}
                      </td>
                      <td className="px-4 py-2 text-xs">
                        {editable && editIndex === task.id ? (
                          <input
                            type="text"
                            value={task.remarks ?? ""}
                            onChange={(e) =>
                              handleTaskChange(task.id, { remarks: e.target.value })
                            }
                            className="w-full bg-transparent m-2 block"
                          />
                        ) : (
                          <span className="m-2 block">{task.remarks}</span>
                        )}
                      </td>

                      <td className="px-4 py-2">
                        {editable && editIndex === task.id ? (
                          <div className="flex w-full space-x-2 m-2">
                            <button
                              className="hover:text-red-500"
                              onClick={() => {
                                handleTaskChange(task.id, { completion: "0%" });
                                setEditIndex(null);
                              }}
                            >
                              <Battery0Icon className="h-6 w-6" />
                            </button>
                            <button
                              className="hover:text-yellow-500"
                              onClick={() => {
                                handleTaskChange(task.id, { completion: "50%" });
                                setEditIndex(null);
                              }}
                            >
                              <Battery50Icon className="h-6 w-6" />
                            </button>
                            <button
                              className="hover:text-green-500"
                              onClick={() => {
                                handleTaskChange(task.id, { completion: "100%" });
                                setEditIndex(null);
                              }}
                            >
                              <Battery100Icon className="h-6 w-6" />
                            </button>
                          </div>
                        ) : (
                          <div className="relative bg-black-white-50 rounded-lg h-6 m-2 block">
                            <div
                              className="h-6 bg-yellow-500 rounded-lg transition-all duration-300"
                              style={{ width: `${task.completion}` }}
                            ></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="font-bold">{task.completion}</span>
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-2">
                        <span className="m-2 block">
                          {editable ? (task.mark === "Failure" ? "None" : task.mark) : task.mark}
                        </span>
                      </td>
                      {editable && (
                        <td className="px-4 py-2">
                          {editIndex === task.id ? (
                            <>
                              {isUpdating ? (
                                <div className="flex space-x-2">
                                  <ArrowUturnLeftIcon className="h-6 w-6" />
                                  <TrashIcon className="h-6 w-6" />
                                </div>
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
                                <PencilSquareIcon className="h-6 w-6" />
                              </button>
                            </div>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TaskList;