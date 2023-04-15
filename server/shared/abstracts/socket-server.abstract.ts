export abstract class SocketServer {
    protected httpServer: any;

    constructor(httpServer: any) {
        this.httpServer = httpServer;
    }

    protected abstract loadRoutes(): void;

    protected abstract loadSocket(): void;

    public abstract start(port: number): void;
}
