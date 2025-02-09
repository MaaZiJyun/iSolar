"use client";
import React, { useState } from "react";
import {
    CheckCircleIcon,
  CheckIcon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"; // Ensure you have Heroicons installed
import dayjs from "dayjs";

export interface Task {
  id: number;
  name: string;
  date: string;
  remarks: string;
  completion: "0%" | "50%" | "100%";
}

interface EditableTaskListProps {
  tasks: Task[];
  onChange: (tasks: Task[]) => void;
}

const EditableTaskList: React.FC<EditableTaskListProps> = ({
  tasks,
  onChange,
}) => {
  const [taskList, setTaskList] = useState<Task[]>(tasks);
  const [newTaskName, setNewTaskName] = useState<string>("");
  const [newTaskDate, setNewTaskDate] = useState<string>(
    dayjs().format("YYYY-MM-DD")
  );
  const [newTaskRemarks, setNewTaskRemarks] = useState<string>("");
  const [editIndex, setEditIndex] = useState<number | null>(null); // Track which task is in edit mode

  const handleTaskChange = (index: number, updatedTask: Partial<Task>) => {
    const updatedTasks = [...taskList];
    updatedTasks[index] = { ...updatedTasks[index], ...updatedTask };
    setTaskList(updatedTasks);
    onChange(updatedTasks);
  };

  const handleAddTask = () => {
    const newTask: Task = {
      id: Date.now(),
      name: newTaskName,
      date: newTaskDate,
      remarks: newTaskRemarks,
      completion: "0%",
    };
    const updatedTasks = [...taskList, newTask];
    setTaskList(updatedTasks);
    onChange(updatedTasks);
    resetNewTaskInputs();
  };

  const resetNewTaskInputs = () => {
    setNewTaskName("");
    setNewTaskDate(dayjs().format("YYYY-MM-DD"));
    setNewTaskRemarks("");
  };

  const handleDeleteTask = (index: number) => {
    const updatedTasks = taskList.filter((_, i) => i !== index);
    setTaskList(updatedTasks);
    onChange(updatedTasks);
  };

  const handleThinking = (index: number) => {
    const completion = prompt("Update completion percentage (0%, 50%, 100%)");
    if (completion === "0%" || completion === "50%" || completion === "100%") {
      handleTaskChange(index, { completion });
    } else {
      alert("Invalid input. Please enter 0%, 50%, or 100%.");
    }
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
        <button
          onClick={handleAddTask}
          className="text-white p-2 rounded"
        >
          <PlusIcon className="h-6 w-6" />
        </button>
      </div>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className=" text-left">Task Name</th>
            <th className=" text-left">Date</th>
            <th className=" text-left">Remarks</th>
            <th className=" text-left">Completion</th>
            <th className=" text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {taskList.map((task, index) => (
            <tr key={task.id} className="border-t">
              <td className="">
                {editIndex === index ? (
                  <input
                    type="text"
                    value={task.name}
                    onChange={(e) =>
                      handleTaskChange(index, { name: e.target.value })
                    }
                    className="w-full bg-transparent text-white" // Set input background to transparent
                  />
                ) : (
                  <span>{task.name}</span>
                )}
              </td>
              <td className="p-2">
              <span>{task.date}</span>
              </td>
              <td className="">
                {editIndex === index ? (
                  <input
                    type="text"
                    value={task.remarks}
                    onChange={(e) =>
                      handleTaskChange(index, { remarks: e.target.value })
                    }
                    className="w-full bg-transparent text-white" // Set input background to transparent
                  />
                ) : (
                  <span>{task.remarks}</span>
                )}
              </td>
              <td className=" text-white">{task.completion}</td>
              <td className="">
                {editIndex === index ? (
                  <div className="space-x-2">
                    <button onClick={() => toggleEdit(index)}>
                      <CheckCircleIcon className="h-6 w-6 text-green-500" />
                    </button>
                    <button onClick={() => handleDeleteTask(index)}>
                      <TrashIcon className="h-6 w-6 text-red-500" />
                    </button>
                  </div>
                ) : (
                  <button onClick={() => toggleEdit(index)}>
                    <PencilSquareIcon className="h-6 w-6 text-white" />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditableTaskList;
