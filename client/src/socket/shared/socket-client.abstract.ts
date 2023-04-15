export abstract class SocketClient {

    protected socket: any;
    protected abstract onConnected(): void;
}
