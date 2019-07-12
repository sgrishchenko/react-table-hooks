import { keyBy, mapValues } from 'lodash';
import { Column, ColumnState, SetColumnState } from '../types/column'
import { useControlledState } from './useControlledState'
import {Dispatch, SetStateAction} from "react";

export const useColumnWidth = (
    propWidthRation: ColumnState<number>,
    propSetWidthRation: SetColumnState<number>,
    containerWidth: number,
    columns: Column[],
    defaultColumnWidth: number = 100
): [ColumnState<number>, SetColumnState<number>] => {
    const defaultWidthSum = columns.reduce(
        (sum, { width }) => sum + (width || defaultColumnWidth),
        0
    );

    const defaultWidth = mapValues(
        keyBy(columns, 'id'),
        (column: Column) => (column.width || defaultColumnWidth) / defaultWidthSum * containerWidth,
    );

    const [widthRation, setWidthRation] = useControlledState(
        propWidthRation,
        propSetWidthRation as Dispatch<SetStateAction<ColumnState<number>>>,
    );

    const width: ColumnState<number> = {
        ...defaultWidth,
        ...mapValues(
            widthRation,
            (value: number) => value * containerWidth / 100
        )
    };

    const setWidth: SetColumnState<number> = width => setWidthRation(
        prevWidthRation => ({
            ...prevWidthRation,
            ...mapValues(
                width,
                (value: number)  => value / containerWidth * 100
            )
        })
    );


    return [width, setWidth]
};