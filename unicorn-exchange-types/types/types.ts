export type unixDate = number;
export type mongoId = string;
export type sqlId = number;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
