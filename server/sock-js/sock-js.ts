import {SocketServer} from "../shared/abstracts/socket-server.abstract";
import {createServer, Server} from 'sockjs';
import {IConnectedPlayer} from "../shared/interfaces/players/connected-player.interface";

class SockJSServer extends SocketServer {
    private io: Server | null = null;

    protected broadcastMessage(message: object, skipPlayerId = 0): void {
        this.connectedPlayers.forEach((client: IConnectedPlayer) => {
            if (client.summonerId !== skipPlayerId) {
                client.socket.write(JSON.stringify(message));
            }
        });
    }

    protected loadRoutes = (): void => {
        const that = this;
        if (!this.io) {
            return;
        }

        this.io.on('connection', function (conn: any) {
            conn.on('data', (message: string) => that.handleCommunication(conn, message));
            conn.on('close', () => that.connectedPlayers = that.connectedPlayers.filter((connectionData: any) => {
                if (connectionData.socket.id === conn.id) {
                    connectionData.socket.write(JSON.stringify({
                        summonerId: connectionData.summonerId,
                        type: 'another-player-disconnected'
                    }));
                }
                return connectionData.socket.id !== conn.id;
            }));
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

    protected handleCommunication(conn: any, message: string): void {
        const value: any = JSON.parse(message);
        if (!value || !value.type) {
            return;
        }

        if (value.type === 'initial-data') {
            this.handlePlayerConnected(conn, value);
        } else if (value.type === 'movement') {
            this.handlePlayerMovement(conn, value);
        }
    }

    protected handlePlayerMovement(conn: any, data: any): void {
        if (!data.summonerId) {
            return;
        }
        const summonerId = +data.summonerId;
        // move
        this.connectedPlayers = this.connectedPlayers.map((connectedPlayer: IConnectedPlayer) => {
            if (connectedPlayer.summonerId === summonerId) {
                connectedPlayer.summoner.x = data.x;
                connectedPlayer.summoner.y = data.y;
            }
            return connectedPlayer;
        });
        // send
        const anotherPlayer = this.connectedPlayers.find((connectedPlayer: IConnectedPlayer) => connectedPlayer.summonerId === summonerId);
        conn.write(JSON.stringify({message: 'ok'}));
        if (!anotherPlayer) {
            return;
        }
        this.broadcastMessage({
            type: 'another-player-movement',
            anotherPlayer: {
                summonerId: anotherPlayer.summonerId,
                x: anotherPlayer.summoner.x,
                y: anotherPlayer.summoner.y,
            }
        }, summonerId);

    }

    protected handlePlayerConnected(conn: any, data: any): void {
        if (!data.summonerId) {
            return;
        }
        const summonerId = +data.summonerId;
        // TODO: read from db
        const summoner: any = {
            characterImage: 'characters/Sprite-character-0001.png',
            x: 0,
            y: 0
        };
        conn.write(JSON.stringify({
            type: data.type,
            location: {
                backgroundImage: 'backgrounds/Sprite-background-0001.png',
            },
            summoner,
            players: this.connectedPlayers.map((connectedPlayer: IConnectedPlayer) => {
                return {
                    summonerId: connectedPlayer.summonerId,
                    ...connectedPlayer.summoner,
                };
            })
        }));

        const playerData: any = {
            summonerId,
            summoner
        };
        this.rememberConnectedPlayer(playerData, conn);
        this.broadcastMessage({
            type: 'another-player-connected',
            player: summoner,
            summonerId
        }, summonerId);
    }
}

module.exports = {SockJSServer};
