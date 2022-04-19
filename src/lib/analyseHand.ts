import {Card} from '../types/card';
import {Feature, Hand, HandDescription, HandQuality, HandType} from "../types/hand";
import {cardRank, deck, handRank} from "./_data";

/**
 * Analyse an array of five "cards" and determine the poker hand that it represents.
 *
 * @param hand {array} - the hand to be analysed; an array of 5 strings, each representing a card.
 * @return HandDescription {HandDescription} - an object that gives details of the hand that has been analysed.
 * @example analyseHand(['3-s', '3-d', '8-c', '9-h', 'A-h']) -> { type: 'pair', rank: 1, features: [{type: 'pair', value: '3'}], cards: ['3-s', '3-d', '8-c', '9-h', 'A-h'] }
 * @example analyseHand(['4-s', '5-s', '8-s', '7-s', '6-s']) -> { type: 'straight-flush', rank: 8, features: [{type: 'straight', value: '4 - 8'}, {type: 'flush', value: 's'}], cards: ['4-s', '5-s', '8-s', '7-s', '6-s'] }
 */
export default function analyseHand(hand: Hand): HandDescription {
    // safety first...
    hand.forEach((card) => {
        // check for invalid cards...
        if (!deck.includes(card)) throw new Error('hand includes invalid cards.');
        // check for duplicates...
        if (hand.filter(h => h === card).length > 1) throw new Error(`hand cannot include duplicates. (${card})`);
    });

    // ----------
    // HAND ANALYSES
    // ----------
    // state variables:
    let hasPairs = false;
    let hasThree = false;
    let hasFour = false;
    let hasStraight = false;
    let hasFlush = false;

    // split each card into its number and suit
    let cards: Card[] = [];
    hand.forEach(card => {
        let parts = card.split('-');
        cards.push({ value: parts[0], suit: parts[1] });
    });

    let features: Feature[] = [];
    // gather cards into meaningful groups
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
                    hasFour = true;
                }
                break;
            case 3:
                if (
                    features.map(f => f.type).filter(t => t === 'three').length === 0 &&
                    features.map(f => f.value).filter(v => v === value).length === 0
                ) {
                    features.push({ type: 'three', value });
                    hasThree = true;
                }
                break;
            case 2:
                if (
                    features.filter(f => f.type === 'pair').map(f => f.value).filter(v => v === value).length === 0
                ) {
                    features.push({ type: 'pair', value });
                    hasPairs = true;
                }
                break;
            case 1:
            default:
                break;
        }
    });

    if (!hasFour && !hasThree && !hasPairs) {
        // check for a flush
        const flush = cards.filter(c => c.suit === cards[0].suit);
        if (flush.length === 5) {
            features.push({ type: 'flush', value: cards[0].suit });
            hasFlush = true;
        }

        // check for a straight
        const cardsAsRank: number[] = cards.map(c => cardRank.indexOf(c.value)).sort((a, b) => a - b);
        const straight = cardsAsRank.filter((c, i) => {
            const isSequential = cardsAsRank[i + 1] === c + 1;
            if (isSequential || i === 4) return c;
        });
        if (straight.length === 5) {
            features.push({ type: 'straight', value: `${straight[0] + 1} - ${straight[4] + 1}` });
            hasStraight = true;
        }
    }

    if (!hasFour && !hasThree && !hasPairs && !hasFlush && !hasStraight) {
        // all other cases have been covered, so we must just have a high card.
        let highCard = cards.map(c => c.value).reduce(
            (prev, curr) => {
                let isHigher = cardRank.indexOf(curr) > cardRank.indexOf(prev);
                return isHigher ? curr : prev;
            }
        );
        features.push({ type: 'high', value: highCard });
    }

    const quality = calculateQuality(features);
    return {
        type: quality.type,
        rank: quality.rank,
        features,
        cards,
    }
}

/**
 * Take a list of features and calculate the quality of the associated hand.
 *
 * @param features {Feature[]} - features will be analysed and combine to determine hand quality.
 * @return HandQuality {HandQuality} - an object with the type of hand, and it's rank as a numerical value between 0 - 9 (inclusive).
 */
function calculateQuality(features: Feature[]): HandQuality {
    let type: HandType;
    if (features.length === 1) type = features[0].type;

    else {
        const types = features.map(f => f.type);
        if (types[0] === 'pair' && types[1] === 'pair') type = 'two-pair';
        else if (types.includes('pair') && types.includes('three')) type = 'full-house';
        else {
            const straight = features.filter(f => f.type === 'straight')[0];
            type = straight.value.includes('14') ? 'royal-flush' : 'straight-flush';
        }
    }

    return { type, rank: handRank.indexOf(type) }
}