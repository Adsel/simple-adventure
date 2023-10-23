import "reflect-metadata";
import {initDbConnection} from "./shared/database/connection/set-connection";

const serverMode: string = process.env.SERVER_MODE || 'socket-io';
const serverPort: string = (!!process.env && !!process.env.SERVER_PORT) ? process.env.SERVER_PORT : '8888';

const http: any = require('http');
const express: any = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors({
    origin: '*'
}));

const httpServer = http.createServer(app);

const startServerInstance = async () => {
    await initDbConnection();
    const socket = serverMode === 'socket-io' ? require('./socket-io/socket-io').SocketIOServer : require('./sock-js/sock-js').SockJSServer;
    const socketInstance = new socket(httpServer, app);
    socketInstance.start(Number(serverPort));
};
startServerInstance().then(() => console.log('Server started'));
