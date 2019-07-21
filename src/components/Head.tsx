import React, {FunctionComponent, HTMLAttributes} from "react";

export const Head: FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({children, ...props}) => {
    return (
        <div {...props} style={{display: 'flex'}}>
            {children}
        </div>
    )
};
