import React, {FunctionComponent, HTMLAttributes} from "react";

export const Cell: FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({children, ...props}) => {
    return (
        <div {...props}>
            {children}
        </div>
    )
};
