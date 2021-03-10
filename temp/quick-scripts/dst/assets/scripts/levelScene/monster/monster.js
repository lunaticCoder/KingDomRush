
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/levelScene/monster/monster.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2xldmVsU2NlbmUvbW9uc3Rlci9tb25zdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdDQUFtQztBQUNuQyw4Q0FBeUM7QUFDekMsb0RBQStDO0FBQy9DLHVFQUFrRjtBQUNsRixtREFBOEM7QUFHOUMsMENBQXFDO0FBQy9CLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRTVDLElBQUssU0FBbUM7QUFBeEMsV0FBSyxTQUFTO0lBQUcseUNBQUksQ0FBQTtJQUFFLHlDQUFJLENBQUE7SUFBRSxxQ0FBRSxDQUFBO0lBQUUsMkNBQUssQ0FBQTtBQUFDLENBQUMsRUFBbkMsU0FBUyxLQUFULFNBQVMsUUFBMEI7QUFHeEM7SUFBcUMsMkJBQVE7SUFBN0M7UUFBQSxxRUErVkM7UUF6VlcsaUJBQVcsR0FBcUIsRUFBRSxDQUFDO1FBS25DLGVBQVMsR0FBcUIsRUFBRSxDQUFDO1FBS2pDLG9CQUFjLEdBQXFCLEVBQUUsQ0FBQztRQUt0QyxxQkFBZSxHQUFxQixFQUFFLENBQUM7UUFLdkMsa0JBQVksR0FBcUIsRUFBRSxDQUFDO1FBRzVDLFVBQVU7UUFDRixvQkFBYyxHQUFtQixJQUFJLENBQUM7UUFDdEMsZ0JBQVUsR0FBZSxJQUFJLENBQUM7UUFFdEMsUUFBUTtRQUNSLGVBQVMsR0FBVyxJQUFJLENBQUM7UUFJekI7O1dBRUc7UUFDSyxpQkFBVyxHQUFVLElBQUksQ0FBQztRQUNsQzs7V0FFRztRQUNLLFVBQUksR0FBYyxJQUFJLENBQUM7UUFDL0I7O1dBRUc7UUFDSyxjQUFRLEdBQWEsRUFBRSxDQUFDO1FBRWhDLFFBQVE7UUFDUjs7V0FFRztRQUNLLGVBQVMsR0FBVyxDQUFDLENBQUM7UUFDOUI7OztXQUdHO1FBQ0gsd0JBQWtCLEdBQVksS0FBSyxDQUFDO1FBQ3BDOzs7V0FHRztRQUNLLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBQzNCLGVBQVMsR0FBYyxJQUFJLENBQUM7O0lBNlJ4QyxDQUFDO2dCQS9Wb0IsT0FBTztJQW9FeEIsd0JBQU0sR0FBTjtRQUNJLFVBQVU7UUFDVixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUkscUJBQVcsQ0FBQyxJQUFJLEVBQUUsaUJBQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNqRixJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxjQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWpDLE1BQU07UUFDTixJQUFJLFVBQVUsR0FBZSx5QkFBZSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQzdELElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ25ELENBQUM7SUFFRCxzQkFBSSxHQUFKLFVBQUssU0FBaUIsRUFBRSxJQUFlO1FBQ25DLE9BQU87UUFDUCxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLEVBQUUsR0FBUSxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQztRQUNsQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUFDO1FBQzVDLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQztRQUNwQyxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUM7UUFDdEMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztRQUNoRCxJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQyxlQUFlLENBQUM7UUFFMUMsT0FBTztRQUNQLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUVwQixPQUFPO1FBQ1AsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUUzRSxTQUFTO1FBQ1QsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztRQUNoQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCw4QkFBWSxHQUFaLFVBQWEsQ0FBUztRQUNsQixJQUFJLEVBQUUsR0FBVyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsY0FBYztRQUMvQyxJQUFJLEVBQUUsR0FBWSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDakMsSUFBSSxFQUFFLEdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUNoRSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRVIsT0FBTyxJQUFJLEVBQUU7WUFDVCxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDM0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNSLElBQUksQ0FBQyxHQUFHLENBQUM7Z0JBQ0wsTUFBTTtZQUNWLEVBQUUsRUFBRSxDQUFDO1NBQ1I7UUFFRCx1QkFBdUI7UUFDdkIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFDRDs7T0FFRztJQUNLLDhCQUFZLEdBQXBCO1FBQ0ksS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMzQyxJQUFJLENBQUMsR0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ3pELElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7U0FDM0M7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsc0JBQUksR0FBSixVQUFLLEdBQVksRUFBRSxJQUFxQixFQUFFLENBQWdCO1FBQXZDLHFCQUFBLEVBQUEsV0FBcUI7UUFBRSxrQkFBQSxFQUFBLFFBQWdCO1FBQ3RELElBQUksR0FBRyxHQUFZLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVuQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVTLDBCQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRDs7O09BR0c7SUFDSywwQkFBUSxHQUFoQixVQUFpQixDQUFVO1FBQ3ZCLElBQUksS0FBSyxHQUFjLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUMsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLFNBQVM7WUFDeEIsT0FBTztRQUVYLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLFFBQVEsS0FBSyxFQUFFO1lBQ1gsS0FBSyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDbEQsTUFBTTthQUNUO1lBQ0QsS0FBSyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUNoRCxNQUFNO2FBQ1Q7WUFDRCxLQUFLLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUNuRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDdEIsTUFBTTthQUNUO1lBQ0QsS0FBSyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2xCLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDbkQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2FBQ3hCO1NBQ0o7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQ0Q7Ozs7T0FJRztJQUNLLDhCQUFZLEdBQXBCLFVBQXFCLENBQVU7UUFDM0IsSUFBSSxNQUFNLEdBQVcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QyxJQUFJLE1BQU0sSUFBSSxFQUFFLElBQUksTUFBTSxJQUFJLEdBQUcsRUFBRTtZQUMvQixPQUFPLFNBQVMsQ0FBQyxFQUFFLENBQUM7U0FDdkI7YUFDSSxJQUFJLE1BQU0sSUFBSSxHQUFHLElBQUksTUFBTSxJQUFJLEdBQUcsRUFBRTtZQUNyQyxPQUFPLFNBQVMsQ0FBQyxJQUFJLENBQUM7U0FDekI7YUFDSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUNaLE9BQU8sU0FBUyxDQUFDLEtBQUssQ0FBQzs7WUFFdkIsT0FBTyxTQUFTLENBQUMsSUFBSSxDQUFDO0lBQzlCLENBQUM7SUFDRDs7OztPQUlHO0lBQ0ssMkJBQVMsR0FBakIsVUFBa0IsR0FBWTtRQUMxQixJQUFJLEdBQVcsQ0FBQztRQUNoQixJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU07WUFDaEMsR0FBRyxHQUFHLEVBQUUsQ0FBQzthQUNSLElBQUksR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTTtZQUNyQyxHQUFHLEdBQUcsR0FBRyxDQUFDO2FBQ1Q7WUFDRCxJQUFJLENBQUMsR0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxHQUFXLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNsQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1NBQ1g7UUFFRCxJQUFJLEdBQUcsS0FBSyxDQUFDLEVBQUUsTUFBTTtZQUNqQixJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztnQkFDVCxHQUFHLEdBQUcsQ0FBQyxDQUFDOztnQkFFUixHQUFHLEdBQUcsR0FBRyxDQUFDO2FBQ2IsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxRQUFRO1lBQy9ELEdBQUcsSUFBSSxHQUFHLENBQUM7YUFDVixJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE9BQU87WUFDcEMsR0FBRyxJQUFJLEdBQUcsQ0FBQztRQUNmLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVTLDhCQUFZLEdBQXRCO1FBQ0ksSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRXZCLFFBQVE7UUFDUixJQUFJLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBTyxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMxRCxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNuRTtJQUNMLENBQUM7SUFFRCw2QkFBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVEOzs7T0FHRztJQUNPLDRCQUFVLEdBQXBCO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0I7WUFDeEIsT0FBTztRQUVYLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUUsT0FBTztZQUMzQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1lBQy9DLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNuRSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztTQUMxQjthQUNJLFlBQVk7WUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBRTdHLENBQUM7SUFDTyw4QkFBWSxHQUFwQjtRQUNJLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDekMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN0QixJQUFJLENBQUMsR0FBRyxDQUFDLFNBQU8sQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3RCO1FBQ0QsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBQ0Q7O09BRUc7SUFDSyx3Q0FBc0IsR0FBOUI7UUFDSSxJQUFJLEdBQUcsR0FBWSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLEdBQVcsZUFBSyxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsR0FBVyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQy9CLEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3hELElBQUksRUFBRSxHQUFXLGVBQUssQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6RCxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUU7Z0JBQ1IsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDUCxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ1Q7O2dCQUVHLE1BQU07U0FDYjtRQUNELE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUVEOztPQUVHO0lBQ0ssZ0NBQWMsR0FBdEI7UUFDSSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBR0QsdUJBQUssR0FBTCxVQUFNLEdBQVk7UUFDZCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNYLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNwQixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7SUFDakIsQ0FBQztJQUNELDJCQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUNELG9DQUFrQixHQUFsQixVQUFtQixHQUFZO1FBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1gsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFDdkIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtJQUNqQixDQUFDO0lBRUQsd0JBQU0sR0FBTixVQUFPLENBQVc7UUFDZCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUV4QixJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7WUFDckMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDN0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBRWxCLENBQUM7SUFFRCw2QkFBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFDMUIsYUFBYTtRQUNiLElBQUksSUFBSSxDQUFDLGtCQUFrQjtZQUN2QixPQUFPO1FBQ1gsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztRQUMvQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUNELGlDQUFlLEdBQWY7UUFDSSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7SUFDL0IsQ0FBQzs7SUF4VEQsUUFBUTtJQUNNLHVCQUFlLEdBQWMsSUFBSSxDQUFDO0lBL0JoRDtRQUpDLFFBQVEsQ0FBQztZQUNOLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7WUFDdEIsT0FBTyxFQUFFLFdBQVc7U0FDdkIsQ0FBQztnREFDeUM7SUFLM0M7UUFKQyxRQUFRLENBQUM7WUFDTixJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO1lBQ3RCLE9BQU8sRUFBRSxXQUFXO1NBQ3ZCLENBQUM7OENBQ3VDO0lBS3pDO1FBSEMsUUFBUSxDQUFDO1lBQ04sSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQztTQUN6QixDQUFDO21EQUM0QztJQUs5QztRQUhDLFFBQVEsQ0FBQztZQUNOLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7U0FDekIsQ0FBQztvREFDNkM7SUFLL0M7UUFIQyxRQUFRLENBQUM7WUFDTixJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO1NBQ3pCLENBQUM7aURBQzBDO0lBMUIzQixPQUFPO1FBRDNCLE9BQU87T0FDYSxPQUFPLENBK1YzQjtJQUFELGNBQUM7Q0EvVkQsQUErVkMsQ0EvVm9DLGtCQUFRLEdBK1Y1QztrQkEvVm9CLE9BQU8iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ3JlYXR1cmUgZnJvbSBcIi4uL2NyZWF0dXJlXCI7XG5pbXBvcnQgQ29tYmF0TG9naWMgZnJvbSBcIi4uL2NvbWJhdExvZ2ljXCI7XG5pbXBvcnQgU29sZGllciBmcm9tIFwiLi4vdG93ZXIvYmFycmFjay9zb2xkaWVyXCI7XG5pbXBvcnQgR2FtZURhdGFTdG9yYWdlLCB7IEdhbWVDb25maWcgfSBmcm9tIFwiLi4vLi4vY29tbW9uL21vZHVsZS9nYW1lRGF0YU1hbmFnZXJcIjtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi4vLi4vY29tbW9uL21vZHVsZS91dGlsc1wiO1xuaW1wb3J0IE1vbnN0ZXJGYWN0b3J5IGZyb20gXCIuL21vbnN0ZXJGYWN0b3J5XCI7XG5pbXBvcnQgTGV2ZWxTY2VuZSBmcm9tIFwiLi4vbGV2ZWxTY2VuZVwiO1xuaW1wb3J0IE1vdmUgZnJvbSBcIi4uLy4uL2NvbW1vbi9tb3ZlXCI7XG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5lbnVtIFdhbGtTdGF0ZSB7IERvd24sIGxlZnQsIHVwLCByaWdodCB9XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb25zdGVyIGV4dGVuZHMgQ3JlYXR1cmUge1xuXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogW2NjLlNwcml0ZUZyYW1lXSxcbiAgICAgICAgdG9vbHRpcDogXCLmgKrnianmlLvlh7vluKfliqjnlLvlm77niYdcIlxuICAgIH0pXG4gICAgcHJpdmF0ZSBhdHRhY2tGcmFtZTogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IFtjYy5TcHJpdGVGcmFtZV0sXG4gICAgICAgIHRvb2x0aXA6IFwi5oCq54mp5q275Lqh5bin5Yqo55S75Zu+54mHXCJcbiAgICB9KVxuICAgIHByaXZhdGUgZGVhZEZyYW1lOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XG5cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBbY2MuU3ByaXRlRnJhbWVdXG4gICAgfSlcbiAgICBwcml2YXRlIGRvd25XYWxrRnJhbWVzOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XG5cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBbY2MuU3ByaXRlRnJhbWVdXG4gICAgfSlcbiAgICBwcml2YXRlIHJpZ2h0V2Fsa0ZyYW1lczogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xuXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogW2NjLlNwcml0ZUZyYW1lXVxuICAgIH0pXG4gICAgcHJpdmF0ZSB1cFdhbGtGcmFtZXM6IGNjLlNwcml0ZUZyYW1lW10gPSBbXTtcblxuXG4gICAgLyog5byV55So5a+56LGhICovXG4gICAgcHJpdmF0ZSBtb25zdGVyRmFjdG9yeTogTW9uc3RlckZhY3RvcnkgPSBudWxsO1xuICAgIHByaXZhdGUgbGV2ZWxTY2VuZTogTGV2ZWxTY2VuZSA9IG51bGw7XG5cbiAgICAvKiDlsZ7mgKcgKi9cbiAgICBtb25zdGVyTm86IG51bWJlciA9IG51bGw7XG5cbiAgICAvKiDmlbDmja4gKi9cbiAgICBwdWJsaWMgc3RhdGljIG1vbnN0ZXJzT2ZBbGl2ZTogTW9uc3RlcltdID0gbnVsbDtcbiAgICAvKipcbiAgICAgKiBb5oCq54mp57yW5Y+3XXtIUCxzcGVlZE9mTW92ZSxpbnRlcnZhbE9mQXR0YWNrLGFnZ3Jlc3Npdml0eSxyYW5nZU9mQXR0YWNrLHJhbmdlT2ZJbnZlc3RpZ2F0ZSxwcmljZX1cbiAgICAgKi9cbiAgICBwcml2YXRlIG1vbnN0ZXJEYXRhOiBhbnlbXSA9IG51bGw7XG4gICAgLyoqXG4gICAgICog56e75Yqo6Lev5b6EIOS4lueVjFxuICAgICAqL1xuICAgIHByaXZhdGUgcGF0aDogY2MuVmVjMltdID0gbnVsbDtcbiAgICAvKipcbiAgICAgKiDmr4/mrrXot6/pnIDopoHnmoTml7bpl7TvvIxbMF06cGF0aFswXS0+cGF0aFsxXVxuICAgICAqL1xuICAgIHByaXZhdGUgcGF0aFRpbWU6IG51bWJlcltdID0gW107XG5cbiAgICAvKiDmjqfliLYgKi9cbiAgICAvKipcbiAgICAgKiDopoHnp7vliqjnmoTnm67nmoTlnLDnmoRwYXRo5oyH6ZKIXG4gICAgICovXG4gICAgcHJpdmF0ZSBwYXRoSW5kZXg6IG51bWJlciA9IDA7XG4gICAgLyoqXG4gICAgICog6Lev5b6E56e75Yqo55qE6YCS5b2S5byA5YWzXG4gICAgICog5o6n5Yi26YCS5b2S5LiO5a+55aSW6K+05piOXG4gICAgICovXG4gICAgc3dpT2ZSZWN1cnNpb25JblBXOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICog5piv5ZCm5Zyo6Lev5b6E5LiK56e75YqoXG4gICAgICog5o6n5Yi2IOaYr+WQpumcgOimgeWbnuW9kui3r+W+hOeCueS4ilNcbiAgICAgKi9cbiAgICBwcml2YXRlIG1vdmVJblBhdGg6IGJvb2xlYW4gPSB0cnVlO1xuICAgIHByaXZhdGUgc3RhdGVPZkZBOiBXYWxrU3RhdGUgPSBudWxsO1xuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICAvL+WvueixoS/nu4Tku7bnmoTotYvlgLxcbiAgICAgICAgdGhpcy5jb21iYXRMb2dpYyA9IG5ldyBDb21iYXRMb2dpYyh0aGlzLCBTb2xkaWVyLnNvbGRpZXJzT2ZBbGl2ZSk7XG4gICAgICAgIHRoaXMubW9uc3RlckZhY3RvcnkgPSBjYy5maW5kKFwiQ2FudmFzL3BlcnNvbk1hcFwiKS5nZXRDb21wb25lbnQoXCJtb25zdGVyRmFjdG9yeVwiKTtcbiAgICAgICAgdGhpcy5sZXZlbFNjZW5lID0gY2MuZmluZChcIkNhbnZhc1wiKS5nZXRDb21wb25lbnQoXCJsZXZlbFNjZW5lXCIpO1xuICAgICAgICB0aGlzLl9tb3ZlID0gbmV3IE1vdmUodGhpcy5ub2RlKTtcblxuICAgICAgICAvL+aAqueJqeaVsOaNrlxuICAgICAgICBsZXQgZ2FtZUNvbmZpZzogR2FtZUNvbmZpZyA9IEdhbWVEYXRhU3RvcmFnZS5nZXRHYW1lQ29uZmlnKCk7XG4gICAgICAgIHRoaXMubW9uc3RlckRhdGEgPSBnYW1lQ29uZmlnLmdldE1vbnN0ZXJEYXRhKCk7XG4gICAgfVxuXG4gICAgaW5pdChtb25zdGVyTm86IG51bWJlciwgcGF0aDogY2MuVmVjMltdKSB7XG4gICAgICAgIC8v5Yid5aeL5YyW5bGe5oCnXG4gICAgICAgIHRoaXMubW9uc3Rlck5vID0gbW9uc3Rlck5vO1xuICAgICAgICBsZXQgbWQ6IGFueSA9IHRoaXMubW9uc3RlckRhdGFbbW9uc3Rlck5vXTtcbiAgICAgICAgdGhpcy5tYXhIcCA9IHRoaXMuY0hQID0gbWQuSFA7XG4gICAgICAgIHRoaXMuc3BlZWRPZk1vdmUgPSBtZC5zcGVlZE9mTW92ZTtcbiAgICAgICAgdGhpcy5pbnRlcnZhbE9mQXR0YWNrID0gbWQuaW50ZXJ2YWxPZkF0dGFjaztcbiAgICAgICAgdGhpcy5hZ2dyZXNzaXZpdHkgPSBtZC5hZ2dyZXNzaXZpdHk7XG4gICAgICAgIHRoaXMucmFuZ2VPZkF0dGFjayA9IG1kLnJhbmdlT2ZBdHRhY2s7XG4gICAgICAgIHRoaXMucmFuZ2VPZkludmVzdGlnYXRlID0gbWQucmFuZ2VPZkludmVzdGlnYXRlO1xuICAgICAgICB0aGlzLmludGVydmFsT2ZUaGluayA9IG1kLmludGVydmFsT2ZUaGluaztcblxuICAgICAgICAvL+WIneWni+WMluaVsOaNrlxuICAgICAgICB0aGlzLnBhdGggPSBwYXRoO1xuICAgICAgICB0aGlzLmluaXRQYXRoVGltZSgpO1xuXG4gICAgICAgIC8v5Yid5aeL5YyW6KeG5Zu+XG4gICAgICAgIHRoaXMuZnJhbWVBbmltLnNldFNwcml0ZUZyYW1lKHRoaXMuZG93bldhbGtGcmFtZXNbMF0pO1xuICAgICAgICB0aGlzLnJlZnJlc2hCbG9vZEJhcigpO1xuICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24odGhpcy5ub2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0aGlzLnBhdGhbMF0pKTtcblxuICAgICAgICAvL+WIneWni+WMluaOp+WItuWPguaVsFxuICAgICAgICB0aGlzLnBhdGhJbmRleCA9IDE7XG4gICAgICAgIHRoaXMuc3dpT2ZSZWN1cnNpb25JblBXID0gZmFsc2U7XG4gICAgICAgIHRoaXMubW92ZUluUGF0aCA9IHRydWU7XG4gICAgICAgIHRoaXMuc3RhdGVPZkZBID0gbnVsbDtcbiAgICAgICAgdGhpcy5pbml0Q3JlYXR1cmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDku47njrDlnKjlvIDlp4vvvIznu490aW1l5ZCO55qE5Z2Q5qCHXG4gICAgICogQHBhcmFtIHQgXG4gICAgICogQHJldHVybnMgcG9zIOS4lueVjFxuICAgICAqL1xuICAgIGdldFBvc0luVGltZSh0OiBudW1iZXIpOiBjYy5WZWMyIHtcbiAgICAgICAgbGV0IGNJOiBudW1iZXIgPSB0aGlzLnBhdGhJbmRleDsgLy/lvZPliY3nm67nmoTngrnnmoRwYXRo5oyH6ZKIXG4gICAgICAgIGxldCBjUDogY2MuVmVjMiA9IHRoaXMuZ2V0V1BvcygpO1xuICAgICAgICBsZXQgY3Q6IG51bWJlciA9IHRoaXMucGF0aFtjSV0uc3ViKGNQKS5tYWcoKSAvIHRoaXMuc3BlZWRPZk1vdmU7XG4gICAgICAgIHQgLT0gY3Q7XG5cbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIGN0ID0gdGhpcy5wYXRoVGltZVtjSSArIDFdO1xuICAgICAgICAgICAgdCAtPSBjdDtcbiAgICAgICAgICAgIGlmICh0IDwgMClcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNJKys7XG4gICAgICAgIH1cblxuICAgICAgICAvL+WkmuWHuueahOS4gOeCueaXtumXtOS4jei2s+S7peaKtei+vuS4i+S4gOS4queCue+8jOWwseS4jeimgeS6hlxuICAgICAgICByZXR1cm4gdGhpcy5wYXRoW2NJXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5Yid5aeL5YyWcGF0aFRpbWVcbiAgICAgKi9cbiAgICBwcml2YXRlIGluaXRQYXRoVGltZSgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBhdGgubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbDogbnVtYmVyID0gdGhpcy5wYXRoW2kgKyAxXS5zdWIodGhpcy5wYXRoW2ldKS5tYWcoKTtcbiAgICAgICAgICAgIHRoaXMucGF0aFRpbWVbaV0gPSBsIC8gdGhpcy5zcGVlZE9mTW92ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOS4jeS8muiHquWKqOWBnOatouaSreaUvuihjOi1sOWKqOeUu1xuICAgICAqIEBwYXJhbSBkZXMg5LiW55WMXG4gICAgICovXG4gICAgd2FsayhkZXM6IGNjLlZlYzIsIGZ1bmM6IEZ1bmN0aW9uID0gbnVsbCwgdDogbnVtYmVyID0gbnVsbCkge1xuICAgICAgICBsZXQgZGlzOiBjYy5WZWMyID0gZGVzLnN1Yih0aGlzLmdldFdQb3MoKSk7XG4gICAgICAgIHRoaXMucGxheVdhbGsoZGlzKTtcblxuICAgICAgICB0aGlzLm1vdmUoZGVzLCBmdW5jLCB0KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc3RvcFdhbGsoKSB7XG4gICAgICAgIHRoaXMuZnJhbWVBbmltLnN0b3AoKTtcbiAgICAgICAgdGhpcy5zdGF0ZU9mRkEgPSBudWxsO1xuICAgICAgICB0aGlzLl9tb3ZlLnN0b3BNb3ZlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5pKt5pS+6KGM6LWw5Yqo55S7LOiHquWKqOWIpOaWreaYr+WQpumcgOimgemHjee9ruWKqOeUu1xuICAgICAqIEBwYXJhbSBsIOihjOi1sOaWueWQkVxuICAgICAqL1xuICAgIHByaXZhdGUgcGxheVdhbGsobDogY2MuVmVjMikge1xuICAgICAgICBsZXQgc3RhdGU6IFdhbGtTdGF0ZSA9IHRoaXMuZ2V0V2Fsa1N0YXRlKGwpO1xuICAgICAgICBpZiAoc3RhdGUgPT09IHRoaXMuc3RhdGVPZkZBKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuc3RhdGVPZkZBID0gc3RhdGU7XG4gICAgICAgIHN3aXRjaCAoc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgV2Fsa1N0YXRlLkRvd246IHtcbiAgICAgICAgICAgICAgICB0aGlzLmZyYW1lQW5pbS5zZXRGcmFtZUFycmF5KHRoaXMuZG93bldhbGtGcmFtZXMpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBXYWxrU3RhdGUudXA6IHtcbiAgICAgICAgICAgICAgICB0aGlzLmZyYW1lQW5pbS5zZXRGcmFtZUFycmF5KHRoaXMudXBXYWxrRnJhbWVzKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgV2Fsa1N0YXRlLmxlZnQ6IHtcbiAgICAgICAgICAgICAgICB0aGlzLmZyYW1lQW5pbS5zZXRGcmFtZUFycmF5KHRoaXMucmlnaHRXYWxrRnJhbWVzKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2NhbGVYID0gLTE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIFdhbGtTdGF0ZS5yaWdodDoge1xuICAgICAgICAgICAgICAgIHRoaXMuZnJhbWVBbmltLnNldEZyYW1lQXJyYXkodGhpcy5yaWdodFdhbGtGcmFtZXMpO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZVggPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZnJhbWVBbmltLnBsYXkodHJ1ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOW+l+WIsCDkurrnianlupTor6Xkvb/nlKjlk6rnp43ooYzotbBcbiAgICAgKiBAcGFyYW0gbCDnp7vliqjmlrnlkJFcbiAgICAgKiBAcmV0dXJucyB3YWxrIHN0YXRlIFxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0V2Fsa1N0YXRlKGw6IGNjLlZlYzIpOiBXYWxrU3RhdGUge1xuICAgICAgICBsZXQgZGVncmVlOiBudW1iZXIgPSB0aGlzLmdldERlZ3JlZShsKTtcbiAgICAgICAgaWYgKGRlZ3JlZSA+PSAzMCAmJiBkZWdyZWUgPD0gMTUwKSB7XG4gICAgICAgICAgICByZXR1cm4gV2Fsa1N0YXRlLnVwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRlZ3JlZSA+PSAyMTAgJiYgZGVncmVlIDw9IDMzMCkge1xuICAgICAgICAgICAgcmV0dXJuIFdhbGtTdGF0ZS5Eb3duO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGwueCA+IDApXG4gICAgICAgICAgICByZXR1cm4gV2Fsa1N0YXRlLnJpZ2h0O1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gV2Fsa1N0YXRlLmxlZnQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldHMgZGVncmVlXG4gICAgICogQHBhcmFtIGRpciDmlrnlkJHlkJHph49cbiAgICAgKiBAcmV0dXJucyBkZWdyZWUgWzAsMzYwKVxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0RGVncmVlKGRpcjogY2MuVmVjMik6IG51bWJlciB7XG4gICAgICAgIGxldCByb3Q6IG51bWJlcjtcbiAgICAgICAgaWYgKGRpci54ID09PSAwICYmIGRpci55ID4gMCkgLy955LiK5Y2K6L20XG4gICAgICAgICAgICByb3QgPSA5MDtcbiAgICAgICAgZWxzZSBpZiAoZGlyLnggPT09IDAgJiYgZGlyLnkgPCAwKSAvL3nkuIvljYrovbRcbiAgICAgICAgICAgIHJvdCA9IDI3MDtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsZXQgcjogbnVtYmVyID0gTWF0aC5hdGFuKGRpci55IC8gZGlyLngpO1xuICAgICAgICAgICAgbGV0IGQ6IG51bWJlciA9IHIgKiAxODAgLyBNYXRoLlBJO1xuICAgICAgICAgICAgcm90ID0gZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyb3QgPT09IDApIC8v5ZyoeOi9tOS4ilxuICAgICAgICAgICAgaWYgKGRpci54ID4gMClcbiAgICAgICAgICAgICAgICByb3QgPSAwO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJvdCA9IDE4MDtcbiAgICAgICAgZWxzZSBpZiAoZGlyLnggPCAwICYmIGRpci55ID4gMCB8fCBkaXIueCA8IDAgJiYgZGlyLnkgPCAwKSAvL+WcqOesrOS6jOS4ieixoemZkFxuICAgICAgICAgICAgcm90ICs9IDE4MDtcbiAgICAgICAgZWxzZSBpZiAoZGlyLnggPiAwICYmIGRpci55IDwgMCkgLy/lnKjnrKzlm5vosaHpmZBcbiAgICAgICAgICAgIHJvdCArPSAzNjA7XG4gICAgICAgIHJldHVybiByb3Q7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlZnJlc2hTdGF0ZSgpIHtcbiAgICAgICAgdGhpcy5yZWZyZXNoQmxvb2RCYXIoKTtcblxuICAgICAgICAvL+atu+S6oSAgICBcbiAgICAgICAgaWYgKHRoaXMuY0hQID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmRpZShNb25zdGVyLm1vbnN0ZXJzT2ZBbGl2ZSwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLnBsYXlEaWUodGhpcy5kZWFkRnJhbWUsIHRoaXMucmVsZWFzZVNlbGYuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLmxldmVsU2NlbmUuYWRkQ2FzaCh0aGlzLm1vbnN0ZXJEYXRhW3RoaXMubW9uc3Rlck5vXS5wcmljZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWxlYXNlU2VsZigpIHtcbiAgICAgICAgdGhpcy5tb25zdGVyRmFjdG9yeS5kZXN0cm95TW9uc3Rlcih0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDkvb/nlKjliY3pnIAgdGhpcy5zd2lPZlJlY3Vyc2lvbkluUFcgPSB0cnVlXG4gICAgICogQHJldHVybnMgIFxuICAgICAqL1xuICAgIHByb3RlY3RlZCB3YWxrSW5QYXRoKCkge1xuICAgICAgICBpZiAoIXRoaXMuc3dpT2ZSZWN1cnNpb25JblBXKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIGlmICghdGhpcy5tb3ZlSW5QYXRoKSB7IC8v5Zue5b2S6Lev5b6E54K5XG4gICAgICAgICAgICB0aGlzLnBhdGhJbmRleCA9IHRoaXMuZ2V0UG9zT2ZNaW5EaXNXaXRoUGF0aCgpO1xuICAgICAgICAgICAgdGhpcy53YWxrKHRoaXMucGF0aFt0aGlzLnBhdGhJbmRleF0sIHRoaXMud2Fsa0NhbGxCYWNrLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgdGhpcy5tb3ZlSW5QYXRoID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIC8v5LuO6Lev5b6E54K556e75Yqo5Yiw6Lev5b6E54K5XG4gICAgICAgICAgICB0aGlzLndhbGsodGhpcy5wYXRoW3RoaXMucGF0aEluZGV4XSwgdGhpcy53YWxrQ2FsbEJhY2suYmluZCh0aGlzKSwgdGhpcy5wYXRoVGltZVt0aGlzLnBhdGhJbmRleCAtIDFdKVxuXG4gICAgfVxuICAgIHByaXZhdGUgd2Fsa0NhbGxCYWNrKCkge1xuICAgICAgICBpZiAodGhpcy5wYXRoSW5kZXggPT09IHRoaXMucGF0aC5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaAqueJqei3s+iEsVwiKTtcbiAgICAgICAgICAgIHRoaXMubGV2ZWxTY2VuZS5zdWJIUCgpO1xuICAgICAgICAgICAgdGhpcy5zdG9wV2Fsa0luUGF0aCgpO1xuICAgICAgICAgICAgdGhpcy5kaWUoTW9uc3Rlci5tb25zdGVyc09mQWxpdmUsIHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5yZWxlYXNlU2VsZigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGF0aEluZGV4Kys7XG4gICAgICAgIHRoaXMud2Fsa0luUGF0aCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDlvpfliLDnprvot6/lvoTkuIrmnIDov5HnmoTot6/lvoTngrnmjIfpkohcbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFBvc09mTWluRGlzV2l0aFBhdGgoKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IGN3cDogY2MuVmVjMiA9IHRoaXMuZ2V0V1BvcygpO1xuICAgICAgICBsZXQgbDogbnVtYmVyID0gVXRpbHMuZ2V0RGlzT2ZUd29Qb3MoY3dwLCB0aGlzLnBhdGhbdGhpcy5wYXRoSW5kZXhdKTtcbiAgICAgICAgbGV0IGo6IG51bWJlciA9IHRoaXMucGF0aEluZGV4O1xuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5wYXRoSW5kZXggKyAxOyBpIDwgdGhpcy5wYXRoLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgdGw6IG51bWJlciA9IFV0aWxzLmdldERpc09mVHdvUG9zKGN3cCwgdGhpcy5wYXRoW2ldKTtcbiAgICAgICAgICAgIGlmICh0bCA8IGwpIHtcbiAgICAgICAgICAgICAgICBsID0gdGw7XG4gICAgICAgICAgICAgICAgaiA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGo7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5YWz6Zetd2Fsa0luUGF0aCgp55qE6YCS5b2S56e75Yqo77yM5YGc5q2i6KGM6LWwXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdG9wV2Fsa0luUGF0aCgpIHtcbiAgICAgICAgdGhpcy5zd2lPZlJlY3Vyc2lvbkluUFcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tb3ZlSW5QYXRoID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3RvcFdhbGsoKTtcbiAgICB9XG5cblxuICAgIHRyYWNrKHBvczogY2MuVmVjMikge1xuICAgICAgICB0aGlzLmlzVHJhY2tpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLndhbGsocG9zLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmlzVHJhY2tpbmcgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zdG9wV2FsaygpO1xuICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgfVxuICAgIHN0b3BUcmFjaygpIHtcbiAgICAgICAgdGhpcy5pc1RyYWNraW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3RvcFdhbGsoKTtcbiAgICB9XG4gICAgcmVmcmVzaFRyYWNrVGFyZ2V0KHBvczogY2MuVmVjMikge1xuICAgICAgICB0aGlzLndhbGsocG9zLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmlzVHJhY2tpbmcgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zdG9wV2FsaygpO1xuICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgfVxuXG4gICAgYXR0YWNrKG06IENyZWF0dXJlKSB7XG4gICAgICAgIHRoaXMuaXNBdHRhY2tpbmcgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuZnJhbWVBbmltLnNldEZyYW1lQXJyYXkodGhpcy5hdHRhY2tGcmFtZSk7XG4gICAgICAgIHRoaXMuZnJhbWVBbmltLnBsYXkoZmFsc2UsIGZhbHNlLCBmYWxzZSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbS5pbmp1cmUodGhpcy5hZ2dyZXNzaXZpdHkpO1xuICAgICAgICAgICAgdGhpcy5pc0F0dGFja2luZyA9IGZhbHNlO1xuICAgICAgICB9LmJpbmQodGhpcykpO1xuXG4gICAgfVxuXG4gICAgbm9uQ29tTG9naWMoKSB7XG4gICAgICAgIHRoaXMuaXNOb25Db21TdGF0ZSA9IHRydWU7XG4gICAgICAgIC8v5bey57uP5Zyo5omn6KGM6Lev5b6E5LiK6KGM6LWw5LqGXG4gICAgICAgIGlmICh0aGlzLnN3aU9mUmVjdXJzaW9uSW5QVylcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5zd2lPZlJlY3Vyc2lvbkluUFcgPSB0cnVlO1xuICAgICAgICB0aGlzLndhbGtJblBhdGgoKTtcbiAgICB9XG4gICAgc3RvcE5vbkNvbUxvZ2ljKCkge1xuICAgICAgICB0aGlzLnN0b3BXYWxrSW5QYXRoKCk7XG4gICAgICAgIHRoaXMuaXNOb25Db21TdGF0ZSA9IGZhbHNlO1xuICAgIH1cblxuXG59XG4iXX0=