export type Column = {
    id: string;
    width?: number;
}

export type ColumnState<T> = Record<string, T>

export type SetColumnState<T> = (state: ColumnState<T>) => void