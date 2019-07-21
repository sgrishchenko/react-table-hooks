import React, {FunctionComponent, HTMLAttributes} from "react";

export const Header: FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({children, ...props}) => {
    return (
        <div {...props}>
            {children}
        </div>
    )
};
