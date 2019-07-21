import {Column} from "../types/column";
import {defaultAccessor} from "./defaults";
import {Formatted} from "../types/formatted";

export const extractText = <T>(item: T, column: Column<T>) => {
    if (column.text) {
        return column.text(item);
    }

    if (column.Cell) {
        const cell = column.Cell(item);
        if (typeof cell === 'string') {
            return cell;
        }
    }

    const {accessor = defaultAccessor} = column;

    return String(accessor(item))
};

export const format = <T>(
    data: T[],
    columns: Column<T>[],
): Formatted<T>[] => {
    return data.map(item => ({
        item,
        values: Object.fromEntries(
            columns.map(column => [
                column.id,
                extractText(item, column)
            ])
        )
    }))
};