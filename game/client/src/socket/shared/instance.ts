import {GameSocketClient} from "@/socket/socket";

export const getSocketClientInstance = (context: any) => {
    return new GameSocketClient(context);
}
