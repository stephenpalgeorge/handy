import {Card} from "../../types/card";
import {Feature} from "../../types/hand";
import {cardRank} from "../_data";

export default function findStraight(cards: Card[]): Feature[] {
    let features: Feature[] = [];

    // check for a straight
    const cardsAsRank: number[] = cards.map(c => cardRank.indexOf(c.value)).sort((a, b) => a - b);
    const straight = cardsAsRank.filter((c, i) => {
        const isSequential = cardsAsRank[i + 1] === c + 1;
        if (isSequential || i === cardsAsRank.length - 1) return c;
    });
    if (straight.length >= 5) features.push({ type: 'straight', value: `${straight[straight.length - 1]}` });

    return features;
}
