import React, {FunctionComponent, HTMLAttributes} from "react";

export const Expander: FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({children, ...props}) => {
    return (
        <div {...props}>
            {children}
        </div>
    )
};
