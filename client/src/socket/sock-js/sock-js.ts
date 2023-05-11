import {SocketClient} from "@/socket/shared/socket-client.abstract";
import SockJS from "sockjs-client";

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
        console.log('[CLIENT - SEND]', type, data);
        this.socket.send(JSON.stringify({
            type,
            ...data
        }));
    }

    public closeConnection(): void {
        console.log('[CLIENT - PLAYER EXIT]');
        this.socket.close();
    }

    protected parseMessageData(event: any): any {
        return event && event.data ? JSON.parse(event.data) : null;
    }
}



