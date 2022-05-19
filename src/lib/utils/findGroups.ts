import {Card} from "../../types/card";
import {Feature} from "../../types/hand";

export default function findGroups(cards: Card[]): Feature[] {
    let features: Feature[] = [];

    cards.forEach(({ value }) => {
        // filter the cards for all those that have the same value as the current card.
        const similar = cards.filter(c => c.value === value);
        // the length of that array will determine the hand feature.
        // Also, in each case, we need to make sure we're not duplicating features.
        switch (similar.length) {
            case 4:
                if (
                    features.map(f => f.type).filter(t => t === 'four').length === 0 &&
                    features.map(f => f.value).filter(v => v === value).length === 0
                ) {
                    features.push({ type: 'four', value });
                }
                break;
            case 3:
                if (
                    features.map(f => f.type).filter(t => t === 'three').length === 0 &&
                    features.map(f => f.value).filter(v => v === value).length === 0
                ) {
                    features.push({ type: 'three', value });
                }
                break;
            case 2:
                if (features.filter(f => f.type === 'pair').map(f => f.value).filter(v => v === value).length === 0) {
                    features.push({ type: 'pair', value });
                }
                break;
            case 1:
            default:
                break;
        }
    });

    return features;
}