import {Card} from "../../types/card";
import {Feature} from "../../types/hand";

export default function findFlush(cards: Card[]): Feature[] {
    let features: Feature[] = [];

    // check for a flush
    const flush = cards.filter(c => c.suit === cards[0].suit);
    if (flush.length >= 5) features.push({ type: 'flush', value: cards[0].suit });

    return features;
}
