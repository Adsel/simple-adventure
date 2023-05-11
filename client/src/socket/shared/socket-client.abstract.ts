import {getFromLocalStorage} from "@/pages/game/helpers/local-storage.helper";
import {LocalStorageKeyEnum} from "@/enums/local-storage-key.enum";

export abstract class SocketClient {
    protected handler: any;
    protected socket: any;

    protected abstract connect(): void;

    protected abstract closeConnection(): void;

    protected abstract send(type: string, data: any): void;

    protected constructor(context: any) {
        this.handler = context;
    }

    public moveCharacter(x: number, y: number) {
        this.send('movement', {
            summonerId: getFromLocalStorage(LocalStorageKeyEnum.SummonerIdentifier),
            x: x,
            y: y
        });
    }

    protected onConnected(): void {
        this.send('initial-data', {
            summonerId: getFromLocalStorage(LocalStorageKeyEnum.SummonerIdentifier)
        });
    }

    protected onMessage(event: any): void {
        const data = JSON.parse(event.data);
        if (!data || !data.type) {
            return;
        }


        if (data.type === 'initial-data') {
            this.handler.onInitialDataLoaded(data);
        } else if (data.type === 'movement') {
            this.handler.onPlayersMovement(data);
        } else if (data.type === 'another-player-connected') {
            this.handler.onAnotherPlayerConnected(data);
        } else if (data.type === 'another-player-movement') {
            this.handler.onAnotherPlayerMoved(data);
        } else if (data.type === 'another-player-disconnected') {
            this.handler.onAnotherPlayerDisconnected(data);
        }
    }
}
