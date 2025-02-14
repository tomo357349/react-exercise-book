import { useContext, useEffect, useRef } from 'react';
import PageContext from '../contexts/PageContext.js';

export default function useStatus(msg, duration) {
    const msgRef = useRef(msg);
    const durationRef = useRef(duration);

    const { setStatus } = useContext(PageContext);

    useEffect(() => {
        if (!msgRef.current) return;
        setStatus(msgRef.current, durationRef.current);
    }, [setStatus]);

    return setStatus;
}