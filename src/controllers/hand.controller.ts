import {Card} from '../types/card';
import {
    Feature,
    GameHand,
    GameHandDescription,
    Hand,
    HandDescription,
    HandQuality,
    HandType
} from "../types/hand";
import {deck, handRank} from "../lib/_data";
import {
    findFlush,
    findGroups,
    findStraight,
    format,
    getHighCard,
    validate,
} from "../lib/utils";
/**
 * Analyse an array of five "cards" and determine the poker hand that it represents.
 *
 * @param hand {array} - the hand to be analysed; an array of 5 strings, each representing a card.
 * @return HandDescription {HandDescription} - an object that gives details of the hand that has been analysed.
 * @example analyseHand(['3-s', '3-d', '8-c', '9-h', 'A-h']) -> { type: 'pair', rank: 1, features: [{type: 'pair', value: '3'}], cards: ['3-s', '3-d', '8-c', '9-h', 'A-h'] }
 * @example analyseHand(['4-s', '5-s', '8-s', '7-s', '6-s']) -> { type: 'straight-flush', rank: 8, features: [{type: 'straight', value: '4 - 8'}, {type: 'flush', value: 's'}], cards: ['4-s', '5-s', '8-s', '7-s', '6-s'] }
 */
export function analyse(hand: Hand): HandDescription {
    // safety first...
    validate(hand);

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
    let cards: Card[] = format.split(hand);
    let features: Feature[] = findGroups(cards);

    const featureTypes = features.map(f => f.type);
    if (featureTypes.includes('pair')) hasPairs = true;
    if (featureTypes.includes('three')) hasThree = true;
    if (featureTypes.includes('four')) hasFour = true;

    if (!hasFour && !hasThree && !hasPairs) {
        features = [...features, ...findFlush(cards)];
        if (features.map(f => f.type).includes('flush')) hasFlush = true;

        features = [...features, ...findStraight(cards)];
        if (features.map(f => f.type).includes('straight')) hasStraight = true;
    }

    if (!hasFour && !hasThree && !hasPairs && !hasFlush && !hasStraight) {
        const highCard = getHighCard(cards);
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



export function compare(hands: GameHand[]): GameHandDescription {
    const HandDescriptions = hands.map(h => analyse(h.hand));

    let best: number = 0;
    let tie: number|undefined = undefined;
    HandDescriptions.forEach((d, i) => {
        if (d.rank > HandDescriptions[best].rank) best = i;
    });

    // @todo - what if two hands have the same rank..?

    return {
        id: hands[best].id,
        hand: HandDescriptions[best],
    };
}

export function buildHand(pocket: [string, string], community: [string, string, string, string, string]) {
    const allCards = [...pocket, ...community];
    // validate cards
    validate(allCards);

    // generate a complete feature list for the hand. This will contain all the possible features
    // that the 7 cards could generate, so some impossible poker hands (like 3 pair, or 2 sets) could
    // be listed, but we'll then select the features that make the best possible 5 card hand below.

    const cards: Card[] = format.split(allCards);
    let featureList: Feature[] = [
        ...findGroups(cards),
        ...findStraight(cards),
        ...findFlush(cards),
    ];

    if (featureList.length === 0) {
        featureList = [{
            type: 'high',
            value: getHighCard(cards),
        }];
    }

    console.log(featureList);

    // now we have complete list of the all the hand features, we'll see if any key
    // groups exist (straight-flush, full-house etc) and gradually eliminate down to
    // the best feature-group (i.e. the best hand available from the 7 cards.
}
