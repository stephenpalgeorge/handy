"use strict";
exports.__esModule = true;
function findFlush(cards) {
    var features = [];
    // check for a flush
    var flush = cards.filter(function (c) { return c.suit === cards[0].suit; });
    if (flush.length >= 5)
        features.push({ type: 'flush', value: cards[0].suit });
    return features;
}
exports["default"] = findFlush;
