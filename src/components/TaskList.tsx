import { FC } from 'react';
import TaskItem from './TaskItem';
import {Task} from "../App";

type Props = {
    title: string;
    tasks: Task[];
    onToggle: (id: string) => void;
};

const TaskList: FC<Props> = ({ title, tasks, onToggle }) => (
    <div style={{ flex: 1 }}>
        <h2>{title}</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
            {tasks.map(task => (
                <TaskItem key={task.id} task={task} onToggle={onToggle} />
            ))}
        </ul>
    </div>
);

export default TaskList;