export interface IConnectionConfiguration {
    host: string;
    database: string;
    port: string;
    user: string;
    password: string;
    connectionLimit?: number;
}
