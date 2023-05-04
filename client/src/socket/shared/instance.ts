import {SocketIOClient} from "@/socket/socket-io/socket-io";
import {SocketJSClient} from "@/socket/sock-js/sock-js";

export const getSocketClientInstance = (context: any) => {
    return process.env.VUE_APP_MODE === 'socket-io' ? new SocketIOClient(context) : new SocketJSClient(context);
}
