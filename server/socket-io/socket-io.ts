import {IConnectedPlayer} from "../shared/interfaces/players/connected-player.interface";
import {SocketGameServerAbstract} from "../shared/abstracts/socket-game-server.abstract";

const { Server } = require("socket.io");

class SocketIOServer extends SocketGameServerAbstract {
    private io: any = null;

    protected send(conn: any, data: any): void {
        conn.emit('message', data);
    }

    protected broadcastMessage(message: any, skipPlayerId = 0): void {
        this.connectedPlayers.forEach((client: IConnectedPlayer) => {
            if (client.summonerId !== skipPlayerId) {
                client.socket.emit(message.type, message);
            }
        });
    }

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
