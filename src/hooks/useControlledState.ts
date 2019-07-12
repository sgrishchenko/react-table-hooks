import {useState, Dispatch, SetStateAction} from 'react'

export const useControlledState = <T>(
    propState: T,
    propSetState: Dispatch<SetStateAction<T>>,
    defaultValue?: T | (() => T),
): [T, Dispatch<SetStateAction<T>>] => {
    const [state, setState] = useState(defaultValue!);

    if (propState === undefined) {
        return [state, setState]
    } else {
        return [propState, propSetState]
    }
};