import React, { useMemo } from "react";
import useTasks from "./hooks/useTasks";
import TaskList from "./components/TaskList";
import InputField from "./components/InputField";
import TabPanel from "./components/TabPanel";
import { CssBaseline, Container, Typography } from "@mui/material";

const App: React.FC = () => {
    const { tasks, addTask, toggleTask, clearCompleted, filter, setFilter } = useTasks();

    const { activeCount, completedCount } = useMemo(() => ({
        activeCount: tasks.filter(task => !task.completed).length,
        completedCount: tasks.filter(task => task.completed).length
    }), [tasks]);

    return (
        <>
            <CssBaseline />
            <Container maxWidth="sm" sx={{ textAlign: "center", pt: 4 }}>
                <Typography variant="h2" gutterBottom>
                    todos
                </Typography>
                <InputField addTask={addTask} />
                <TaskList tasks={tasks} toggleTask={toggleTask} filter={filter} />
                <TabPanel
                    activeCount={activeCount}
                    completedCount={completedCount}
                    filter={filter}
                    setFilter={setFilter}
                    clearCompleted={clearCompleted}
                />
            </Container>
        </>
    );
};

export default App;