import React from 'react'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const Table = ({ handleEditClick, handleRemoveTask, tasks = [] }) => {
    console.log("Tasks in Table:", tasks);
    
    return (
        <div className="AllTasks w-full bg-white rounded-lg shadow-lg p-4">
            <div className="overflow-x-auto overflow-y-auto max-h-96 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <table className="min-w-full bg-white border border-gray-300 table-auto">
                    <thead className="sticky top-0 bg-white z-10 shadow-sm">
                        <tr>
                            <th className="py-3 px-4 border-b text-left font-semibold min-w-[200px] sm:w-1/2">Task</th>
                            <th className="py-3 px-4 border-b text-center font-semibold min-w-[120px] sm:w-1/6">Status</th>
                            <th className="py-3 px-4 border-b text-center font-semibold min-w-[120px] sm:w-1/6">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks && Array.isArray(tasks) && tasks.length > 0 ? (
                            tasks.map((task) => (
                                <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                                    <td className={`py-3 px-4 border-b break-words ${task.status === 'completed' ? 'line-through text-gray-500' : ''}`}>{task.title}</td>
                                    <td className="py-3 px-4 text-center border-b">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            task.status === 'completed' ? 'bg-green-100 text-green-800' :
                                            task.status === 'active' ? 'bg-blue-100 text-blue-800' :
                                            'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {task.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 border-b text-center">
                                        <div className="flex justify-center gap-2">
                                            <button 
                                                className="text-green-500 hover:text-green-700 p-1 rounded hover:bg-green-50 transition-colors" 
                                                onClick={() => handleEditClick(task)}
                                                title="Edit task"
                                                disabled={task.status === 'completed'}
                                            >
                                                <FaEdit />
                                            </button>
                                            <button 
                                                className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
                                                title="Delete task"
                                                onClick={() => handleRemoveTask(task.id)}
                                            >
                                                <MdDelete />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="py-8 px-4 text-center text-gray-500">
                                    No tasks found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table