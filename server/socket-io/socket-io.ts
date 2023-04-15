import {SocketServer} from "../shared/abstracts/socket-server.abstract";

const { Server } = require("socket.io");

class SocketIOServer extends SocketServer {
    private io: any = null;

    protected loadRoutes = (): void => {
        if (!this.io) {
            return;
        }

        this.io.on('connection', (socket: any) => {
            socket.emit('hello', 'world');

            socket.on('howdy', (arg: any) => {
                console.log(arg);
            });
        })
    }

    protected loadSocket = () => {
        this.io = new Server(this.httpServer, {
            cors: {
                origin: '*',
            }
        });
    };

    public start = (port: number) => {
        this.httpServer.listen(port, () => {
            this.loadSocket();
            this.loadRoutes();
            console.log(`[socket-io] Now listening on port ${port}`);
        });
    };
}

module.exports = {SocketIOServer};
