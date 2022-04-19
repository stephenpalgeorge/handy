import { Response, Request, NextFunction, Router } from "express";
import {GameHand, GameHandDescription} from "../types/hand";
import compareHands from "../lib/compareHands";

const router = Router();

router.post('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        const hands: GameHand[] = req.body.hands;
        const best: GameHandDescription = compareHands(hands);
        return res.json({ best });
    } catch (e) {
        return next(e);
    }
});

export default router;
