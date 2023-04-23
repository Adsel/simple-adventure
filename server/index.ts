import * as dotenv from 'dotenv';

const serverMode: string = process.env.SERVER_MODE || 'socket-io';
require('dotenv').config({ path: `${serverMode}/.env` })

const http: any = require('http');
const express: any = require('express');

const app = express();
const cors = require('cors');

app.use(cors({
    origin: '*'
}));

const httpServer = http.createServer(app);

dotenv.config();

const socket = serverMode === 'socket-io' ? require('./socket-io/socket-io').SocketIOServer : require('./sock-js/sock-js').SockJSServer;
const socketInstance = new socket(httpServer, app);

const serverPort: string = (!!process.env && !!process.env.SERVER_PORT) ? process.env.SERVER_PORT : '8888';
socketInstance.start(Number(serverPort));
