import {Column} from "../types/column";
import {Formatted} from "../types/formatted";

export const filter = <T>(
    data: Formatted<T>[],
    columns: Column<T>[],
    search: string = '',
) => {
    return data.filter(formatted =>
        Object.values(formatted.values)
            .some(value => value.toLowerCase().includes(search.toLowerCase()))
    )
};