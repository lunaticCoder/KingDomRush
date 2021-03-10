"use strict";
cc._RF.push(module, '723bapX0cVMWLHqO6N7iHb6', 'soldier');
// scripts/levelScene/tower/barrack/soldier.ts

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
var creature_1 = require("../../creature");
var gameDataManager_1 = require("../../../common/module/gameDataManager");
var combatLogic_1 = require("../../combatLogic");
var monster_1 = require("../../monster/monster");
var move_1 = require("../../../common/move");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Soldier = /** @class */ (function (_super) {
    __extends(Soldier, _super);
    function Soldier() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.soldier1Attack = [];
        _this.soldier1Dead = [];
        _this.soldier1Walk = [];
        _this.soldier2Attack = [];
        _this.soldier2Dead = [];
        _this.soldier2Walk = [];
        _this.soldier3Attack = [];
        _this.soldier3Dead = [];
        _this.soldier3Walk = [];
        _this.soldier4Attack = [];
        _this.soldier4Dead = [];
        _this.soldier4Walk = [];
        /* 属性 */
        _this.level = null;
        /* 数据 */
        /**
         * 动画的帧集 [level][attck, die, walk] [cc.SpriteFrame]
         */
        _this.framesOfAnim = null;
        /**
         * 驻点坐标 世界
         */
        _this.station = null;
        _this.stationNo = null;
        /**
         * {HP,speedOfMove,intervalOfAttack,aggressivity,rangeOfAttack,rangeOfInvestigate}
         */
        _this.soldierData = null;
        /* 引用对象 */
        _this.barrack = null;
        /* 控制 */
        _this.isToStation = false;
        _this.isPlayingWalk = false;
        /**
         * 士兵攻击图片少，攻速太快，控制速度
         */
        _this.attackEnable = true;
        return _this;
    }
    Soldier_1 = Soldier;
    Soldier.prototype.onLoad = function () {
        //整理帧动画集
        this.framesOfAnim = [[this.soldier1Attack, this.soldier1Dead, this.soldier1Walk], [this.soldier2Attack, this.soldier2Dead, this.soldier2Walk], [this.soldier3Attack, this.soldier3Dead, this.soldier3Walk], [this.soldier4Attack, this.soldier4Dead, this.soldier4Walk]];
        //士兵数据
        var gameConfig = gameDataManager_1.default.getGameConfig();
        this.soldierData = gameConfig.getSoldierData();
        //节点/组件赋值
        this.combatLogic = new combatLogic_1.default(this, monster_1.default.monstersOfAlive);
        this._move = new move_1.default(this.node);
    };
    Soldier.prototype.init = function (stationNo, station, level, barrack) {
        //初始化属性
        this.level = level;
        var sd = this.soldierData[this.level];
        this.maxHp = this.cHP = sd.HP;
        this.speedOfMove = sd.speedOfMove;
        this.intervalOfAttack = sd.intervalOfAttack;
        this.aggressivity = sd.aggressivity;
        this.rangeOfAttack = sd.rangeOfAttack;
        this.rangeOfInvestigate = sd.rangeOfInvestigate;
        this.intervalOfThink = sd.intervalOfThink;
        //初始化数据
        this.stationNo = stationNo;
        this.station = station;
        //初始化视图
        this.frameAnim.setSpriteFrame(this.framesOfAnim[level][2][0]);
        this.refreshBloodBar();
        //初始化引用对象
        this.barrack = barrack;
        //初始化控制参数
        this.isPlayingWalk = false;
        this.isToStation = false;
        this.attackEnable = true;
        this.initCreature();
    };
    /**
     * @param des 世界
     */
    Soldier.prototype.walk = function (des, func) {
        if (func === void 0) { func = null; }
        this.updateDir(des);
        if (!this.isPlayingWalk) {
            this.frameAnim.setFrameArray(this.framesOfAnim[this.level][2]);
            this.frameAnim.play(true);
            this.isPlayingWalk = true;
        }
        this.move(des, function () {
            this.frameAnim.stop();
            this.isPlayingWalk = false;
            if (func !== null)
                func();
        }.bind(this));
    };
    Soldier.prototype.stopWalk = function () {
        this.frameAnim.stop();
        this.isPlayingWalk = false;
        this._move.stopMove();
    };
    Soldier.prototype.refreshState = function () {
        this.refreshBloodBar();
        //死亡    
        if (this.cHP === 0) {
            this.die(Soldier_1.soldiersOfAlive, this);
            this.playDie(this.framesOfAnim[this.level][1], this.releaseSelf.bind(this));
        }
    };
    /**
     * 释放自身资源
     */
    Soldier.prototype.releaseSelf = function () {
        this.barrack.releaseSoldier(this);
    };
    /**
     * 向驻点移动
     */
    Soldier.prototype.toStation = function () {
        this.isToStation = true;
        this.walk(this.station, function () {
            this.isToStation = false;
        }.bind(this));
    };
    Soldier.prototype.inStation = function () {
        var cwp = this.getWPos();
        var l = cwp.sub(this.station).mag();
        if (l < 2)
            return true;
        return false;
    };
    /**
     * Tracks soldier
     * @param pos 世界
     */
    Soldier.prototype.track = function (pos) {
        this.isTracking = true;
        this.walk(pos, function () {
            this.isTracking = false;
        }.bind(this));
    };
    Soldier.prototype.stopTrack = function () {
        this.stopWalk();
        this.isTracking = false;
    };
    Soldier.prototype.refreshTrackTarget = function (pos) {
        this.walk(pos, function () {
            this.isTracking = false;
        }.bind(this));
    };
    Soldier.prototype.attack = function (m) {
        if (this.isAttacking)
            return;
        if (!this.attackEnable)
            return;
        this.attackEnable = false;
        this.scheduleOnce(function () { this.attackEnable = true; }.bind(this), 1);
        this.isAttacking = true;
        this.frameAnim.setFrameArray(this.framesOfAnim[this.level][0]);
        this.frameAnim.play(false, false, false, function () {
            m.injure(this.aggressivity);
            this.isAttacking = false;
        }.bind(this));
    };
    Soldier.prototype.nonComLogic = function () {
        this.isNonComState = true;
        if (this.inStation())
            return;
        if (this.isToStation)
            return;
        this.toStation();
    };
    Soldier.prototype.stopNonComLogic = function () {
        this.isNonComState = false;
        if (this.isToStation) {
            this.stopWalk();
            this.isToStation = false;
        }
    };
    var Soldier_1;
    /* 记录 */
    /**
     * 用于给敌人遍历场上士兵用
     * 士兵加到节点上时push,士兵死亡时pop
     */
    Soldier.soldiersOfAlive = null;
    __decorate([
        property({
            type: [cc.SpriteFrame],
            tooltip: "等级1的士兵攻击帧动画图片"
        })
    ], Soldier.prototype, "soldier1Attack", void 0);
    __decorate([
        property({
            type: [cc.SpriteFrame],
            tooltip: "等级1的士兵死亡帧动画图片"
        })
    ], Soldier.prototype, "soldier1Dead", void 0);
    __decorate([
        property({
            type: [cc.SpriteFrame],
            tooltip: "等级1的士兵行走帧动画图片"
        })
    ], Soldier.prototype, "soldier1Walk", void 0);
    __decorate([
        property({
            type: [cc.SpriteFrame],
            tooltip: "等级2的士兵攻击帧动画图片"
        })
    ], Soldier.prototype, "soldier2Attack", void 0);
    __decorate([
        property({
            type: [cc.SpriteFrame],
            tooltip: "等级2的士兵死亡帧动画图片"
        })
    ], Soldier.prototype, "soldier2Dead", void 0);
    __decorate([
        property({
            type: [cc.SpriteFrame],
            tooltip: "等级2的士兵行走帧动画图片"
        })
    ], Soldier.prototype, "soldier2Walk", void 0);
    __decorate([
        property({
            type: [cc.SpriteFrame],
            tooltip: "等级3的士兵攻击帧动画图片"
        })
    ], Soldier.prototype, "soldier3Attack", void 0);
    __decorate([
        property({
            type: [cc.SpriteFrame],
            tooltip: "等级3的士兵死亡帧动画图片"
        })
    ], Soldier.prototype, "soldier3Dead", void 0);
    __decorate([
        property({
            type: [cc.SpriteFrame],
            tooltip: "等级3的士兵行走帧动画图片"
        })
    ], Soldier.prototype, "soldier3Walk", void 0);
    __decorate([
        property({
            type: [cc.SpriteFrame],
            tooltip: "等级4的士兵攻击帧动画图片"
        })
    ], Soldier.prototype, "soldier4Attack", void 0);
    __decorate([
        property({
            type: [cc.SpriteFrame],
            tooltip: "等级4的士兵死亡帧动画图片"
        })
    ], Soldier.prototype, "soldier4Dead", void 0);
    __decorate([
        property({
            type: [cc.SpriteFrame],
            tooltip: "等级4的士兵行走帧动画图片"
        })
    ], Soldier.prototype, "soldier4Walk", void 0);
    Soldier = Soldier_1 = __decorate([
        ccclass
    ], Soldier);
    return Soldier;
}(creature_1.default));
exports.default = Soldier;

cc._RF.pop();