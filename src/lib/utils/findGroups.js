"use strict";
exports.__esModule = true;
function findGroups(cards) {
    var features = [];
    cards.forEach(function (_a) {
        var value = _a.value;
        // filter the cards for all those that have the same value as the current card.
        var similar = cards.filter(function (c) { return c.value === value; });
        // the length of that array will determine the hand feature.
        // Also, in each case, we need to make sure we're not duplicating features.
        switch (similar.length) {
            case 4:
                if (features.map(function (f) { return f.type; }).filter(function (t) { return t === 'four'; }).length === 0 &&
                    features.map(function (f) { return f.value; }).filter(function (v) { return v === value; }).length === 0) {
                    features.push({ type: 'four', value: value });
                }
                break;
            case 3:
                if (features.map(function (f) { return f.type; }).filter(function (t) { return t === 'three'; }).length === 0 &&
                    features.map(function (f) { return f.value; }).filter(function (v) { return v === value; }).length === 0) {
                    features.push({ type: 'three', value: value });
                }
                break;
            case 2:
                if (features.filter(function (f) { return f.type === 'pair'; }).map(function (f) { return f.value; }).filter(function (v) { return v === value; }).length === 0) {
                    features.push({ type: 'pair', value: value });
                }
                break;
            case 1:
            default:
                break;
        }
    });
    return features;
}
exports["default"] = findGroups;
