"use strict";
cc._RF.push(module, 'd9089VY9YNLELObh8F5yn0M', 'barrack');
// scripts/levelScene/tower/barrack/barrack.ts

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
var soldier_1 = require("./soldier");
var utils_1 = require("../../../common/module/utils");
var gameDataManager_1 = require("../../../common/module/gameDataManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Barrack = /** @class */ (function (_super) {
    __extends(Barrack, _super);
    function Barrack() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.soldierPrefab = null;
        _this.outSoldierPos = cc.v2(0, 0);
        _this.tower1 = [];
        _this.tower2 = [];
        _this.tower3 = [];
        _this.tower4 = [];
        _this.BGFrameAnim = null;
        _this.personMap = null;
        /* 塔的属性 */
        _this.level = 1;
        _this.maxLevel = 4;
        _this.maxNumOfSoldier = 3;
        /* 数据 */
        /**
         * 可用的驻点编号
         */
        _this.availableStationNo = null;
        /**
         * 塔的帧动画图片
         */
        _this.towerFrames = [];
        _this.createdSoldiers = [];
        /* 控制 */
        /**
         * 是否在造兵
         */
        _this.creSoldEnable = true;
        return _this;
    }
    Barrack.prototype.onLoad = function () {
        this.towerFrames.push(this.tower1);
        this.towerFrames.push(this.tower2);
        this.towerFrames.push(this.tower3);
        this.towerFrames.push(this.tower4);
        this.BGFrameAnim = this.node.getChildByName("bg").getComponent("frameAnimation");
        this.personMap = cc.find("Canvas/personMap");
        this.createSoldierPool();
        var gc = gameDataManager_1.default.getGameConfig();
        this.dataOfTower = gc.getDataOfBarrack();
    };
    Barrack.prototype.start = function () {
        this.init();
    };
    /**
     * 根据等级设置 动画。
     */
    Barrack.prototype.init = function () {
        this.tOfCreateSoldier = this.dataOfTower[this.level - 1].tOfCreateSoldier;
        this.price = this.dataOfTower[this.level - 1].price;
        this.availableStationNo = [0, 1, 2];
        this.refreshFrameAnim();
    };
    /**
     * 更新帧动画
     */
    Barrack.prototype.refreshFrameAnim = function () {
        this.BGFrameAnim.setFrameArray(this.towerFrames[this.level - 1]);
        this.BGFrameAnim.setSpriteFrame(this.towerFrames[this.level - 1][0]);
    };
    Barrack.prototype.createSoldierPool = function () {
        this.soldierPool = new cc.NodePool();
        for (var i = 0; i < this.maxNumOfSoldier; i++) {
            var n = cc.instantiate(this.soldierPrefab);
            this.soldierPool.put(n);
        }
    };
    /**
     * 释放士兵资源
     * @param soldier
     */
    Barrack.prototype.releaseSoldier = function (soldier) {
        this.availableStationNo.push(soldier.stationNo);
        utils_1.default.remvoeItemOfArray(this.createdSoldiers, soldier);
        this.soldierPool.put(soldier.node);
    };
    Barrack.prototype.destroySelf = function () {
        //删除塔生成的所有士兵
        while (this.createdSoldiers.length > 0) {
            var s = this.createdSoldiers[0];
            s.die(soldier_1.default.soldiersOfAlive, s);
            s.releaseSelf();
        }
        //清空对象池
        this.soldierPool.clear();
        this.node.destroy();
    };
    /**
     * 升级
     */
    Barrack.prototype.upgrade = function () {
        if (this.level === 4)
            return;
        this.level++;
        this.tOfCreateSoldier = this.dataOfTower[this.level - 1].tOfCreateSoldier;
        this.price = this.dataOfTower[this.level - 1].price;
        this.refreshFrameAnim();
    };
    Barrack.prototype.getPriceOfUpgrade = function () {
        return this.dataOfTower[this.level].price;
    };
    Barrack.prototype.getDataOfTower = function () {
        return this.dataOfTower;
    };
    Barrack.prototype.autoOutSoldier = function () {
        if (this.creSoldEnable && this.createdSoldiers.length < this.maxNumOfSoldier) {
            this.creSoldEnable = false;
            this.scheduleOnce(this.outSoldier.bind(this), this.tOfCreateSoldier);
        }
    };
    /**
     * 出兵
     * @param station 兵的驻点 世界坐标
     */
    Barrack.prototype.outSoldier = function () {
        this.BGFrameAnim.play(false, false, false, function () {
            var s = this.createSoldier();
            this.BGFrameAnim.play(false, false, true, function () {
                this.creSoldEnable = true;
            }.bind(this));
        }.bind(this));
    };
    Barrack.prototype.createSoldier = function () {
        var node = this.getSoldierInPool();
        var s = node.getComponent("soldier");
        this.createdSoldiers.push(s);
        soldier_1.default.soldiersOfAlive.push(s);
        this.personMap.addChild(node);
        var outPos = this.node.convertToWorldSpaceAR(this.outSoldierPos);
        outPos = this.personMap.convertToNodeSpaceAR(outPos);
        node.setPosition(outPos);
        var i = this.availableStationNo.pop();
        s.init(i, this.stationOfSoldier[i], this.level, this);
        return s;
    };
    Barrack.prototype.getSoldierInPool = function () {
        var n;
        if (this.soldierPool.size() > 0) {
            n = this.soldierPool.get();
            n.opacity = 255;
        }
        else
            n = cc.instantiate(this.soldierPrefab);
        return n;
    };
    Barrack.prototype.update = function (dt) {
        this.autoOutSoldier();
    };
    __decorate([
        property({
            type: cc.Prefab
        })
    ], Barrack.prototype, "soldierPrefab", void 0);
    __decorate([
        property({ tooltip: "出兵点, 节点坐标" })
    ], Barrack.prototype, "outSoldierPos", void 0);
    __decorate([
        property({
            type: [cc.SpriteFrame]
        })
    ], Barrack.prototype, "tower1", void 0);
    __decorate([
        property({
            type: [cc.SpriteFrame]
        })
    ], Barrack.prototype, "tower2", void 0);
    __decorate([
        property({
            type: [cc.SpriteFrame]
        })
    ], Barrack.prototype, "tower3", void 0);
    __decorate([
        property({
            type: [cc.SpriteFrame]
        })
    ], Barrack.prototype, "tower4", void 0);
    Barrack = __decorate([
        ccclass
    ], Barrack);
    return Barrack;
}(cc.Component));
exports.default = Barrack;

cc._RF.pop();