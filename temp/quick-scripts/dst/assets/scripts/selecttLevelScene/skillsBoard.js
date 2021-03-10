
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/selecttLevelScene/skillsBoard.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL3NlbGVjdHRMZXZlbFNjZW5lL3NraWxsc0JvYXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9FQUF5RTtBQUV6RSwrQ0FBMEM7QUFFcEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBeUMsK0JBQVk7SUFBckQ7UUFBQSxxRUEwREM7UUF2RFcsYUFBTyxHQUFhLElBQUksQ0FBQztRQU16Qix1QkFBaUIsR0FBbUIsRUFBRSxDQUFDO1FBRXZDLFVBQUksR0FBUyxJQUFJLENBQUM7UUFDbEIsc0JBQWdCLEdBQXFCLElBQUksQ0FBQztRQUMxQyxlQUFTLEdBQWlCLElBQUksQ0FBQzs7UUE0Q3ZDLGlCQUFpQjtJQUNyQixDQUFDO0lBNUNHLDRCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLHlCQUFlLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDN0MsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDM0UsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVELDJCQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRDs7T0FFRztJQUNILG1DQUFhLEdBQWI7UUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDdkUsQ0FBQztJQUVELG9DQUFjLEdBQWQ7UUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxxQ0FBZSxHQUFmO1FBQ0ksSUFBSSxDQUFlLENBQUM7UUFDcEIsS0FBVSxVQUFzQixFQUF0QixLQUFBLElBQUksQ0FBQyxpQkFBaUIsRUFBdEIsY0FBc0IsRUFBdEIsSUFBc0I7WUFBM0IsQ0FBQyxTQUFBO1lBQ0YsQ0FBQyxDQUFDLGdCQUFnQixFQUFFLENBQUM7U0FBQTtJQUM3QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxpQ0FBVyxHQUFYO1FBQ0ksTUFBTTtRQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDdkIsVUFBVTtRQUNWLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN6QyxPQUFPO1FBQ1AsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFyREQ7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO2dEQUNJO0lBTWpDO1FBSkMsUUFBUSxDQUFDO1lBQ04sSUFBSSxFQUFFLHNCQUFZO1lBQ2xCLE9BQU8sRUFBRSxNQUFNO1NBQ2xCLENBQUM7MERBQzZDO0lBVDlCLFdBQVc7UUFEL0IsT0FBTztPQUNhLFdBQVcsQ0EwRC9CO0lBQUQsa0JBQUM7Q0ExREQsQUEwREMsQ0ExRHdDLEVBQUUsQ0FBQyxTQUFTLEdBMERwRDtrQkExRG9CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR2FtZURhdGFTdG9yYWdlLCB7IFVzZXIgfSBmcm9tIFwiLi4vY29tbW9uL21vZHVsZS9nYW1lRGF0YU1hbmFnZXJcIjtcbmltcG9ydCBTZWxlY3RMZXZlbFNjZW5lIGZyb20gXCIuL3NlbGVjdExldmVsU2NlbmVcIjtcbmltcG9ydCBBc2VyaWVzU2tpbGwgZnJvbSBcIi4vYVNlcmllc1NraWxsXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTa2lsbHNCb2FyZCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5MYWJlbCB9KVxuICAgIHByaXZhdGUgc3Rhck51bTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogQXNlcmllc1NraWxsLFxuICAgICAgICB0b29sdGlwOiBcIjXkuKrmioDog71cIlxuICAgIH0pXG4gICAgcHJpdmF0ZSBhU2VyaWVzU2tpbGxBcnJheTogQXNlcmllc1NraWxsW10gPSBbXTtcblxuICAgIHByaXZhdGUgdXNlcjogVXNlciA9IG51bGw7XG4gICAgcHJpdmF0ZSBzZWxlY3RMZXZlbFNjZW5lOiBTZWxlY3RMZXZlbFNjZW5lID0gbnVsbDtcbiAgICBwcml2YXRlIGFuaW1hdGlvbjogY2MuQW5pbWF0aW9uID0gbnVsbDtcbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMudXNlciA9IEdhbWVEYXRhU3RvcmFnZS5nZXRDdXJyZW50VXNlcigpO1xuICAgICAgICB0aGlzLnNlbGVjdExldmVsU2NlbmUgPSBjYy5maW5kKFwiQ2FudmFzXCIpLmdldENvbXBvbmVudChcInNlbGVjdExldmVsU2NlbmVcIik7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLnVwZGF0ZVN0YXJOdW0oKTtcbiAgICAgICAgdGhpcy51cGRhdGVBbGxTa2lsbHMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmm7TmlrDmioDog73mnb/kuIrmmL7npLrnmoTmmJ/mmJ/mlbBcbiAgICAgKi9cbiAgICB1cGRhdGVTdGFyTnVtKCkge1xuICAgICAgICB0aGlzLnN0YXJOdW0uc3RyaW5nID0gdGhpcy51c2VyLmdldEN1cnJlbnRIYXZlU3Rhck51bSgpLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgc2tpbGxCb2FyZEJhY2soKSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uLnBsYXkoXCJza2lsbHNCb2FyZFVwXCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOabtOaWsOaJgOacieaKgOiDveagkeeahOaYvuekulxuICAgICAqL1xuICAgIHVwZGF0ZUFsbFNraWxscygpIHtcbiAgICAgICAgbGV0IGk6IEFzZXJpZXNTa2lsbDtcbiAgICAgICAgZm9yIChpIG9mIHRoaXMuYVNlcmllc1NraWxsQXJyYXkpXG4gICAgICAgICAgICBpLnVwZGF0ZVNraWxsSWNvbnMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDph43nva7mioDog71cbiAgICAgKi9cbiAgICByZXNldFNraWxscygpIHtcbiAgICAgICAgLy/mm7TmlrDmlbDmja5cbiAgICAgICAgdGhpcy51c2VyLnJlc2V0U2tpbGwoKTtcbiAgICAgICAgLy/mm7TmlrDmmL7npLrnmoTmmJ/mmJ/mlbBcbiAgICAgICAgdGhpcy51cGRhdGVTdGFyTnVtKCk7XG4gICAgICAgIHRoaXMuc2VsZWN0TGV2ZWxTY2VuZS51cGRhdGVTY29yZUxhYmVsKCk7XG4gICAgICAgIC8v5pu05paw5oqA6IO95qCRXG4gICAgICAgIHRoaXMudXBkYXRlQWxsU2tpbGxzKCk7XG4gICAgfVxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=