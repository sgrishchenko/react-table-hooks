import React, {FunctionComponent, Suspense} from "react";

declare const ResizeObserverEntry: any;

const supportsResizeObserver = () => (
    'ResizeObserver' in global
    && 'ResizeObserverEntry' in global
    && 'contentRect' in ResizeObserverEntry.prototype
);

const Polyfill = React.lazy(async () => {
    await import('resize-observer-polyfill');
    return ({
        default: ({children}) => children
    });
});

export const Measurer: FunctionComponent = ({children}) => {
    if (supportsResizeObserver()) {
        return <>{children}</>;
    }

    return (
        <Suspense fallback={null}>
            <Polyfill>
                {children}
            </Polyfill>
        </Suspense>
    )
};