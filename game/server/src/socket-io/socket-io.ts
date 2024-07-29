import {IConnectedPlayer} from "../shared/interfaces/players/connected-player.interface";
import {SocketGameServerAbstract} from "../shared/abstracts/socket-game-server.abstract";

import {Server} from "socket.io";

class SocketIOServer extends SocketGameServerAbstract {
    private io: any = null;

    protected send(conn: any, data: any): void {
        console.log('[SERVER - SEND]', data);
        conn.emit('message', JSON.stringify(data));
    }

    protected broadcastMessage(message: any, skipPlayerId = 0): void {
        this.connectedPlayers.forEach((client: IConnectedPlayer) => {
            if (client.summonerId !== skipPlayerId) {
                this.send(client.socket, {
                    type: message.type,
                    ...message
                });
            }
        });
    }

    protected loadRoutes = (): void => {
        if (!this.io) {
            return;
        }

        const that = this;

        this.io.on('connection', (socket: any) => {
            console.log('a user connected');
            socket.on('disconnect', () => that.handleCloseConnection(socket));
            socket.on('data', (message: string) => that.handleCommunication(socket, message));
        });
    }
    protected loadSocket = () => {
        this.io = new Server(this.httpServer, {
            cors: {
                origin: '*',
            }
        });
    };

    protected disconnectPlayer(player: IConnectedPlayer): void {
        console.log('[SERVER - disconnect player]', player.summonerId);
        player.socket.disconnect();
    }

    public start = (port: number) => {
        const HOST = '0.0.0.0';
        this.httpServer.listen(port, HOST, () => {
            this.loadSocket();
            this.loadRoutes();
            console.log(`[socket-io] Now listening on port ${port}`);
        });
    };
}

module.exports = {SocketIOServer};
