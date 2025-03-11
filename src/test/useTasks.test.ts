import { renderHook, act } from '@testing-library/react';
import useTasks from '../hooks/useTasks';

beforeEach(() => {
    localStorage.clear();
});

describe('useTasks', () => {
    it('should add new task', () => {
        const { result } = renderHook(() => useTasks());

        act(() => {
            result.current.addTask('New Task');
        });

        expect(result.current.tasks).toHaveLength(1);
        expect(result.current.tasks[0].text).toBe('New Task');
        expect(result.current.tasks[0].completed).toBe(false);
    });

    it('should ignore empty task text', () => {
        const { result } = renderHook(() => useTasks());

        act(() => {
            result.current.addTask('   ');
        });

        expect(result.current.tasks).toHaveLength(0);
    });

    it('should toggle task status', () => {
        const { result } = renderHook(() => useTasks());

        act(() => {
            result.current.addTask('Task 1');
        });
        const taskId = result.current.tasks[0].id;

        act(() => {
            result.current.toggleTask(taskId);
        });
        expect(result.current.tasks[0].completed).toBe(true);

        act(() => {
            result.current.toggleTask(taskId);
        });
        expect(result.current.tasks[0].completed).toBe(false);
    });

    it('should generate tasks with valid IDs', () => {
        const { result } = renderHook(() => useTasks());

        act(() => {
            result.current.addTask('Task 1');
            result.current.addTask('Task 2');
        });

        expect(result.current.tasks).toEqual([
            { id: 1, text: 'Task 1', completed: false },
            { id: 2, text: 'Task 2', completed: false }
        ]);
    });

    it('should clear completed tasks', () => {
        const { result } = renderHook(() => useTasks());

        act(() => {
            result.current.addTask('Task 1');
            result.current.addTask('Task 2');
        });

        act(() => result.current.toggleTask(1));
        act(() => result.current.clearCompleted());

        expect(result.current.tasks).toEqual([
            { id: 2, text: 'Task 2', completed: false }
        ]);
    });

    it('should filter tasks correctly', () => {
        const { result } = renderHook(() => useTasks());

        act(() => {
            result.current.addTask('Task 1');
            result.current.addTask('Task 2');
        });

        act(() => result.current.toggleTask(1));

        act(() => result.current.setFilter('Active'));
        expect(result.current.tasks).toEqual([
            { id: 2, text: 'Task 2', completed: false }
        ]);

        act(() => result.current.setFilter('Completed'));
        expect(result.current.tasks).toEqual([
            { id: 1, text: 'Task 1', completed: true }
        ]);
    });

    it('should persist tasks to localStorage', () => {
        const { result } = renderHook(() => useTasks());

        act(() => {
            result.current.addTask('Persisted Task');
        });

        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        expect(storedTasks).toHaveLength(1);
        expect(storedTasks[0].text).toBe('Persisted Task');
    });
});