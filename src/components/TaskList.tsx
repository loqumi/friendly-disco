import React from "react";
import TodoItem from "./TaskItem";
import { Task } from "../types/task";
import { Box, Typography } from "@mui/material";

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
                height: "300px",
                maxHeight: '300px',
                overflowY: 'auto',
                bgcolor: 'background.default',
                borderRadius: '8px',
                p: 2,
                boxShadow: 1,
                mt: 2,
                '&::-webkit-scrollbar': {
                    width: '8px'
                },
                '&::-webkit-scrollbar-track': {
                    bgcolor: 'grey.100'
                },
                '&::-webkit-scrollbar-thumb': {
                    bgcolor: 'primary.light',
                    borderRadius: '4px'
                }
            }}
        >
            {filteredTasks.length > 0 ? (
                <>
                    {filteredTasks.map((task) => (
                        <TodoItem key={task.id} task={task} toggleTask={toggleTask} />
                    ))}
                </>
            ) :
                <>
                    <Typography variant="h6" gutterBottom>
                        There are no tasks yet.
                    </Typography>
                </>
            }
        </Box>
    );
};

export default TaskList;