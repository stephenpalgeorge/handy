import { Request, Response, NextFunction, Router } from "express";
import {GameHand, GameHandDescription, Hand, HandDescription} from "../types/hand";
import * as controller from '../controllers/hand.controller';

const router = Router();

router.post('/analysis', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hand: Hand = req.body.hand;
        // VALIDATION
        if (!hand) return next('you must provide a hand for analysis');
        else if (hand.length !== 5) return next('hand must have 5 cards...');

        const description: HandDescription = controller.analyse(hand);
        return res.json({ description });
    } catch (e) {
        return next(e);
    }
});

router.post('/comparison', (req: Request, res: Response, next: NextFunction) => {
    try {
        const hands: GameHand[] = req.body.hands;
        // VALIDATION
        if (!hands || hands.length === 0) throw new Error('you must provide some hands for comparison.');

        // if, for some reason, there's only 1 hand, we can just send it straight back, as it must be the "best".
        if (hands.length === 1) return res.json({ best: hands[0] });
        // otherwise, run the comparison.
        const best: GameHandDescription = controller.compare(hands);
        return res.json({ best });
    } catch (e) {
        return next(e);
    }
});

export default router;
