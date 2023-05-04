import {SocketServer} from "../shared/abstracts/socket-server.abstract";
import {createServer, Server} from 'sockjs';

class SockJSServer extends SocketServer {
    private io: Server | null = null;

    protected loadRoutes = (): void => {
        if (!this.io) {
            return;
        }

        this.io.on('connection', function (conn: any) {
            conn.on('data',
                function (message: string) {
                    const value: any = JSON.parse(message);
                    if (!value || !value.type) {
                        return;
                    }

                    if (value.type === 'initial-data') {
                        if (!value.summonerId) {
                            return;
                        }
                        conn.write(JSON.stringify({
                            type: value.type,
                            location: {
                                backgroundImage: 'backgrounds/Sprite-background-0001.png',
                            },
                            summoner: {
                                // TODO: read from db
                                characterImage: 'characters/Sprite-character-0001.png',
                                x: 32,
                                y: 32
                            }
                        }));
                    }
                }
            );

            conn.on('close', function () {
            });

            // conn.emit('hello', 'world');
        });
    }

    protected loadSocket = () => {
        this.io = createServer({prefix: '/ws'});
        this.io.installHandlers(this.httpServer);
    };

    public start = (port: number) => {
        this.httpServer.listen(port, () => {
            this.loadSocket();
            this.loadRoutes();
            console.log(`[sock-js] Now listening on port ${port}`);
        });

        this.appServer.get('/', (req: any, res: any) => {
            console.log('req', req);
            res.send('GET request to the homepage')
        });
    };
}

module.exports = {SockJSServer};
