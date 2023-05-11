import {io} from "socket.io-client";
import {SocketClient} from "@/socket/shared/socket-client.abstract";

export class SocketIOClient extends SocketClient {
    constructor(context: any) {
        super(context);
        this.socket = io(process.env.VUE_APP_WS_URL);
        this.connect();
    }

    protected connect() {
        this.socket.on('connection', () => this.onConnected());

        this.socket.on('message', (event: any) => this.onMessage(event));

        this.socket.on('disconnect', () => this.closeConnection());
    }

    protected send(type: string, data: object): void {
        this.socket.send(JSON.stringify({
            type,
            ...data
        }));
    }

    public closeConnection() {
        this.socket.close();
    }
}
