
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/module/utils.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2NvbW1vbi9tb2R1bGUvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQUFBO0lBMEJBLENBQUM7SUF2Qkc7Ozs7O09BS0c7SUFDSSx1QkFBaUIsR0FBeEIsVUFBeUIsR0FBVyxFQUFFLEdBQVc7UUFDN0MsT0FBTyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVNLHVCQUFpQixHQUF4QixVQUF5QixLQUFZLEVBQUUsSUFBUztRQUM1QyxJQUFJLENBQUMsR0FBVyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7T0FFRztJQUNJLG9CQUFjLEdBQXJCLFVBQXNCLEVBQVcsRUFBRSxFQUFXO1FBQzFDLElBQUksQ0FBQyxHQUFXLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDakMsT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBRUwsWUFBQztBQUFELENBMUJBLEFBMEJDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBVdGlscyB7XG5cblxuICAgIC8qKlxuICAgICAqIEdldHMgcmFuZG9tIG51bWJlclxuICAgICAqIEBwYXJhbSBtaW4gXG4gICAgICogQHBhcmFtIG1heCBcbiAgICAgKiBAcmV0dXJucyBbbWluLCBtYXhdOiBJbnRlcmdlciBcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0UmFuZG9tSW50ZXJnZXIobWluOiBudW1iZXIsIG1heDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIG1pbiArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHJlbXZvZUl0ZW1PZkFycmF5KGFycmF5OiBhbnlbXSwgaXRlbTogYW55KSB7XG4gICAgICAgIGxldCBpOiBudW1iZXIgPSBhcnJheS5pbmRleE9mKGl0ZW0pO1xuICAgICAgICBhcnJheS5zcGxpY2UoaSwgMSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogMueCuemXtOeahOi3neemu++8jOazqOaEj+WQjOS4gOiKgueCueWdkOagh1xuICAgICAqL1xuICAgIHN0YXRpYyBnZXREaXNPZlR3b1BvcyhwMTogY2MuVmVjMiwgcDI6IGNjLlZlYzIpOiBudW1iZXIge1xuICAgICAgICBsZXQgbDogbnVtYmVyID0gcDEuc3ViKHAyKS5tYWcoKTtcbiAgICAgICAgcmV0dXJuIGw7XG4gICAgfVxuXG59Il19