import React from "react";
import {Column} from "./types/column";
import {format} from "./helpers/format";
import {filter} from "./helpers/filter";
import {sort} from "./helpers/sort";
import {Head} from "./components/Head";
import {Header} from "./components/Header";
import {Body} from "./components/Body";
import {RowGroup} from "./components/RowGroup";
import {Row} from "./components/Row";
import {Cell} from "./components/Cell";

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

    const formatted = format(data, columns);
    const filtered = filter(formatted, columns, search);
    const sorted = sort(filtered, columns, []);

    return (
        <div>
            <Head>
                {columns.map(column => (
                    <Header key={column.id}>
                        {column.Header ? column.Header() : ''}
                    </Header>
                ))}
            </Head>
            <Body>
                {sorted.map(row => (
                    <RowGroup key={keyAccessor(row.item)}>
                        <Row>
                            {columns.map(column => (
                                <Cell key={column.id}>
                                    {row.values[column.id]}
                                </Cell>
                            ))}
                        </Row>
                    </RowGroup>
                ))}
            </Body>
        </div>
    )
};
