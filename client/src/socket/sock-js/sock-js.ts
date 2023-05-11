import {SocketClient} from "@/socket/shared/socket-client.abstract";
import SockJS from "sockjs-client";
import {getFromLocalStorage} from "@/pages/game/helpers/local-storage.helper";
import {LocalStorageKeyEnum} from "@/enums/local-storage-key.enum";

export class SocketJSClient extends SocketClient {

    constructor(context: any) {
        super(context);
        this.socket = new SockJS(process.env.VUE_APP_WS_URL);
        this.connect();
    }

    protected connect() {
        this.socket.onopen = () => this.onConnected();

        this.socket.onmessage = (event: any) => this.onMessage(event);

        this.socket.onclose = () => this.closeConnection();
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



