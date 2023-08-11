import { useRef, useEffect } from 'react';

export const useUnload = (fn: (e: Event) => void) => {
    const cb = useRef(fn);

    useEffect(() => {
        cb.current = fn;
    }, [fn]);

    useEffect(() => {
        const onUnload = (e: Event) => cb.current(e);
        window.addEventListener('beforeunload', onUnload);
        return () => {
            window.removeEventListener('beforeunload', onUnload);
        };
    }, []);
};
