import express, {Express, Request, Response} from "express";
import bodyParser from "body-parser";
import {handRoutes} from './routes';

const app: Express = express();
const PORT = process.env.PORT || 3404;

app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Handy api...')
});

app.use('/api/hands', handRoutes);

app.listen(PORT,() => {
    console.log(`[server] Handy api running on port ${PORT}`);
});
