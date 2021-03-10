
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/levelScene/monster/monsterFactory.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fe408t71SRIeYSayhsudyzg', 'monsterFactory');
// scripts/levelScene/monster/monsterFactory.ts

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
var monster_1 = require("./monster");
var animationPath_1 = require("../../common/animationPath");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MonsterFactory = /** @class */ (function (_super) {
    __extends(MonsterFactory, _super);
    function MonsterFactory() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.monsterPrefab = [];
        _this.animationPath = null;
        /**
         * 待生成的怪物列表
         */
        _this.creMonList = [];
        _this.cT = 0;
        /**
         * [怪物编号][]
         * 每次删除monster是将其回收到对象池中
         */
        _this.poolOfMonster = null;
        /**
         * 路径条数
         */
        _this.roadNum = null;
        return _this;
    }
    MonsterFactory.prototype.onLoad = function () {
        //初始化怪物对象池
        this.poolOfMonster = [];
        for (var i = 0; i < this.monsterPrefab.length; i++) {
            this.poolOfMonster[i] = new cc.NodePool();
        }
        monster_1.default.monstersOfAlive = [];
    };
    /**
     * Inits monster factory
     * @param roadNum 路径条数
     */
    MonsterFactory.prototype.init = function (roadNum) {
        this.creMonList = [];
        this.cT = 0;
        this.roadNum = roadNum;
    };
    MonsterFactory.prototype.createMonster = function (num) {
        this.creMonList.push(num);
    };
    MonsterFactory.prototype.clearMonsters = function () {
        while (monster_1.default.monstersOfAlive.length > 0) {
            var m = monster_1.default.monstersOfAlive[0];
            m.die(monster_1.default.monstersOfAlive, m);
            m.releaseSelf();
        }
    };
    MonsterFactory.prototype.destroyMonster = function (m) {
        this.poolOfMonster[m.monsterNo].put(m.node);
    };
    MonsterFactory.prototype._createMonster = function (num) {
        var m;
        if (this.poolOfMonster[num].size() > 0) {
            m = this.poolOfMonster[num].get();
            m.opacity = 255;
        }
        else
            m = cc.instantiate(this.monsterPrefab[num]);
        var mScr = m.getComponent("monster");
        this.node.addChild(m);
        monster_1.default.monstersOfAlive.push(mScr);
        mScr.init(num, this.animationPath.getWorldPath("road" + this.getRandomNumber(1, this.roadNum).toString()));
    };
    MonsterFactory.prototype.getRandomNumber = function (min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
    };
    MonsterFactory.prototype.update = function (dt) {
        if (this.creMonList.length > 0) {
            this.cT += dt;
            if (this.cT > 1) {
                this.cT = 0;
                this._createMonster(this.creMonList.shift());
            }
        }
    };
    __decorate([
        property({ type: [cc.Prefab] })
    ], MonsterFactory.prototype, "monsterPrefab", void 0);
    __decorate([
        property({ type: animationPath_1.default })
    ], MonsterFactory.prototype, "animationPath", void 0);
    MonsterFactory = __decorate([
        ccclass
    ], MonsterFactory);
    return MonsterFactory;
}(cc.Component));
exports.default = MonsterFactory;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2xldmVsU2NlbmUvbW9uc3Rlci9tb25zdGVyRmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxQ0FBZ0M7QUFDaEMsNERBQXVEO0FBRWpELElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTRDLGtDQUFZO0lBQXhEO1FBQUEscUVBeUZDO1FBdEZXLG1CQUFhLEdBQWdCLEVBQUUsQ0FBQztRQUdoQyxtQkFBYSxHQUFrQixJQUFJLENBQUM7UUFFNUM7O1dBRUc7UUFDSCxnQkFBVSxHQUFhLEVBQUUsQ0FBQztRQUNsQixRQUFFLEdBQVcsQ0FBQyxDQUFDO1FBQ3ZCOzs7V0FHRztRQUNLLG1CQUFhLEdBQWtCLElBQUksQ0FBQztRQUM1Qzs7V0FFRztRQUNLLGFBQU8sR0FBVyxJQUFJLENBQUM7O0lBb0VuQyxDQUFDO0lBbEVHLCtCQUFNLEdBQU47UUFDSSxVQUFVO1FBQ1YsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFDeEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2hELElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDN0M7UUFFRCxpQkFBTyxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVEOzs7T0FHRztJQUNILDZCQUFJLEdBQUosVUFBSyxPQUFlO1FBQ2hCLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1osSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7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dCI6WyJpbXBvcnQgTW9uc3RlciBmcm9tIFwiLi9tb25zdGVyXCI7XG5pbXBvcnQgQW5pbWF0aW9uUGF0aCBmcm9tIFwiLi4vLi4vY29tbW9uL2FuaW1hdGlvblBhdGhcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbnN0ZXJGYWN0b3J5IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFtjYy5QcmVmYWJdIH0pXG4gICAgcHJpdmF0ZSBtb25zdGVyUHJlZmFiOiBjYy5QcmVmYWJbXSA9IFtdO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogQW5pbWF0aW9uUGF0aCB9KVxuICAgIHByaXZhdGUgYW5pbWF0aW9uUGF0aDogQW5pbWF0aW9uUGF0aCA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiDlvoXnlJ/miJDnmoTmgKrnianliJfooahcbiAgICAgKi9cbiAgICBjcmVNb25MaXN0OiBudW1iZXJbXSA9IFtdO1xuICAgIHByaXZhdGUgY1Q6IG51bWJlciA9IDA7XG4gICAgLyoqXG4gICAgICogW+aAqueJqee8luWPt11bXVxuICAgICAqIOavj+asoeWIoOmZpG1vbnN0ZXLmmK/lsIblhbblm57mlLbliLDlr7nosaHmsaDkuK1cbiAgICAgKi9cbiAgICBwcml2YXRlIHBvb2xPZk1vbnN0ZXI6IGNjLk5vZGVQb29sW10gPSBudWxsO1xuICAgIC8qKlxuICAgICAqIOi3r+W+hOadoeaVsFxuICAgICAqL1xuICAgIHByaXZhdGUgcm9hZE51bTogbnVtYmVyID0gbnVsbDtcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgLy/liJ3lp4vljJbmgKrnianlr7nosaHmsaBcbiAgICAgICAgdGhpcy5wb29sT2ZNb25zdGVyID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5tb25zdGVyUHJlZmFiLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnBvb2xPZk1vbnN0ZXJbaV0gPSBuZXcgY2MuTm9kZVBvb2woKTtcbiAgICAgICAgfVxuXG4gICAgICAgIE1vbnN0ZXIubW9uc3RlcnNPZkFsaXZlID0gW107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdHMgbW9uc3RlciBmYWN0b3J5XG4gICAgICogQHBhcmFtIHJvYWROdW0g6Lev5b6E5p2h5pWwXG4gICAgICovXG4gICAgaW5pdChyb2FkTnVtOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5jcmVNb25MaXN0ID0gW107XG4gICAgICAgIHRoaXMuY1QgPSAwO1xuICAgICAgICB0aGlzLnJvYWROdW0gPSByb2FkTnVtO1xuICAgIH1cblxuICAgIGNyZWF0ZU1vbnN0ZXIobnVtOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5jcmVNb25MaXN0LnB1c2gobnVtKTtcbiAgICB9XG5cbiAgICBjbGVhck1vbnN0ZXJzKCkge1xuICAgICAgICB3aGlsZSAoTW9uc3Rlci5tb25zdGVyc09mQWxpdmUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IG06IE1vbnN0ZXIgPSBNb25zdGVyLm1vbnN0ZXJzT2ZBbGl2ZVswXTtcbiAgICAgICAgICAgIG0uZGllKE1vbnN0ZXIubW9uc3RlcnNPZkFsaXZlLCBtKTtcbiAgICAgICAgICAgIG0ucmVsZWFzZVNlbGYoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlc3Ryb3lNb25zdGVyKG06IE1vbnN0ZXIpIHtcbiAgICAgICAgdGhpcy5wb29sT2ZNb25zdGVyW20ubW9uc3Rlck5vXS5wdXQobS5ub2RlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jcmVhdGVNb25zdGVyKG51bTogbnVtYmVyKSB7XG4gICAgICAgIGxldCBtOiBjYy5Ob2RlO1xuICAgICAgICBpZiAodGhpcy5wb29sT2ZNb25zdGVyW251bV0uc2l6ZSgpID4gMCkge1xuICAgICAgICAgICAgbSA9IHRoaXMucG9vbE9mTW9uc3RlcltudW1dLmdldCgpO1xuICAgICAgICAgICAgbS5vcGFjaXR5ID0gMjU1O1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIG0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLm1vbnN0ZXJQcmVmYWJbbnVtXSk7XG5cbiAgICAgICAgbGV0IG1TY3I6IE1vbnN0ZXIgPSBtLmdldENvbXBvbmVudChcIm1vbnN0ZXJcIik7XG4gICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChtKTtcbiAgICAgICAgTW9uc3Rlci5tb25zdGVyc09mQWxpdmUucHVzaChtU2NyKTtcblxuICAgICAgICBtU2NyLmluaXQobnVtLCB0aGlzLmFuaW1hdGlvblBhdGguZ2V0V29ybGRQYXRoKFwicm9hZFwiICsgdGhpcy5nZXRSYW5kb21OdW1iZXIoMSwgdGhpcy5yb2FkTnVtKS50b1N0cmluZygpKSlcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFJhbmRvbU51bWJlcihtaW4sIG1heCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBtaW4gKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpO1xuICAgIH1cblxuICAgIHVwZGF0ZShkdCkge1xuICAgICAgICBpZiAodGhpcy5jcmVNb25MaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuY1QgKz0gZHQ7XG4gICAgICAgICAgICBpZiAodGhpcy5jVCA+IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNUID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVNb25zdGVyKHRoaXMuY3JlTW9uTGlzdC5zaGlmdCgpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfVxufVxuIl19