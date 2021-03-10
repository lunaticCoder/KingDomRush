"use strict";
cc._RF.push(module, 'c81achqaJRGE79sgbdiAK1F', 'utils');
// scripts/common/module/utils.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils = /** @class */ (function () {
    function Utils() {
    }
    /**
     * Gets random number
     * @param min
     * @param max
     * @returns [min, max]: Interger
     */
    Utils.getRandomInterger = function (min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
    };
    Utils.remvoeItemOfArray = function (array, item) {
        var i = array.indexOf(item);
        array.splice(i, 1);
    };
    /**
     * 2点间的距离，注意同一节点坐标
     */
    Utils.getDisOfTwoPos = function (p1, p2) {
        var l = p1.sub(p2).mag();
        return l;
    };
    return Utils;
}());
exports.default = Utils;

cc._RF.pop();