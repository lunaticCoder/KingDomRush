
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/levelScene/tower/barrack/barrack.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2xldmVsU2NlbmUvdG93ZXIvYmFycmFjay9iYXJyYWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHFDQUFnQztBQUNoQyxzREFBaUQ7QUFDakQsMEVBQXFGO0FBRS9FLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXFDLDJCQUFZO0lBQWpEO1FBQUEscUVBdU1DO1FBbE1XLG1CQUFhLEdBQWMsSUFBSSxDQUFDO1FBR2hDLG1CQUFhLEdBQVksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFLckMsWUFBTSxHQUFxQixFQUFFLENBQUM7UUFJOUIsWUFBTSxHQUFxQixFQUFFLENBQUM7UUFJOUIsWUFBTSxHQUFxQixFQUFFLENBQUM7UUFJOUIsWUFBTSxHQUFxQixFQUFFLENBQUM7UUFFOUIsaUJBQVcsR0FBbUIsSUFBSSxDQUFDO1FBQ25DLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFHbEMsVUFBVTtRQUNWLFdBQUssR0FBVyxDQUFDLENBQUM7UUFDbEIsY0FBUSxHQUFXLENBQUMsQ0FBQztRQUNiLHFCQUFlLEdBQVcsQ0FBQyxDQUFDO1FBT3BDLFFBQVE7UUFDUjs7V0FFRztRQUNLLHdCQUFrQixHQUFhLElBQUksQ0FBQztRQUM1Qzs7V0FFRztRQUNLLGlCQUFXLEdBQUcsRUFBRSxDQUFDO1FBR2pCLHFCQUFlLEdBQWMsRUFBRSxDQUFDO1FBR3hDLFFBQVE7UUFDUjs7V0FFRztRQUNLLG1CQUFhLEdBQVksSUFBSSxDQUFDOztJQTRJMUMsQ0FBQztJQTFJRyx3QkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxXQUFXLENBQUMsSUFB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QUFELGNBQUM7Q0F2TUQsQUF1TUMsQ0F2TW9DLEVBQUUsQ0FBQyxTQUFTLEdBdU1oRDtrQkF2TW9CLE9BQU8iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRnJhbWVBbmltYXRpb24gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9mcmFtZUFuaW1hdGlvblwiO1xuaW1wb3J0IFNvbGRpZXIgZnJvbSBcIi4vc29sZGllclwiO1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuLi8uLi8uLi9jb21tb24vbW9kdWxlL3V0aWxzXCI7XG5pbXBvcnQgR2FtZURhdGFTdG9yYWdlLCB7IEdhbWVDb25maWcgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL21vZHVsZS9nYW1lRGF0YU1hbmFnZXJcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhcnJhY2sgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogY2MuUHJlZmFiXG4gICAgfSlcbiAgICBwcml2YXRlIHNvbGRpZXJQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiBcIuWHuuWFteeCuSwg6IqC54K55Z2Q5qCHXCIgfSlcbiAgICBwcml2YXRlIG91dFNvbGRpZXJQb3M6IGNjLlZlYzIgPSBjYy52MigwLCAwKTtcblxuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IFtjYy5TcHJpdGVGcmFtZV1cbiAgICB9KVxuICAgIHByaXZhdGUgdG93ZXIxOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogW2NjLlNwcml0ZUZyYW1lXVxuICAgIH0pXG4gICAgcHJpdmF0ZSB0b3dlcjI6IGNjLlNwcml0ZUZyYW1lW10gPSBbXTtcbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBbY2MuU3ByaXRlRnJhbWVdXG4gICAgfSlcbiAgICBwcml2YXRlIHRvd2VyMzogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IFtjYy5TcHJpdGVGcmFtZV1cbiAgICB9KVxuICAgIHByaXZhdGUgdG93ZXI0OiBjYy5TcHJpdGVGcmFtZVtdID0gW107XG5cbiAgICBwcml2YXRlIEJHRnJhbWVBbmltOiBGcmFtZUFuaW1hdGlvbiA9IG51bGw7XG4gICAgcHJpdmF0ZSBwZXJzb25NYXA6IGNjLk5vZGUgPSBudWxsO1xuXG5cbiAgICAvKiDloZTnmoTlsZ7mgKcgKi9cbiAgICBsZXZlbDogbnVtYmVyID0gMTtcbiAgICBtYXhMZXZlbDogbnVtYmVyID0gNDtcbiAgICBwcml2YXRlIG1heE51bU9mU29sZGllcjogbnVtYmVyID0gMztcbiAgICAvKipcbiAgICAgKiDlh7rlhbXml7bpl7RcbiAgICAgKi9cbiAgICBwcml2YXRlIHRPZkNyZWF0ZVNvbGRpZXI6IG51bWJlcjtcbiAgICBwcmljZTogbnVtYmVyO1xuXG4gICAgLyog5pWw5o2uICovXG4gICAgLyoqXG4gICAgICog5Y+v55So55qE6am754K557yW5Y+3XG4gICAgICovXG4gICAgcHJpdmF0ZSBhdmFpbGFibGVTdGF0aW9uTm86IG51bWJlcltdID0gbnVsbDtcbiAgICAvKipcbiAgICAgKiDloZTnmoTluKfliqjnlLvlm77niYdcbiAgICAgKi9cbiAgICBwcml2YXRlIHRvd2VyRnJhbWVzID0gW107XG4gICAgc3RhdGlvbk9mU29sZGllcjogY2MuVmVjMltdO1xuICAgIHByaXZhdGUgc29sZGllclBvb2w6IGNjLk5vZGVQb29sO1xuICAgIHByaXZhdGUgY3JlYXRlZFNvbGRpZXJzOiBTb2xkaWVyW10gPSBbXTtcbiAgICBwcml2YXRlIGRhdGFPZlRvd2VyOiBhbnlbXTtcblxuICAgIC8qIOaOp+WItiAqL1xuICAgIC8qKlxuICAgICAqIOaYr+WQpuWcqOmAoOWFtVxuICAgICAqL1xuICAgIHByaXZhdGUgY3JlU29sZEVuYWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMudG93ZXJGcmFtZXMucHVzaCh0aGlzLnRvd2VyMSk7XG4gICAgICAgIHRoaXMudG93ZXJGcmFtZXMucHVzaCh0aGlzLnRvd2VyMik7XG4gICAgICAgIHRoaXMudG93ZXJGcmFtZXMucHVzaCh0aGlzLnRvd2VyMyk7XG4gICAgICAgIHRoaXMudG93ZXJGcmFtZXMucHVzaCh0aGlzLnRvd2VyNCk7XG5cbiAgICAgICAgdGhpcy5CR0ZyYW1lQW5pbSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLmdldENvbXBvbmVudChcImZyYW1lQW5pbWF0aW9uXCIpO1xuICAgICAgICB0aGlzLnBlcnNvbk1hcCA9IGNjLmZpbmQoXCJDYW52YXMvcGVyc29uTWFwXCIpO1xuICAgICAgICB0aGlzLmNyZWF0ZVNvbGRpZXJQb29sKCk7XG5cbiAgICAgICAgbGV0IGdjOiBHYW1lQ29uZmlnID0gR2FtZURhdGFTdG9yYWdlLmdldEdhbWVDb25maWcoKTtcbiAgICAgICAgdGhpcy5kYXRhT2ZUb3dlciA9IGdjLmdldERhdGFPZkJhcnJhY2soKTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG5cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOagueaNruetiee6p+iuvue9riDliqjnlLvjgIJcbiAgICAgKi9cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLnRPZkNyZWF0ZVNvbGRpZXIgPSB0aGlzLmRhdGFPZlRvd2VyW3RoaXMubGV2ZWwgLSAxXS50T2ZDcmVhdGVTb2xkaWVyO1xuICAgICAgICB0aGlzLnByaWNlID0gdGhpcy5kYXRhT2ZUb3dlclt0aGlzLmxldmVsIC0gMV0ucHJpY2U7XG4gICAgICAgIHRoaXMuYXZhaWxhYmxlU3RhdGlvbk5vID0gWzAsIDEsIDJdO1xuICAgICAgICB0aGlzLnJlZnJlc2hGcmFtZUFuaW0oKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmm7TmlrDluKfliqjnlLtcbiAgICAgKi9cbiAgICBwcml2YXRlIHJlZnJlc2hGcmFtZUFuaW0oKSB7XG4gICAgICAgIHRoaXMuQkdGcmFtZUFuaW0uc2V0RnJhbWVBcnJheSh0aGlzLnRvd2VyRnJhbWVzW3RoaXMubGV2ZWwgLSAxXSk7XG4gICAgICAgIHRoaXMuQkdGcmFtZUFuaW0uc2V0U3ByaXRlRnJhbWUodGhpcy50b3dlckZyYW1lc1t0aGlzLmxldmVsIC0gMV1bMF0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlU29sZGllclBvb2woKSB7XG4gICAgICAgIHRoaXMuc29sZGllclBvb2wgPSBuZXcgY2MuTm9kZVBvb2woKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm1heE51bU9mU29sZGllcjsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbjogY2MuTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuc29sZGllclByZWZhYik7XG4gICAgICAgICAgICB0aGlzLnNvbGRpZXJQb29sLnB1dChuKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOmHiuaUvuWjq+WFtei1hOa6kFxuICAgICAqIEBwYXJhbSBzb2xkaWVyIFxuICAgICAqL1xuICAgIHJlbGVhc2VTb2xkaWVyKHNvbGRpZXI6IFNvbGRpZXIpIHtcbiAgICAgICAgdGhpcy5hdmFpbGFibGVTdGF0aW9uTm8ucHVzaChzb2xkaWVyLnN0YXRpb25Obyk7XG4gICAgICAgIFV0aWxzLnJlbXZvZUl0ZW1PZkFycmF5KHRoaXMuY3JlYXRlZFNvbGRpZXJzLCBzb2xkaWVyKTtcbiAgICAgICAgdGhpcy5zb2xkaWVyUG9vbC5wdXQoc29sZGllci5ub2RlKTtcbiAgICB9XG5cbiAgICBkZXN0cm95U2VsZigpIHtcbiAgICAgICAgLy/liKDpmaTloZTnlJ/miJDnmoTmiYDmnInlo6vlhbVcbiAgICAgICAgd2hpbGUgKHRoaXMuY3JlYXRlZFNvbGRpZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBzOiBTb2xkaWVyID0gdGhpcy5jcmVhdGVkU29sZGllcnNbMF07XG4gICAgICAgICAgICBzLmRpZShTb2xkaWVyLnNvbGRpZXJzT2ZBbGl2ZSwgcyk7XG4gICAgICAgICAgICBzLnJlbGVhc2VTZWxmKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvL+a4heepuuWvueixoeaxoFxuICAgICAgICB0aGlzLnNvbGRpZXJQb29sLmNsZWFyKCk7XG5cbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDljYfnuqdcbiAgICAgKi9cbiAgICB1cGdyYWRlKCkge1xuICAgICAgICBpZiAodGhpcy5sZXZlbCA9PT0gNClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5sZXZlbCsrO1xuICAgICAgICB0aGlzLnRPZkNyZWF0ZVNvbGRpZXIgPSB0aGlzLmRhdGFPZlRvd2VyW3RoaXMubGV2ZWwgLSAxXS50T2ZDcmVhdGVTb2xkaWVyO1xuICAgICAgICB0aGlzLnByaWNlID0gdGhpcy5kYXRhT2ZUb3dlclt0aGlzLmxldmVsIC0gMV0ucHJpY2U7XG4gICAgICAgIHRoaXMucmVmcmVzaEZyYW1lQW5pbSgpO1xuICAgIH1cblxuICAgIGdldFByaWNlT2ZVcGdyYWRlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFPZlRvd2VyW3RoaXMubGV2ZWxdLnByaWNlO1xuICAgIH1cblxuICAgIGdldERhdGFPZlRvd2VyKCk6IGFueVtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YU9mVG93ZXI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhdXRvT3V0U29sZGllcigpIHtcbiAgICAgICAgaWYgKHRoaXMuY3JlU29sZEVuYWJsZSAmJiB0aGlzLmNyZWF0ZWRTb2xkaWVycy5sZW5ndGggPCB0aGlzLm1heE51bU9mU29sZGllcikge1xuICAgICAgICAgICAgdGhpcy5jcmVTb2xkRW5hYmxlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSh0aGlzLm91dFNvbGRpZXIuYmluZCh0aGlzKSwgdGhpcy50T2ZDcmVhdGVTb2xkaWVyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiDlh7rlhbVcbiAgICAgKiBAcGFyYW0gc3RhdGlvbiDlhbXnmoTpqbvngrkg5LiW55WM5Z2Q5qCHXG4gICAgICovXG4gICAgcHJpdmF0ZSBvdXRTb2xkaWVyKCkge1xuICAgICAgICB0aGlzLkJHRnJhbWVBbmltLnBsYXkoZmFsc2UsIGZhbHNlLCBmYWxzZSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbGV0IHM6IFNvbGRpZXIgPSB0aGlzLmNyZWF0ZVNvbGRpZXIoKTtcblxuICAgICAgICAgICAgdGhpcy5CR0ZyYW1lQW5pbS5wbGF5KGZhbHNlLCBmYWxzZSwgdHJ1ZSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3JlU29sZEVuYWJsZSA9IHRydWU7XG4gICAgICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfVxuICAgIHByaXZhdGUgY3JlYXRlU29sZGllcigpOiBTb2xkaWVyIHtcbiAgICAgICAgbGV0IG5vZGU6IGNjLk5vZGUgPSB0aGlzLmdldFNvbGRpZXJJblBvb2woKTtcbiAgICAgICAgbGV0IHM6IFNvbGRpZXIgPSBub2RlLmdldENvbXBvbmVudChcInNvbGRpZXJcIik7XG4gICAgICAgIHRoaXMuY3JlYXRlZFNvbGRpZXJzLnB1c2gocyk7XG4gICAgICAgIFNvbGRpZXIuc29sZGllcnNPZkFsaXZlLnB1c2gocyk7XG4gICAgICAgIHRoaXMucGVyc29uTWFwLmFkZENoaWxkKG5vZGUpO1xuXG4gICAgICAgIGxldCBvdXRQb3M6IGNjLlZlYzIgPSB0aGlzLm5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKHRoaXMub3V0U29sZGllclBvcyk7XG4gICAgICAgIG91dFBvcyA9IHRoaXMucGVyc29uTWFwLmNvbnZlcnRUb05vZGVTcGFjZUFSKG91dFBvcyk7XG4gICAgICAgIG5vZGUuc2V0UG9zaXRpb24ob3V0UG9zKTtcblxuICAgICAgICBsZXQgaTogbnVtYmVyID0gdGhpcy5hdmFpbGFibGVTdGF0aW9uTm8ucG9wKCk7XG4gICAgICAgIHMuaW5pdChpLCB0aGlzLnN0YXRpb25PZlNvbGRpZXJbaV0sIHRoaXMubGV2ZWwsIHRoaXMpO1xuICAgICAgICByZXR1cm4gcztcbiAgICB9XG4gICAgcHJpdmF0ZSBnZXRTb2xkaWVySW5Qb29sKCk6IGNjLk5vZGUge1xuICAgICAgICBsZXQgbjogY2MuTm9kZTtcbiAgICAgICAgaWYgKHRoaXMuc29sZGllclBvb2wuc2l6ZSgpID4gMCkge1xuICAgICAgICAgICAgbiA9IHRoaXMuc29sZGllclBvb2wuZ2V0KCk7XG4gICAgICAgICAgICBuLm9wYWNpdHkgPSAyNTU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgbiA9IGNjLmluc3RhbnRpYXRlKHRoaXMuc29sZGllclByZWZhYik7XG4gICAgICAgIHJldHVybiBuO1xuICAgIH1cblxuICAgIHVwZGF0ZShkdCkge1xuICAgICAgICB0aGlzLmF1dG9PdXRTb2xkaWVyKCk7XG4gICAgfVxufVxuIl19