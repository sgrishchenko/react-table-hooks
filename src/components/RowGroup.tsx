import React, {FunctionComponent, HTMLAttributes} from "react";

export const RowGroup: FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({children, ...props}) => {
    return (
        <div {...props}>
            {children}
        </div>
    )
};
