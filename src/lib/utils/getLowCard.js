"use strict";
exports.__esModule = true;
var _data_1 = require("../_data");
function getLowCard(hand) {
    var values = hand.map(function (c) { return c.value; });
    var ranks = values.map(function (v) { return _data_1.cardRank.indexOf(v); });
    return ranks.sort(function (a, b) { return b - a; })[0];
}
exports["default"] = getLowCard;
