import React, {HTMLAttributes} from "react";
import {useColumnWidth} from "../hooks/useColumnWidth";

export type CellProps = HTMLAttributes<HTMLDivElement> & {
    columnId: string
}

export const Cell = React.memo(({
    columnId,
    children,
}: CellProps) => {
    const [width] = useColumnWidth(columnId);

    const style = {
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: width,
        overflow: 'hidden',
    };

    return (
        <div style={style}>
            {children}
        </div>
    )
});
