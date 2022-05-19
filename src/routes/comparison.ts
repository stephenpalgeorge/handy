import { Response, Request, NextFunction, Router } from "express";
import {GameHand, GameHandDescription} from "../types/hand";
import compareHands from "../lib/compareHands";

const router = Router();

router.post('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        const hands: GameHand[] = req.body.hands;
        // VALIDATION
        if (!hands || hands.length === 0) throw new Error('you must provide some hands for comparison.');

        // if, for some reason, there's only 1 hand, we can just send it straight back, as it must be the "best".
        if (hands.length === 1) return res.json({ best: hands[0] });
        // otherwise, run the comparison.
        const best: GameHandDescription = compareHands(hands);
        return res.json({ best });
    } catch (e) {
        return next(e);
    }
});

export default router;
