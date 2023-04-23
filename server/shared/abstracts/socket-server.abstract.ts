import {API_METHOD_LOGIN} from "../api/auth/login";
import {JSON_PARSER} from "../constants/json-parser";

export abstract class SocketServer {
    protected httpServer: any;
    protected appServer: any;

    constructor(httpServer: any, appServer: any) {
        this.httpServer = httpServer;
        this.appServer = appServer;
        this.loadApiRoutes();
    }

    protected abstract loadRoutes(): void;

    protected abstract loadSocket(): void;

    public abstract start(port: number): void;

    public loadApiRoutes(): void {
        this.appServer.get('/', (req: any, res: any) => res.send('SimpleAdventure API - version 1.0.0'));
        this.appServer.post('/api/auth/login', JSON_PARSER, (req: any, res: any, next: any) => API_METHOD_LOGIN(req, res, next));
    }
}
