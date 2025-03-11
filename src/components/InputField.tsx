import { ChangeEvent, KeyboardEvent } from 'react';

type Props = {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
};

const InputField = ({ value, onChange, onSubmit }: Props) => {
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') onSubmit();
    };

    return (
        <div style={{ marginBottom: '20px' }}>
            <input
                type="text"
                value={value}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Новая задача"
                style={{ padding: '8px', width: 'calc(100% - 20px)' }}
            />
            <button onClick={onSubmit} style={{ padding: '8px 16px' }}>
                Добавить
            </button>
        </div>
    );
};

export default InputField;