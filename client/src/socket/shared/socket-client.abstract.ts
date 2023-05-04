import {getFromLocalStorage} from "@/pages/game/helpers/local-storage.helper";
import {LocalStorageKeyEnum} from "@/enums/local-storage-key.enum";

export abstract class SocketClient {
    protected handler: any;
    protected socket: any;
    protected abstract onConnected(): void;
    protected abstract closeConnection(): void;
    protected abstract send(type: string, data: any): void;

    protected constructor(context: any) {
        this.handler = context;
    }

    public moveCharacter(posX: number, posY: number) {
        this.send('movement', {
            summonerId: getFromLocalStorage(LocalStorageKeyEnum.SummonerIdentifier),
            x: posX,
            y: posY
        });
    }
}
