import {Card} from "../../types/card";
import {cardRank} from "../_data";

/**
 * Return the value of the highest card in a hand (suit is not important).
 * @param hand {Card[]} - an array of five objects of type Card.
 * @return {string} - the value of the highest card, from '1' - 'A'.
 *
 */
export default function getHighCard(hand: Card[]): string {
    // get an array of just the card values
    const values: string[] = hand.map(c => c.value);
    // get the index of each card from the cardRank array. This gives you a relative weight
    // of the value of the card (i.e. a number from 0 - 12)
    const ranks: number[] = values.map(v => cardRank.indexOf(v));
    // sort the indexes that we just collected from highest -> lowest and grab the first element.
    // As we have just sorted the array, this is guaranteed to be the highest value from the hand.
    const value: number = ranks.sort((a, b) => b - a)[0];
    // use the integer collected above to lookup up the card value
    return cardRank[value];
}
