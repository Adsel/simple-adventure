import {Request, Response, Router} from 'express';

const connectionRouter = Router();

connectionRouter.get('/', (req: Request, res: Response) => {
    res.send('GET request to homepage')
});

export = connectionRouter;
