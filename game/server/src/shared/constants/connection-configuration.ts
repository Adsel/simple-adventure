import {IConnectionConfiguration} from "../interfaces/connection-configuration.interface";

export const CONNECTION_CONFIGURATION: IConnectionConfiguration = {
    type: 'mysql',
    host: process.env.SERVER_DB_HOST || 'host',
    port: 3306,
    username: process.env.SERVER_DB_USER || 'username',
    password: process.env.SERVER_DB_PASSWORD || 'password',
    database: process.env.SERVER_DB_DATABASE || 'database',
    entities: [__dirname + "/../**/*entity.{js,ts}"],
    logging: true,
    synchronize: true,
};
