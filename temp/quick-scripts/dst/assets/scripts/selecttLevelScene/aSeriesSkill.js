
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/selecttLevelScene/aSeriesSkill.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL3NlbGVjdHRMZXZlbFNjZW5lL2FTZXJpZXNTa2lsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQXFGO0FBSS9FLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRTVDOztHQUVHO0FBQ0gsSUFBWSxVQUF5RDtBQUFyRSxXQUFZLFVBQVU7SUFBRyx1REFBVSxDQUFBO0lBQUUscURBQVMsQ0FBQTtJQUFFLG1EQUFRLENBQUE7SUFBRSxxREFBUyxDQUFBO0FBQUMsQ0FBQyxFQUF6RCxVQUFVLEdBQVYsa0JBQVUsS0FBVixrQkFBVSxRQUErQztBQUFBLENBQUM7QUFFdEU7SUFXSTs7OztPQUlHO0lBQ0gsbUJBQVksSUFBYSxFQUFFLEtBQWlCLEVBQUUsYUFBcUI7UUFDL0QsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEUsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFbkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCw0QkFBUSxHQUFSLFVBQVMs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Q2EsWUFBWSxDQTJHaEM7SUFBRCxtQkFBQztDQTNHRCxBQTJHQyxDQTNHeUMsRUFBRSxDQUFDLFNBQVMsR0EyR3JEO2tCQTNHb0IsWUFBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHYW1lRGF0YVN0b3JhZ2UsIHsgR2FtZUNvbmZpZywgVXNlciB9IGZyb20gXCIuLi9jb21tb24vbW9kdWxlL2dhbWVEYXRhTWFuYWdlclwiO1xuaW1wb3J0IFNlbGVjdExldmVsU2NlbmUgZnJvbSBcIi4vc2VsZWN0TGV2ZWxTY2VuZVwiO1xuaW1wb3J0IFNraWxsc0JvYXJkIGZyb20gXCIuL3NraWxsc0JvYXJkXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbi8qKlxuICog5oqA6IO95Zu+5qCH5pyJM+S4queKtuaAge+8muWPr+S7peWNh+e6p+W5tuS4lOaYn+aYn+Wkn+OAgeWPr+S7peWNh+e6p+S9huaYn+aYn+S4jeWkn+OAgeS4jeiDveWNh+e6p+eahOeBsOiJsuOAgeW3suWNh+e6p1xuICovXG5leHBvcnQgZW51bSBTa2lsbFN0YXRlIHsgVXBncmFkYWJsZSwgU3RhclNob3J0LCBVcGdyYWRlZCwgVW5VcGdyYWRlIH07XG5cbmV4cG9ydCBjbGFzcyBTa2lsbEljb24ge1xuICAgIHByaXZhdGUgc3RhdGU6IFNraWxsU3RhdGU7XG4gICAgcHJpdmF0ZSBub2RlOiBjYy5Ob2RlO1xuICAgIC8qKlxuICAgICAqIGJn6IqC54K55LiL55qEY2MuQnV0dG9uXG4gICAgICovXG4gICAgcHJpdmF0ZSBidXR0b246IGNjLkJ1dHRvbjtcbiAgICBwcml2YXRlIHN0YXJOdW06IGNjLk5vZGU7XG4gICAgcHJpdmF0ZSBsYWJlbDogY2MuTGFiZWw7XG4gICAgcHJpdmF0ZSBsYWJlbE5vZGU6IGNjLk5vZGU7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIHNraWxsIGljb24uXG4gICAgICogQHBhcmFtIG5vZGUg5Zu+5qCH6IqC54K5XG4gICAgICogQHBhcmFtIHN0YXRlIOivpeaKgOiDveeKtuaAgVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5vZGU6IGNjLk5vZGUsIHN0YXRlOiBTa2lsbFN0YXRlLCB1cE5lZWRTdGFyTnVtOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5ub2RlID0gbm9kZTtcbiAgICAgICAgdGhpcy5idXR0b24gPSBub2RlLmdldENoaWxkQnlOYW1lKFwiYmdcIikuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbik7XG4gICAgICAgIHRoaXMuc3Rhck51bSA9IG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzdGFyTnVtXCIpO1xuICAgICAgICB0aGlzLmxhYmVsTm9kZSA9IHRoaXMuc3Rhck51bS5nZXRDaGlsZEJ5TmFtZShcImxhYmVsXCIpO1xuICAgICAgICB0aGlzLmxhYmVsID0gdGhpcy5sYWJlbE5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHN0YXRlKTtcbiAgICAgICAgdGhpcy5zZXROZWVkU3Rhck51bSh1cE5lZWRTdGFyTnVtKTtcbiAgICB9XG5cbiAgICBzZXRTdGF0ZShzdGF0ZTogU2tpbGxTdGF0ZSkge1xuICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gICAgICAgIHN3aXRjaCAodGhpcy5zdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSBTa2lsbFN0YXRlLlVwZ3JhZGFibGU6IHsgLy/lj6/ku6XljYfnuqdcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbi5pbnRlcmFjdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3Rhck51bS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMubGFiZWxOb2RlLmNvbG9yID0gY2MuQ29sb3IuV0hJVEU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIFNraWxsU3RhdGUuU3RhclNob3J0OiB7XG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b24uaW50ZXJhY3RhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJOdW0uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsTm9kZS5jb2xvciA9IGNjLkNvbG9yLlJFRDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgU2tpbGxTdGF0ZS5VblVwZ3JhZGU6IHsgLy/kuI3og73ljYfnuqdcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbi5pbnRlcmFjdGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJOdW0uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsTm9kZS5jb2xvciA9IGNjLkNvbG9yLldISVRFO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBTa2lsbFN0YXRlLlVwZ3JhZGVkOiB7IC8v5bey5Y2H57qnXG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b24uaW50ZXJhY3RhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJOdW0uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbE5vZGUuY29sb3IgPSBjYy5Db2xvci5XSElURTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFN0YXRlKCk6IFNraWxsU3RhdGUge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZTtcbiAgICB9XG5cbiAgICBnZXRCdXR0b24oKTogY2MuQnV0dG9uIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYnV0dG9uO1xuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBzZXROZWVkU3Rhck51bShuOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBuLnRvU3RyaW5nKCk7XG4gICAgfVxuXG59XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBc2VyaWVzU2tpbGwgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogXCLov5nkuKrmmK/nrKzlh6DkuKrmioDog73vvIzku44x5byA5aeLXCIgfSlcbiAgICBwcml2YXRlIHNraWxsTnVtOiBudW1iZXIgPSAxO1xuICAgIC8qKlxuICAgICAqIOavj+S4quaKgOiDveaciSA15LiqIOetiee6p++8jOWNs+aciTXkuKpOb2RlXG4gICAgICovXG4gICAgcHJpdmF0ZSBza2lsbE5vZGU6IGNjLk5vZGVbXSA9IG51bGw7XG4gICAgcHJpdmF0ZSBza2lsbEljb25zOiBTa2lsbEljb25bXSA9IFtdO1xuICAgIHByaXZhdGUgZ2FtZUNvbmZpZzogR2FtZUNvbmZpZyA9IG51bGw7XG4gICAgcHJpdmF0ZSB1c2VyOiBVc2VyID0gbnVsbDtcbiAgICAvKipcbiAgICAgKiDlvZPliY3njqnlrrbmioDog73nmoTnrYnnuqdcbiAgICAgKi9cbiAgICBwcml2YXRlIHNraWxsTGV2ZWw6IG51bWJlcltdID0gbnVsbDtcbiAgICBwcml2YXRlIHNlbGVjdExldmVsU2NlbmU6IFNlbGVjdExldmVsU2NlbmUgPSBudWxsO1xuICAgIHByaXZhdGUgc2tpbGxzVXBOZWVkU3RhcjogbnVtYmVyW11bXTtcbiAgICBwcml2YXRlIHNraWxsc0JvYXJkOiBTa2lsbHNCb2FyZCA9IG51bGw7XG4gICAgb25Mb2FkKCkge1xuICAgICAgICB0aGlzLmdhbWVDb25maWcgPSBHYW1lRGF0YVN0b3JhZ2UuZ2V0R2FtZUNvbmZpZygpO1xuICAgICAgICB0aGlzLnVzZXIgPSBHYW1lRGF0YVN0b3JhZ2UuZ2V0Q3VycmVudFVzZXIoKTtcbiAgICAgICAgdGhpcy5za2lsbExldmVsID0gdGhpcy51c2VyLmdldFNraWxsc0xldmVsKCk7XG4gICAgICAgIHRoaXMuc2tpbGxOb2RlID0gdGhpcy5ub2RlLmNoaWxkcmVuO1xuICAgICAgICB0aGlzLnNlbGVjdExldmVsU2NlbmUgPSBjYy5maW5kKFwiQ2FudmFzXCIpLmdldENvbXBvbmVudChcInNlbGVjdExldmVsU2NlbmVcIik7XG4gICAgICAgIHRoaXMuc2tpbGxzVXBOZWVkU3RhciA9IHRoaXMuZ2FtZUNvbmZpZy5nZXRTa2lsbHNVcE5lZWRTdGFyKCk7XG4gICAgICAgIHRoaXMuc2tpbGxzQm9hcmQgPSBjYy5maW5kKFwiQ2FudmFzL2NlbnRlckFuY2hvci9za2lsbHNCb2FyZFwiKS5nZXRDb21wb25lbnQoXCJza2lsbHNCb2FyZFwiKTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcblxuICAgICAgICB0aGlzLmluaXRza2lsbEljb25zKCk7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRza2lsbEljb25zKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykgeyAvL+aKgOiDveetiee6p1xuICAgICAgICAgICAgbGV0IHNraWxsSWNvbjogU2tpbGxJY29uID0gbmV3IFNraWxsSWNvbih0aGlzLnNraWxsTm9kZVtpXSwgdGhpcy5qdWRnZVNraWxsU3RhdGUoaSArIDEpLCB0aGlzLnNraWxsc1VwTmVlZFN0YXJbdGhpcy5za2lsbE51bSAtIDFdW2ldKTtcbiAgICAgICAgICAgIHRoaXMuc2tpbGxJY29ucy5wdXNoKHNraWxsSWNvbik7XG5cbiAgICAgICAgICAgIC8v57uR5a6a5oyJ6ZKu5LqL5Lu2XG4gICAgICAgICAgICBsZXQgYnV0dG9uOiBjYy5CdXR0b24gPSBza2lsbEljb24uZ2V0QnV0dG9uKCk7XG4gICAgICAgICAgICBsZXQgY2xpY2tfZXZlbnQgPSBuZXcgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcigpO1xuXG4gICAgICAgICAgICAvL+a3u+WKoOWTjeW6lOS6i+S7tueahOW/heimgeWPguaVsO+8jOWNs+WTjeW6lOWHveaVsOaJgOWcqOeahOiKgueCueOAgee7hOS7tuOAgeWHveaVsFxuICAgICAgICAgICAgY2xpY2tfZXZlbnQudGFyZ2V0ID0gdGhpcy5ub2RlO1xuICAgICAgICAgICAgY2xpY2tfZXZlbnQuY29tcG9uZW50ID0gXCJhU2VyaWVzU2tpbGxcIjtcbiAgICAgICAgICAgIGNsaWNrX2V2ZW50LmhhbmRsZXIgPSBcInVwU2tpbGxcIjtcbiAgICAgICAgICAgIGNsaWNrX2V2ZW50LmN1c3RvbUV2ZW50RGF0YSA9IGkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIGJ1dHRvbi5jbGlja0V2ZW50cy5wdXNoKGNsaWNrX2V2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOabtOaWsOaKgOiDveagkeaYvuekulxuICAgICAqL1xuICAgIHVwZGF0ZVNraWxsSWNvbnMoKSB7XG4gICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCB0aGlzLnNraWxsSWNvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuc2tpbGxJY29uc1tpXS5zZXRTdGF0ZSh0aGlzLmp1ZGdlU2tpbGxTdGF0ZShpICsgMSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Y2H57qn5oqA6IO9562J57qnXG4gICAgICogQHBhcmFtIGxldmVsTnVtIOivpeaKgOiDveWNh+e6p+WIsOWHoOe6p+OAgjHlvIDlp4tcbiAgICAgKi9cbiAgICB1cFNraWxsKGUsIGxldmVsTnVtKSB7XG4gICAgICAgIGxldmVsTnVtID0gTnVtYmVyKGxldmVsTnVtKTtcbiAgICAgICAgaWYgKGxldmVsTnVtIDw9IHRoaXMuc2tpbGxMZXZlbFt0aGlzLnNraWxsTnVtIC0gMV0pIC8v6K+l5oqA6IO95bey5Y2H57qnXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGxldCBuZWVkU3Rhck46IG51bWJlciA9IHRoaXMuc2tpbGxzVXBOZWVkU3Rhclt0aGlzLnNraWxsTnVtIC0gMV1bbGV2ZWxOdW0gLSAxXTtcbiAgICAgICAgbGV0IGhhdmVTdGFyTjogbnVtYmVyID0gdGhpcy51c2VyLmdldEN1cnJlbnRIYXZlU3Rhck51bSgpO1xuICAgICAgICBpZiAobmVlZFN0YXJOID4gaGF2ZVN0YXJOKSAvL+aYn+aYn+S4jeWkn1xuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIC8v5pu05paw5YaF6YOo5pWw5o2uXG4gICAgICAgIHRoaXMudXNlci5zdWJIYXZlZFN0YXIobmVlZFN0YXJOKTtcbiAgICAgICAgdGhpcy5za2lsbExldmVsW3RoaXMuc2tpbGxOdW0gLSAxXSA9IGxldmVsTnVtO1xuICAgICAgICAvL+abtOaWsOaKgOiDveagkeaYvuekulxuICAgICAgICB0aGlzLnNraWxsSWNvbnNbbGV2ZWxOdW0gLSAxXS5zZXRTdGF0ZShTa2lsbFN0YXRlLlVwZ3JhZGVkKTtcbiAgICAgICAgdGhpcy5za2lsbEljb25zW2xldmVsTnVtXS5zZXRTdGF0ZSh0aGlzLmp1ZGdlU2tpbGxTdGF0ZShsZXZlbE51bSArIDEpKTtcbiAgICAgICAgLy/mm7TmlrDmmL7npLrnmoTmmJ/mmJ/mlbBcbiAgICAgICAgdGhpcy5zZWxlY3RMZXZlbFNjZW5lLnVwZGF0ZVNjb3JlTGFiZWwoKTtcbiAgICAgICAgLy/mm7TmlrDmioDog73mnb/kuIrmmL7npLrnmoTmmJ/mmJ/mlbBcbiAgICAgICAgdGhpcy5za2lsbHNCb2FyZC51cGRhdGVTdGFyTnVtKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSnVkZ2VzIHNraWxsIHN0YXRlXG4gICAgICogQHBhcmFtIGljb25OdW0g5LiA5Liq5oqA6IO955qE56ys5Yeg5Liq562J57qnLDHlvIDlp4tcbiAgICAgKiBAcmV0dXJucyBza2lsbCBzdGF0ZSBcbiAgICAgKi9cbiAgICBwcml2YXRlIGp1ZGdlU2tpbGxTdGF0ZShpY29uTnVtOiBudW1iZXIpOiBTa2lsbFN0YXRlIHtcbiAgICAgICAgaWYgKGljb25OdW0gPD0gdGhpcy5za2lsbExldmVsW3RoaXMuc2tpbGxOdW0gLSAxXSkgLy/lt7LljYfnuqdcbiAgICAgICAgICAgIHJldHVybiBTa2lsbFN0YXRlLlVwZ3JhZGVkO1xuICAgICAgICBpZiAoaWNvbk51bSA9PT0gdGhpcy5za2lsbExldmVsW3RoaXMuc2tpbGxOdW0gLSAxXSArIDEpIHsgLy/og73ljYfnuqdcbiAgICAgICAgICAgIGxldCBuZWVkOiBudW1iZXIgPSB0aGlzLnNraWxsc1VwTmVlZFN0YXJbdGhpcy5za2lsbE51bSAtIDFdW2ljb25OdW0gLSAxXTtcbiAgICAgICAgICAgIGxldCBoYXZlOiBudW1iZXIgPSB0aGlzLnVzZXIuZ2V0Q3VycmVudEhhdmVTdGFyTnVtKCk7XG4gICAgICAgICAgICBpZiAoaGF2ZSA+PSBuZWVkKS8v5pif5pif5aSfXG4gICAgICAgICAgICAgICAgcmV0dXJuIFNraWxsU3RhdGUuVXBncmFkYWJsZTtcbiAgICAgICAgICAgIGVsc2UgLy/mmJ/mmJ/kuI3lpJ9cbiAgICAgICAgICAgICAgICByZXR1cm4gU2tpbGxTdGF0ZS5TdGFyU2hvcnQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gU2tpbGxTdGF0ZS5VblVwZ3JhZGU7IC8v5LiN6IO95Y2H57qnXG4gICAgfVxuXG5cbn1cbiJdfQ==