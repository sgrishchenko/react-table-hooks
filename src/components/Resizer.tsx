import React, {CSSProperties, useCallback, useMemo} from "react";
import {defaultColumnMinWidth} from "../helpers/defaults";
import {useDeltaXEffect} from "../hooks/useDeltaXEffect";
import {useColumnWidth} from "../hooks/useColumnWidth";

export type ResizerProps = {
    columnId: string,
    nextColumnId?: string,
}

export const Resizer = React.memo(({
    columnId,
    nextColumnId,
}: ResizerProps) => {

    const [columnWidth, setColumnWidth] = useColumnWidth(columnId);
    const [nextColumnWidth, setNextColumnWidth] = useColumnWidth(nextColumnId);

    const onDeltaXChange = useCallback((deltaX => {
        setColumnWidth(columnWidth + deltaX);
        setNextColumnWidth(nextColumnWidth - deltaX);
    }), [
        columnWidth,
        nextColumnWidth,
        setColumnWidth,
        setNextColumnWidth
    ]);

    const onMouseDown = useDeltaXEffect(onDeltaXChange);

    const style: CSSProperties = useMemo(() => ({
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: -defaultColumnMinWidth / 2,
        width: defaultColumnMinWidth,
        cursor: 'ew-resize',
        zIndex: 1
    }), []);

    if (!nextColumnId) {
        return null;
    }

    return (
        <div
            onMouseDown={onMouseDown}
            style={style}
        />
    )
});
