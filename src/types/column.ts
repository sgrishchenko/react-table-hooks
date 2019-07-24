import {ReactNode} from "react";

export type Column<T> = {
    id: string;
    accessor?: (item: T) => any;
    text?: (item: T) => string;
    width?: number;

    Header?: () => ReactNode;
    Cell?: (item: T) => ReactNode;
}
