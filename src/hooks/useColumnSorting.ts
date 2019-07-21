import {ColumnState, SetColumnState} from "../types/column";
import {useControlledState} from "./useControlledState";
import {Dispatch, SetStateAction} from "react";
import {mergeColumnState} from "../helpers/mergeColumnState";

export const useColumnSorting = <T>(
    propSorting: ColumnState<'asc' | 'desc'>,
    propSetSorting: SetColumnState<'asc' | 'desc'>,
    append: boolean,
): [ColumnState<'asc' | 'desc'>, SetColumnState<'asc' | 'desc'>] => {
    const [sorting, setSorting] = useControlledState(
        propSorting,
        propSetSorting as Dispatch<SetStateAction<ColumnState<'asc' | 'desc'>>>,
    );

    const setAppendableSorting: SetColumnState<'asc' | 'desc'> = sorting => setSorting(
        prevSorting => append
            ? mergeColumnState(
                prevSorting,
                sorting,
            )
            : sorting,
    );

    return [sorting, setAppendableSorting];
};