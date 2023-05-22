import {SocketServerAbstract} from "./core/socket-server.abstract";
import {IConnectedPlayer} from "../interfaces/players/connected-player.interface";

export abstract class SocketGameServerAbstract extends SocketServerAbstract {
    constructor(httpServer: any, appServer: any) {
        super(httpServer, appServer);
    }

    protected handleCommunication(conn: any, message: string): void {
        console.log(message);
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
        this.send(conn, {
            type: data.type,
            location: {
                // TODO:
                // zapisać dane o mapie do bazy
                // odczytać z bazy
                backgroundImage: 'backgrounds/Sprite-background-0001.png',
                width: 640,
                height: 640
            },
            summoner,
            players: this.connectedPlayers.map((connectedPlayer: IConnectedPlayer) => {
                return {
                    summonerId: connectedPlayer.summonerId,
                    ...connectedPlayer.summoner,
                };
            })
        });

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


    protected handlePlayerMovement(conn: any, data: any): void {
        if (!data.summonerId) {
            return;
        }
        const summonerId = +data.summonerId;
        // move
        this.connectedPlayers = this.connectedPlayers.map((connectedPlayer: IConnectedPlayer) => {
            // TODO:
            // check collisions
            if (connectedPlayer.summonerId === summonerId) {
                connectedPlayer.summoner.x = data.x;
                connectedPlayer.summoner.y = data.y;
            }
            return connectedPlayer;
        });
        // send
        const anotherPlayer = this.connectedPlayers.find((connectedPlayer: IConnectedPlayer) => connectedPlayer.summonerId === summonerId);
        this.send(conn, {message: 'ok'});
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
}
