"use strict";
cc._RF.push(module, 'faf39emRepGoLTsKitSfC/j', 'magiclanTower');
// scripts/levelScene/tower/magiclan/magiclanTower.ts

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
var gameDataManager_1 = require("../../../common/module/gameDataManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MagiclanFrames = /** @class */ (function () {
    function MagiclanFrames() {
        this.frames = [];
    }
    __decorate([
        property({
            type: [cc.SpriteFrame]
        })
    ], MagiclanFrames.prototype, "frames", void 0);
    MagiclanFrames = __decorate([
        ccclass("MagiclanFrames")
    ], MagiclanFrames);
    return MagiclanFrames;
}());
var MagiclanTower = /** @class */ (function (_super) {
    __extends(MagiclanTower, _super);
    function MagiclanTower() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.offsetY = [];
        _this.framesArray = [];
        _this.magiclanFrames = [];
        _this.bulletPrefab = null;
        _this.PosOfShoot = null;
        /**
         * 法师的 帧动画组件
         */
        _this.magiclanAF = null;
        /**
         * 塔的 帧动画
         */
        _this.towerAF = null;
        _this.bg = null;
        /* 塔的属性 */
        /**
         * 塔的等级
         */
        _this.level = 1;
        _this.maxLevel = 4;
        /* 控制 */
        /**
         * false为法师朝下
         */
        _this.toward = false;
        _this.isShoot = false;
        /**
         * 塔的坐标 世界
         */
        _this.wPos = null;
        _this.poolOfBullet = null;
        return _this;
    }
    MagiclanTower.prototype.onLoad = function () {
        this.magiclanAF = this.node.getChildByName("magiclan").getComponent("frameAnimation");
        this.towerAF = this.node.getChildByName("bg").getComponent("frameAnimation");
        this.bg = this.node.getChildByName("bg");
        this.monsterArray = monster_1.default.monstersOfAlive;
        var gc = gameDataManager_1.default.getGameConfig();
        this.dataOfTower = gc.getDataOfMagiclan();
        this.createPoolOfBullet();
    };
    MagiclanTower.prototype.start = function () {
        this.wPos = this.node.parent.convertToWorldSpaceAR(this.node.getPosition());
        this.wPOfShoot = this.PosOfShoot.parent.convertToWorldSpaceAR(this.PosOfShoot.getPosition());
        this.init();
    };
    /**
     * 根据塔的等级 设置塔的图片和骨骼动画
     */
    MagiclanTower.prototype.init = function () {
        this.attack = this.dataOfTower[this.level - 1].attack;
        this.speedOfShoot = this.dataOfTower[this.level - 1].speedOfShoot;
        this.speedOfBullet = this.dataOfTower[this.level - 1].speedOfBullet;
        this.shootRange = this.dataOfTower[this.level - 1].shootRange;
        this.price = this.dataOfTower[this.level - 1].price;
        this.initMagiclanAF();
        this.initTowerAF();
    };
    /* 对象池 */
    MagiclanTower.prototype.createPoolOfBullet = function () {
        if (this.poolOfBullet !== null)
            return;
        this.poolOfBullet = new cc.NodePool();
        for (var i = 0; i < 1; i++) {
            this.poolOfBullet.put(cc.instantiate(this.bulletPrefab));
        }
    };
    MagiclanTower.prototype.getBullet = function () {
        var r = null;
        if (this.poolOfBullet.size() > 0)
            r = this.poolOfBullet.get();
        else
            r = cc.instantiate(this.bulletPrefab);
        r.opacity = 255;
        return r;
    };
    MagiclanTower.prototype.releaseBullt = function (n) {
        this.poolOfBullet.put(n);
    };
    MagiclanTower.prototype.clearPoolOfBullet = function () {
        this.poolOfBullet.clear();
    };
    /**
     * 初始化法师，更新帧动画和位置，发射动画播放时间
     */
    MagiclanTower.prototype.initMagiclanAF = function () {
        var i;
        if (this.level === 4) {
            i = 2;
        }
        else {
            i = 0;
        }
        if (this.toward)
            i++;
        this.magiclanAF.setFrameArray(this.magiclanFrames[i].frames);
        this.magiclanAF.setSpriteFrame(this.magiclanFrames[i].frames[0]);
        this.playTOfShoot = this.magiclanAF.getDuration();
        this.magiclanAF.node.setPosition(this.offsetY[this.level - 1]);
    };
    /**
     * 改变法师的朝向
     * @param toward false为 朝下
     */
    MagiclanTower.prototype.changeToward = function (toward) {
        if (toward === this.toward)
            return;
        this.toward = toward;
        this.initMagiclanAF();
    };
    /**
     * 初始化塔，更新帧动画
     */
    MagiclanTower.prototype.initTowerAF = function () {
        this.towerAF.setFrameArray(this.framesArray[this.level - 1].frames);
        this.towerAF.setSpriteFrame(this.framesArray[this.level - 1].frames[0]);
    };
    /**
     * Shoots arrow tower
     * @param des 世界坐标
     * @param time 子弹到des的时间
     */
    MagiclanTower.prototype.shoot = function (des, time) {
        if (time === void 0) { time = null; }
        if (this.isShoot)
            return;
        this.isShoot = true;
        if (time === null) {
            var l = this.wPos.sub(des).mag();
            var time_1 = l / this.speedOfBullet;
        }
        //更新法师方向
        var wPos = this.node.convertToWorldSpaceAR(this.magiclanAF.node.getPosition());
        if (wPos.y > des.y && this.toward === true)
            this.toward = false;
        else if (wPos.y < des.y && this.toward === false)
            this.toward = true;
        this.initMagiclanAF();
        this.towerAF.play(false);
        this.magiclanAF.play(false, true, false, function () {
            var bulletScr = this.createBullet();
            bulletScr.moveTo(this.wPOfShoot, des, time);
            this.coolingShoot();
        }.bind(this));
    };
    /**
     * 冷却 射击
     */
    MagiclanTower.prototype.coolingShoot = function () {
        this.scheduleOnce(function () {
            this.isShoot = false;
        }.bind(this), this.speedOfShoot);
    };
    MagiclanTower.prototype.createBullet = function () {
        var bullet = this.getBullet();
        var script = bullet.getComponent("magiclanBullet");
        this.node.addChild(bullet);
        script.init(this.attack);
        return script;
    };
    MagiclanTower.prototype.destroySelf = function () {
        this.clearPoolOfBullet();
        this.node.destroy();
    };
    /**
     * 升级
     */
    MagiclanTower.prototype.upgrade = function () {
        if (this.level === 4)
            return;
        this.level++;
        this.init();
    };
    MagiclanTower.prototype.getPriceOfUpgrade = function () {
        return this.dataOfTower[this.level].price;
    };
    MagiclanTower.prototype.getDataOfTower = function () {
        return this.dataOfTower;
    };
    /**
     * 判断该点是否在射程内
     * @param pos 世界坐标
     */
    MagiclanTower.prototype.inShootRange = function (pos) {
        var l = this.wPos.sub(pos).mag();
        if (l <= this.shootRange)
            return true;
        return false;
    };
    /**
     * 根据怪物此时的位置，预判子弹到达后，怪物的新位置
     * @param monster
     * @param cP 此时怪物的坐标 世界坐标
     * @returns 怪物预测位置,世界; 子弹达到预测位置的时间
     */
    MagiclanTower.prototype.forecastMovePos = function (monster, cP) {
        //法球飞行到cP的时间
        var time = cP.sub(this.wPOfShoot).mag() / this.speedOfBullet;
        var mWP = monster.getPosInTime(time + this.playTOfShoot);
        if (!this.inShootRange(mWP))
            return null;
        return [mWP.x, mWP.y, time];
    };
    MagiclanTower.prototype.update = function (dt) {
        if (!this.isShoot) {
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
                        break;
                    }
                }
            }
        }
    };
    __decorate([
        property({
            type: [cc.Vec2],
            tooltip: "各等级的法师的Y坐标"
        })
    ], MagiclanTower.prototype, "offsetY", void 0);
    __decorate([
        property({
            type: [MagiclanFrames],
            tooltip: "它的帧图片"
        })
    ], MagiclanTower.prototype, "framesArray", void 0);
    __decorate([
        property({
            type: [MagiclanFrames],
            tooltip: "法师的帧图片"
        })
    ], MagiclanTower.prototype, "magiclanFrames", void 0);
    __decorate([
        property({
            type: cc.Prefab
        })
    ], MagiclanTower.prototype, "bulletPrefab", void 0);
    __decorate([
        property({
            type: cc.Node,
            displayName: "射击点"
        })
    ], MagiclanTower.prototype, "PosOfShoot", void 0);
    MagiclanTower = __decorate([
        ccclass
    ], MagiclanTower);
    return MagiclanTower;
}(cc.Component));
exports.default = MagiclanTower;

cc._RF.pop();