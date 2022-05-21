import {Card} from "../../types/card";
import {cardRank} from "../_data";

/**
 * Return the value of the lowest card in a hand (suit is not important).
 * @param hand {Card[]} - an array of 5 objects, each of type Card.
 * @return {string} - the value of the lowest card, from '1' - 'A'.
 *
 * @see '/src/lib/utils/getHighCard.ts' for full comments/documentation, the implementation
 * here is almost identical.
 *
 */
export default function getLowCard(hand: Card[]): string {
    const values: string[] = hand.map(c => c.value);
    const ranks: number[] = values.map(v => cardRank.indexOf(v));
    // this is the only difference to `getHighCard`. Here we organise the ranks
    // from lowest -> highest.
    const value: number = ranks.sort((a, b) => a - b)[0];
    return cardRank[value];
}
