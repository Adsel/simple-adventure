import {SocketClient} from "@/socket/shared/socket-client.abstract";
import SockJS from "sockjs-client";
import {getFromLocalStorage} from "@/pages/game/helpers/local-storage.helper";
import {LocalStorageKeyEnum} from "@/enums/local-storage-key.enum";

export class SocketJSClient extends SocketClient {

    constructor(context: any) {
        super(context);
        this.socket = new SockJS(process.env.VUE_APP_WS_URL);
        this.onConnected();
    }

    onConnected() {
        this.socket.onopen = () => {
            this.send('initial-data', {
                summonerId: getFromLocalStorage(LocalStorageKeyEnum.SummonerIdentifier)
            });
        };

        this.socket.onmessage = (e: any) => {
            const data = JSON.parse(e.data);
            if (!data || !data.type) {
                return '';
            }

            console.log(data);
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
        };

        this.socket.onclose = function() {
            console.log('close');
        };
    }

    protected send(type: string, data: object): void {
        this.socket.send(JSON.stringify({
            type,
            ...data
        }));
    }

    public closeConnection(): void {
        this.socket.close();
    }
}



