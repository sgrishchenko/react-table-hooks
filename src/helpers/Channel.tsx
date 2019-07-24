import React, {createContext, ReactNode, useContext, useEffect, useReducer, useRef} from "react";

export type Subscriber = () => void;

export type Action<P> = {
    type: string,
    payload: P,
}

export type Reducer<S> = (prevState: S | undefined, action: Action<any>) => S

export type Selector<S, R> = (state: S) => R;

export class Channel<T> {
    public value: T;

    private readonly reducer: Reducer<T>;
    private readonly subscribers = new Set<Subscriber>();

    constructor(reducer: Reducer<T>) {
        this.reducer = reducer;

        this.value = reducer(undefined, {
            type: `@@channel/INITIAL_ACTION_${Math.random()}`,
            payload: null
        });
    }

    public dispatch(action: Action<any>) {
        this.value = this.reducer(this.value, action);

        this.subscribers.forEach(callback => {
            callback()
        })
    };

    public subscribe(subscriber: Subscriber) {
        this.subscribers.add(subscriber);

        return () => {
            this.subscribers.delete(subscriber)
        }
    };
}

export const ChannelContext = createContext<Channel<unknown>>(
    new Channel(() => null as unknown)
);

export type ChannelProviderProps = {
    reducer: Reducer<any>,
    children: ReactNode,
}

export const ChannelProvider = React.memo(({
    reducer,
    children,
}: ChannelProviderProps) => {
    const channel = useRef(new Channel(reducer));

    return (
        <ChannelContext.Provider value={channel.current}>
            {children}
        </ChannelContext.Provider>
    )
});

export const useChannelState = <S, R>(selector: Selector<S, R>) => {
    const [, forceUpdate] = useReducer(state => state + 1, 0);
    const channel = useContext(ChannelContext);
    const result = useRef(selector(channel.value as S));

    useEffect(() => {
        return channel.subscribe(() => {
            const nextResult = selector(channel.value as S);

            if (nextResult !== result.current) {
                result.current = nextResult;
                forceUpdate(null)
            }
        })
    }, [
        channel,
        result,
        selector,
        forceUpdate,
    ]);

    return result.current;
};

export const useChannelDispatch = () => {
    const channel = useContext(ChannelContext);
    return (action: Action<any>) => channel.dispatch(action);
};