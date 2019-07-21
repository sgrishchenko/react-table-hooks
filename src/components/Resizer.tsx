import React, {FunctionComponent, HTMLAttributes} from "react";

export const Resizer: FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({children, ...props}) => {
    return (
        <div {...props}>
            {children}
        </div>
    )
};
