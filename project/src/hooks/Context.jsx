import React, { useEffect } from 'react'
import UserContext from './MyContext';
import { LocalStoragePersistant } from './LocalStoragePersistant';

const Context = ({ children }) => {
    const [tasks, setTasks] = LocalStoragePersistant('tasks', []);
    const [type, setType] = LocalStoragePersistant('taskType', 'all'); // Default type is 'all'

    useEffect(() => {
        // Only initialize if tasks array is empty (first time loading)
        if (!tasks || tasks.length === 0) {
            const initialTasks = [
                { id: 1, title: "Task 1", status: "pending" },
                { id: 2, title: "Task 2", status: "completed" },
                { id: 3, title: "Task 3", status: "active" },
            ];
            setTasks(initialTasks);
        }
    }, [tasks, setTasks]); // Include dependencies
    useEffect(() => {
        // Log the current type whenever it changes
        console.log("Current task type:", type);
    }, [type]); // Only run when 'type' changes

    // Provide both tasks and setTasks to context consumers
    const contextValue = {
        tasks,
        setTasks,
        type,
        setType
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    )
}

export default Context;