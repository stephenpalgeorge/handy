"use strict";
exports.__esModule = true;
var _data_1 = require("../_data");
function getHighCard(hand) {
    var values = hand.map(function (c) { return c.value; });
    var ranks = values.map(function (v) { return _data_1.cardRank.indexOf(v); });
    var value = ranks.sort(function (a, b) { return b - a; })[0];
    return _data_1.cardRank[value];
}
exports["default"] = getHighCard;
