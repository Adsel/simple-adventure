import {API_METHOD_LOGIN} from "../../api/auth/login";
import {IConnectedPlayer} from "../../interfaces/players/connected-player.interface";
import {API_METHOD_REGISTER} from "../../api/auth/register";
import {API_METHOD_GET_SUMMONERS} from "../../api/player/summoners";
import {middleware} from "../../middlewares";
import {API_METHOD_REMIND_PASSWORD} from "../../api/auth/remind-password";

export abstract class SocketServerAbstract {
    protected httpServer: any;
    protected appServer: any;
    protected connectedPlayers: IConnectedPlayer[] = [];

    protected constructor(httpServer: any, appServer: any) {
        this.httpServer = httpServer;
        this.appServer = appServer;
        this.loadApiRoutes();
        this.loadSecuredApiRoutes();
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
        this.appServer.post('/api/auth/login', async (req: any, res: any, next: any) => await API_METHOD_LOGIN(req, res, next));
        this.appServer.post('/api/auth/remind-password', async (req: any, res: any, next: any) => await API_METHOD_REMIND_PASSWORD(req, res, next));
        this.appServer.post('/api/auth/register', async (req: any, res: any, next: any) => await API_METHOD_REGISTER(req, res, next));
    }

    public loadSecuredApiRoutes(): void {
        this.appServer.get(`/api/player/:playerId/summoners`, middleware.auth, async (req: any, res: any, next: any) => await API_METHOD_GET_SUMMONERS(req, res, next));
    }
}
