import {sortBy} from 'lodash';
import {Column, ColumnState} from "../types/column";
import {defaultAccessor, defaultSortMethod} from "./defaults";
import {Formatted} from "../types/formatted";

export const sort = <T>(
    data: Formatted<T>[],
    columns: Column<T>[],
    sorting: ColumnState<'asc' | 'desc'>,
    sortMethod = defaultSortMethod,
) => {

    const iteratees = sorting.map(([id, direction]) => {
        const {accessor = defaultAccessor} = columns.find(column => column.id === id) || {};
        const sign = direction === 'asc' ? 1 : -1;

        return (a: Formatted<T>, b: Formatted<T>) => sign * sortMethod(
            accessor(a.item),
            accessor(b.item),
        );
    });

    return sortBy(data, iteratees) as Formatted<T>[];
};