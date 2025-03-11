import { renderHook, act } from '@testing-library/react';
import useLocalStorage from '../hooks/useLocalStorage';

const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
        getItem: jest.fn((key: string) => store[key] || null),
        setItem: jest.fn((key: string, value: string) => {
            store[key] = value;
        }),
        clear: jest.fn(() => {
            store = {};
        }),
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
});

describe('useLocalStorage', () => {
    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    });

    it('should use initial value when localStorage is empty', () => {
        const { result } = renderHook(() =>
            useLocalStorage('testKey', 'initial')
        );
        expect(result.current[0]).toBe('initial');
    });

    it('should retrieve value from localStorage', () => {
        (localStorageMock.getItem as jest.Mock).mockImplementationOnce(() => JSON.stringify('stored'));

        const { result } = renderHook(() =>
            useLocalStorage('testKey', 'initial')
        );
        expect(result.current[0]).toBe('stored');
    });

    it('should update localStorage when state changes', () => {
        const { result } = renderHook(() =>
            useLocalStorage('testKey', 'initial')
        );

        act(() => {
            result.current[1]('newValue');
        });

        expect(localStorage.setItem).toHaveBeenLastCalledWith(
            'testKey',
            JSON.stringify('newValue')
        );
        expect(result.current[0]).toBe('newValue');
    });
});