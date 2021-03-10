
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/levelScene/levelScene.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '74c8cuMGjBCIZa2ZsXkSCsR', 'levelScene');
// scripts/levelScene/levelScene.ts

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
var gameDataManager_1 = require("../common/module/gameDataManager");
var monsterFactory_1 = require("./monster/monsterFactory");
var V_gameState_1 = require("./V_gameState");
var utils_1 = require("../common/module/utils");
var monster_1 = require("./monster/monster");
var levelDataManager_1 = require("../common/module/levelDataManager");
var loadingDoorAnim_1 = require("../../res/prefabs/loadingDoorAnim/loadingDoorAnim");
var soundsManager_1 = require("../common/module/soundsManager");
var soldier_1 = require("./tower/barrack/soldier");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LevelScene = /** @class */ (function (_super) {
    __extends(LevelScene, _super);
    function LevelScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loadingDoorAnim = null;
        _this.pauseFace = null;
        _this.setFace = null;
        _this.monsterFactory = null;
        _this.builderPrefab = null;
        _this.V_gameState = null;
        _this.isDebug = false;
        _this.spriteOfMap = null;
        _this.user = null;
        /* 控制 */
        _this.isBackButton = false;
        _this.isExitButton = false;
        _this.startGame = false;
        /**
         * 计时，用于控制游戏回合阶段
         */
        _this.cT = 0;
        /* 数据 */
        /**
         * 存在的怪物数组
         */
        _this.monsterArray = null;
        _this.gameConfig = null;
        _this.animOfVPMap = null;
        /**
         * 放置空地的根节点
         */
        _this.builderMap = null;
        _this.settlementFace = null;
        return _this;
    }
    LevelScene.prototype.onLoad = function () {
        this.settlementFace = cc.find("Canvas/centerUI/settlementFace").getComponent("settlementFace");
        this.gameConfig = gameDataManager_1.default.getGameConfig();
        this.animOfVPMap = cc.find("Canvas/VPMap").getComponent(cc.Animation);
        this.builderMap = cc.find("Canvas/builderMap");
        this.monsterArray = monster_1.default.monstersOfAlive;
        this.user = gameDataManager_1.default.getCurrentUser();
        soldier_1.default.soldiersOfAlive = [];
        console.log("士兵数组", soldier_1.default.soldiersOfAlive);
    };
    LevelScene.prototype.start = function () {
        this.buildScene();
        console.log("#\u8FDB\u5165\u5173\u5361" + this.levelNum);
        soundsManager_1.default.ins.curBGM = "sounds/gameBGM/game_bg" + utils_1.default.getRandomInterger(1, 5);
        soundsManager_1.default.ins.playBGM(soundsManager_1.default.ins.curBGM);
        //打开碰撞检测系统
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        if (this.isDebug) {
            manager.enabledDebugDraw = true;
            manager.enabledDrawBoundingBox = true;
        }
    };
    LevelScene.prototype.buildScene = function () {
        cc.loader.loadRes("levelData/level" + this.levelNum + "/roadData", cc.AnimationClip, function (e, res) {
            //添加移动路径的动画
            this.animOfVPMap.addClip(res);
            this.levelData = levelDataManager_1.default.getLevelData(this.levelNum);
            //添加空地（用于建塔）
            var posArr = this.levelData.posOfBuilders;
            for (var i = 0; i < posArr.length; i++) {
                var n = cc.instantiate(this.builderPrefab);
                var b = n.getComponent("builder");
                this.builderMap.addChild(n);
                n.setPosition(posArr[i]);
                b.init(i);
            }
            cc.loader.loadRes("levelData/level" + this.levelNum + "/map" + this.levelNum, cc.SpriteFrame, function (e, res) {
                //设置地图
                this.spriteOfMap.spriteFrame = res;
                this.init();
                this.loadingDoorAnim.openDoor();
                this.startGame = true;
            }.bind(this));
        }.bind(this));
    };
    /**
     * 初始化玩家状态，回合数
     */
    LevelScene.prototype.init = function () {
        //设置玩家和回合信息
        this.HP = this.maxHP = this.gameConfig.getInitBlood();
        this.cash = this.gameConfig.getInitChip();
        this.maxRound = this.levelData.noOfRound.length;
        this.gameReview = 0;
        //更新界面显示
        this.V_gameState.setHP(this.HP);
        this.V_gameState.setGold(this.cash);
        this.V_gameState.setRound(1, this.maxRound);
        //初始化回合控制
        this.roundIndex = 1;
        this.cT = 0;
        //初始化monsterFactory
        this.monsterFactory.init(this.levelData.roadNum);
    };
    LevelScene.prototype.subHP = function () {
        this.HP--;
        this.V_gameState.setHP(this.HP);
        if (this.HP <= 0) {
            this.startGame = false;
            this.settlementFace.outFailFace();
        }
    };
    /**
     * Subs cash
     * @param n 减的数量
     * @returns 不够返回false
     */
    LevelScene.prototype.subCash = function (n) {
        if (this.cash < n)
            return false;
        this.cash -= n;
        this.V_gameState.setGold(this.cash);
        return true;
    };
    LevelScene.prototype.addCash = function (n) {
        this.cash += n;
        this.V_gameState.setGold(this.cash);
    };
    /* 按钮绑定 */
    LevelScene.prototype.backButton = function () {
        if (this.isBackButton) //保证播放开门动画期间，按按钮 不重复开门
            return;
        this.isBackButton = true;
        soundsManager_1.default.ins.playEffect("sounds/click");
        var func = cc.callFunc(function () {
            cc.director.loadScene("selectLevelScene", function () {
                var loadingDoorAnim = cc.find("Canvas/loadingDoorAnim");
                var loadingDoorAnimScr = loadingDoorAnim.getComponent("loadingDoorAnim");
                loadingDoorAnimScr.setState(false);
                loadingDoorAnimScr.openDoor();
            });
        }, this);
        this.loadingDoorAnim.closeDoor(func);
        gameDataManager_1.default.preserveGameData();
    };
    LevelScene.prototype.pauseButton = function () {
        this.pauseFace.active = true;
        this.pauseFace.runAction(cc.fadeIn(0.2));
        this.scheduleOnce(function () {
            cc.director.pause();
        }, 0.2);
    };
    /**
     * 游戏暂停后继续
     */
    LevelScene.prototype.resumeButton = function () {
        cc.director.resume();
        this.pauseFace.runAction(cc.fadeOut(0.2));
        this.scheduleOnce(function () {
            this.pauseFace.active = false;
        }.bind(this), 0.2);
    };
    LevelScene.prototype.setButton = function () {
        this.setFace.active = true;
        this.setFace.runAction(cc.fadeIn(0.2));
        this.scheduleOnce(function () {
            cc.director.pause();
        }, 0.2);
    };
    LevelScene.prototype.closeButton = function () {
        cc.director.resume();
        this.setFace.runAction(cc.fadeOut(0.2));
        this.scheduleOnce(function () {
            this.setFace.active = false;
        }.bind(this), 0.2);
    };
    LevelScene.prototype.resetButton = function () {
        cc.director.resume();
        //判断是在哪个面板点击的按钮，隐藏该面板
        if (this.setFace.active) {
            this.setFace.runAction(cc.fadeOut(0.2));
            this.scheduleOnce(function () {
                this.setFace.active = false;
            }, 0.2);
        }
        else
            this.settlementFace.hiddenSettleFace();
        //重置游戏
        this.monsterFactory.clearMonsters();
        this.monsterFactory.init(this.levelData.roadNum);
        this.resetLand();
        this.init();
        this.startGame = true;
    };
    /**
     * 离开游戏
     * @returns
     */
    LevelScene.prototype.exitButton = function () {
        cc.director.resume();
        this.settlementFace.hiddenSettleFace();
        if (this.isExitButton) //保证播放开门动画期间，按开始游戏按钮 不重复开门
            return;
        this.isExitButton = true;
        soundsManager_1.default.ins.playEffect("sounds/click");
        var func = cc.callFunc(function () {
            cc.director.loadScene("selectLevelScene");
        }, this);
        this.loadingDoorAnim.closeDoor(func);
        gameDataManager_1.default.preserveGameData();
    };
    /**
     * 重置空地,删除建在上面的塔
     */
    LevelScene.prototype.resetLand = function () {
        var childre = this.builderMap.children;
        childre.forEach(function (e) {
            var builder = e.getComponent("builder");
            builder.deleteTower();
            builder.hiddenBuildFaceImmediately();
        });
    };
    /**
     * 刷新回合，生成怪物
     */
    LevelScene.prototype.refreshRound = function (dt) {
        //回合计时控制
        if (this.roundIndex <= this.maxRound) {
            this.cT += dt;
            if (this.cT >= this.levelData.timeOfRound[this.roundIndex - 1]) { //开始进行这一波
                //更新显示的回合数
                this.V_gameState.setRound(this.roundIndex, this.maxRound);
                //生成这一波   
                var no = this.levelData.noOfRound;
                var mNums = no[this.roundIndex - 1];
                for (var i = 0; i < mNums.length; i++) {
                    this.monsterFactory.createMonster(no[this.roundIndex - 1][i]);
                }
                this.cT = 0;
                this.roundIndex++;
            }
        }
        else if (monster_1.default.monstersOfAlive.length === 0 && this.monsterFactory.creMonList.length === 0 && this.HP > 0) { //所有波怪物全部出发，怪物全部被消灭或离开，并且生命不为0。游戏胜利
            if (this.HP === this.maxHP)
                this.gameReview = 3;
            else if (this.HP >= this.maxHP / 2)
                this.gameReview = 2;
            else
                this.gameReview = 1;
            this.settlementFace.outPassFace(this.gameReview);
            this.startGame = false;
            this.user.setLevelReview(this.levelNum - 1, this.gameReview);
        }
    };
    LevelScene.prototype.update = function (dt) {
        if (!this.startGame)
            return;
        this.refreshRound(dt);
    };
    __decorate([
        property({ type: loadingDoorAnim_1.default })
    ], LevelScene.prototype, "loadingDoorAnim", void 0);
    __decorate([
        property({ type: cc.Node })
    ], LevelScene.prototype, "pauseFace", void 0);
    __decorate([
        property({ type: cc.Node })
    ], LevelScene.prototype, "setFace", void 0);
    __decorate([
        property({ type: monsterFactory_1.default })
    ], LevelScene.prototype, "monsterFactory", void 0);
    __decorate([
        property({ type: cc.Prefab })
    ], LevelScene.prototype, "builderPrefab", void 0);
    __decorate([
        property({ type: V_gameState_1.default })
    ], LevelScene.prototype, "V_gameState", void 0);
    __decorate([
        property({})
    ], LevelScene.prototype, "isDebug", void 0);
    __decorate([
        property({
            type: cc.Sprite,
            displayName: "地图"
        })
    ], LevelScene.prototype, "spriteOfMap", void 0);
    LevelScene = __decorate([
        ccclass
    ], LevelScene);
    return LevelScene;
}(cc.Component));
exports.default = LevelScene;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2xldmVsU2NlbmUvbGV2ZWxTY2VuZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvRUFBcUY7QUFDckYsMkRBQXNEO0FBQ3RELDZDQUF3QztBQUV4QyxnREFBMkM7QUFDM0MsNkNBQXdDO0FBRXhDLHNFQUE0RTtBQUM1RSxxRkFBZ0Y7QUFDaEYsZ0VBQTJEO0FBQzNELG1EQUE4QztBQUV4QyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUF3Qyw4QkFBWTtJQUFwRDtRQUFBLHFFQW9WQztRQWpWVyxxQkFBZSxHQUFvQixJQUFJLENBQUM7UUFHeEMsZUFBUyxHQUFZLElBQUksQ0FBQztRQUcxQixhQUFPLEdBQVksSUFBSSxDQUFDO1FBR3hCLG9CQUFjLEdBQW1CLElBQUksQ0FBQztRQUd0QyxtQkFBYSxHQUFjLElBQUksQ0FBQztRQUdoQyxpQkFBVyxHQUFnQixJQUFJLENBQUM7UUFHaEMsYUFBTyxHQUFZLEtBQUssQ0FBQztRQU16QixpQkFBVyxHQUFjLElBQUksQ0FBQztRQTRCOUIsVUFBSSxHQUFTLElBQUksQ0FBQztRQUUxQixRQUFRO1FBQ0Esa0JBQVksR0FBWSxLQUFLLENBQUM7UUFDOUIsa0JBQVksR0FBWSxLQUFLLENBQUM7UUFDOUIsZUFBUyxHQUFZLEtBQUssQ0FBQztRQUNuQzs7V0FFRztRQUNLLFFBQUUsR0FBVyxDQUFDLENBQUM7UUFFdkIsUUFBUTtRQUNSOztXQUVHO1FBQ0ssa0JBQVksR0FBYyxJQUFJLENBQUM7UUFFL0IsZ0JBQVUsR0FBZSxJQUFJLENBQUM7UUFDOUIsaUJBQVcsR0FBaUIsSUFBSSxDQUFDO1FBQ3pDOztXQUVHO1FBQ0ssZ0JBQVUsR0FBWSxJQUFJLENBQUM7UUFDM0Isb0JBQWMsR0FBbUIsSUFBSSxDQUFDOztJQXNRbEQsQ0FBQztJ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O1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQzsrQ0FDb0I7SUFNakM7UUFKQyxRQUFRLENBQUM7WUFDTixJQUFJLEVBQUUsRUFBRSxDQUFDLE1BQU07WUFDZixXQUFXLEVBQUUsSUFBSTtTQUNwQixDQUFDO21EQUNvQztJQTNCckIsVUFBVTtRQUQ5QixPQUFPO09BQ2EsVUFBVSxDQW9WOUI7SUFBRCxpQkFBQztDQXBWRCxBQW9WQyxDQXBWdUMsRUFBRSxDQUFDLFNBQVMsR0FvVm5EO2tCQXBWb0IsVUFBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHYW1lRGF0YVN0b3JhZ2UsIHsgR2FtZUNvbmZpZywgVXNlciB9IGZyb20gXCIuLi9jb21tb24vbW9kdWxlL2dhbWVEYXRhTWFuYWdlclwiO1xuaW1wb3J0IE1vbnN0ZXJGYWN0b3J5IGZyb20gXCIuL21vbnN0ZXIvbW9uc3RlckZhY3RvcnlcIjtcbmltcG9ydCBWX2dhbWVTdGF0ZSBmcm9tIFwiLi9WX2dhbWVTdGF0ZVwiO1xuaW1wb3J0IFNldHRsZW1lbnRGYWNlIGZyb20gXCIuL3NldHRsZW1lbnRGYWNlXCI7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4uL2NvbW1vbi9tb2R1bGUvdXRpbHNcIjtcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuL21vbnN0ZXIvbW9uc3RlclwiO1xuaW1wb3J0IEJ1aWxkZXIgZnJvbSBcIi4vYnVpbGRlclwiO1xuaW1wb3J0IExldmVsRGF0YU1hbmFnZXIsIHsgTGV2ZWwgfSBmcm9tIFwiLi4vY29tbW9uL21vZHVsZS9sZXZlbERhdGFNYW5hZ2VyXCI7XG5pbXBvcnQgTG9hZGluZ0Rvb3JBbmltIGZyb20gXCIuLi8uLi9yZXMvcHJlZmFicy9sb2FkaW5nRG9vckFuaW0vbG9hZGluZ0Rvb3JBbmltXCI7XG5pbXBvcnQgU291bmRzTWFuYWdlciBmcm9tIFwiLi4vY29tbW9uL21vZHVsZS9zb3VuZHNNYW5hZ2VyXCI7XG5pbXBvcnQgU29sZGllciBmcm9tIFwiLi90b3dlci9iYXJyYWNrL3NvbGRpZXJcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExldmVsU2NlbmUgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogTG9hZGluZ0Rvb3JBbmltIH0pXG4gICAgcHJpdmF0ZSBsb2FkaW5nRG9vckFuaW06IExvYWRpbmdEb29yQW5pbSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Ob2RlIH0pXG4gICAgcHJpdmF0ZSBwYXVzZUZhY2U6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTm9kZSB9KVxuICAgIHByaXZhdGUgc2V0RmFjZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBNb25zdGVyRmFjdG9yeSB9KVxuICAgIHByaXZhdGUgbW9uc3RlckZhY3Rvcnk6IE1vbnN0ZXJGYWN0b3J5ID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLlByZWZhYiB9KVxuICAgIHByaXZhdGUgYnVpbGRlclByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFZfZ2FtZVN0YXRlIH0pXG4gICAgcHJpdmF0ZSBWX2dhbWVTdGF0ZTogVl9nYW1lU3RhdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHt9KVxuICAgIHByaXZhdGUgaXNEZWJ1ZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogY2MuU3ByaXRlLFxuICAgICAgICBkaXNwbGF5TmFtZTogXCLlnLDlm75cIlxuICAgIH0pXG4gICAgcHJpdmF0ZSBzcHJpdGVPZk1hcDogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIC8qIOWFs+WNoeS/oeaBryAqL1xuICAgIGxldmVsTnVtOiBudW1iZXI7XG4gICAgLyoqXG4gICAgICog5Zyo6L+b6KGM56ys5Yeg5rOiXG4gICAgICovXG4gICAgcHJpdmF0ZSByb3VuZEluZGV4O1xuICAgIC8qKlxuICAgICAqIOacgOWkp+WbnuWQiOaVsFxuICAgICAqL1xuICAgIHByaXZhdGUgbWF4Um91bmQ6IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiDlhbPljaHkv6Hmga9cbiAgICAgKi9cbiAgICBsZXZlbERhdGE6IExldmVsO1xuXG4gICAgLyog546p5a625L+h5oGvICovXG4gICAgcHJpdmF0ZSBtYXhIUDogbnVtYmVyO1xuICAgIHByaXZhdGUgSFA6IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiDph5HluIHmlbBcbiAgICAgKi9cbiAgICBjYXNoOiBudW1iZXI7XG4gICAgLyoqXG4gICAgICog5ri45oiP5b6X5YiGXG4gICAgICovXG4gICAgcHJpdmF0ZSBnYW1lUmV2aWV3OiBudW1iZXI7XG4gICAgcHJpdmF0ZSB1c2VyOiBVc2VyID0gbnVsbDtcblxuICAgIC8qIOaOp+WItiAqL1xuICAgIHByaXZhdGUgaXNCYWNrQnV0dG9uOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBpc0V4aXRCdXR0b246IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIHN0YXJ0R2FtZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIOiuoeaXtu+8jOeUqOS6juaOp+WItua4uOaIj+WbnuWQiOmYtuautVxuICAgICAqL1xuICAgIHByaXZhdGUgY1Q6IG51bWJlciA9IDA7XG5cbiAgICAvKiDmlbDmja4gKi9cbiAgICAvKipcbiAgICAgKiDlrZjlnKjnmoTmgKrnianmlbDnu4RcbiAgICAgKi9cbiAgICBwcml2YXRlIG1vbnN0ZXJBcnJheTogTW9uc3RlcltdID0gbnVsbDtcblxuICAgIHByaXZhdGUgZ2FtZUNvbmZpZzogR2FtZUNvbmZpZyA9IG51bGw7XG4gICAgcHJpdmF0ZSBhbmltT2ZWUE1hcDogY2MuQW5pbWF0aW9uID0gbnVsbDtcbiAgICAvKipcbiAgICAgKiDmlL7nva7nqbrlnLDnmoTmoLnoioLngrlcbiAgICAgKi9cbiAgICBwcml2YXRlIGJ1aWxkZXJNYXA6IGNjLk5vZGUgPSBudWxsO1xuICAgIHByaXZhdGUgc2V0dGxlbWVudEZhY2U6IFNldHRsZW1lbnRGYWNlID0gbnVsbDtcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5zZXR0bGVtZW50RmFjZSA9IGNjLmZpbmQoXCJDYW52YXMvY2VudGVyVUkvc2V0dGxlbWVudEZhY2VcIikuZ2V0Q29tcG9uZW50KFwic2V0dGxlbWVudEZhY2VcIik7XG4gICAgICAgIHRoaXMuZ2FtZUNvbmZpZyA9IEdhbWVEYXRhU3RvcmFnZS5nZXRHYW1lQ29uZmlnKCk7XG4gICAgICAgIHRoaXMuYW5pbU9mVlBNYXAgPSBjYy5maW5kKFwiQ2FudmFzL1ZQTWFwXCIpLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xuICAgICAgICB0aGlzLmJ1aWxkZXJNYXAgPSBjYy5maW5kKFwiQ2FudmFzL2J1aWxkZXJNYXBcIik7XG4gICAgICAgIHRoaXMubW9uc3RlckFycmF5ID0gTW9uc3Rlci5tb25zdGVyc09mQWxpdmU7XG4gICAgICAgIHRoaXMudXNlciA9IEdhbWVEYXRhU3RvcmFnZS5nZXRDdXJyZW50VXNlcigpO1xuXG4gICAgICAgIFNvbGRpZXIuc29sZGllcnNPZkFsaXZlID0gW107XG4gICAgICAgIGNvbnNvbGUubG9nKFwi5aOr5YW15pWw57uEXCIsIFNvbGRpZXIuc29sZGllcnNPZkFsaXZlKTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5idWlsZFNjZW5lKCk7XG5cbiAgICAgICAgY29uc29sZS5sb2coYCPov5vlhaXlhbPljaEke3RoaXMubGV2ZWxOdW19YCk7XG4gICAgICAgIFNvdW5kc01hbmFnZXIuaW5zLmN1ckJHTSA9IFwic291bmRzL2dhbWVCR00vZ2FtZV9iZ1wiICsgVXRpbHMuZ2V0UmFuZG9tSW50ZXJnZXIoMSwgNSk7XG4gICAgICAgIFNvdW5kc01hbmFnZXIuaW5zLnBsYXlCR00oU291bmRzTWFuYWdlci5pbnMuY3VyQkdNKTtcblxuICAgICAgICAvL+aJk+W8gOeisOaSnuajgOa1i+ezu+e7n1xuICAgICAgICBsZXQgbWFuYWdlcjogY2MuQ29sbGlzaW9uTWFuYWdlciA9IGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKTtcbiAgICAgICAgbWFuYWdlci5lbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMuaXNEZWJ1Zykge1xuICAgICAgICAgICAgbWFuYWdlci5lbmFibGVkRGVidWdEcmF3ID0gdHJ1ZTtcbiAgICAgICAgICAgIG1hbmFnZXIuZW5hYmxlZERyYXdCb3VuZGluZ0JveCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGJ1aWxkU2NlbmUoKSB7XG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKFwibGV2ZWxEYXRhL2xldmVsXCIgKyB0aGlzLmxldmVsTnVtICsgXCIvcm9hZERhdGFcIiwgY2MuQW5pbWF0aW9uQ2xpcCwgZnVuY3Rpb24gKGUsIHJlczogYW55KSB7XG4gICAgICAgICAgICAvL+a3u+WKoOenu+WKqOi3r+W+hOeahOWKqOeUu1xuICAgICAgICAgICAgdGhpcy5hbmltT2ZWUE1hcC5hZGRDbGlwKHJlcyk7XG4gICAgICAgICAgICB0aGlzLmxldmVsRGF0YSA9IExldmVsRGF0YU1hbmFnZXIuZ2V0TGV2ZWxEYXRhKHRoaXMubGV2ZWxOdW0pO1xuXG4gICAgICAgICAgICAvL+a3u+WKoOepuuWcsO+8iOeUqOS6juW7uuWhlO+8iVxuICAgICAgICAgICAgbGV0IHBvc0FycjogY2MuVmVjMltdID0gdGhpcy5sZXZlbERhdGEucG9zT2ZCdWlsZGVycztcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcG9zQXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IG46IGNjLk5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmJ1aWxkZXJQcmVmYWIpO1xuICAgICAgICAgICAgICAgIGxldCBiOiBCdWlsZGVyID0gbi5nZXRDb21wb25lbnQoXCJidWlsZGVyXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuYnVpbGRlck1hcC5hZGRDaGlsZChuKTtcbiAgICAgICAgICAgICAgICBuLnNldFBvc2l0aW9uKHBvc0FycltpXSk7XG4gICAgICAgICAgICAgICAgYi5pbml0KGkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhcImxldmVsRGF0YS9sZXZlbFwiICsgdGhpcy5sZXZlbE51bSArIFwiL21hcFwiICsgdGhpcy5sZXZlbE51bSwgY2MuU3ByaXRlRnJhbWUsIGZ1bmN0aW9uIChlLCByZXM6IGFueSkge1xuICAgICAgICAgICAgICAgIC8v6K6+572u5Zyw5Zu+XG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVPZk1hcC5zcHJpdGVGcmFtZSA9IHJlcztcblxuICAgICAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZ0Rvb3JBbmltLm9wZW5Eb29yKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydEdhbWUgPSB0cnVlO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWIneWni+WMlueOqeWutueKtuaAge+8jOWbnuWQiOaVsFxuICAgICAqL1xuICAgIHByaXZhdGUgaW5pdCgpIHtcbiAgICAgICAgLy/orr7nva7njqnlrrblkozlm57lkIjkv6Hmga9cbiAgICAgICAgdGhpcy5IUCA9IHRoaXMubWF4SFAgPSB0aGlzLmdhbWVDb25maWcuZ2V0SW5pdEJsb29kKCk7XG4gICAgICAgIHRoaXMuY2FzaCA9IHRoaXMuZ2FtZUNvbmZpZy5nZXRJbml0Q2hpcCgpO1xuICAgICAgICB0aGlzLm1heFJvdW5kID0gdGhpcy5sZXZlbERhdGEubm9PZlJvdW5kLmxlbmd0aDtcbiAgICAgICAgdGhpcy5nYW1lUmV2aWV3ID0gMDtcblxuICAgICAgICAvL+abtOaWsOeVjOmdouaYvuekulxuICAgICAgICB0aGlzLlZfZ2FtZVN0YXRlLnNldEhQKHRoaXMuSFApO1xuICAgICAgICB0aGlzLlZfZ2FtZVN0YXRlLnNldEdvbGQodGhpcy5jYXNoKTtcbiAgICAgICAgdGhpcy5WX2dhbWVTdGF0ZS5zZXRSb3VuZCgxLCB0aGlzLm1heFJvdW5kKTtcblxuICAgICAgICAvL+WIneWni+WMluWbnuWQiOaOp+WItlxuICAgICAgICB0aGlzLnJvdW5kSW5kZXggPSAxO1xuICAgICAgICB0aGlzLmNUID0gMDtcblxuICAgICAgICAvL+WIneWni+WMlm1vbnN0ZXJGYWN0b3J5XG4gICAgICAgIHRoaXMubW9uc3RlckZhY3RvcnkuaW5pdCh0aGlzLmxldmVsRGF0YS5yb2FkTnVtKTtcbiAgICB9XG5cblxuICAgIHN1YkhQKCkge1xuICAgICAgICB0aGlzLkhQLS07XG4gICAgICAgIHRoaXMuVl9nYW1lU3RhdGUuc2V0SFAodGhpcy5IUCk7XG4gICAgICAgIGlmICh0aGlzLkhQIDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRHYW1lID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnNldHRsZW1lbnRGYWNlLm91dEZhaWxGYWNlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdWJzIGNhc2hcbiAgICAgKiBAcGFyYW0gbiDlh4/nmoTmlbDph49cbiAgICAgKiBAcmV0dXJucyDkuI3lpJ/ov5Tlm55mYWxzZSBcbiAgICAgKi9cbiAgICBzdWJDYXNoKG46IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5jYXNoIDwgbilcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgdGhpcy5jYXNoIC09IG47XG4gICAgICAgIHRoaXMuVl9nYW1lU3RhdGUuc2V0R29sZCh0aGlzLmNhc2gpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBhZGRDYXNoKG46IG51bWJlcikge1xuICAgICAgICB0aGlzLmNhc2ggKz0gbjtcbiAgICAgICAgdGhpcy5WX2dhbWVTdGF0ZS5zZXRHb2xkKHRoaXMuY2FzaCk7XG4gICAgfVxuXG5cbiAgICAvKiDmjInpkq7nu5HlrpogKi9cbiAgICBiYWNrQnV0dG9uKCkge1xuICAgICAgICBpZiAodGhpcy5pc0JhY2tCdXR0b24pIC8v5L+d6K+B5pKt5pS+5byA6Zeo5Yqo55S75pyf6Ze077yM5oyJ5oyJ6ZKuIOS4jemHjeWkjeW8gOmXqFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLmlzQmFja0J1dHRvbiA9IHRydWU7XG5cbiAgICAgICAgU291bmRzTWFuYWdlci5pbnMucGxheUVmZmVjdChcInNvdW5kcy9jbGlja1wiKTtcbiAgICAgICAgbGV0IGZ1bmM6IGNjLkFjdGlvbkluc3RhbnQgPSBjYy5jYWxsRnVuYyhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJzZWxlY3RMZXZlbFNjZW5lXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBsZXQgbG9hZGluZ0Rvb3JBbmltOiBjYy5Ob2RlID0gY2MuZmluZChcIkNhbnZhcy9sb2FkaW5nRG9vckFuaW1cIik7XG4gICAgICAgICAgICAgICAgbGV0IGxvYWRpbmdEb29yQW5pbVNjcjogTG9hZGluZ0Rvb3JBbmltID0gbG9hZGluZ0Rvb3JBbmltLmdldENvbXBvbmVudChcImxvYWRpbmdEb29yQW5pbVwiKTtcbiAgICAgICAgICAgICAgICBsb2FkaW5nRG9vckFuaW1TY3Iuc2V0U3RhdGUoZmFsc2UpO1xuXG4gICAgICAgICAgICAgICAgbG9hZGluZ0Rvb3JBbmltU2NyLm9wZW5Eb29yKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIHRoaXMubG9hZGluZ0Rvb3JBbmltLmNsb3NlRG9vcihmdW5jKTtcblxuICAgICAgICBHYW1lRGF0YVN0b3JhZ2UucHJlc2VydmVHYW1lRGF0YSgpO1xuICAgIH1cblxuICAgIHBhdXNlQnV0dG9uKCkge1xuICAgICAgICB0aGlzLnBhdXNlRmFjZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLnBhdXNlRmFjZS5ydW5BY3Rpb24oY2MuZmFkZUluKDAuMikpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5wYXVzZSgpO1xuICAgICAgICB9LCAwLjIpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5ri45oiP5pqC5YGc5ZCO57un57utXG4gICAgICovXG4gICAgcmVzdW1lQnV0dG9uKCkge1xuICAgICAgICBjYy5kaXJlY3Rvci5yZXN1bWUoKTtcbiAgICAgICAgdGhpcy5wYXVzZUZhY2UucnVuQWN0aW9uKGNjLmZhZGVPdXQoMC4yKSlcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5wYXVzZUZhY2UuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH0uYmluZCh0aGlzKSwgMC4yKTtcbiAgICB9XG5cbiAgICBzZXRCdXR0b24oKSB7XG4gICAgICAgIHRoaXMuc2V0RmFjZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLnNldEZhY2UucnVuQWN0aW9uKGNjLmZhZGVJbigwLjIpKTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2MuZGlyZWN0b3IucGF1c2UoKTtcbiAgICAgICAgfSwgMC4yKVxuICAgIH1cblxuICAgIGNsb3NlQnV0dG9uKCkge1xuICAgICAgICBjYy5kaXJlY3Rvci5yZXN1bWUoKTtcbiAgICAgICAgdGhpcy5zZXRGYWNlLnJ1bkFjdGlvbihjYy5mYWRlT3V0KDAuMikpXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0RmFjZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfS5iaW5kKHRoaXMpLCAwLjIpO1xuICAgIH1cblxuICAgIHJlc2V0QnV0dG9uKCkge1xuICAgICAgICBjYy5kaXJlY3Rvci5yZXN1bWUoKTtcblxuICAgICAgICAvL+WIpOaWreaYr+WcqOWTquS4qumdouadv+eCueWHu+eahOaMiemSru+8jOmakOiXj+ivpemdouadv1xuICAgICAgICBpZiAodGhpcy5zZXRGYWNlLmFjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRGYWNlLnJ1bkFjdGlvbihjYy5mYWRlT3V0KDAuMikpO1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0RmFjZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sIDAuMilcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLnNldHRsZW1lbnRGYWNlLmhpZGRlblNldHRsZUZhY2UoKTtcblxuICAgICAgICAvL+mHjee9rua4uOaIj1xuICAgICAgICB0aGlzLm1vbnN0ZXJGYWN0b3J5LmNsZWFyTW9uc3RlcnMoKTtcbiAgICAgICAgdGhpcy5tb25zdGVyRmFjdG9yeS5pbml0KHRoaXMubGV2ZWxEYXRhLnJvYWROdW0pO1xuXG4gICAgICAgIHRoaXMucmVzZXRMYW5kKCk7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuXG4gICAgICAgIHRoaXMuc3RhcnRHYW1lID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDnprvlvIDmuLjmiI9cbiAgICAgKiBAcmV0dXJucyAgXG4gICAgICovXG4gICAgZXhpdEJ1dHRvbigpIHtcbiAgICAgICAgY2MuZGlyZWN0b3IucmVzdW1lKCk7XG4gICAgICAgIHRoaXMuc2V0dGxlbWVudEZhY2UuaGlkZGVuU2V0dGxlRmFjZSgpO1xuXG4gICAgICAgIGlmICh0aGlzLmlzRXhpdEJ1dHRvbikgLy/kv53or4Hmkq3mlL7lvIDpl6jliqjnlLvmnJ/pl7TvvIzmjInlvIDlp4vmuLjmiI/mjInpkq4g5LiN6YeN5aSN5byA6ZeoXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMuaXNFeGl0QnV0dG9uID0gdHJ1ZTtcblxuICAgICAgICBTb3VuZHNNYW5hZ2VyLmlucy5wbGF5RWZmZWN0KFwic291bmRzL2NsaWNrXCIpO1xuICAgICAgICBsZXQgZnVuYzogY2MuQWN0aW9uSW5zdGFudCA9IGNjLmNhbGxGdW5jKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcInNlbGVjdExldmVsU2NlbmVcIik7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgICAgICB0aGlzLmxvYWRpbmdEb29yQW5pbS5jbG9zZURvb3IoZnVuYyk7XG5cbiAgICAgICAgR2FtZURhdGFTdG9yYWdlLnByZXNlcnZlR2FtZURhdGEoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDph43nva7nqbrlnLAs5Yig6Zmk5bu65Zyo5LiK6Z2i55qE5aGUXG4gICAgICovXG4gICAgcHJpdmF0ZSByZXNldExhbmQoKSB7XG4gICAgICAgIGxldCBjaGlsZHJlOiBjYy5Ob2RlW10gPSB0aGlzLmJ1aWxkZXJNYXAuY2hpbGRyZW47XG4gICAgICAgIGNoaWxkcmUuZm9yRWFjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBidWlsZGVyOiBCdWlsZGVyID0gZS5nZXRDb21wb25lbnQoXCJidWlsZGVyXCIpO1xuICAgICAgICAgICAgYnVpbGRlci5kZWxldGVUb3dlcigpO1xuICAgICAgICAgICAgYnVpbGRlci5oaWRkZW5CdWlsZEZhY2VJbW1lZGlhdGVseSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliLfmlrDlm57lkIjvvIznlJ/miJDmgKrnialcbiAgICAgKi9cbiAgICBwcml2YXRlIHJlZnJlc2hSb3VuZChkdDogbnVtYmVyKSB7XG4gICAgICAgIC8v5Zue5ZCI6K6h5pe25o6n5Yi2XG4gICAgICAgIGlmICh0aGlzLnJvdW5kSW5kZXggPD0gdGhpcy5tYXhSb3VuZCkge1xuICAgICAgICAgICAgdGhpcy5jVCArPSBkdDtcbiAgICAgICAgICAgIGlmICh0aGlzLmNUID49IHRoaXMubGV2ZWxEYXRhLnRpbWVPZlJvdW5kW3RoaXMucm91bmRJbmRleCAtIDFdKSB7IC8v5byA5aeL6L+b6KGM6L+Z5LiA5rOiXG4gICAgICAgICAgICAgICAgLy/mm7TmlrDmmL7npLrnmoTlm57lkIjmlbBcbiAgICAgICAgICAgICAgICB0aGlzLlZfZ2FtZVN0YXRlLnNldFJvdW5kKHRoaXMucm91bmRJbmRleCwgdGhpcy5tYXhSb3VuZCk7XG5cbiAgICAgICAgICAgICAgICAvL+eUn+aIkOi/meS4gOazoiAgIFxuICAgICAgICAgICAgICAgIGxldCBubzogbnVtYmVyW11bXSA9IHRoaXMubGV2ZWxEYXRhLm5vT2ZSb3VuZDtcbiAgICAgICAgICAgICAgICBsZXQgbU51bXM6IG51bWJlcltdID0gbm9bdGhpcy5yb3VuZEluZGV4IC0gMV07XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtTnVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vbnN0ZXJGYWN0b3J5LmNyZWF0ZU1vbnN0ZXIobm9bdGhpcy5yb3VuZEluZGV4IC0gMV1baV0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuY1QgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMucm91bmRJbmRleCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKE1vbnN0ZXIubW9uc3RlcnNPZkFsaXZlLmxlbmd0aCA9PT0gMCAmJiB0aGlzLm1vbnN0ZXJGYWN0b3J5LmNyZU1vbkxpc3QubGVuZ3RoID09PSAwICYmIHRoaXMuSFAgPiAwKSB7IC8v5omA5pyJ5rOi5oCq54mp5YWo6YOo5Ye65Y+R77yM5oCq54mp5YWo6YOo6KKr5raI54Gt5oiW56a75byA77yM5bm25LiU55Sf5ZG95LiN5Li6MOOAgua4uOaIj+iDnOWIqVxuICAgICAgICAgICAgaWYgKHRoaXMuSFAgPT09IHRoaXMubWF4SFApXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lUmV2aWV3ID0gMztcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuSFAgPj0gdGhpcy5tYXhIUCAvIDIpXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lUmV2aWV3ID0gMjtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVSZXZpZXcgPSAxO1xuICAgICAgICAgICAgdGhpcy5zZXR0bGVtZW50RmFjZS5vdXRQYXNzRmFjZSh0aGlzLmdhbWVSZXZpZXcpO1xuICAgICAgICAgICAgdGhpcy5zdGFydEdhbWUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMudXNlci5zZXRMZXZlbFJldmlldyh0aGlzLmxldmVsTnVtIC0gMSwgdGhpcy5nYW1lUmV2aWV3KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZShkdCkge1xuICAgICAgICBpZiAoIXRoaXMuc3RhcnRHYW1lKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMucmVmcmVzaFJvdW5kKGR0KTtcbiAgICB9XG59XG5cbiJdfQ==