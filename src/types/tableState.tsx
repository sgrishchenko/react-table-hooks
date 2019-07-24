export type ColumnState = {
    id: string;
    hidden?: boolean;
    order?: number;
    sorting?: 'asc' | 'desc';
    sortingIndex?: number;
    width?: number;
}

export type TableState = {
    head: Partial<Record<string, ColumnState>>
}