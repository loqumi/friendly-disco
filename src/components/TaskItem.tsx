import {Task} from "../App";

type Props = {
    task: Task;
    onToggle: (id: string) => void;
};

const TaskItem = ({ task, onToggle }: Props) => (
    <li style={{
        padding: '8px',
        borderBottom: '1px solid #ccc',
        display: 'flex',
        alignItems: 'center'
    }}>
        <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            style={{ marginRight: '8px' }}
        />
        <span style={{
            textDecoration: task.completed ? 'line-through' : 'none',
            flex: 1
        }}>
      {task.text}
    </span>
    </li>
);

export default TaskItem;