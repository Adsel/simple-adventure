export type TFunction = (key: string, params?: Record<string, any>) => string;

export const passthroughT: TFunction = (key: string) => key;

