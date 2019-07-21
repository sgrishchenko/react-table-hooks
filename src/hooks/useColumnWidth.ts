import {Column, ColumnState, SetColumnState} from '../types/column'
import {useControlledState} from './useControlledState'
import {Dispatch, SetStateAction} from "react";
import {defaultColumnWidth} from "../helpers/defaults";
import {mergeColumnState} from "../helpers/mergeColumnState";

export const useColumnWidth = <T>(
    propWidthRatio: ColumnState<number>,
    propSetWidthRatio: SetColumnState<number>,
    containerWidth: number,
    columns: Column<T>[],
): [ColumnState<number>, SetColumnState<number>] => {
    const defaultWidthSum = columns.reduce(
        (sum, {width}) => sum + (width || defaultColumnWidth),
        0
    );

    const defaultWidth: ColumnState<number> = columns.map(
        column => {
            const width = (column.width || defaultColumnWidth)
                / defaultWidthSum * containerWidth;

            return [column.id, width];
        }
    );

    const [widthRation, setWidthRation] = useControlledState(
        propWidthRatio,
        propSetWidthRatio as Dispatch<SetStateAction<ColumnState<number>>>,
    );

    const width: ColumnState<number> = mergeColumnState(
        defaultWidth,
        widthRation.map(
            ([id, value]) => [id, value * containerWidth / 100]
        )
    );

    const setWidth: SetColumnState<number> = width => setWidthRation(
        prevWidthRation => mergeColumnState(
            prevWidthRation,
            width.map(
                ([id, value]) => [id, value / containerWidth * 100]
            )
        )
    );


    return [width, setWidth]
};