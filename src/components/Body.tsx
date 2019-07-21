import React, {FunctionComponent, HTMLAttributes} from "react";

export const Body: FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({children, ...props}) => {
    return (
        <div {...props}>
            {children}
        </div>
    )
};
