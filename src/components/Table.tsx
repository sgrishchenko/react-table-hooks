import React, {useRef} from "react";
import useComponentSize from '@rehooks/component-size'
import {Column} from "../types/column";
import {format} from "../helpers/format";
import {filter} from "../helpers/filter";
// import {sort} from "../helpers/sort";
import {Head} from "./Head";
import {Body} from "./Body";
import {RowGroup} from "./RowGroup";
import {Row} from "./Row";
import {Cell} from "./Cell";
import {ChannelProvider} from "../helpers/Channel";
import {Measurer} from "./Measurer";
import {tableStateReducer} from "../tableState";
import {ColumnsContext, ContainerWidthContext} from "../contexts";

export type TableProps<T> = {
    data: T[],
    keyAccessor: (item: T) => string | number
    columns: Column<T>[]
    search: string,
}

export const Table = <T extends unknown>({
    data,
    keyAccessor,
    columns,
    search
}: TableProps<T>) => {
    const container = useRef<HTMLDivElement>(null);
    const size = useComponentSize(container);

    const formatted = format(data, columns);
    const filtered = filter(formatted, columns, search);
    // const sorted = sort(filtered, columns, []);

    return (
        <Measurer>
            <ChannelProvider reducer={tableStateReducer}>
                <ColumnsContext.Provider value={columns}>
                    <ContainerWidthContext.Provider value={size.width}>
                        <div ref={container}>
                            <Head/>
                            <Body>
                                {filtered.map(row => (
                                    <RowGroup key={keyAccessor(row.item)}>
                                        <Row>
                                            {columns.map(column => (
                                                <Cell
                                                    key={column.id}
                                                    columnId={column.id}
                                                >
                                                    {row.values[column.id]}
                                                </Cell>
                                            ))}
                                        </Row>
                                    </RowGroup>
                                ))}
                            </Body>
                        </div>
                    </ContainerWidthContext.Provider>
                </ColumnsContext.Provider>
            </ChannelProvider>
        </Measurer>
    )
};
