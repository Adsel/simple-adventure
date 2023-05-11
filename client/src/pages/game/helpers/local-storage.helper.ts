const LC_PREFIX: string = 'SA_';

export const saveIntoLocalStorage = (key: string, value: any, encoding: boolean = false): void => {
    localStorage.setItem(LC_PREFIX + key, encoding ? JSON.stringify(value) : value);
}

export const getFromLocalStorage = (key: string, encoding: boolean = false): any => {
    const value: string | null = localStorage.getItem(LC_PREFIX + key);

    return (encoding && value) ? JSON.parse(value) : value;
}
