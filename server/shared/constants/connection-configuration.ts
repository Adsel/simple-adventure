import {IConnectionConfiguration} from "../interfaces/connection-configuration.interface";

export const CONNECTION_CONFIGURATION: IConnectionConfiguration = {
    host: process.env.SERVER_DB_HOST || 'mysql',
    database: process.env.SERVER_DB_DATABASE || 'db',
    port: '3306',
    user: process.env.SERVER_DB_USER || 'root',
    password: process.env.SERVER_DB_PASSWORD || '123456',
    connectionLimit: 10
};
