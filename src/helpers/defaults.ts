
export const defaultAccessor = () => '';

export const defaultSortMethod = (a: any, b: any) => {
    a = a === null || a === undefined ? '' : a;
    b = b === null || b === undefined ? '' : b;

    a = typeof a === 'string' ? a.toLowerCase() : a;
    b = typeof b === 'string' ? b.toLowerCase() : b;

    if (a > b) {
        return 1
    }
    if (a < b) {
        return -1
    }

    return 0
};

export const defaultColumnWidth: number = 100;
export const defaultColumnMinWidth: number = 30;
