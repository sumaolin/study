"use strict";
exports.__esModule = true;
var Baby = /** @class */ (function () {
    function Baby(name) {
        this._name = name;
        console.log('小宝贝正在哭泣，哇哇哇……');
    }
    Baby.smile = function () {
        console.log('小宝贝正在笑！');
    };
    /**
     * getBabyName
     */
    Baby.prototype.getBabyName = function () {
        return this._name;
    };
    return Baby;
}());
exports.Baby = Baby;
exports.baby = new Baby('Nico');
