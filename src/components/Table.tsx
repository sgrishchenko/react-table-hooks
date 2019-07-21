import React, {FunctionComponent, HTMLAttributes} from "react";

export const Table: FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({children, ...props}) => {
    return (
        <div {...props}>
            {children}
        </div>
    )
};
