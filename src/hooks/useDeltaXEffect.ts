import React, {useCallback, useRef} from 'react'

export const useDeltaXEffect = (onDeltaXChange: (deltaX: number) => void) => {
    const pageX = useRef(NaN);

    const onMouseMoving = useCallback((event: MouseEvent) => {
        onDeltaXChange(event.pageX - pageX.current)
    }, [pageX, onDeltaXChange]);

    const onMouseMovingEnd = useCallback(() => {
        document.removeEventListener('mousemove', onMouseMoving);
        document.removeEventListener('mouseup', onMouseMovingEnd);
        document.removeEventListener('mouseleave', onMouseMovingEnd);
    }, [onMouseMoving]);

    return useCallback((event: React.MouseEvent) => {
        pageX.current = event.pageX;

        document.addEventListener('mousemove', onMouseMoving);
        document.addEventListener('mouseup', onMouseMovingEnd);
        document.addEventListener('mouseleave', onMouseMovingEnd);
    }, [onMouseMoving, onMouseMovingEnd]);
};
