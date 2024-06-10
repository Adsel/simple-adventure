import {SocketServerAbstract} from "./core/socket-server.abstract";
import {IConnectedPlayer} from "../interfaces/players/connected-player.interface";
import {API_METHOD_GET_SUMMONER_DATA} from "./websocket-api/summoners/summoner";

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
        // TODO:
        // type for `data`
        API_METHOD_GET_SUMMONER_DATA(data, this.connectedPlayers).then((data: any) => {
            this.send(conn, data.player);

            const summonerId = data.summonerId;
            const summoner = data.summoner;

            const playerData: any = {
                summonerId,
                summoner
            };

            playerData.summoner.characterImage = 'characters/Sprite-character-0002.png';
            this.rememberConnectedPlayer(playerData, conn);
            this.broadcastMessage({
                type: 'another-player-connected',
                player: summoner,
                summonerId
            }, summonerId);
        });
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

    // TODO:
    // private checkCollision(hero) {
    //     for (const obj of objects) {
    //         if (
    //             hero.x < obj.x + obj.width &&
    //             hero.x + hero.width > obj.x &&
    //             hero.y < obj.y + obj.height &&
    //             hero.y + hero.height > obj.y
    //         ) {
    //             // Kolizja z obiektem, można tutaj obsłużyć zdarzenie kolizji
    //             return true;
    //         }
    //     }
    //     // Brak kolizji
    //     return false;
    // }
}
