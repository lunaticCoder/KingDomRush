
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/levelScene/V_gameState.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2923afG7tNMVZBvUd6/RnLm', 'V_gameState');
// scripts/levelScene/V_gameState.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var V_gameState = /** @class */ (function (_super) {
    __extends(V_gameState, _super);
    function V_gameState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hp = null;
        _this.gold = null;
        _this.round = null;
        return _this;
    }
    V_gameState.prototype.setHP = function (hp) {
        this.hp.string = hp.toString();
    };
    V_gameState.prototype.setGold = function (g) {
        this.gold.string = g.toString();
    };
    V_gameState.prototype.setRound = function (curR, maxR) {
        this.round.string = curR + "/" + maxR;
    };
    __decorate([
        property({ type: cc.Label })
    ], V_gameState.prototype, "hp", void 0);
    __decorate([
        property({ type: cc.Label })
    ], V_gameState.prototype, "gold", void 0);
    __decorate([
        property({ type: cc.Label })
    ], V_gameState.prototype, "round", void 0);
    V_gameState = __decorate([
        ccclass
    ], V_gameState);
    return V_gameState;
}(cc.Component));
exports.default = V_gameState;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2xldmVsU2NlbmUvVl9nYW1lU3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU0sSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBeUMsK0JBQVk7SUFBckQ7UUFBQSxxRUFzQkM7UUFuQlcsUUFBRSxHQUFhLElBQUksQ0FBQztRQUdwQixVQUFJLEdBQWEsSUFBSSxDQUFDO1FBR3RCLFdBQUssR0FBYSxJQUFJLENBQUM7O0lBYW5DLENBQUM7SUFYRywyQkFBSyxHQUFMLFVBQU0sRUFBVTtRQUNaLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRUQsNkJBQU8sR0FBUCxVQUFRLENBQVM7UUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUVELDhCQUFRLEdBQVIsVUFBUyxJQUFZLEVBQUUsSUFBWTtRQUMvQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBTSxJQUFJLFNBQUksSUFBTSxDQUFDO0lBQzFDLENBQUM7SUFsQkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDOzJDQUNEO0lBRzVCO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs2Q0FDQztJQUc5QjtRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7OENBQ0U7SUFUZCxXQUFXO1FBRC9CLE9BQU87T0FDYSxXQUFXLENBc0IvQjtJQUFELGtCQUFDO0NBdEJELEFBc0JDLENBdEJ3QyxFQUFFLENBQUMsU0FBUyxHQXNCcEQ7a0JBdEJvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZfZ2FtZVN0YXRlIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkxhYmVsIH0pXG4gICAgcHJpdmF0ZSBocDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTGFiZWwgfSlcbiAgICBwcml2YXRlIGdvbGQ6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkxhYmVsIH0pXG4gICAgcHJpdmF0ZSByb3VuZDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgc2V0SFAoaHA6IG51bWJlcikge1xuICAgICAgICB0aGlzLmhwLnN0cmluZyA9IGhwLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgc2V0R29sZChnOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5nb2xkLnN0cmluZyA9IGcudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBzZXRSb3VuZChjdXJSOiBudW1iZXIsIG1heFI6IG51bWJlcikge1xuICAgICAgICB0aGlzLnJvdW5kLnN0cmluZyA9IGAke2N1clJ9LyR7bWF4Un1gO1xuICAgIH1cbn1cbiJdfQ==