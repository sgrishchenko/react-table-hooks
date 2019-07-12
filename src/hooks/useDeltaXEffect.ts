import React, {useRef} from 'react'

export const useDeltaXEffect = () => {
    const pageX = useRef<number>();

    return (onDeltaXChange: (deltaX: number) => void) => {
        const onMouseMoving = (event: MouseEvent) => {
            onDeltaXChange(event.pageX - pageX.current!)
        };

        const onMouseMovingEnd = () => {
            document.removeEventListener('mousemove', onMouseMoving);
            document.removeEventListener('mouseup', onMouseMovingEnd);
            document.removeEventListener('mouseleave', onMouseMovingEnd);
        };

        return (event: React.MouseEvent) => {
            pageX.current = event.pageX;

            document.addEventListener('mousemove', onMouseMoving);
            document.addEventListener('mouseup', onMouseMovingEnd);
            document.addEventListener('mouseleave', onMouseMovingEnd);
        }
    }
};
