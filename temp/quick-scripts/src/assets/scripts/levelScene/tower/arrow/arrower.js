"use strict";
cc._RF.push(module, '85d98f92bBLz5Y1cmMhd2lH', 'arrower');
// scripts/levelScene/tower/arrow/arrower.ts

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
var Arrower = /** @class */ (function (_super) {
    __extends(Arrower, _super);
    function Arrower() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.frameAnimation = null;
        /**
         * 是否正在射击
         */
        _this.shooting = false;
        _this.arrowTower = null;
        return _this;
    }
    Arrower.prototype.onLoad = function () {
        this.frameAnimation = this.node.getComponent("frameAnimation");
        this.arrowTower = this.node.parent.getComponent("arrowTower");
        this.monsterArray = monster_1.default.monstersOfAlive;
    };
    Arrower.prototype.start = function () {
        //初始化数据
        this.wPosOfArrower = this.node.parent.convertToWorldSpaceAR(this.node.getPosition());
        this.playTimeOfshootArrow = this.frameAnimation.getDuration();
    };
    /**
     * Inits arrower
     * @param wPosOfTower 塔的世界坐标
     * @param speedOfArrow 箭的移动速度
     * @param shootRange 射程
     * @param speedOfShoot 射速
     */
    Arrower.prototype.init = function (wPosOfTower, speedOfArrow, shootRange, speedOfShoot, attack) {
        this.wPosOfTower = wPosOfTower;
        this.speedOfArrow = speedOfArrow;
        this.shootRange = shootRange;
        this.speedOfShoot = speedOfShoot;
        this.attack = attack;
    };
    /**
     * Shoots arrower
     * @param des 射击目标，世界坐标
     * @param time 射到目的地的时间
     */
    Arrower.prototype.shoot = function (des, time) {
        if (time === void 0) { time = null; }
        if (this.shooting)
            return;
        this.shooting = true;
        if (time === null) {
            var l = this.wPosOfTower.sub(des).mag();
            var time_1 = l / this.speedOfArrow;
        }
        //播放动作后射箭
        this.frameAnimation.play(false, false, false, function () {
            var arrowBullet = this.createArrow();
            var dir;
            if (this.wPosOfTower.x > des.x)
                dir = true;
            else
                dir = false;
            arrowBullet.init(this.attack, this.speedOfArrow, dir);
            arrowBullet.moveTo(this.wPosOfArrower, des, time);
            this.coolingShoot();
        }.bind(this));
    };
    /**
     * 冷却 射击
     */
    Arrower.prototype.coolingShoot = function () {
        this.scheduleOnce(function () {
            this.shooting = false;
        }.bind(this), this.speedOfShoot);
    };
    /**
     * Creates arrow
     * @returns arrow ArrowBullet
     */
    Arrower.prototype.createArrow = function () {
        var arrow = this.arrowTower.getArrowBullet();
        this.node.addChild(arrow);
        var script = arrow.getComponent("arrowBullet");
        return script;
    };
    /**
     * 根据怪物此时的位置，预判子弹到达后，怪物的新位置
     * @param monster
     * @param cP 此时怪物的坐标 世界坐标
     * @returns null表示超出射程;[怪物预测位置,世界; 子弹达到预测位置的时间]
     */
    Arrower.prototype.forecastMovePos = function (monster, cP) {
        //箭飞行到cP的时间
        var time = cP.sub(this.wPosOfArrower).mag() / this.speedOfArrow;
        var mWP = monster.getPosInTime(time + this.playTimeOfshootArrow);
        if (!this.inShootRange(mWP))
            return null;
        return [mWP.x, mWP.y, time];
    };
    Arrower.prototype.inShootRange = function (wP) {
        var l = this.wPosOfTower.sub(wP).mag();
        if (l <= this.shootRange)
            return true;
        return false;
    };
    Arrower.prototype.update = function (dt) {
        if (!this.shooting) {
            for (var i = 0; i < this.monsterArray.length; i++) {
                var m = this.monsterArray[i];
                var mP = m.node.parent.convertToWorldSpaceAR(m.node.getPosition());
                if (this.inShootRange(mP)) {
                    if (m.swiOfRecursionInPW) {
                        var d = this.forecastMovePos(m, mP);
                        if (d === null)
                            continue;
                        this.shoot(cc.v2(d[0], d[1]), d[2]);
                        break;
                    }
                    else {
                        this.shoot(m.getWPos());
                        return;
                    }
                }
            }
        }
    };
    Arrower = __decorate([
        ccclass
    ], Arrower);
    return Arrower;
}(cc.Component));
exports.default = Arrower;

cc._RF.pop();