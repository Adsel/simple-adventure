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
            if (!data) {
                return '';
            }

            if (data?.type === 'initial-data') {
                console.log(data);
                this.handler.onInitialDataLoaded({
                    backgroundImage: data.location.backgroundImage,
                    xPos: data.summoner.x,
                    yPos: data.summoner.y,
                    characterImage: data.summoner.characterImage,
                });
            }
        //    this.socket.close();
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



