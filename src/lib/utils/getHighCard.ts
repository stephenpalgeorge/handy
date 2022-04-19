import {Card} from "../../types/card";
import {cardRank} from "../_data";

export default function getHighCard(hand: Card[]): number {
    const values = hand.map(c => c.value);
    const ranks = values.map(v => cardRank.indexOf(v));
    return ranks.sort((a, b) => a - b)[0];
}
