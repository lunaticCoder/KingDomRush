"use strict";
cc._RF.push(module, '6a93fPowX9BkZmjApAudjYI', 'skillsBoard');
// scripts/selecttLevelScene/skillsBoard.ts

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
var aSeriesSkill_1 = require("./aSeriesSkill");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SkillsBoard = /** @class */ (function (_super) {
    __extends(SkillsBoard, _super);
    function SkillsBoard() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.starNum = null;
        _this.aSeriesSkillArray = [];
        _this.user = null;
        _this.selectLevelScene = null;
        _this.animation = null;
        return _this;
        // update (dt) {}
    }
    SkillsBoard.prototype.onLoad = function () {
        this.user = gameDataManager_1.default.getCurrentUser();
        this.selectLevelScene = cc.find("Canvas").getComponent("selectLevelScene");
        this.animation = this.node.getComponent(cc.Animation);
    };
    SkillsBoard.prototype.start = function () {
        this.updateStarNum();
        this.updateAllSkills();
    };
    /**
     * 更新技能板上显示的星星数
     */
    SkillsBoard.prototype.updateStarNum = function () {
        this.starNum.string = this.user.getCurrentHaveStarNum().toString();
    };
    SkillsBoard.prototype.skillBoardBack = function () {
        this.animation.play("skillsBoardUp");
    };
    /**
     * 更新所有技能树的显示
     */
    SkillsBoard.prototype.updateAllSkills = function () {
        var i;
        for (var _i = 0, _a = this.aSeriesSkillArray; _i < _a.length; _i++) {
            i = _a[_i];
            i.updateSkillIcons();
        }
    };
    /**
     * 重置技能
     */
    SkillsBoard.prototype.resetSkills = function () {
        //更新数据
        this.user.resetSkill();
        //更新显示的星星数
        this.updateStarNum();
        this.selectLevelScene.updateScoreLabel();
        //更新技能树
        this.updateAllSkills();
    };
    __decorate([
        property({ type: cc.Label })
    ], SkillsBoard.prototype, "starNum", void 0);
    __decorate([
        property({
            type: aSeriesSkill_1.default,
            tooltip: "5个技能"
        })
    ], SkillsBoard.prototype, "aSeriesSkillArray", void 0);
    SkillsBoard = __decorate([
        ccclass
    ], SkillsBoard);
    return SkillsBoard;
}(cc.Component));
exports.default = SkillsBoard;

cc._RF.pop();