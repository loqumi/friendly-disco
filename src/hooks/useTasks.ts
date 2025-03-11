import {useState, useMemo, useRef} from 'react';
import useLocalStorage from './useLocalStorage';
import {Task} from "../types/task";

const useTasks = () => {
    const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
    const [filter, setFilter] = useState<'All' | 'Active' | 'Completed'>('All');
    const nextId = useRef(1);

    const addTask = (text: string) => {
        if (!text.trim()) return;
        const newTask: Task = {
            id: nextId.current++,
            text: text.trim(),
            completed: false,
        };
        setTasks(prev => [...prev, newTask]);
    };

    const toggleTask = (id: number) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const clearCompleted = () => {
        setTasks(prev => prev.filter(task => !task.completed));
    };

    const filteredTasks = useMemo(() => {
        switch (filter) {
            case 'Active': return tasks.filter(t => !t.completed);
            case 'Completed': return tasks.filter(t => t.completed);
            default: return tasks;
        }
    }, [tasks, filter]);

    const activeCount = useMemo(() =>
            tasks.filter(t => !t.completed).length,
        [tasks]
    );

    const completedCount = useMemo(() =>
            tasks.filter(t => t.completed).length,
        [tasks]
    );

    return {
        tasks: filteredTasks,
        activeCount,
        completedCount,
        filter,
        setFilter,
        addTask,
        toggleTask,
        clearCompleted
    };
};

export default useTasks;