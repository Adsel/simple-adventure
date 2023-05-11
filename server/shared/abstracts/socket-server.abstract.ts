import {API_METHOD_LOGIN} from "../api/auth/login";
import {JSON_PARSER} from "../constants/json-parser";
import {IConnectedPlayer} from "../interfaces/players/connected-player.interface";

export abstract class SocketServer {
    protected httpServer: any;
    protected appServer: any;
    protected connectedPlayers: IConnectedPlayer[] = [];

    constructor(httpServer: any, appServer: any) {
        this.httpServer = httpServer;
        this.appServer = appServer;
        this.loadApiRoutes();
    }

    protected abstract broadcastMessage(message: object): void;
    protected abstract loadRoutes(): void;
    protected abstract loadSocket(): void;

    protected abstract handlePlayerConnected(conn: any, data: any): void;
    protected abstract handleCommunication(conn: any, data: any): void;
    protected abstract handlePlayerMovement(conn: any, data: any): void;

    public abstract start(port: number): void;

    protected rememberConnectedPlayer(player: any, socket: any): void {
        const isAlreadyConnected = this.connectedPlayers.find(connectedPlayer => connectedPlayer.summonerId === player.summonerId);
        if (isAlreadyConnected) {
            isAlreadyConnected.socket.close();
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

    public loadApiRoutes(): void {
        this.appServer.get('/', (req: any, res: any) => res.send('SimpleAdventure API - version 1.0.0'));
        this.appServer.post('/api/auth/login', JSON_PARSER, (req: any, res: any, next: any) => API_METHOD_LOGIN(req, res, next));
    }
}
