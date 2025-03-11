import { TaskService } from '../hooks/useTasks';
import {Task} from "../types/task";

describe('TaskService', () => {
    const mockTasks: Task[] = [
        { id: 1, text: 'Task 1', completed: false },
        { id: 2, text: 'Task 2', completed: true },
    ];

    test('toggleTask switch task status', () => {
        const result = TaskService.toggleTask(mockTasks, 1);
        expect(result[0].completed).toBe(true);
    });

    test('clearCompleted deleted completed tasks', () => {
        const result = TaskService.clearCompleted(mockTasks);
        expect(result).toHaveLength(1);
        expect(result[0].id).toBe(1);
    });
});