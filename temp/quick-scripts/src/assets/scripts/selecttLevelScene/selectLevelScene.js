"use strict";
cc._RF.push(module, 'bd0b4IXk5lL3ZIxqlT2W5kU', 'selectLevelScene');
// scripts/selecttLevelScene/selectLevelScene.ts

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
var levelManager_1 = require("./levelManager");
var loadingDoorAnim_1 = require("../../res/prefabs/loadingDoorAnim/loadingDoorAnim");
var soundsManager_1 = require("../common/module/soundsManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SelectLevelScene = /** @class */ (function (_super) {
    __extends(SelectLevelScene, _super);
    function SelectLevelScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loadingDoorAnim = null;
        _this.scoreLabel = null;
        _this.levelManager = null;
        _this.skillsBoardAnimation = null;
        _this.user = null;
        _this.isBackButton = false;
        _this.gameConfig = null;
        return _this;
        // update (dt) {}
    }
    SelectLevelScene.prototype.onLoad = function () {
        this.gameConfig = gameDataManager_1.default.getGameConfig();
    };
    SelectLevelScene.prototype.start = function () {
        this.user = gameDataManager_1.default.getCurrentUser();
        this.loadingDoorAnim.setState(false);
        this.loadingDoorAnim.openDoor();
        soundsManager_1.default.ins.curBGM = "sounds/selectLevelsceneBGM";
        soundsManager_1.default.ins.playBGM(soundsManager_1.default.ins.curBGM);
        this.updateScoreLabel();
        this.levelManager.updateLevelMap(this.user);
    };
    /**
     * 更新成绩板
     */
    SelectLevelScene.prototype.updateScoreLabel = function () {
        var max = this.gameConfig.getStarSum();
        var num = this.user.getCurrentHaveStarNum();
        this.scoreLabel.string = num.toString() + "/" + max.toString();
    };
    SelectLevelScene.prototype.backButton = function () {
        if (this.isBackButton) //保证播放开门动画期间，按开始游戏按钮 不重复开门
            return;
        this.isBackButton = true;
        soundsManager_1.default.ins.playEffect("sounds/click");
        var func = cc.callFunc(function () {
            cc.director.loadScene("homeScene", function () {
                // let homeScene: HomeScene = cc.find("Canvas").getComponent("homeScene");
                // homeScene.fristEntry = false;
                var loadingDoorAnim = cc.find("Canvas/centerAnchor/loadingDoorAnim");
                var loadingDoorAnimScr = loadingDoorAnim.getComponent("loadingDoorAnim");
                loadingDoorAnimScr.setState(false);
                loadingDoorAnimScr.openDoor();
            });
        }, this);
        this.loadingDoorAnim.closeDoor(func);
        gameDataManager_1.default.preserveGameData();
    };
    SelectLevelScene.prototype.toLevelScene = function (level) {
        var func = cc.callFunc(function () {
            cc.director.loadScene("levelScene", function () {
                var loadingDoorAnim = cc.find("Canvas/loadingDoorAnim");
                var loadingDoorAnimScr = loadingDoorAnim.getComponent("loadingDoorAnim");
                loadingDoorAnimScr.setState(false);
                //传入关卡数
                var levelScene = cc.find("Canvas").getComponent("levelScene");
                levelScene.levelNum = Number(level);
            });
        }, this);
        this.loadingDoorAnim.closeDoor(func);
        gameDataManager_1.default.preserveGameData();
    };
    SelectLevelScene.prototype.upgradeButton = function () {
        this.skillsBoardAnimation.play("skillsBoardDown");
    };
    __decorate([
        property({ type: loadingDoorAnim_1.default })
    ], SelectLevelScene.prototype, "loadingDoorAnim", void 0);
    __decorate([
        property({ type: cc.Label })
    ], SelectLevelScene.prototype, "scoreLabel", void 0);
    __decorate([
        property({ type: levelManager_1.default })
    ], SelectLevelScene.prototype, "levelManager", void 0);
    __decorate([
        property({ type: cc.Animation })
    ], SelectLevelScene.prototype, "skillsBoardAnimation", void 0);
    SelectLevelScene = __decorate([
        ccclass
    ], SelectLevelScene);
    return SelectLevelScene;
}(cc.Component));
exports.default = SelectLevelScene;

cc._RF.pop();