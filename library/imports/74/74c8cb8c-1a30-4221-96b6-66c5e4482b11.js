"use strict";
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