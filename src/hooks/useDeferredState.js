import { useCallback, useRef, useState } from 'react';

export default function useDeferredState(initValue, duration) {
    const [value, setValue] = useState(initValue);
    const hndlRef = useRef();

    const handleSetValue = useCallback((nextValue) => {
        if (hndlRef.current) {
            clearTimeout(hndlRef.current);
            hndlRef.current = null;
        }

        hndlRef.current = setTimeout(() => {
            setValue(nextValue);
        }, duration || 0);
    }, [duration, setValue]);

    return [value, handleSetValue];
}