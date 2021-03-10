"use strict";
cc._RF.push(module, 'ef3f0LnHIFBe52D+Rwl4IqK', 'levelManager');
// scripts/selecttLevelScene/levelManager.ts

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
var soundsManager_1 = require("../common/module/soundsManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LevelManager = /** @class */ (function (_super) {
    __extends(LevelManager, _super);
    function LevelManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.levels = null;
        _this.isLevelButton = false;
        _this.selectLevelScene = null;
        _this.levelEntry = null;
        /**
         * 最大关数
         */
        _this.MaxLevelNum = null;
        return _this;
    }
    LevelManager.prototype.onLoad = function () {
        this.levels = this.node.children;
        this.selectLevelScene = cc.find("Canvas").getComponent("selectLevelScene");
        this.levelEntry = this.levels[this.levels.length - 1];
        this.MaxLevelNum = gameDataManager_1.default.getGameConfig().getLevelsSum();
    };
    LevelManager.prototype.start = function () {
        this.buttonEventBind();
    };
    /**
     * 按钮事件绑定
     */
    LevelManager.prototype.buttonEventBind = function () {
        var buttons = this.node.children;
        for (var i = 0; i < buttons.length; i++) {
            var node = buttons[i];
            var button = node.getComponent(cc.Button);
            var click_event = new cc.Component.EventHandler();
            //添加响应事件的必要参数，即响应函数所在的节点、组件、函数
            click_event.target = this.node;
            click_event.component = "levelManager";
            click_event.handler = "levelButtonFunc";
            click_event.customEventData = (i + 1).toString();
            button.clickEvents.push(click_event);
        }
    };
    LevelManager.prototype.levelButtonFunc = function (e, level) {
        if (this.isLevelButton)
            return;
        this.isLevelButton = true;
        soundsManager_1.default.ins.playEffect("sounds/click");
        if (level > this.MaxLevelNum) { //最新关
            this.selectLevelScene.toLevelScene(this.newLevel);
            return;
        }
        this.selectLevelScene.toLevelScene(level);
    };
    /**
     * 更新选关地图
     */
    LevelManager.prototype.updateLevelMap = function (user) {
        var visitedN = user.getRushLevelsSum();
        var levelsReview = user.getLevelsReview();
        //更新已闯过的关
        for (var i = 0; i < visitedN; i++) {
            var level = this.levels[i];
            var stars = level.children;
            var getStarNum = levelsReview[i];
            for (var j = 0; j < getStarNum; j++) {
                var emptyStar = stars[j + 1].getChildByName("emptyStar");
                emptyStar.active = false;
            }
            level.active = true;
        }
        if (visitedN + 1 > gameDataManager_1.default.getGameConfig().getLevelsSum())
            return;
        //更新没有闯的第一个新关
        var nextLevel = this.levels[visitedN];
        var pos = nextLevel.getPosition();
        this.levelEntry.setPosition(pos);
        this.levelEntry.active = true;
        //记录下最新关入口对应的关数
        this.newLevel = visitedN + 1;
        //添加响应事件的必要参数，即响应函数所在的节点、组件、函数
        var button = nextLevel.getComponent(cc.Button);
        var click_event = new cc.Component.EventHandler();
        click_event.target = this.node;
        click_event.component = "levelManager";
        click_event.handler = "levelButtonFunc";
        click_event.customEventData = (visitedN + 1).toString();
        button.clickEvents.push(click_event);
    };
    LevelManager = __decorate([
        ccclass
    ], LevelManager);
    return LevelManager;
}(cc.Component));
exports.default = LevelManager;

cc._RF.pop();