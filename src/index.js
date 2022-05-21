"use strict";
exports.__esModule = true;
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var routes_1 = require("./routes");
var compareHands_1 = require("./lib/compareHands");
var hands = [
    { id: '1', hand: ['3-d', '3-c', '3-s', '8-h', 'J-s'] },
    { id: '2', hand: ['10-s', 'J-s', 'Q-s', 'K-s', 'A-s'] },
    { id: '3', hand: ['10-h', 'J-s', 'Q-s', 'K-s', 'A-s'] },
    { id: '4', hand: ['3-d', '4-d', '5-d', '6-d', '7-d'] },
];
var app = (0, express_1["default"])();
var PORT = process.env.PORT || 3404;
app.use(body_parser_1["default"].json());
app.get('/', function (req, res) {
    res.send('Handy api...');
});
app.use('/api/analysis', routes_1["default"].analysis);
app.use('/api/comparison', routes_1["default"].comparison);
app.listen(PORT, function () {
    console.log("[server] Handy api running on port ".concat(PORT));
});
var output = (0, compareHands_1["default"])(hands);
// console.log(output);
