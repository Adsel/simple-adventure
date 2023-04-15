import {SocketClient} from "@/socket/shared/socket-client.abstract";
import SockJS from "sockjs-client";

export class SocketJSClient extends SocketClient {
    constructor() {
        super();
        this.socket = new SockJS(process.env.VUE_APP_WS_URL);
        this.onConnected();
    }

    onConnected() {
        this.socket.onopen = () => {
            console.log('open');
            this.socket.send('test');
        };

        this.socket.onmessage = (e: any) => {
            console.log('message', e.data);
            this.socket.close();
        };

        this.socket.onclose = function() {
            console.log('close');
        };
    }
}



