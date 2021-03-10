"use strict";
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