import {Card} from "../../types/card";
import {cardRank} from "../_data";

export default function getLowCard(hand: Card[]): number {
    const values = hand.map(c => c.value);
    const ranks = values.map(v => cardRank.indexOf(v));
    return ranks.sort((a, b) => b - a)[0];
}
