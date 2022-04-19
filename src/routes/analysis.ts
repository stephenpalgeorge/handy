import { Request, Response, NextFunction, Router } from "express";
import {Hand, HandDescription} from "../types/hand";
import analyseHand from "../lib/analyseHand";

const router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
   try {
      const hand: Hand = req.body.hand;
      // @todo replace this stuff with express-validator
      if (!hand) return next('you must provide a hand for analysis');
      else if (hand.length !== 5) return next('hand must have 5 cards...');

      const description: HandDescription = analyseHand(hand);
      return res.json({ description });
   } catch (e) {
      return next(e);
   }
});

export default router;
