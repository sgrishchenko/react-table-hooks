import actionCreatorFactory from "typescript-fsa";
import {reducerWithInitialState, reducerWithoutInitialState} from "typescript-fsa-reducers";
import {ColumnState, TableState} from "./types/tableState";

const actionCreator = actionCreatorFactory('@@table');

export const toggleColumn = actionCreator<{columnId: string, hidden: boolean}>('HIDE_COLUMN');
export const swapColumns = actionCreator<{columnId: string, anotherColumnId: string}>('SWAP_COLUMNS');
export const sortByColumns = actionCreator<{columnId: string, sorting: 'asc' | 'desc'}[]>('SORT_BY_COLUMNS');
export const resizeColumn = actionCreator<{columnId: string, width: number}>('RESIZE_COLUMN');

export const tableInitialState: TableState = {
    head: {}
};

export const tableStateReducer = reducerWithInitialState(tableInitialState)
    .casesWithAction([
        resizeColumn,
    ], (state, action) => {
        const {columnId} = action.payload;

        return ({
            ...state,
            head: {
                ...state.head,
                [columnId]: {
                    ...columnStateReducer(state.head[columnId], action),
                    columnId
                }
            }
        });
    });

export const columnStateReducer = reducerWithoutInitialState<ColumnState>()
    .case(resizeColumn, (state, payload) => {
        return ({
            ...state,
            width: payload.width
        });
    });