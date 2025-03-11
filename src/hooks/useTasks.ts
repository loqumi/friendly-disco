import { useState, useEffect, useMemo } from 'react';
import { Task } from '../types/task';

const useTasks = () => {
    const [tasks, setTask] = useState<Task[]>([]);
    const [filter, setFilter] = useState<'All' | 'Active' | 'Completed'>('All');

    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) setTask(JSON.parse(storedTasks));
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (text: string) => {
        const newTask: Task = {
            id: Date.now(),
            text,
            completed: false,
        };
        setTask(prev => [...prev, newTask]);
    };

    const toggleTask = (id: number) => {
        setTask(prev =>
            prev.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const clearCompleted = () => {
        setTask(prev => prev.filter(task => !task.completed));
    };

    const filteredTasks = useMemo(() => {
        switch (filter) {
            case 'Active':
                return tasks.filter(t => !t.completed);
            case 'Completed':
                return tasks.filter(t => t.completed);
            default:
                return tasks;
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