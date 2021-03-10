
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/levelScene/tower/barrack/soldier.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2xldmVsU2NlbmUvdG93ZXIvYmFycmFjay9zb2xkaWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJDQUFzQztBQUN0QywwRUFBcUY7QUFDckYsaURBQTRDO0FBRTVDLGlEQUE0QztBQUM1Qyw2Q0FBd0M7QUFHbEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFJNUM7SUFBcUMsMkJBQVE7SUFBN0M7UUFBQSxxRUFrUUM7UUE1UFcsb0JBQWMsR0FBcUIsRUFBRSxDQUFDO1FBS3RDLGtCQUFZLEdBQXFCLEVBQUUsQ0FBQztRQUtwQyxrQkFBWSxHQUFxQixFQUFFLENBQUM7UUFNcEMsb0JBQWMsR0FBcUIsRUFBRSxDQUFDO1FBS3RDLGtCQUFZLEdBQXFCLEVBQUUsQ0FBQztRQUtwQyxrQkFBWSxHQUFxQixFQUFFLENBQUM7UUFNcEMsb0JBQWMsR0FBcUIsRUFBRSxDQUFDO1FBS3RDLGtCQUFZLEdBQXFCLEVBQUUsQ0FBQztRQUtwQyxrQkFBWSxHQUFxQixFQUFFLENBQUM7UUFNcEMsb0JBQWMsR0FBcUIsRUFBRSxDQUFDO1FBS3RDLGtCQUFZLEdBQXFCLEVBQUUsQ0FBQztRQUtwQyxrQkFBWSxHQUFxQixFQUFFLENBQUM7UUFFNUMsUUFBUTtRQUNBLFdBQUssR0FBVyxJQUFJLENBQUM7UUFFN0IsUUFBUTtRQUNSOztXQUVHO1FBQ0ssa0JBQVksR0FBeUIsSUFBSSxDQUFDO1FBQ2xEOztXQUVHO1FBQ0ssYUFBTyxHQUFZLElBQUksQ0FBQztRQUNoQyxlQUFTLEdBQVcsSUFBSSxDQUFDO1FBQ3pCOztXQUVHO1FBQ0ssaUJBQVcsR0FBUSxJQUFJLENBQUM7UUFTaEMsVUFBVTtRQUNGLGFBQU8sR0FBWSxJQUFJLENBQUM7UUFFaEMsUUFBUTtRQUNBLGlCQUFXLEdBQVksS0FBSyxDQUFDO1FBQzdCLG1CQUFhLEdBQVksS0FBSyxDQUFDO1FBQ3ZDOztXQUVHO1FBQ0ssa0JBQVksR0FBWSxJQUFJLENBQUM7O0lBOEp6QyxDQUFDO2dCQWxRb0IsT0FBTztJQXNHeEIsd0JBQU0sR0FBTjtRQUNJLFFBQVE7UUFDUixJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7UUFFelEsTUFBTTtRQUNOLElBQUksVUFBVSxHQUFlLHlCQUFlLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDN0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFL0MsU0FBUztRQUNULElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxxQkFBVyxDQUFDLElBQUksRUFBRSxpQkFBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxjQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxzQkFBSSxHQUFKLFVBQUssU0FBaUIsRUFBRSxPQUFnQixFQUFFLEtBQWEsRUFBRSxPQUFnQjtRQUNyRSxPQUFPO1FBQ1AsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxFQUFFLEdBQVEsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7UUFDNUMsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQztRQUN0QyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsRUFBRSxDQUFDLGtCQUFrQixDQUFDO1FBQ2hELElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDLGVBQWUsQ0FBQztRQUUxQyxPQUFPO1FBQ1AsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFFdkIsT0FBTztRQUNQLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFFdkIsU0FBUztRQUNULElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBRXZCLFNBQVM7UUFDVCxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUMzQixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUN6QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUN6QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVEOztPQUVHO0lBQ08sc0JBQUksR0FBZCxVQUFlLEdBQVksRUFBRSxJQUFxQjtRQUFyQixxQkFBQSxFQUFBLFdBQXFCO1FBQzlDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDckIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztTQUM3QjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN0QixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztZQUMzQixJQUFJLElBQUksS0FBSyxJQUFJO2dCQUNiLElBQUksRUFBRSxDQUFDO1FBQ2YsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO0lBQ2pCLENBQUM7SUFFUywwQkFBUSxHQUFsQjtRQUNJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRVMsOEJBQVksR0FBdEI7UUFDSSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFFdkIsUUFBUTtRQUNSLElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLEVBQUU7WUFDaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFPLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUMvRTtJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNILDZCQUFXLEdBQVg7UUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQ7O09BRUc7SUFDSywyQkFBUyxHQUFqQjtRQUNJLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNwQixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUM3QixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDbEIsQ0FBQztJQUVPLDJCQUFTLEdBQWpCO1FBQ0ksSUFBSSxHQUFHLEdBQVksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxHQUFXLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzVDLElBQUksQ0FBQyxHQUFHLENBQUM7WUFDTCxPQUFPLElBQUksQ0FBQztRQUNoQixPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsdUJBQUssR0FBTCxVQUFNLEdBQVk7UUFDZCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNYLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQzVCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNsQixDQUFDO0lBQ0QsMkJBQVMsR0FBVDtRQUNJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztJQUM1QixDQUFDO0lBQ0Qsb0NBQWtCLEdBQWxCLFVBQW1CLEdBQVk7UUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDWCxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUM1QixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDbEIsQ0FBQztJQUVELHdCQUFNLEdBQU4sVUFBTyxDQUFXO1FBQ2QsSUFBSSxJQUFJLENBQUMsV0FBVztZQUNoQixPQUFPO1FBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZO1lBQ2xCLE9BQU87UUFDWCxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUMxQixJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRTNFLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7WUFDckMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDN0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFFRCw2QkFBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFDMUIsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2hCLE9BQU87UUFDWCxJQUFJLElBQUksQ0FBQyxXQUFXO1lBQ2hCLE9BQU87UUFFWCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUNELGlDQUFlLEdBQWY7UUFDSSxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUMzQixJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2hCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1NBQzVCO0lBQ0wsQ0FBQzs7SUEzS0QsUUFBUTtJQUNSOzs7T0FHRztJQUNJLHVCQUFlLEdBQWMsSUFBSSxDQUFDO0lBbkZ6QztRQUpDLFFBQVEsQ0FBQztZQUNOLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7WUFDdEIsT0FBTyxFQUFFLGVBQWU7U0FDM0IsQ0FBQzttREFDNEM7SUFLOUM7UUFKQyxRQUFRLENBQUM7WUFDTixJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO1lBQ3RCLE9BQU8sRUFBRSxlQUFlO1NBQzNCLENBQUM7aURBQzBDO0lBSzVDO1FBSkMsUUFBUSxDQUFDO1lBQ04sSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQztZQUN0QixPQUFPLEVBQUUsZUFBZTtTQUMzQixDQUFDO2lEQUMwQztJQU01QztRQUpDLFFBQVEsQ0FBQztZQUNOLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7WUFDdEIsT0FBTyxFQUFFLGVBQWU7U0FDM0IsQ0FBQzttREFDNEM7SUFLOUM7UUFKQyxRQUFRLENBQUM7WUFDTixJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO1lBQ3RCLE9BQU8sRUFBRSxlQUFlO1NBQzNCLENBQUM7aURBQzBDO0lBSzVDO1FBSkMsUUFBUSxDQUFDO1lBQ04sSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQztZQUN0QixPQUFPLEVBQUUsZUFBZTtTQUMzQixDQUFDO2lEQUMwQztJQU01QztRQUpDLFFBQVEsQ0FBQztZQUNOLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7WUFDdEIsT0FBTyxFQUFFLGVBQWU7U0FDM0IsQ0FBQzttREFDNEM7SUFLOUM7UUFKQyxRQUFRLENBQUM7WUFDTixJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO1lBQ3RCLE9BQU8sRUFBRSxlQUFlO1NBQzNCLENBQUM7aURBQzBDO0lBSzVDO1FBSkMsUUFBUSxDQUFDO1lBQ04sSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQztZQUN0QixPQUFPLEVBQUUsZUFBZTtTQUMzQixDQUFDO2lEQUMwQztJQU01QztRQUpDLFFBQVEsQ0FBQztZQUNOLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7WUFDdEIsT0FBTyxFQUFFLGVBQWU7U0FDM0IsQ0FBQzttREFDNEM7SUFLOUM7UUFKQyxRQUFRLENBQUM7WUFDTixJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO1lBQ3RCLE9BQU8sRUFBRSxlQUFlO1NBQzNCLENBQUM7aURBQzBDO0lBSzVDO1FBSkMsUUFBUSxDQUFDO1lBQ04sSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQztZQUN0QixPQUFPLEVBQUUsZUFBZTtTQUMzQixDQUFDO2lEQUMwQztJQWhFM0IsT0FBTztRQUQzQixPQUFPO09BQ2EsT0FBTyxDQWtRM0I7SUFBRCxjQUFDO0NBbFFELEFBa1FDLENBbFFvQyxrQkFBUSxHQWtRNUM7a0JBbFFvQixPQUFPIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENyZWF0dXJlIGZyb20gXCIuLi8uLi9jcmVhdHVyZVwiO1xuaW1wb3J0IEdhbWVEYXRhU3RvcmFnZSwgeyBHYW1lQ29uZmlnIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9tb2R1bGUvZ2FtZURhdGFNYW5hZ2VyXCI7XG5pbXBvcnQgQ29tYmF0TG9naWMgZnJvbSBcIi4uLy4uL2NvbWJhdExvZ2ljXCI7XG5pbXBvcnQgQmFycmFjayBmcm9tIFwiLi9iYXJyYWNrXCI7XG5pbXBvcnQgTW9uc3RlciBmcm9tIFwiLi4vLi4vbW9uc3Rlci9tb25zdGVyXCI7XG5pbXBvcnQgTW92ZSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL21vdmVcIjtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL21vZHVsZS91dGlsc1wiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTb2xkaWVyIGV4dGVuZHMgQ3JlYXR1cmUge1xuXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogW2NjLlNwcml0ZUZyYW1lXSxcbiAgICAgICAgdG9vbHRpcDogXCLnrYnnuqcx55qE5aOr5YW15pS75Ye75bin5Yqo55S75Zu+54mHXCJcbiAgICB9KVxuICAgIHByaXZhdGUgc29sZGllcjFBdHRhY2s6IGNjLlNwcml0ZUZyYW1lW10gPSBbXTtcbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBbY2MuU3ByaXRlRnJhbWVdLFxuICAgICAgICB0b29sdGlwOiBcIuetiee6pzHnmoTlo6vlhbXmrbvkuqHluKfliqjnlLvlm77niYdcIlxuICAgIH0pXG4gICAgcHJpdmF0ZSBzb2xkaWVyMURlYWQ6IGNjLlNwcml0ZUZyYW1lW10gPSBbXTtcbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBbY2MuU3ByaXRlRnJhbWVdLFxuICAgICAgICB0b29sdGlwOiBcIuetiee6pzHnmoTlo6vlhbXooYzotbDluKfliqjnlLvlm77niYdcIlxuICAgIH0pXG4gICAgcHJpdmF0ZSBzb2xkaWVyMVdhbGs6IGNjLlNwcml0ZUZyYW1lW10gPSBbXTtcblxuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IFtjYy5TcHJpdGVGcmFtZV0sXG4gICAgICAgIHRvb2x0aXA6IFwi562J57qnMueahOWjq+WFteaUu+WHu+W4p+WKqOeUu+WbvueJh1wiXG4gICAgfSlcbiAgICBwcml2YXRlIHNvbGRpZXIyQXR0YWNrOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogW2NjLlNwcml0ZUZyYW1lXSxcbiAgICAgICAgdG9vbHRpcDogXCLnrYnnuqcy55qE5aOr5YW15q275Lqh5bin5Yqo55S75Zu+54mHXCJcbiAgICB9KVxuICAgIHByaXZhdGUgc29sZGllcjJEZWFkOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogW2NjLlNwcml0ZUZyYW1lXSxcbiAgICAgICAgdG9vbHRpcDogXCLnrYnnuqcy55qE5aOr5YW16KGM6LWw5bin5Yqo55S75Zu+54mHXCJcbiAgICB9KVxuICAgIHByaXZhdGUgc29sZGllcjJXYWxrOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XG5cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBbY2MuU3ByaXRlRnJhbWVdLFxuICAgICAgICB0b29sdGlwOiBcIuetiee6pzPnmoTlo6vlhbXmlLvlh7vluKfliqjnlLvlm77niYdcIlxuICAgIH0pXG4gICAgcHJpdmF0ZSBzb2xkaWVyM0F0dGFjazogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IFtjYy5TcHJpdGVGcmFtZV0sXG4gICAgICAgIHRvb2x0aXA6IFwi562J57qnM+eahOWjq+WFteatu+S6oeW4p+WKqOeUu+WbvueJh1wiXG4gICAgfSlcbiAgICBwcml2YXRlIHNvbGRpZXIzRGVhZDogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IFtjYy5TcHJpdGVGcmFtZV0sXG4gICAgICAgIHRvb2x0aXA6IFwi562J57qnM+eahOWjq+WFteihjOi1sOW4p+WKqOeUu+WbvueJh1wiXG4gICAgfSlcbiAgICBwcml2YXRlIHNvbGRpZXIzV2FsazogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xuXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogW2NjLlNwcml0ZUZyYW1lXSxcbiAgICAgICAgdG9vbHRpcDogXCLnrYnnuqc055qE5aOr5YW15pS75Ye75bin5Yqo55S75Zu+54mHXCJcbiAgICB9KVxuICAgIHByaXZhdGUgc29sZGllcjRBdHRhY2s6IGNjLlNwcml0ZUZyYW1lW10gPSBbXTtcbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBbY2MuU3ByaXRlRnJhbWVdLFxuICAgICAgICB0b29sdGlwOiBcIuetiee6pzTnmoTlo6vlhbXmrbvkuqHluKfliqjnlLvlm77niYdcIlxuICAgIH0pXG4gICAgcHJpdmF0ZSBzb2xkaWVyNERlYWQ6IGNjLlNwcml0ZUZyYW1lW10gPSBbXTtcbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBbY2MuU3ByaXRlRnJhbWVdLFxuICAgICAgICB0b29sdGlwOiBcIuetiee6pzTnmoTlo6vlhbXooYzotbDluKfliqjnlLvlm77niYdcIlxuICAgIH0pXG4gICAgcHJpdmF0ZSBzb2xkaWVyNFdhbGs6IGNjLlNwcml0ZUZyYW1lW10gPSBbXTtcblxuICAgIC8qIOWxnuaApyAqL1xuICAgIHByaXZhdGUgbGV2ZWw6IG51bWJlciA9IG51bGw7XG5cbiAgICAvKiDmlbDmja4gKi9cbiAgICAvKipcbiAgICAgKiDliqjnlLvnmoTluKfpm4YgW2xldmVsXVthdHRjaywgZGllLCB3YWxrXSBbY2MuU3ByaXRlRnJhbWVdXG4gICAgICovXG4gICAgcHJpdmF0ZSBmcmFtZXNPZkFuaW06IGNjLlNwcml0ZUZyYW1lW11bXVtdID0gbnVsbDtcbiAgICAvKipcbiAgICAgKiDpqbvngrnlnZDmoIcg5LiW55WMXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdGF0aW9uOiBjYy5WZWMyID0gbnVsbDtcbiAgICBzdGF0aW9uTm86IG51bWJlciA9IG51bGw7XG4gICAgLyoqXG4gICAgICoge0hQLHNwZWVkT2ZNb3ZlLGludGVydmFsT2ZBdHRhY2ssYWdncmVzc2l2aXR5LHJhbmdlT2ZBdHRhY2sscmFuZ2VPZkludmVzdGlnYXRlfVxuICAgICAqL1xuICAgIHByaXZhdGUgc29sZGllckRhdGE6IGFueSA9IG51bGw7XG5cbiAgICAvKiDorrDlvZUgKi9cbiAgICAvKipcbiAgICAgKiDnlKjkuo7nu5nmlYzkurrpgY3ljoblnLrkuIrlo6vlhbXnlKhcbiAgICAgKiDlo6vlhbXliqDliLDoioLngrnkuIrml7ZwdXNoLOWjq+WFteatu+S6oeaXtnBvcFxuICAgICAqL1xuICAgIHN0YXRpYyBzb2xkaWVyc09mQWxpdmU6IFNvbGRpZXJbXSA9IG51bGw7XG5cbiAgICAvKiDlvJXnlKjlr7nosaEgKi9cbiAgICBwcml2YXRlIGJhcnJhY2s6IEJhcnJhY2sgPSBudWxsO1xuXG4gICAgLyog5o6n5Yi2ICovXG4gICAgcHJpdmF0ZSBpc1RvU3RhdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgaXNQbGF5aW5nV2FsazogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIOWjq+WFteaUu+WHu+WbvueJh+Wwke+8jOaUu+mAn+WkquW/q++8jOaOp+WItumAn+W6plxuICAgICAqL1xuICAgIHByaXZhdGUgYXR0YWNrRW5hYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgLy/mlbTnkIbluKfliqjnlLvpm4ZcbiAgICAgICAgdGhpcy5mcmFtZXNPZkFuaW0gPSBbW3RoaXMuc29sZGllcjFBdHRhY2ssIHRoaXMuc29sZGllcjFEZWFkLCB0aGlzLnNvbGRpZXIxV2Fsa10sIFt0aGlzLnNvbGRpZXIyQXR0YWNrLCB0aGlzLnNvbGRpZXIyRGVhZCwgdGhpcy5zb2xkaWVyMldhbGtdLCBbdGhpcy5zb2xkaWVyM0F0dGFjaywgdGhpcy5zb2xkaWVyM0RlYWQsIHRoaXMuc29sZGllcjNXYWxrXSwgW3RoaXMuc29sZGllcjRBdHRhY2ssIHRoaXMuc29sZGllcjREZWFkLCB0aGlzLnNvbGRpZXI0V2Fsa11dO1xuXG4gICAgICAgIC8v5aOr5YW15pWw5o2uXG4gICAgICAgIGxldCBnYW1lQ29uZmlnOiBHYW1lQ29uZmlnID0gR2FtZURhdGFTdG9yYWdlLmdldEdhbWVDb25maWcoKTtcbiAgICAgICAgdGhpcy5zb2xkaWVyRGF0YSA9IGdhbWVDb25maWcuZ2V0U29sZGllckRhdGEoKTtcblxuICAgICAgICAvL+iKgueCuS/nu4Tku7botYvlgLxcbiAgICAgICAgdGhpcy5jb21iYXRMb2dpYyA9IG5ldyBDb21iYXRMb2dpYyh0aGlzLCBNb25zdGVyLm1vbnN0ZXJzT2ZBbGl2ZSk7XG4gICAgICAgIHRoaXMuX21vdmUgPSBuZXcgTW92ZSh0aGlzLm5vZGUpO1xuICAgIH1cblxuICAgIGluaXQoc3RhdGlvbk5vOiBudW1iZXIsIHN0YXRpb246IGNjLlZlYzIsIGxldmVsOiBudW1iZXIsIGJhcnJhY2s6IEJhcnJhY2spIHtcbiAgICAgICAgLy/liJ3lp4vljJblsZ7mgKdcbiAgICAgICAgdGhpcy5sZXZlbCA9IGxldmVsO1xuICAgICAgICBsZXQgc2Q6IGFueSA9IHRoaXMuc29sZGllckRhdGFbdGhpcy5sZXZlbF07XG4gICAgICAgIHRoaXMubWF4SHAgPSB0aGlzLmNIUCA9IHNkLkhQO1xuICAgICAgICB0aGlzLnNwZWVkT2ZNb3ZlID0gc2Quc3BlZWRPZk1vdmU7XG4gICAgICAgIHRoaXMuaW50ZXJ2YWxPZkF0dGFjayA9IHNkLmludGVydmFsT2ZBdHRhY2s7XG4gICAgICAgIHRoaXMuYWdncmVzc2l2aXR5ID0gc2QuYWdncmVzc2l2aXR5O1xuICAgICAgICB0aGlzLnJhbmdlT2ZBdHRhY2sgPSBzZC5yYW5nZU9mQXR0YWNrO1xuICAgICAgICB0aGlzLnJhbmdlT2ZJbnZlc3RpZ2F0ZSA9IHNkLnJhbmdlT2ZJbnZlc3RpZ2F0ZTtcbiAgICAgICAgdGhpcy5pbnRlcnZhbE9mVGhpbmsgPSBzZC5pbnRlcnZhbE9mVGhpbms7XG5cbiAgICAgICAgLy/liJ3lp4vljJbmlbDmja5cbiAgICAgICAgdGhpcy5zdGF0aW9uTm8gPSBzdGF0aW9uTm87XG4gICAgICAgIHRoaXMuc3RhdGlvbiA9IHN0YXRpb247XG5cbiAgICAgICAgLy/liJ3lp4vljJbop4blm75cbiAgICAgICAgdGhpcy5mcmFtZUFuaW0uc2V0U3ByaXRlRnJhbWUodGhpcy5mcmFtZXNPZkFuaW1bbGV2ZWxdWzJdWzBdKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoQmxvb2RCYXIoKTtcblxuICAgICAgICAvL+WIneWni+WMluW8leeUqOWvueixoVxuICAgICAgICB0aGlzLmJhcnJhY2sgPSBiYXJyYWNrO1xuXG4gICAgICAgIC8v5Yid5aeL5YyW5o6n5Yi25Y+C5pWwXG4gICAgICAgIHRoaXMuaXNQbGF5aW5nV2FsayA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzVG9TdGF0aW9uID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYXR0YWNrRW5hYmxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pbml0Q3JlYXR1cmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZGVzIOS4lueVjFxuICAgICAqL1xuICAgIHByb3RlY3RlZCB3YWxrKGRlczogY2MuVmVjMiwgZnVuYzogRnVuY3Rpb24gPSBudWxsKSB7XG4gICAgICAgIHRoaXMudXBkYXRlRGlyKGRlcyk7XG4gICAgICAgIGlmICghdGhpcy5pc1BsYXlpbmdXYWxrKSB7XG4gICAgICAgICAgICB0aGlzLmZyYW1lQW5pbS5zZXRGcmFtZUFycmF5KHRoaXMuZnJhbWVzT2ZBbmltW3RoaXMubGV2ZWxdWzJdKTtcbiAgICAgICAgICAgIHRoaXMuZnJhbWVBbmltLnBsYXkodHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLmlzUGxheWluZ1dhbGsgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubW92ZShkZXMsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuZnJhbWVBbmltLnN0b3AoKTtcbiAgICAgICAgICAgIHRoaXMuaXNQbGF5aW5nV2FsayA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKGZ1bmMgIT09IG51bGwpXG4gICAgICAgICAgICAgICAgZnVuYygpO1xuICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHN0b3BXYWxrKCkge1xuICAgICAgICB0aGlzLmZyYW1lQW5pbS5zdG9wKCk7XG4gICAgICAgIHRoaXMuaXNQbGF5aW5nV2FsayA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9tb3ZlLnN0b3BNb3ZlKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlZnJlc2hTdGF0ZSgpIHtcbiAgICAgICAgdGhpcy5yZWZyZXNoQmxvb2RCYXIoKTtcblxuICAgICAgICAvL+atu+S6oSAgICBcbiAgICAgICAgaWYgKHRoaXMuY0hQID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmRpZShTb2xkaWVyLnNvbGRpZXJzT2ZBbGl2ZSwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLnBsYXlEaWUodGhpcy5mcmFtZXNPZkFuaW1bdGhpcy5sZXZlbF1bMV0sIHRoaXMucmVsZWFzZVNlbGYuYmluZCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDph4rmlL7oh6rouqvotYTmupBcbiAgICAgKi9cbiAgICByZWxlYXNlU2VsZigpIHtcbiAgICAgICAgdGhpcy5iYXJyYWNrLnJlbGVhc2VTb2xkaWVyKHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWQkempu+eCueenu+WKqFxuICAgICAqL1xuICAgIHByaXZhdGUgdG9TdGF0aW9uKCkge1xuICAgICAgICB0aGlzLmlzVG9TdGF0aW9uID0gdHJ1ZTtcbiAgICAgICAgdGhpcy53YWxrKHRoaXMuc3RhdGlvbiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5pc1RvU3RhdGlvbiA9IGZhbHNlO1xuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5TdGF0aW9uKCk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgY3dwOiBjYy5WZWMyID0gdGhpcy5nZXRXUG9zKCk7XG4gICAgICAgIGxldCBsOiBudW1iZXIgPSBjd3Auc3ViKHRoaXMuc3RhdGlvbikubWFnKCk7XG4gICAgICAgIGlmIChsIDwgMilcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJhY2tzIHNvbGRpZXJcbiAgICAgKiBAcGFyYW0gcG9zIOS4lueVjFxuICAgICAqL1xuICAgIHRyYWNrKHBvczogY2MuVmVjMikge1xuICAgICAgICB0aGlzLmlzVHJhY2tpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLndhbGsocG9zLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmlzVHJhY2tpbmcgPSBmYWxzZTtcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9XG4gICAgc3RvcFRyYWNrKCkge1xuICAgICAgICB0aGlzLnN0b3BXYWxrKCk7XG4gICAgICAgIHRoaXMuaXNUcmFja2luZyA9IGZhbHNlO1xuICAgIH1cbiAgICByZWZyZXNoVHJhY2tUYXJnZXQocG9zOiBjYy5WZWMyKSB7XG4gICAgICAgIHRoaXMud2Fsayhwb3MsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuaXNUcmFja2luZyA9IGZhbHNlO1xuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIGF0dGFjayhtOiBDcmVhdHVyZSkge1xuICAgICAgICBpZiAodGhpcy5pc0F0dGFja2luZylcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaWYgKCF0aGlzLmF0dGFja0VuYWJsZSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5hdHRhY2tFbmFibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKCkgeyB0aGlzLmF0dGFja0VuYWJsZSA9IHRydWU7IH0uYmluZCh0aGlzKSwgMSk7XG5cbiAgICAgICAgdGhpcy5pc0F0dGFja2luZyA9IHRydWU7XG4gICAgICAgIHRoaXMuZnJhbWVBbmltLnNldEZyYW1lQXJyYXkodGhpcy5mcmFtZXNPZkFuaW1bdGhpcy5sZXZlbF1bMF0pO1xuICAgICAgICB0aGlzLmZyYW1lQW5pbS5wbGF5KGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG0uaW5qdXJlKHRoaXMuYWdncmVzc2l2aXR5KTtcbiAgICAgICAgICAgIHRoaXMuaXNBdHRhY2tpbmcgPSBmYWxzZTtcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBub25Db21Mb2dpYygpIHtcbiAgICAgICAgdGhpcy5pc05vbkNvbVN0YXRlID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMuaW5TdGF0aW9uKCkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmICh0aGlzLmlzVG9TdGF0aW9uKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMudG9TdGF0aW9uKCk7XG4gICAgfVxuICAgIHN0b3BOb25Db21Mb2dpYygpIHtcbiAgICAgICAgdGhpcy5pc05vbkNvbVN0YXRlID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLmlzVG9TdGF0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3BXYWxrKCk7XG4gICAgICAgICAgICB0aGlzLmlzVG9TdGF0aW9uID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuIl19