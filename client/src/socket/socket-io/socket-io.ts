import {io} from "socket.io-client";
import {SocketClient} from "@/socket/shared/socket-client.abstract";

export class SocketIOClient extends SocketClient {
    constructor(context: any) {
        super(context);
        this.socket = io(process.env.VUE_APP_WS_URL);
        this.onConnected();
    }

    onConnected() {
        // this.socket.emit('chat message', 'testy');
        // this.socket.on("hello", (arg: any) => console.log(arg));
        // this.socket.emit('howdy', 'stranger');
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
