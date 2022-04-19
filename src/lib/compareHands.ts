import {GameHand, GameHandDescription} from "../types/hand";
import analyseHand from "./analyseHand";

export default function compareHands(hands: GameHand[]): GameHandDescription {
    const HandDescriptions = hands.map(h => analyseHand(h.hand));
    // console.log(HandDescriptions);

    let best: number = 0;
    let tie: number|undefined = undefined;
    HandDescriptions.forEach((d, i) => {
        if (d.rank > HandDescriptions[best].rank) best = i;
    });

    // @todo - what if two hands have the same rank..?

    return {
        id: hands[best].id,
        hand: HandDescriptions[best],
    };
}
