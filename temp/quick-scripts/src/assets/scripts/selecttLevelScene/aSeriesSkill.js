"use strict";
cc._RF.push(module, '76113tXtdFKfauIznqEqSv3', 'aSeriesSkill');
// scripts/selecttLevelScene/aSeriesSkill.ts

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
exports.SkillIcon = exports.SkillState = void 0;
var gameDataManager_1 = require("../common/module/gameDataManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 技能图标有3个状态：可以升级并且星星够、可以升级但星星不够、不能升级的灰色、已升级
 */
var SkillState;
(function (SkillState) {
    SkillState[SkillState["Upgradable"] = 0] = "Upgradable";
    SkillState[SkillState["StarShort"] = 1] = "StarShort";
    SkillState[SkillState["Upgraded"] = 2] = "Upgraded";
    SkillState[SkillState["UnUpgrade"] = 3] = "UnUpgrade";
})(SkillState = exports.SkillState || (exports.SkillState = {}));
;
var SkillIcon = /** @class */ (function () {
    /**
     * Creates an instance of skill icon.
     * @param node 图标节点
     * @param state 该技能状态
     */
    function SkillIcon(node, state, upNeedStarNum) {
        this.node = node;
        this.button = node.getChildByName("bg").getComponent(cc.Button);
        this.starNum = node.getChildByName("starNum");
        this.labelNode = this.starNum.getChildByName("label");
        this.label = this.labelNode.getComponent(cc.Label);
        this.setState(state);
        this.setNeedStarNum(upNeedStarNum);
    }
    SkillIcon.prototype.setState = function (state) {
        this.state = state;
        switch (this.state) {
            case SkillState.Upgradable: { //可以升级
                this.button.interactable = true;
                this.starNum.active = true;
                this.labelNode.color = cc.Color.WHITE;
                break;
            }
            case SkillState.StarShort: {
                this.button.interactable = true;
                this.starNum.active = true;
                this.labelNode.color = cc.Color.RED;
                break;
            }
            case SkillState.UnUpgrade: { //不能升级
                this.button.interactable = false;
                this.starNum.active = true;
                this.labelNode.color = cc.Color.WHITE;
                break;
            }
            case SkillState.Upgraded: { //已升级
                this.button.interactable = true;
                this.starNum.active = false;
                this.labelNode.color = cc.Color.WHITE;
                break;
            }
        }
    };
    SkillIcon.prototype.getState = function () {
        return this.state;
    };
    SkillIcon.prototype.getButton = function () {
        return this.button;
    };
    SkillIcon.prototype.setNeedStarNum = function (n) {
        this.label.string = n.toString();
    };
    return SkillIcon;
}());
exports.SkillIcon = SkillIcon;
var AseriesSkill = /** @class */ (function (_super) {
    __extends(AseriesSkill, _super);
    function AseriesSkill() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.skillNum = 1;
        /**
         * 每个技能有 5个 等级，即有5个Node
         */
        _this.skillNode = null;
        _this.skillIcons = [];
        _this.gameConfig = null;
        _this.user = null;
        /**
         * 当前玩家技能的等级
         */
        _this.skillLevel = null;
        _this.selectLevelScene = null;
        _this.skillsBoard = null;
        return _this;
    }
    AseriesSkill.prototype.onLoad = function () {
        this.gameConfig = gameDataManager_1.default.getGameConfig();
        this.user = gameDataManager_1.default.getCurrentUser();
        this.skillLevel = this.user.getSkillsLevel();
        this.skillNode = this.node.children;
        this.selectLevelScene = cc.find("Canvas").getComponent("selectLevelScene");
        this.skillsUpNeedStar = this.gameConfig.getSkillsUpNeedStar();
        this.skillsBoard = cc.find("Canvas/centerAnchor/skillsBoard").getComponent("skillsBoard");
    };
    AseriesSkill.prototype.start = function () {
        this.initskillIcons();
    };
    AseriesSkill.prototype.initskillIcons = function () {
        for (var i = 0; i < 5; i++) { //技能等级
            var skillIcon = new SkillIcon(this.skillNode[i], this.judgeSkillState(i + 1), this.skillsUpNeedStar[this.skillNum - 1][i]);
            this.skillIcons.push(skillIcon);
            //绑定按钮事件
            var button = skillIcon.getButton();
            var click_event = new cc.Component.EventHandler();
            //添加响应事件的必要参数，即响应函数所在的节点、组件、函数
            click_event.target = this.node;
            click_event.component = "aSeriesSkill";
            click_event.handler = "upSkill";
            click_event.customEventData = i.toString();
            button.clickEvents.push(click_event);
        }
    };
    /**
     * 更新技能树显示
     */
    AseriesSkill.prototype.updateSkillIcons = function () {
        for (var i = 0; i < this.skillIcons.length; i++) {
            this.skillIcons[i].setState(this.judgeSkillState(i + 1));
        }
    };
    /**
     * 升级技能等级
     * @param levelNum 该技能升级到几级。1开始
     */
    AseriesSkill.prototype.upSkill = function (e, levelNum) {
        levelNum = Number(levelNum);
        if (levelNum <= this.skillLevel[this.skillNum - 1]) //该技能已升级
            return;
        var needStarN = this.skillsUpNeedStar[this.skillNum - 1][levelNum - 1];
        var haveStarN = this.user.getCurrentHaveStarNum();
        if (needStarN > haveStarN) //星星不够
            return;
        //更新内部数据
        this.user.subHavedStar(needStarN);
        this.skillLevel[this.skillNum - 1] = levelNum;
        //更新技能树显示
        this.skillIcons[levelNum - 1].setState(SkillState.Upgraded);
        this.skillIcons[levelNum].setState(this.judgeSkillState(levelNum + 1));
        //更新显示的星星数
        this.selectLevelScene.updateScoreLabel();
        //更新技能板上显示的星星数
        this.skillsBoard.updateStarNum();
    };
    /**
     * Judges skill state
     * @param iconNum 一个技能的第几个等级,1开始
     * @returns skill state
     */
    AseriesSkill.prototype.judgeSkillState = function (iconNum) {
        if (iconNum <= this.skillLevel[this.skillNum - 1]) //已升级
            return SkillState.Upgraded;
        if (iconNum === this.skillLevel[this.skillNum - 1] + 1) { //能升级
            var need = this.skillsUpNeedStar[this.skillNum - 1][iconNum - 1];
            var have = this.user.getCurrentHaveStarNum();
            if (have >= need) //星星够
                return SkillState.Upgradable;
            else //星星不够
                return SkillState.StarShort;
        }
        return SkillState.UnUpgrade; //不能升级
    };
    __decorate([
        property({ tooltip: "这个是第几个技能，从1开始" })
    ], AseriesSkill.prototype, "skillNum", void 0);
    AseriesSkill = __decorate([
        ccclass
    ], AseriesSkill);
    return AseriesSkill;
}(cc.Component));
exports.default = AseriesSkill;

cc._RF.pop();