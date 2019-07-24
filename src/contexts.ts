import {createContext} from "react";
import {Column} from "./types/column";

export const ContainerWidthContext = createContext<number>(0);
export const ColumnsContext = createContext<Column<any>[]>([]);