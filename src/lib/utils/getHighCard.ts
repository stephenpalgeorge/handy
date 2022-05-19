import {Card} from "../../types/card";
import {cardRank} from "../_data";

export default function getHighCard(hand: Card[]): string {
    const values = hand.map(c => c.value);
    const ranks = values.map(v => cardRank.indexOf(v));
    const value = ranks.sort((a, b) => b - a)[0];
    return cardRank[value];
}
