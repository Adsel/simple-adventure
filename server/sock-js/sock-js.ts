import {createServer, Server} from 'sockjs';
import {IConnectedPlayer} from "../shared/interfaces/players/connected-player.interface";
import {SocketGameServerAbstract} from "../shared/abstracts/socket-game-server.abstract";

class SockJSServer extends SocketGameServerAbstract {
    private io: Server | null = null;

    protected send(conn: any, data: any): void {
        console.log('[SERVER - SEND]', data);
        conn.write(JSON.stringify(data));
    }

    protected broadcastMessage(message: object, skipPlayerId = 0): void {
        this.connectedPlayers.forEach((client: IConnectedPlayer) => {
            if (client.summonerId !== skipPlayerId) {
                client.socket.write(JSON.stringify(message));
            }
        });
    }

    protected loadRoutes = (): void => {
        if (!this.io) {
            return;
        }

        const that = this;
        this.io.on('connection',  (conn: any) => {
            conn.on('data', (message: string) => that.handleCommunication(conn, message));
            conn.on('close', () => that.handleCloseConnection(conn));
        });
    }

    protected loadSocket = () => {
        this.io = createServer({prefix: '/ws'});
        this.io.installHandlers(this.httpServer);
    };

    public start = (port: number) => {
        this.httpServer.listen(port, () => {
            this.loadSocket();
            this.loadRoutes();
            console.log(`[sock-js] Now listening on port ${port}`);
        });

        this.appServer.get('/', (req: any, res: any) => {
            console.log('req', req);
            res.send('GET request to the homepage')
        });
    };

    protected disconnectPlayer(player: IConnectedPlayer): void {
        console.log('[SERVER - disconnect player]', player.summonerId);
        player.socket.close();
    }
}

module.exports = {SockJSServer};
