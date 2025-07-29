import React, { useContext, useMemo, useEffect } from "react";
import background from "../../assets/bg.jpg";
import { FaPlus } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import Table from "../Table/Table";
import UserContext from "../../hooks/MyContext";

const Dashboard = ({myType}) => {
  // Get tasks and setTasks from context with proper error handling
  const contextValue = useContext(UserContext);
  const tasks = useMemo(() => contextValue?.tasks || [], [contextValue?.tasks]);
  const setTasks = useMemo(() => contextValue?.setTasks || (() => {}), [contextValue?.setTasks]);
  const setType = useMemo(() => contextValue?.setType || (() => {}), [contextValue?.setType]);
  const type = useMemo(() => contextValue?.type || 'all', [contextValue?.type]);

  // Synchronize context type with route type when myType changes
  useEffect(() => {
    if (myType && myType !== type) {
      console.log("Synchronizing type from route:", myType);
      setType(myType);
    }
  }, [myType, type, setType]);

  console.log("Tasks in Dashboard:", tasks);
  console.log("Context value:", contextValue);
  console.log("myType prop:", myType);
  console.log("Context type:", type);

  // Use myType prop if available, otherwise fall back to context type
  const effectiveType = useMemo(() => myType || type, [myType, type]);

  const [newTask, setNewTask] = useState({
    id: null,
    title: "",
    status: "pending",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  
  // Filter tasks based on search query
  const filteredTasks = useMemo(() => {
    if (!searchQuery.trim()) {
      return tasks;
    }
    return tasks.filter(task => 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.status.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [tasks, searchQuery]);

  // Filter tasks based on effective type (myType prop or context type)
  const filteredByType = useMemo(() => {
    console.log("Filtering by effective type:", effectiveType);
    if (effectiveType === 'all') return filteredTasks;
    return filteredTasks.filter(task => task.status === effectiveType);
  }, [filteredTasks, effectiveType]);

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setNewStatus(task.status);
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === selectedTask.id ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
    setIsModalOpen(false);
  };


  const handleAddTask = () => {
    console.log("Adding task...");
    if (newTask.title.trim() === "") return;
    const taskToAdd = { ...newTask, id: Date.now() };
    setTasks([...tasks, taskToAdd]);
    setNewTask({ id: null, title: "", status: "pending" });
    console.log("Task added:", taskToAdd);
  };

  const handleRemoveTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleKeyDown = (e) => {
    console.log("Key pressed:", e.key);
    if (e.key === "Enter" && newTask.title.trim()) {
      console.log("Adding task using enter...");
      handleAddTask();
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // Search functionality is already handled by filteredTasks
      console.log("Searching for:", searchQuery);
    }
  };

  const handleSearchClick = () => {
    console.log("Search button clicked for:", searchQuery);
    // Search functionality is already handled by filteredTasks
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div
      className="dashboard-container flex items-center flex-col p-10 justify-start flex-1 bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="newTask border-2 border-gray-300 rounded-lg p-2 mb-6 w-full max-w-md flex items-center flex-row justify-between bg-white shadow-lg">
        <input
          type="text"
          placeholder="Add a new task"
          className="p-2 rounded-lg border-none border-transparent focus:outline-none w-full"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          onKeyDown={handleKeyDown}
        />
        <button
          className="p-2 ml-2 bg-blue-500 text-white rounded-lg"
          onClick={(e) => {
            e.preventDefault();
            handleAddTask();
          }}
        >
          <FaPlus />
        </button>
      </div>
      <div className="search-container w-full max-w-md mb-6">
        <div className="search flex items-center justify-between bg-white rounded-lg shadow-lg w-full max-w-md mb-6 relative">
          <input
            type="text"
            placeholder="Search tasks..."
            className="px-4 py-2 rounded-lg border-none border-transparent focus:outline-none w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-12 text-gray-400 hover:text-gray-600 transition-colors"
              title="Clear search"
            >
              ✕
            </button>
          )}
          <button 
            className="p-2 ml-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            onClick={handleSearchClick}
          >
            <IoSearch />
          </button>
        </div>
        {searchQuery && (
          <div className="text-sm text-gray-600 mb-2">
            Found {filteredTasks.length} task(s) matching "{searchQuery}"
          </div>
        )}
      </div>
      <Table
        tasks={filteredByType}
        handleEditClick={handleEditClick}
        handleRemoveTask={handleRemoveTask}
      />
      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Edit Task Status</h2>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="border p-2 w-full mb-4 rounded"
            >
              <option value="pending">Pending</option>
              <option value="active">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
