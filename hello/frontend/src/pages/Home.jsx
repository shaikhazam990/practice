import { useState } from "react";

import useTask from "../hooks/usetask.js";

const Home = () => {
    const { tasks, loading, error, addTask, removeTask, updateTask } = useTask();
    const [newTaskTitle, setNewTaskTitle] = useState("");

    const handleAddTask = () => {
        if (newTaskTitle.trim() !== "") {
            addTask({ title: newTaskTitle });
            setNewTaskTitle("");
        }
    };

    const handleUpdateTask = (task) => {
        const title = window.prompt("Edit task title:", task.title);
        if (title && title.trim() !== "") {
            updateTask(task._id, { title: title.trim() });
        }
    };

    return (
        <div>
            <h1>Home Page</h1>
            <div>
                <input
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="Enter task title"
                />
                <button onClick={handleAddTask}>Add Task</button>
            </div>

            {loading && <p>Loading tasks...</p>}
            {error && <p>Error: {typeof error === "string" ? error : error.message}</p>}

            <ul>
                {tasks.map((task) => (
                    <li key={task._id}>
                        {task.title}
                        <button onClick={() => removeTask(task._id)}>Remove</button>
                        <button onClick={() => handleUpdateTask(task)}>Update</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;