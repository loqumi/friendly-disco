import { useMemo, useCallback, useState, useRef, useEffect } from 'react';
import useLocalStorage from './useLocalStorage';
import { Task } from '../types/task';

export const TaskService = {
    addTask: (tasks: Task[], text: string, nextId: number): Task[] => {
        if (!text.trim()) return tasks;
        return [
            ...tasks,
            {
                id: nextId,
                text: text.trim(),
                completed: false,
            },
        ];
    },

    toggleTask: (tasks: Task[], id: number): Task[] =>
        tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ),

    clearCompleted: (tasks: Task[]): Task[] =>
        tasks.filter(task => !task.completed),

    filterTasks: (tasks: Task[], filter: FilterType): Task[] => {
        switch (filter) {
            case 'Active':
                return tasks.filter(t => !t.completed);
            case 'Completed':
                return tasks.filter(t => t.completed);
            default:
                return tasks;
        }
    },

    getCounts: (tasks: Task[]) => ({
        active: tasks.filter(t => !t.completed).length,
        completed: tasks.filter(t => t.completed).length,
    }),

    getNextId: (tasks: Task[]): number => {
        if (tasks.length === 0) return 1;
        return Math.max(...tasks.map(t => t.id)) + 1;
    },
};

type FilterType = 'All' | 'Active' | 'Completed';

const useTasks = () => {
    const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
    const [filter, setFilter] = useState<FilterType>('All');
    const nextId = useRef(1);

    useEffect(() => {
        nextId.current = TaskService.getNextId(tasks);
    }, [tasks]);

    const filteredTasks = useMemo(
        () => TaskService.filterTasks(tasks, filter),
        [tasks, filter]
    );

    const { active, completed } = useMemo(
        () => TaskService.getCounts(tasks),
        [tasks]
    );

    const addTask = useCallback(
        (text: string) => {
            const newId = nextId.current;
            setTasks(prev => {
                const newTasks = TaskService.addTask(prev, text, newId);
                nextId.current = TaskService.getNextId(newTasks);
                return newTasks;
            });
        },
        [setTasks]
    );

    const toggleTask = useCallback(
        (id: number) => setTasks(prev => TaskService.toggleTask(prev, id)),
        [setTasks]
    );

    const clearCompleted = useCallback(
        () => setTasks(prev => TaskService.clearCompleted(prev)),
        [setTasks]
    );

    return {
        tasks: filteredTasks,
        activeCount: active,
        completedCount: completed,
        filter,
        setFilter,
        addTask,
        toggleTask,
        clearCompleted,
    };
};

export default useTasks;