import {io} from "socket.io-client";
import {SocketClient} from "@/socket/shared/socket-client.abstract";

export class SocketIOClient extends SocketClient {
    constructor(context: any) {
        super(context);
        this.socket = io(process.env.VUE_APP_WS_URL || '');
        this.connect();
    }

    protected connect(): void {
        this.onConnected();

        this.socket.on('message', (event: any) => this.onMessage(event));
        this.socket.on('disconnect', () => this.closeConnection());
    }

    protected parseMessageData(event: string): any {
        return event ? JSON.parse(event) : null;
    }

    protected send(type: string, data: object): void {
        console.log('[CLIENT - SEND]', type, data);
        this.socket.emit('data', JSON.stringify({
            type,
            ...data
        }));
    }

    public closeConnection(): void {
        console.log('[CLIENT - PLAYER EXIT]');
        this.socket.disconnect();
    }

}
