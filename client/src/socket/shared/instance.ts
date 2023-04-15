import {SocketIOClient} from "@/socket/socket-io/socket-io";
import {SocketJSClient} from "@/socket/sock-js/sock-js";

export const getSocketClientInstance = () => {
    return process.env.VUE_APP_MODE === 'socket-io' ? new SocketIOClient() : new SocketJSClient();
}
