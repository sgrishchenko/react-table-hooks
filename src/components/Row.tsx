import React, {FunctionComponent, HTMLAttributes} from "react";

export const Row: FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({children, ...props}) => {
    return (
        <div {...props} style={{display: 'flex'}}>
            {children}
        </div>
    )
};
