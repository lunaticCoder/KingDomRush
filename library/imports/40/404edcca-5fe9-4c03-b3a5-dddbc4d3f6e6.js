"use strict";
cc._RF.push(module, '404edzKX+lMA7Ol3dvE0/bm', 'homeScene');
// scripts/homeScene/homeScene.ts

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
var soundsManager_1 = require("../common/module/soundsManager");
var startAnim_1 = require("./startAnim");
var gameDataManager_1 = require("../common/module/gameDataManager");
var levelDataManager_1 = require("../common/module/levelDataManager");
var loadingDoorAnim_1 = require("../../res/prefabs/loadingDoorAnim/loadingDoorAnim");
var storageManager_1 = require("../common/module/storageManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ConfigFiles = /** @class */ (function () {
    function ConfigFiles() {
        this.gameConfig = null;
        this.levelConfig = null;
    }
    __decorate([
        property({
            type: cc.JsonAsset,
            displayName: "游戏配置"
        })
    ], ConfigFiles.prototype, "gameConfig", void 0);
    __decorate([
        property({
            type: cc.JsonAsset,
            displayName: "关卡配置"
        })
    ], ConfigFiles.prototype, "levelConfig", void 0);
    ConfigFiles = __decorate([
        ccclass("ConfigFiles")
    ], ConfigFiles);
    return ConfigFiles;
}());
var HomeScene = /** @class */ (function (_super) {
    __extends(HomeScene, _super);
    function HomeScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.conFigFiles = new ConfigFiles();
        _this.loadingDoorAnim = null;
        _this.startAnim = null;
        _this.isStartGame = false;
        /**
         * 是否点击了这个按钮
         */
        _this.isAboutButton = false;
        /**
         * 第一次进入游戏
         */
        _this.fristEntry = true;
        _this.clips = null;
        return _this;
    }
    HomeScene.prototype.onLoad = function () {
        //初始化 模块
        if (gameDataManager_1.default.getGameConfig() === null) {
            // cc.sys.localStorage.clear();
            storageManager_1.default.init();
            soundsManager_1.default.init();
            gameDataManager_1.default.init(this.conFigFiles.gameConfig.json);
            levelDataManager_1.default.initLevelData(this.conFigFiles.levelConfig.json);
        }
        this.clips = this.startAnim.node.getComponent(cc.Animation).getClips();
    };
    HomeScene.prototype.start = function () {
        console.log("本地数据:", cc.sys.localStorage);
        soundsManager_1.default.ins.curBGM = "sounds/home_scene_bg";
        soundsManager_1.default.ins.playBGM("sounds/home_scene_bg");
        if (this.fristEntry) {
            this.startAnim.logoDown();
            // this.fristEntry = false;
        }
    };
    /**
     * 点击 开始游戏 按钮
     */
    HomeScene.prototype.startGame = function () {
        if (this.isStartGame) //保证播放开门动画期间，按开始游戏按钮 不重复开门
            return;
        this.isStartGame = true;
        soundsManager_1.default.ins.playEffect("sounds/click");
        this.startAnim.buttonUp();
        var d = cc.delayTime(this.clips[1].duration);
        var func = cc.callFunc(function () {
            this.isStartGame = false;
        }, this);
        var seq = cc.sequence(d, func);
        this.node.runAction(seq);
    };
    HomeScene.prototype.aboutButton = function () {
        if (this.isAboutButton) //保证播放开门动画期间，按开始游戏按钮 不重复开门
            return;
        this.isAboutButton = true;
        soundsManager_1.default.ins.playEffect("sounds/click");
        var func = cc.callFunc(function () {
            cc.director.loadScene("aboutScene");
        }, this);
        this.loadingDoorAnim.closeDoor(func);
        gameDataManager_1.default.preserveGameData();
    };
    /**
     * 跳转到 选关 场景
     */
    HomeScene.prototype.selectLevelScene = function (usersI) {
        var users = gameDataManager_1.default.getUsers();
        gameDataManager_1.default.setCurrentUser(users[usersI]);
        soundsManager_1.default.ins.playEffect("sounds/click");
        var func = cc.callFunc(function () {
            cc.director.loadScene("selectLevelScene");
        }, this);
        this.loadingDoorAnim.closeDoor(func);
        gameDataManager_1.default.preserveGameData();
    };
    __decorate([
        property({
            type: ConfigFiles,
            displayName: "游戏配置文件"
        })
    ], HomeScene.prototype, "conFigFiles", void 0);
    __decorate([
        property({ type: loadingDoorAnim_1.default })
    ], HomeScene.prototype, "loadingDoorAnim", void 0);
    __decorate([
        property({ type: startAnim_1.default })
    ], HomeScene.prototype, "startAnim", void 0);
    HomeScene = __decorate([
        ccclass
    ], HomeScene);
    return HomeScene;
}(cc.Component));
exports.default = HomeScene;

cc._RF.pop();