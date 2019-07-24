import React, {useContext} from "react";
import {Header} from "./Header";
import {ColumnsContext} from "../contexts";

export const Head = React.memo(() => {

    const columns = useContext(ColumnsContext);

    return (
        <div style={{display: 'flex'}}>
            {columns.map((column, index) => {
                const nextColumn = columns[index + 1];
                const nextColumnId = nextColumn && nextColumn.id;

                return (
                    <Header
                        key={column.id}
                        columnId={column.id}
                        nextColumnId={nextColumnId}
                    >
                        {column.Header ? column.Header() : ''}
                    </Header>
                )
            })}
        </div>
    )
});
