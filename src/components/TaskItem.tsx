import React from "react";
import { Task } from "../types/task";
import { motion } from "framer-motion";
import { ListItem, ListItemText, Checkbox } from "@mui/material";

interface TaskItemProps {
    task: Task;
    toggleTask: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, toggleTask }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            layout
        >
            <ListItem
                onClick={() => toggleTask(task.id)}
                sx={{
                    border: '1px solid #ccc',
                    textDecoration: task.completed ? "line-through" : "none",
                    color: task.completed ? "rgba(0, 0, 0, 0.6)" : "inherit",
                    cursor: "pointer",
                }}
            >
                <Checkbox checked={task.completed} />
                <ListItemText primary={task.text} />
            </ListItem>
        </motion.div>
    );
};

export default TaskItem;