import {deck} from "../_data";

export default function validate(cards: string[]): void {
    cards.forEach((card) => {
        // check for invalid cards...
        if (!deck.includes(card)) throw new Error('hand includes invalid cards.');
        // check for duplicates...
        // filter the cards array by checking each card for equality with the current iteration,
        // the length of the resulting array should be `1`, as the card should only match with
        // itself - anything greater than one indicates a duplicate.
        if (cards.filter(h => h === card).length > 1) throw new Error(`hand cannot include duplicates. (${card})`);
    });
}
