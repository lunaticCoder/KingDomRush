"use strict";
cc._RF.push(module, '4b9a4I8TTtBsL72juFLMOm2', 'magiclanBullet');
// scripts/levelScene/tower/magiclan/magiclanBullet.ts

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
var MagiclanBullet = /** @class */ (function (_super) {
    __extends(MagiclanBullet, _super);
    function MagiclanBullet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isFallFloor = false;
        _this.tower = null;
        return _this;
        // update (dt) {}
    }
    MagiclanBullet.prototype.onLoad = function () {
        this.tower = this.node.parent.getComponent("magiclanTower");
    };
    MagiclanBullet.prototype.start = function () {
    };
    MagiclanBullet.prototype.init = function (attack) {
        this.attack = attack;
    };
    /**
     * 移动，世界坐标
     * @param start 起点
     * @param end 终点
     * @param time 移动时间
     */
    MagiclanBullet.prototype.moveTo = function (start, end, time) {
        var nodeStart = this.node.parent.convertToNodeSpaceAR(start);
        var nodeEnd = this.node.parent.convertToNodeSpaceAR(end);
        var sub = nodeEnd.sub(nodeStart);
        var middle = cc.v2(nodeStart.x + sub.x / 2, nodeStart.y + sub.y / 2);
        var c = cc.v2(middle.x, nodeEnd.y + 60);
        if (start.x === end.x)
            c.x += 30;
        this.node.setPosition(nodeStart);
        var move = cc.bezierTo(time, [nodeStart, c, nodeEnd]);
        var func1 = cc.callFunc(function () {
            this.destroySelf();
        }.bind(this));
        var seq = cc.sequence(move, func1);
        this.node.runAction(seq);
    };
    MagiclanBullet.prototype.destroySelf = function () {
        this.tower.releaseBullt(this.node);
    };
    MagiclanBullet.prototype.onCollisionEnter = function (other, self) {
        if (this.isFallFloor)
            return;
        var node = other.node;
        var group = node.group;
        if (group === "Enemy") {
            this.node.stopAllActions();
            var m = node.getComponent("monster");
            m.injure(this.attack);
            this.destroySelf();
        }
    };
    MagiclanBullet = __decorate([
        ccclass
    ], MagiclanBullet);
    return MagiclanBullet;
}(cc.Component));
exports.default = MagiclanBullet;

cc._RF.pop();