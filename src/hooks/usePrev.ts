import {useEffect, useRef} from "react";

export const usePrev = <T>(value: T, debugName?: string) => {
    const ref = useRef<T>();

    useEffect(() => {
        if (debugName) {
            console.log(debugName, ref.current, value);
        }

        ref.current = value;
    }, [value, debugName]);

    return ref.current;
};
