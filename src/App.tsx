import { useState } from 'react';
import InputField from './components/InputField';
import TaskList from './components/TaskList';

export type Task = {
  id: string;
  text: string;
  completed: boolean;
};

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        text: newTask,
        completed: false,
      };
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <h1>ToDo List</h1>
        <InputField
            value={newTask}
            onChange={setNewTask}
            onSubmit={addTask}
        />
        <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
          <TaskList title="Все задачи" tasks={tasks} onToggle={toggleTask} />
          <TaskList title="Активные" tasks={tasks.filter(t => !t.completed)} onToggle={toggleTask} />
          <TaskList title="Выполненные" tasks={tasks.filter(t => t.completed)} onToggle={toggleTask} />
        </div>
      </div>
  );
};

export default App;