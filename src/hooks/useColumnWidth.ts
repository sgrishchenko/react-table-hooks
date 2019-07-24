import {useCallback, useContext} from "react";
import {defaultColumnWidth} from "../helpers/defaults";
import {ColumnsContext, ContainerWidthContext} from "../contexts";
import {useChannelDispatch, useChannelState} from "../helpers/Channel";
import {TableState} from "../types/tableState";
import {resizeColumn} from "../tableState";

export const useColumnWidth = (columnId?: string) => {
    const columns = useContext(ColumnsContext);
    const containerWidth = useContext(ContainerWidthContext);

    const columnWidthSelector = useCallback(
        (state: TableState) => {
            const columnState = columnId !== undefined
                ? state.head[columnId]
                : undefined;

            return columnState !== undefined
                ? columnState.width
                : undefined;
        },
        [columnId]
    );

    const widthRatio = useChannelState(columnWidthSelector);
    const dispatch = useChannelDispatch();

    let width: number;

    if (widthRatio !== undefined) {
        width = widthRatio * containerWidth / 100
    } else {
        const defaultWidthSum = columns.reduce(
            (sum, {width}) => sum + (width || defaultColumnWidth),
            0
        );

        const column = columns.find(current => current.id === columnId);
        const columnWidth = column && column.width;

        width = (columnWidth || defaultColumnWidth)
            / defaultWidthSum * containerWidth
    }

    const setWidth = (width: number) => {
        if (columnId !== undefined) {
            dispatch(resizeColumn({
                columnId,
                width: width / containerWidth * 100,
            }))
        }
    };


    return [width, setWidth] as [number, (width: number) => void]
};