export abstract class SocketClient {
    protected handler: any;
    protected socket: any;
    protected abstract onConnected(): void;
    protected abstract closeConnection(): void;
    protected abstract send(type: string, data: any): void;

    protected constructor(context: any) {
        this.handler = context;
    }
}
