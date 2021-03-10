"use strict";
cc._RF.push(module, '88ea4NumMZGd5gFC7814wew', 'monster');
// scripts/levelScene/monster/monster.ts

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
var creature_1 = require("../creature");
var combatLogic_1 = require("../combatLogic");
var soldier_1 = require("../tower/barrack/soldier");
var gameDataManager_1 = require("../../common/module/gameDataManager");
var utils_1 = require("../../common/module/utils");
var move_1 = require("../../common/move");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var WalkState;
(function (WalkState) {
    WalkState[WalkState["Down"] = 0] = "Down";
    WalkState[WalkState["left"] = 1] = "left";
    WalkState[WalkState["up"] = 2] = "up";
    WalkState[WalkState["right"] = 3] = "right";
})(WalkState || (WalkState = {}));
var Monster = /** @class */ (function (_super) {
    __extends(Monster, _super);
    function Monster() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.attackFrame = [];
        _this.deadFrame = [];
        _this.downWalkFrames = [];
        _this.rightWalkFrames = [];
        _this.upWalkFrames = [];
        /* 引用对象 */
        _this.monsterFactory = null;
        _this.levelScene = null;
        /* 属性 */
        _this.monsterNo = null;
        /**
         * [怪物编号]{HP,speedOfMove,intervalOfAttack,aggressivity,rangeOfAttack,rangeOfInvestigate,price}
         */
        _this.monsterData = null;
        /**
         * 移动路径 世界
         */
        _this.path = null;
        /**
         * 每段路需要的时间，[0]:path[0]->path[1]
         */
        _this.pathTime = [];
        /* 控制 */
        /**
         * 要移动的目的地的path指针
         */
        _this.pathIndex = 0;
        /**
         * 路径移动的递归开关
         * 控制递归与对外说明
         */
        _this.swiOfRecursionInPW = false;
        /**
         * 是否在路径上移动
         * 控制 是否需要回归路径点上S
         */
        _this.moveInPath = true;
        _this.stateOfFA = null;
        return _this;
    }
    Monster_1 = Monster;
    Monster.prototype.onLoad = function () {
        //对象/组件的赋值
        this.combatLogic = new combatLogic_1.default(this, soldier_1.default.soldiersOfAlive);
        this.monsterFactory = cc.find("Canvas/personMap").getComponent("monsterFactory");
        this.levelScene = cc.find("Canvas").getComponent("levelScene");
        this._move = new move_1.default(this.node);
        //怪物数据
        var gameConfig = gameDataManager_1.default.getGameConfig();
        this.monsterData = gameConfig.getMonsterData();
    };
    Monster.prototype.init = function (monsterNo, path) {
        //初始化属性
        this.monsterNo = monsterNo;
        var md = this.monsterData[monsterNo];
        this.maxHp = this.cHP = md.HP;
        this.speedOfMove = md.speedOfMove;
        this.intervalOfAttack = md.intervalOfAttack;
        this.aggressivity = md.aggressivity;
        this.rangeOfAttack = md.rangeOfAttack;
        this.rangeOfInvestigate = md.rangeOfInvestigate;
        this.intervalOfThink = md.intervalOfThink;
        //初始化数据
        this.path = path;
        this.initPathTime();
        //初始化视图
        this.frameAnim.setSpriteFrame(this.downWalkFrames[0]);
        this.refreshBloodBar();
        this.node.setPosition(this.node.parent.convertToNodeSpaceAR(this.path[0]));
        //初始化控制参数
        this.pathIndex = 1;
        this.swiOfRecursionInPW = false;
        this.moveInPath = true;
        this.stateOfFA = null;
        this.initCreature();
    };
    /**
     * 从现在开始，经time后的坐标
     * @param t
     * @returns pos 世界
     */
    Monster.prototype.getPosInTime = function (t) {
        var cI = this.pathIndex; //当前目的点的path指针
        var cP = this.getWPos();
        var ct = this.path[cI].sub(cP).mag() / this.speedOfMove;
        t -= ct;
        while (true) {
            ct = this.pathTime[cI + 1];
            t -= ct;
            if (t < 0)
                break;
            cI++;
        }
        //多出的一点时间不足以抵达下一个点，就不要了
        return this.path[cI];
    };
    /**
     * 初始化pathTime
     */
    Monster.prototype.initPathTime = function () {
        for (var i = 0; i < this.path.length - 1; i++) {
            var l = this.path[i + 1].sub(this.path[i]).mag();
            this.pathTime[i] = l / this.speedOfMove;
        }
    };
    /**
     * 不会自动停止播放行走动画
     * @param des 世界
     */
    Monster.prototype.walk = function (des, func, t) {
        if (func === void 0) { func = null; }
        if (t === void 0) { t = null; }
        var dis = des.sub(this.getWPos());
        this.playWalk(dis);
        this.move(des, func, t);
    };
    Monster.prototype.stopWalk = function () {
        this.frameAnim.stop();
        this.stateOfFA = null;
        this._move.stopMove();
    };
    /**
     * 播放行走动画,自动判断是否需要重置动画
     * @param l 行走方向
     */
    Monster.prototype.playWalk = function (l) {
        var state = this.getWalkState(l);
        if (state === this.stateOfFA)
            return;
        this.stateOfFA = state;
        switch (state) {
            case WalkState.Down: {
                this.frameAnim.setFrameArray(this.downWalkFrames);
                break;
            }
            case WalkState.up: {
                this.frameAnim.setFrameArray(this.upWalkFrames);
                break;
            }
            case WalkState.left: {
                this.frameAnim.setFrameArray(this.rightWalkFrames);
                this.node.scaleX = -1;
                break;
            }
            case WalkState.right: {
                this.frameAnim.setFrameArray(this.rightWalkFrames);
                this.node.scaleX = 1;
            }
        }
        this.frameAnim.play(true);
    };
    /**
     * 得到 人物应该使用哪种行走
     * @param l 移动方向
     * @returns walk state
     */
    Monster.prototype.getWalkState = function (l) {
        var degree = this.getDegree(l);
        if (degree >= 30 && degree <= 150) {
            return WalkState.up;
        }
        else if (degree >= 210 && degree <= 330) {
            return WalkState.Down;
        }
        else if (l.x > 0)
            return WalkState.right;
        else
            return WalkState.left;
    };
    /**
     * Gets degree
     * @param dir 方向向量
     * @returns degree [0,360)
     */
    Monster.prototype.getDegree = function (dir) {
        var rot;
        if (dir.x === 0 && dir.y > 0) //y上半轴
            rot = 90;
        else if (dir.x === 0 && dir.y < 0) //y下半轴
            rot = 270;
        else {
            var r = Math.atan(dir.y / dir.x);
            var d = r * 180 / Math.PI;
            rot = d;
        }
        if (rot === 0) //在x轴上
            if (dir.x > 0)
                rot = 0;
            else
                rot = 180;
        else if (dir.x < 0 && dir.y > 0 || dir.x < 0 && dir.y < 0) //在第二三象限
            rot += 180;
        else if (dir.x > 0 && dir.y < 0) //在第四象限
            rot += 360;
        return rot;
    };
    Monster.prototype.refreshState = function () {
        this.refreshBloodBar();
        //死亡    
        if (this.cHP === 0) {
            this.die(Monster_1.monstersOfAlive, this);
            this.playDie(this.deadFrame, this.releaseSelf.bind(this));
            this.levelScene.addCash(this.monsterData[this.monsterNo].price);
        }
    };
    Monster.prototype.releaseSelf = function () {
        this.monsterFactory.destroyMonster(this);
    };
    /**
     * 使用前需 this.swiOfRecursionInPW = true
     * @returns
     */
    Monster.prototype.walkInPath = function () {
        if (!this.swiOfRecursionInPW)
            return;
        if (!this.moveInPath) { //回归路径点
            this.pathIndex = this.getPosOfMinDisWithPath();
            this.walk(this.path[this.pathIndex], this.walkCallBack.bind(this));
            this.moveInPath = true;
        }
        else //从路径点移动到路径点
            this.walk(this.path[this.pathIndex], this.walkCallBack.bind(this), this.pathTime[this.pathIndex - 1]);
    };
    Monster.prototype.walkCallBack = function () {
        if (this.pathIndex === this.path.length - 1) {
            console.log("怪物跳脱");
            this.levelScene.subHP();
            this.stopWalkInPath();
            this.die(Monster_1.monstersOfAlive, this);
            this.releaseSelf();
        }
        this.pathIndex++;
        this.walkInPath();
    };
    /**
     * 得到离路径上最近的路径点指针
     */
    Monster.prototype.getPosOfMinDisWithPath = function () {
        var cwp = this.getWPos();
        var l = utils_1.default.getDisOfTwoPos(cwp, this.path[this.pathIndex]);
        var j = this.pathIndex;
        for (var i = this.pathIndex + 1; i < this.path.length; i++) {
            var tl = utils_1.default.getDisOfTwoPos(cwp, this.path[i]);
            if (tl < l) {
                l = tl;
                j = i;
            }
            else
                break;
        }
        return j;
    };
    /**
     * 关闭walkInPath()的递归移动，停止行走
     */
    Monster.prototype.stopWalkInPath = function () {
        this.swiOfRecursionInPW = false;
        this.moveInPath = false;
        this.stopWalk();
    };
    Monster.prototype.track = function (pos) {
        this.isTracking = true;
        this.walk(pos, function () {
            this.isTracking = true;
            this.stopWalk();
        }.bind(this));
    };
    Monster.prototype.stopTrack = function () {
        this.isTracking = false;
        this.stopWalk();
    };
    Monster.prototype.refreshTrackTarget = function (pos) {
        this.walk(pos, function () {
            this.isTracking = true;
            this.stopWalk();
        }.bind(this));
    };
    Monster.prototype.attack = function (m) {
        this.isAttacking = true;
        this.frameAnim.setFrameArray(this.attackFrame);
        this.frameAnim.play(false, false, false, function () {
            m.injure(this.aggressivity);
            this.isAttacking = false;
        }.bind(this));
    };
    Monster.prototype.nonComLogic = function () {
        this.isNonComState = true;
        //已经在执行路径上行走了
        if (this.swiOfRecursionInPW)
            return;
        this.swiOfRecursionInPW = true;
        this.walkInPath();
    };
    Monster.prototype.stopNonComLogic = function () {
        this.stopWalkInPath();
        this.isNonComState = false;
    };
    var Monster_1;
    /* 数据 */
    Monster.monstersOfAlive = null;
    __decorate([
        property({
            type: [cc.SpriteFrame],
            tooltip: "怪物攻击帧动画图片"
        })
    ], Monster.prototype, "attackFrame", void 0);
    __decorate([
        property({
            type: [cc.SpriteFrame],
            tooltip: "怪物死亡帧动画图片"
        })
    ], Monster.prototype, "deadFrame", void 0);
    __decorate([
        property({
            type: [cc.SpriteFrame]
        })
    ], Monster.prototype, "downWalkFrames", void 0);
    __decorate([
        property({
            type: [cc.SpriteFrame]
        })
    ], Monster.prototype, "rightWalkFrames", void 0);
    __decorate([
        property({
            type: [cc.SpriteFrame]
        })
    ], Monster.prototype, "upWalkFrames", void 0);
    Monster = Monster_1 = __decorate([
        ccclass
    ], Monster);
    return Monster;
}(creature_1.default));
exports.default = Monster;

cc._RF.pop();