import express from 'express';
import connectionRouter from "./routes/Connection";

const app = express();

export function runExpressServer(port: number): void {
    app.use('/connection', connectionRouter)

    app.listen(port, () => {
        console.log(`Now listening on port ${port}`);
    });
}
