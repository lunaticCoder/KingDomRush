"use strict";
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