import {API_METHOD_LOGIN} from "../../api/auth/login";
import {JSON_PARSER} from "../../constants/json-parser";
import {IConnectedPlayer} from "../../interfaces/players/connected-player.interface";

export abstract class SocketServerAbstract {
    protected httpServer: any;
    protected appServer: any;
    protected connectedPlayers: IConnectedPlayer[] = [];

    protected constructor(httpServer: any, appServer: any) {
        this.httpServer = httpServer;
        this.appServer = appServer;
        this.loadApiRoutes();
    }

    protected abstract send(conn: any, data: any): void;

    protected abstract broadcastMessage(message: object, skipPlayerId: number): void;

    protected abstract loadRoutes(): void;

    protected abstract loadSocket(): void;
    protected abstract disconnectPlayer(player: IConnectedPlayer): void;

    public abstract start(port: number): void;

    protected rememberConnectedPlayer(player: any, socket: any): void {
        const isAlreadyConnected = this.connectedPlayers.find(connectedPlayer => connectedPlayer.summonerId === player.summonerId);
        if (isAlreadyConnected) {
            this.disconnectPlayer(isAlreadyConnected);
            this.forgetConnectedPlayer(isAlreadyConnected);
        }

        this.connectedPlayers.push({
            summonerId: player.summonerId,
            summoner: player.summoner,
            socket: socket
        });
    }

    protected forgetConnectedPlayer(player: IConnectedPlayer): void {
        this.connectedPlayers = this.connectedPlayers.filter(connectedPlayer => connectedPlayer.summonerId !== player.summonerId);
    }

    protected handleCloseConnection(conn: any): void {
        this.connectedPlayers = this.connectedPlayers.filter((connectionData: any) => {
            if (connectionData.socket.id === conn.id) {
                connectionData.socket.write(JSON.stringify({
                    summonerId: connectionData.summonerId,
                    type: 'another-player-disconnected'
                }));
            }
            return connectionData.socket.id !== conn.id;
        })
    }

    public loadApiRoutes(): void {
        this.appServer.get('/', (req: any, res: any) => res.send('SimpleAdventure API - version 1.0.0'));
        this.appServer.post('/api/auth/login', JSON_PARSER, (req: any, res: any, next: any) => API_METHOD_LOGIN(req, res, next));
    }
}
