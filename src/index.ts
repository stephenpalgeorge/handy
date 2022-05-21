import express, {Express, Request, Response} from "express";
import bodyParser from "body-parser";
import {handRoutes} from './routes';

import compareHands from "./lib/compareHands";
import {GameHand} from "./types/hand";

const hands: GameHand[] = [
    { id: '1', hand: ['3-d', '3-c', '3-s', '8-h', 'J-s'] },
    { id: '2', hand: ['10-s', 'J-s', 'Q-s', 'K-s', 'A-s'] },
    { id: '3', hand: ['10-h', 'J-s', 'Q-s', 'K-s', 'A-s'] },
    { id: '4', hand: ['3-d', '4-d', '5-d', '6-d', '7-d'] },
];

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

const output = compareHands(hands);
// console.log(output);


