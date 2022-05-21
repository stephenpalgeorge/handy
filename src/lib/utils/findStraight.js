"use strict";
exports.__esModule = true;
var _data_1 = require("../_data");
function findStraight(cards) {
    var features = [];
    // check for a straight
    var cardsAsRank = cards.map(function (c) { return _data_1.cardRank.indexOf(c.value); }).sort(function (a, b) { return a - b; });
    var straight = cardsAsRank.filter(function (c, i) {
        var isSequential = cardsAsRank[i + 1] === c + 1;
        if (isSequential || i === cardsAsRank.length - 1)
            return c;
    });
    if (straight.length >= 5)
        features.push({ type: 'straight', value: "".concat(straight[straight.length - 1]) });
    return features;
}
exports["default"] = findStraight;
