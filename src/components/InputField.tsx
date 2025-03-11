import React, { useState } from "react";
import { TextField } from "@mui/material";

interface InputFieldProps {
    addTask: (text: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({ addTask }) => {
    const [text, setText] = useState("");

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && text.trim()) {
            addTask(text.trim());
            setText("");
        }
    };

    return (
        <TextField
            fullWidth
            variant="outlined"
            placeholder="What needs to be done?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            sx={{ mb: 2 }}
        />
    );
};

export default InputField;