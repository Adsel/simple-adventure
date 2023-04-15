import {SocketServer} from "../shared/abstracts/socket-server.abstract";
import {createServer, Server} from 'sockjs';

class SockJSServer extends SocketServer {
    private io: Server | null = null;

    protected loadRoutes = (): void => {
        if (!this.io) {
            return;
        }

        // this.io.on('connection', (socket: any) => {
        //
        // });
        this.io.on('connection', function(conn: any) {
            conn.on('data', function(message: string) {
                conn.write(message);
            });
            conn.on('close', function() {});

            conn.emit('hello', 'world');
        });
    }

    protected loadSocket = () => {
        // this.io = new Server(this.httpServer, {
        //     cors: {
        //         origin: '*',
        //     }
        // });
        this.io = createServer({prefix: '/ws'});
        this.io.installHandlers(this.httpServer);
        // this.io.attach(this.httpServer);
    };

    public start = (port: number) => {
        this.httpServer.listen(port, () => {
            this.loadSocket();
            this.loadRoutes();
            console.log(`[sock-js] Now listening on port ${port}`);
        });
    };
}

module.exports = {SockJSServer};
