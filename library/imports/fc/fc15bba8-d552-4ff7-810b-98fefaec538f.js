"use strict";
cc._RF.push(module, 'fc15buo1VJP94ELmP767FOP', 'artilleryTower');
// scripts/levelScene/tower/artillery/artilleryTower.ts

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
var gameDataManager_1 = require("../../../common/module/gameDataManager");
var monster_1 = require("../../monster/monster");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ArtilleryFrames = /** @class */ (function () {
    function ArtilleryFrames() {
        this.frames = [];
        this.bullet = [];
    }
    __decorate([
        property({
            type: [cc.SpriteFrame]
        })
    ], ArtilleryFrames.prototype, "frames", void 0);
    __decorate([
        property({
            type: [cc.SpriteFrame],
            tooltip: "炮弹的图片"
        })
    ], ArtilleryFrames.prototype, "bullet", void 0);
    ArtilleryFrames = __decorate([
        ccclass("ArtilleryFrames")
    ], ArtilleryFrames);
    return ArtilleryFrames;
}());
var Artillery = /** @class */ (function (_super) {
    __extends(Artillery, _super);
    function Artillery() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.towers = [];
        _this.addBulletNodes = [];
        _this.bulletPrefab = [];
        _this.frameAnimation = null;
        _this.bg = null;
        /* 数据 */
        _this.addBulletData = [
            {
                startPos: cc.v2(-20, 10),
                ctrlPos: cc.v2(-11, 55),
                endPos: cc.v2(3, 20),
                shootDelay: 0.9,
                addBulletDelay: 1.4
            },
            {
                startPos: cc.v2(-22, 16),
                ctrlPos: cc.v2(-12, 55),
                endPos: cc.v2(3, 25),
                shootDelay: 1.1,
                addBulletDelay: 1.8
            },
            {
                startPos: cc.v2(-22, 16),
                ctrlPos: cc.v2(-13, 55),
                endPos: cc.v2(4, 25),
                shootDelay: 0.9,
                addBulletDelay: 1.4
            },
        ];
        /**
         * 塔的世界坐标
         */
        _this.wPos = null;
        _this.poolsOfBullet = [];
        /* 塔的属性 */
        _this.level = 1;
        _this.maxLevel = 3;
        /* 控制 */
        _this.shootable = false;
        return _this;
    }
    Artillery.prototype.onLoad = function () {
        this.bg = this.node.getChildByName("bg");
        this.frameAnimation = this.bg.getComponent("frameAnimation");
        this.gameConfig = gameDataManager_1.default.getGameConfig();
        this.dataOfTower = this.gameConfig.getDataOfArtillery();
        this.monsterArray = monster_1.default.monstersOfAlive;
        this.createPoolsOfBullet();
    };
    Artillery.prototype.start = function () {
        this.init();
    };
    /**
     * 初始化攻击力、动画、
     * @returns
     */
    Artillery.prototype.init = function () {
        var _this = this;
        this.attack = this.dataOfTower[this.level - 1].attack;
        this.speedOfBullet = this.dataOfTower[this.level - 1].speedOfBullet;
        this.bombRange = this.dataOfTower[this.level - 1].bombRange;
        this.shootRange = this.dataOfTower[this.level - 1].shootRange;
        this.intervalOfShoot = this.dataOfTower[this.level - 1].intervalOfShoot;
        this.price = this.dataOfTower[this.level - 1].price;
        this.frameAnimation.setFrameArray(this.towers[this.level - 1].frames);
        this.frameAnimation.setSpriteFrame(this.towers[this.level - 1].frames[0]);
        this.wPos = this.node.parent.convertToWorldSpaceAR(this.node.getPosition());
        this.addBulletNodes[0].getComponent(cc.Sprite).spriteFrame = this.towers[this.level - 1].bullet[0];
        this.addBulletAnim();
        this.scheduleOnce((function () { _this.shootable = true; }).bind(this), this.intervalOfShoot);
    };
    /* 炮弹对象池 */
    Artillery.prototype.createPoolsOfBullet = function () {
        for (var i = 0; i < this.bulletPrefab.length; i++) {
            this.poolsOfBullet.push(new cc.NodePool());
            var p = this.bulletPrefab[i];
            this.poolsOfBullet[i].put(cc.instantiate(p));
        }
    };
    Artillery.prototype.getBullet = function (level) {
        var r = null;
        if (this.poolsOfBullet[level - 1].size() > 0)
            r = this.poolsOfBullet[level].get();
        else
            r = cc.instantiate(this.bulletPrefab[level - 1]);
        r.opacity = 255;
        return r;
    };
    Artillery.prototype.releaseBullt = function (level, n) {
        this.poolsOfBullet[level - 1].put(n);
    };
    Artillery.prototype.clearPoolsOfBullet = function () {
        for (var i = 0; i < this.poolsOfBullet.length; i++)
            this.poolsOfBullet[i].clear();
    };
    /**
     * 射击
     * @param des 世界坐标
     * @param time 子弹到des的时间
     */
    Artillery.prototype.shoot = function (des, time) {
        if (time === void 0) { time = null; }
        if (!this.shootable)
            return;
        this.shootable = false;
        if (time === null) {
            var l = this.wPos.sub(des).mag();
            var time_1 = l / this.speedOfBullet;
        }
        this.frameAnimation.play(false, false, false, function () {
            var _this = this;
            this.shootBullet(des, time);
            this.addBulletAnim();
            this.scheduleOnce((function () {
                _this.shootable = true;
            }).bind(this), this.intervalOfShoot);
        }.bind(this));
    };
    /**
     * 射出子弹
     */
    Artillery.prototype.shootBullet = function (des, time) {
        var a = this.createBullet();
        var wPos = this.bg.convertToWorldSpaceAR(this.addBulletData[this.level - 1].endPos);
        a.moveTo(wPos, des, time);
    };
    Artillery.prototype.createBullet = function () {
        var artillery = cc.instantiate(this.bulletPrefab[this.level - 1]).getComponent("artilleryBullet");
        this.node.addChild(artillery.node);
        artillery.init(this.level, this.attack, this.bombRange);
        var bg = this.node.getChildByName("bg");
        return artillery;
    };
    /**
     * 根据怪物此时的位置，预判子弹到达后，怪物的新位置
     * @param monster
     * @param cP 此时怪物的坐标 世界坐标
     * @returns 怪物预测位置,世界; 子弹达到预测位置的时间
     */
    Artillery.prototype.forecastMovePos = function (monster, cP) {
        //从填弹到子弹飞行到cP的时间
        var bulletStartPos = this.bg.convertToWorldSpaceAR(this.addBulletData[this.level - 1].endPos);
        var time = cP.sub(bulletStartPos).mag() / this.speedOfBullet + this.addBulletData[this.level - 1].shootDelay;
        var mWP = monster.getPosInTime(time);
        if (!this.inShootRange(mWP))
            return null;
        return [mWP.x, mWP.y, time - this.addBulletData[this.level - 1].shootDelay];
    };
    /**
     * 播放填弹动画
     */
    Artillery.prototype.addBulletAnim = function () {
        this.addBulletNodes[0].scale = 1;
        this.addBulletNodes[0].setPosition(this.addBulletData[this.level - 1].startPos);
        var a = cc.bezierTo(0.5, [this.addBulletData[this.level - 1].startPos, this.addBulletData[this.level - 1].ctrlPos, this.addBulletData[this.level - 1].endPos]);
        var func = cc.callFunc(function () {
            this.addBulletNodes[0].scale = 0;
        }, this);
        var seq = cc.sequence(a, func);
        this.addBulletNodes[0].runAction(seq);
    };
    Artillery.prototype.destroySelf = function () {
        this.clearPoolsOfBullet();
        this.node.destroy();
    };
    /**
     * 升级
     */
    Artillery.prototype.upgrade = function () {
        if (this.level === this.maxLevel)
            return;
        this.level++;
        this.init();
    };
    Artillery.prototype.getPriceOfUpgrade = function () {
        return this.dataOfTower[this.level].price;
    };
    Artillery.prototype.getDataOfTower = function () {
        return this.dataOfTower;
    };
    /**
     * 判断该点是否在射程内
     * @param pos 世界坐标
     */
    Artillery.prototype.inShootRange = function (pos) {
        var l = this.wPos.sub(pos).mag();
        if (l <= this.shootRange)
            return true;
        return false;
    };
    Artillery.prototype.update = function (dt) {
        if (this.shootable) {
            for (var i = 0; i < this.monsterArray.length; i++) {
                var m = this.monsterArray[i];
                var mP = m.getWPos();
                if (this.inShootRange(mP)) {
                    if (m.swiOfRecursionInPW) {
                        var d = this.forecastMovePos(m, mP);
                        if (d !== null) {
                            this.shoot(cc.v2(d[0], d[1]), d[2]);
                            return;
                        }
                    }
                    else {
                        this.shoot(m.getWPos());
                        return;
                    }
                }
            }
        }
    };
    __decorate([
        property({
            type: ArtilleryFrames,
            tooltip: "塔的图片资源"
        })
    ], Artillery.prototype, "towers", void 0);
    __decorate([
        property({
            type: [cc.Node],
            tooltip: "填弹动画的子弹的节点"
        })
    ], Artillery.prototype, "addBulletNodes", void 0);
    __decorate([
        property({
            type: [cc.Prefab],
        })
    ], Artillery.prototype, "bulletPrefab", void 0);
    Artillery = __decorate([
        ccclass
    ], Artillery);
    return Artillery;
}(cc.Component));
exports.default = Artillery;

cc._RF.pop();