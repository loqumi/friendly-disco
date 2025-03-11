import React from "react";
import TodoItem from "./TaskItem";
import { Task } from "../types/task";
import { Box } from "@mui/material";

interface TaskListProps {
    tasks: Task[];
    toggleTask: (id: number) => void;
    filter: "All" | "Active" | "Completed";
}

const TaskList: React.FC<TaskListProps> = ({ tasks, toggleTask, filter }) => {
    const filteredTasks = tasks.filter((task) =>
        filter === "All"
            ? true
            : filter === "Active"
                ? !task.completed
                : task.completed
    );

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                maxHeight: '300px',
                overflowY: 'auto',
                padding: '0.5rem',
                gap: '0.5rem',
                borderRadius: '4px',
                marginTop: '1rem',
            }}
        >
            {filteredTasks.map((task) => (
                <TodoItem key={task.id} task={task} toggleTask={toggleTask} />
            ))}
        </Box>
    );
};

export default TaskList;