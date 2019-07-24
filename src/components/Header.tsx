import React, {CSSProperties, ReactNode, useMemo} from "react";
import {Resizer} from "./Resizer";
import {useColumnWidth} from "../hooks/useColumnWidth";

export type HeaderProps = {
    columnId: string,
    nextColumnId?: string,
    children: ReactNode
}

export const Header = React.memo(({
    columnId,
    nextColumnId,
    children,
}: HeaderProps) => {
    const [columnWidth] = useColumnWidth(columnId);

    const style: CSSProperties = useMemo(() => ({
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: columnWidth,
        position: 'relative',
        overflow: 'hidden',
    }), [columnWidth]);

    return (
        <div style={style}>
            {children}
            <Resizer
                columnId={columnId}
                nextColumnId={nextColumnId}
            />
        </div>
    )
});
