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
        /* ???????????? */
        _this.monsterFactory = null;
        _this.levelScene = null;
        /* ?????? */
        _this.monsterNo = null;
        /**
         * [????????????]{HP,speedOfMove,intervalOfAttack,aggressivity,rangeOfAttack,rangeOfInvestigate,price}
         */
        _this.monsterData = null;
        /**
         * ???????????? ??????
         */
        _this.path = null;
        /**
         * ???????????????????????????[0]:path[0]->path[1]
         */
        _this.pathTime = [];
        /* ?????? */
        /**
         * ????????????????????????path??????
         */
        _this.pathIndex = 0;
        /**
         * ???????????????????????????
         * ???????????????????????????
         */
        _this.swiOfRecursionInPW = false;
        /**
         * ????????????????????????
         * ?????? ??????????????????????????????S
         */
        _this.moveInPath = true;
        _this.stateOfFA = null;
        return _this;
    }
    Monster_1 = Monster;
    Monster.prototype.onLoad = function () {
        //??????/???????????????
        this.combatLogic = new combatLogic_1.default(this, soldier_1.default.soldiersOfAlive);
        this.monsterFactory = cc.find("Canvas/personMap").getComponent("monsterFactory");
        this.levelScene = cc.find("Canvas").getComponent("levelScene");
        this._move = new move_1.default(this.node);
        //????????????
        var gameConfig = gameDataManager_1.default.getGameConfig();
        this.monsterData = gameConfig.getMonsterData();
    };
    Monster.prototype.init = function (monsterNo, path) {
        //???????????????
        this.monsterNo = monsterNo;
        var md = this.monsterData[monsterNo];
        this.maxHp = this.cHP = md.HP;
        this.speedOfMove = md.speedOfMove;
        this.intervalOfAttack = md.intervalOfAttack;
        this.aggressivity = md.aggressivity;
        this.rangeOfAttack = md.rangeOfAttack;
        this.rangeOfInvestigate = md.rangeOfInvestigate;
        this.intervalOfThink = md.intervalOfThink;
        //???????????????
        this.path = path;
        this.initPathTime();
        //???????????????
        this.frameAnim.setSpriteFrame(this.downWalkFrames[0]);
        this.refreshBloodBar();
        this.node.setPosition(this.node.parent.convertToNodeSpaceAR(this.path[0]));
        //?????????????????????
        this.pathIndex = 1;
        this.swiOfRecursionInPW = false;
        this.moveInPath = true;
        this.stateOfFA = null;
        this.initCreature();
    };
    /**
     * ?????????????????????time????????????
     * @param t
     * @returns pos ??????
     */
    Monster.prototype.getPosInTime = function (t) {
        var cI = this.pathIndex; //??????????????????path??????
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
        //???????????????????????????????????????????????????????????????
        return this.path[cI];
    };
    /**
     * ?????????pathTime
     */
    Monster.prototype.initPathTime = function () {
        for (var i = 0; i < this.path.length - 1; i++) {
            var l = this.path[i + 1].sub(this.path[i]).mag();
            this.pathTime[i] = l / this.speedOfMove;
        }
    };
    /**
     * ????????????????????????????????????
     * @param des ??????
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
     * ??????????????????,????????????????????????????????????
     * @param l ????????????
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
     * ?????? ??????????????????????????????
     * @param l ????????????
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
     * @param dir ????????????
     * @returns degree [0,360)
     */
    Monster.prototype.getDegree = function (dir) {
        var rot;
        if (dir.x === 0 && dir.y > 0) //y?????????
            rot = 90;
        else if (dir.x === 0 && dir.y < 0) //y?????????
            rot = 270;
        else {
            var r = Math.atan(dir.y / dir.x);
            var d = r * 180 / Math.PI;
            rot = d;
        }
        if (rot === 0) //???x??????
            if (dir.x > 0)
                rot = 0;
            else
                rot = 180;
        else if (dir.x < 0 && dir.y > 0 || dir.x < 0 && dir.y < 0) //??????????????????
            rot += 180;
        else if (dir.x > 0 && dir.y < 0) //???????????????
            rot += 360;
        return rot;
    };
    Monster.prototype.refreshState = function () {
        this.refreshBloodBar();
        //??????    
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
     * ???????????? this.swiOfRecursionInPW = true
     * @returns
     */
    Monster.prototype.walkInPath = function () {
        if (!this.swiOfRecursionInPW)
            return;
        if (!this.moveInPath) { //???????????????
            this.pathIndex = this.getPosOfMinDisWithPath();
            this.walk(this.path[this.pathIndex], this.walkCallBack.bind(this));
            this.moveInPath = true;
        }
        else //??????????????????????????????
            this.walk(this.path[this.pathIndex], this.walkCallBack.bind(this), this.pathTime[this.pathIndex - 1]);
    };
    Monster.prototype.walkCallBack = function () {
        if (this.pathIndex === this.path.length - 1) {
            console.log("????????????");
            this.levelScene.subHP();
            this.stopWalkInPath();
            this.die(Monster_1.monstersOfAlive, this);
            this.releaseSelf();
        }
        this.pathIndex++;
        this.walkInPath();
    };
    /**
     * ??????????????????????????????????????????
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
     * ??????walkInPath()??????????????????????????????
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
        //?????????????????????????????????
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
    /* ?????? */
    Monster.monstersOfAlive = null;
    __decorate([
        property({
            type: [cc.SpriteFrame],
            tooltip: "???????????????????????????"
        })
    ], Monster.prototype, "attackFrame", void 0);
    __decorate([
        property({
            type: [cc.SpriteFrame],
            tooltip: "???????????????????????????"
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