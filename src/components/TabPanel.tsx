import React, { useEffect } from "react";
import { Box, Button } from "@mui/material";

interface TabPanelProps {
    activeCount: number;
    completedCount: number;
    filter: "All" | "Active" | "Completed";
    setFilter: (filter: "All" | "Active" | "Completed") => void;
    clearCompleted: () => void;
}

const TabPanel: React.FC<TabPanelProps> = ({
   activeCount,
   completedCount,
   filter,
   setFilter,
   clearCompleted,
}) => {

    useEffect(() => {
        if (filter === "Completed" && completedCount === 0) {
            setFilter("All");
        }
        if (filter === "Active" && activeCount === 0) {
            setFilter("All");
        }
    }, [filter, completedCount, activeCount, setFilter]);

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 2,
            }}
        >
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                {activeCount} item{activeCount !== 1 && "s"} left
            </Box>
            <Box sx={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center" }}>
                <Button
                    variant={filter === "All" ? "outlined" : "text"}
                    onClick={() => setFilter("All")}
                >
                    All
                </Button>
                <Button
                    variant={filter === "Active" ? "outlined" : "text"}
                    disabled={activeCount === 0}
                    onClick={() => setFilter("Active")}
                >
                    Active
                </Button>
                <Button
                    variant={filter === "Completed" ? "outlined" : "text"}
                    disabled={completedCount === 0}
                    onClick={() => setFilter("Completed")}
                >
                    Completed
                </Button>
            </Box>
            <Button
                variant="outlined"
                color="error"
                disabled={!completedCount}
                onClick={clearCompleted}
            >
                Clear
            </Button>
        </Box>
    );
};

export default TabPanel;