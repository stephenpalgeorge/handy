import {Card} from "../../types/card";

export function split(hand: string[]): Card[] {
    let cards: Card[] = [];
    hand.forEach(card => {
        let parts = card.split('-');
        cards.push({ value: parts[0], suit: parts[1] });
    });

    return cards;
}

export function join(cards: Card[]): string[] {
    return cards.map(c => `${c.value}-${c.suit}`);
}
