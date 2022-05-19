import {deck} from "./_data";

export default function buildHand(pocket: [string, string], community: [string, string, string, string, string]) {
    const allCards = [...pocket, ...community];
    // validate cards
    allCards.forEach(c => {
        if (!deck.includes(c)) throw new Error(`Invalid card "${c}" found.`);
        if (allCards.filter(item => item === c).length > 1) throw new Error('Cannot analyse duplicate cards.');
    });
    
}