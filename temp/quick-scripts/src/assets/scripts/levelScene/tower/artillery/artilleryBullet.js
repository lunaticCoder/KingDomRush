"use strict";
cc._RF.push(module, '4643fd5zIZPX7fZ/abAT8Qr', 'artilleryBullet');
// scripts/levelScene/tower/artillery/artilleryBullet.ts

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
var monster_1 = require("../../monster/monster");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ArtilleryBullet = /** @class */ (function (_super) {
    __extends(ArtilleryBullet, _super);
    function ArtilleryBullet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.level = null;
        _this.attack = 0;
        _this.frameAnim = null;
        _this.artilleryTower = null;
        return _this;
        // update (dt) {}
    }
    ArtilleryBullet.prototype.onLoad = function () {
        this.frameAnim = this.node.getComponent("frameAnimation");
        this.artilleryTower = this.node.parent.getComponent("artilleryTower");
    };
    ArtilleryBullet.prototype.start = function () {
    };
    /**
     * 设置炮的攻击力和速度
     * @param attack
     * @param bombRange 炸弹爆炸范围
     */
    ArtilleryBullet.prototype.init = function (l, attack, bombRange) {
        this.level = l;
        this.attack = attack;
        this.harmRadian = bombRange;
    };
    /**
     * 移动，世界坐标
     * @param start 起点
     * @param end 终点
     * @param time 移动时间
     *
     */
    ArtilleryBullet.prototype.moveTo = function (start, end, time) {
        var nodeStart = this.node.parent.convertToNodeSpaceAR(start);
        var nodeEnd = this.node.parent.convertToNodeSpaceAR(end);
        var sub = nodeEnd.sub(nodeStart);
        var middle = cc.v2(nodeStart.x + sub.x / 2, nodeStart.y + sub.y / 2);
        var c = cc.v2(middle.x, nodeEnd.y + 60);
        if (start.x === end.x)
            c.x += 30;
        this.node.setPosition(nodeStart);
        var move = cc.bezierTo(time, [nodeStart, c, nodeEnd]);
        var func = cc.callFunc(function () {
            this.frameAnim.play(false, true, false, function () {
                this.causeHarm(end);
                this.destroySelf();
            }.bind(this));
        }, this);
        var seq = cc.sequence(move, func);
        this.node.runAction(seq);
    };
    /**
     * Causes harm
     * @param pos 爆炸点 世界坐标
     */
    ArtilleryBullet.prototype.causeHarm = function (pos) {
        for (var i = 0; i < monster_1.default.monstersOfAlive.length; i++) {
            var mScr = monster_1.default.monstersOfAlive[i];
            if (this.isInjuredInScope(pos, mScr.getWPos()))
                mScr.injure(this.attack);
        }
    };
    /**
     * @param pos 爆炸点 世界
     */
    ArtilleryBullet.prototype.isInjuredInScope = function (pos, mwp) {
        var l = mwp.sub(pos).mag();
        if (l <= this.harmRadian)
            return true;
        return false;
    };
    ArtilleryBullet.prototype.destroySelf = function () {
        this.artilleryTower.releaseBullt(this.level, this.node);
    };
    ArtilleryBullet = __decorate([
        ccclass
    ], ArtilleryBullet);
    return ArtilleryBullet;
}(cc.Component));
exports.default = ArtilleryBullet;

cc._RF.pop();