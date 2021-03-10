
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/selecttLevelScene/selectLevelScene.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL3NlbGVjdHRMZXZlbFNjZW5lL3NlbGVjdExldmVsU2NlbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQXFGO0FBRXJGLCtDQUEwQztBQUUxQyxxRkFBZ0Y7QUFDaEYsZ0VBQTJEO0FBRXJELElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQThDLG9DQUFZO0lBQTFEO1FBQUEscUVBc0ZDO1FBbkZXLHFCQUFlLEdBQW9CLElBQUksQ0FBQztRQUd4QyxnQkFBVSxHQUFhLElBQUksQ0FBQztRQUc1QixrQkFBWSxHQUFpQixJQUFJLENBQUM7UUFHbEMsMEJBQW9CLEdBQWlCLElBQUksQ0FBQztRQUcxQyxVQUFJLEdBQVMsSUFBSSxDQUFDO1FBQ2xCLGtCQUFZLEdBQVksS0FBSyxDQUFDO1FBQzlCLGdCQUFVLEdBQWUsSUFBSSxDQUFDOztRQW9FdEMsaUJBQWlCO0lBQ3JCLENBQUM7SUFwRUcsaUNBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxVQUFVLEdBQUcseUJBQWUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN0RCxDQUFDO0lBRUQsZ0NBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcseUJBQWUsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUM3QyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hDLHVCQUFhLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyw0QkFBNEIsQ0FBQztRQUN4RCx1QkFBYSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsdUJBQWEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFcEQsSUFBSSxDQUFDLGdCQUFnQixFQUFF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QUksRUFBRSxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7a0VBQ2lCO0lBWmpDLGdCQUFnQjtRQURwQyxPQUFPO09BQ2EsZ0JBQWdCLENBc0ZwQztJQUFELHVCQUFDO0NBdEZELEFBc0ZDLENBdEY2QyxFQUFFLENBQUMsU0FBUyxHQXNGekQ7a0JBdEZvQixnQkFBZ0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR2FtZURhdGFTdG9yYWdlLCB7IFVzZXIsIEdhbWVDb25maWcgfSBmcm9tIFwiLi4vY29tbW9uL21vZHVsZS9nYW1lRGF0YU1hbmFnZXJcIjtcbmltcG9ydCBIb21lU2NlbmUgZnJvbSBcIi4uL2hvbWVTY2VuZS9ob21lU2NlbmVcIjtcbmltcG9ydCBMZXZlbE1hbmFnZXIgZnJvbSBcIi4vbGV2ZWxNYW5hZ2VyXCI7XG5pbXBvcnQgTGV2ZWxTY2VuZSBmcm9tIFwiLi4vbGV2ZWxTY2VuZS9sZXZlbFNjZW5lXCI7XG5pbXBvcnQgTG9hZGluZ0Rvb3JBbmltIGZyb20gXCIuLi8uLi9yZXMvcHJlZmFicy9sb2FkaW5nRG9vckFuaW0vbG9hZGluZ0Rvb3JBbmltXCI7XG5pbXBvcnQgU291bmRzTWFuYWdlciBmcm9tIFwiLi4vY29tbW9uL21vZHVsZS9zb3VuZHNNYW5hZ2VyXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWxlY3RMZXZlbFNjZW5lIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IExvYWRpbmdEb29yQW5pbSB9KVxuICAgIHByaXZhdGUgbG9hZGluZ0Rvb3JBbmltOiBMb2FkaW5nRG9vckFuaW0gPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTGFiZWwgfSlcbiAgICBwcml2YXRlIHNjb3JlTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IExldmVsTWFuYWdlciB9KVxuICAgIHByaXZhdGUgbGV2ZWxNYW5hZ2VyOiBMZXZlbE1hbmFnZXIgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuQW5pbWF0aW9uIH0pXG4gICAgcHJpdmF0ZSBza2lsbHNCb2FyZEFuaW1hdGlvbjogY2MuQW5pbWF0aW9uID0gbnVsbDtcblxuXG4gICAgcHJpdmF0ZSB1c2VyOiBVc2VyID0gbnVsbDtcbiAgICBwcml2YXRlIGlzQmFja0J1dHRvbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgZ2FtZUNvbmZpZzogR2FtZUNvbmZpZyA9IG51bGw7XG4gICAgb25Mb2FkKCkge1xuICAgICAgICB0aGlzLmdhbWVDb25maWcgPSBHYW1lRGF0YVN0b3JhZ2UuZ2V0R2FtZUNvbmZpZygpO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLnVzZXIgPSBHYW1lRGF0YVN0b3JhZ2UuZ2V0Q3VycmVudFVzZXIoKTtcbiAgICAgICAgdGhpcy5sb2FkaW5nRG9vckFuaW0uc2V0U3RhdGUoZmFsc2UpO1xuICAgICAgICB0aGlzLmxvYWRpbmdEb29yQW5pbS5vcGVuRG9vcigpO1xuICAgICAgICBTb3VuZHNNYW5hZ2VyLmlucy5jdXJCR00gPSBcInNvdW5kcy9zZWxlY3RMZXZlbHNjZW5lQkdNXCI7XG4gICAgICAgIFNvdW5kc01hbmFnZXIuaW5zLnBsYXlCR00oU291bmRzTWFuYWdlci5pbnMuY3VyQkdNKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZVNjb3JlTGFiZWwoKTtcbiAgICAgICAgdGhpcy5sZXZlbE1hbmFnZXIudXBkYXRlTGV2ZWxNYXAodGhpcy51c2VyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmm7TmlrDmiJDnu6nmnb8gXG4gICAgICovXG4gICAgdXBkYXRlU2NvcmVMYWJlbCgpIHtcbiAgICAgICAgbGV0IG1heDogbnVtYmVyID0gdGhpcy5nYW1lQ29uZmlnLmdldFN0YXJTdW0oKTtcbiAgICAgICAgbGV0IG51bTogbnVtYmVyID0gdGhpcy51c2VyLmdldEN1cnJlbnRIYXZlU3Rhck51bSgpO1xuICAgICAgICB0aGlzLnNjb3JlTGFiZWwuc3RyaW5nID0gbnVtLnRvU3RyaW5nKCkgKyBcIi9cIiArIG1heC50b1N0cmluZygpO1xuICAgIH1cblxuICAgIGJhY2tCdXR0b24oKSB7XG4gICAgICAgIGlmICh0aGlzLmlzQmFja0J1dHRvbikgLy/kv53or4Hmkq3mlL7lvIDpl6jliqjnlLvmnJ/pl7TvvIzmjInlvIDlp4vmuLjmiI/mjInpkq4g5LiN6YeN5aSN5byA6ZeoXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMuaXNCYWNrQnV0dG9uID0gdHJ1ZTtcblxuICAgICAgICBTb3VuZHNNYW5hZ2VyLmlucy5wbGF5RWZmZWN0KFwic291bmRzL2NsaWNrXCIpO1xuICAgICAgICBsZXQgZnVuYzogY2MuQWN0aW9uSW5zdGFudCA9IGNjLmNhbGxGdW5jKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcImhvbWVTY2VuZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgLy8gbGV0IGhvbWVTY2VuZTogSG9tZVNjZW5lID0gY2MuZmluZChcIkNhbnZhc1wiKS5nZXRDb21wb25lbnQoXCJob21lU2NlbmVcIik7XG4gICAgICAgICAgICAgICAgLy8gaG9tZVNjZW5lLmZyaXN0RW50cnkgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIGxldCBsb2FkaW5nRG9vckFuaW06IGNjLk5vZGUgPSBjYy5maW5kKFwiQ2FudmFzL2NlbnRlckFuY2hvci9sb2FkaW5nRG9vckFuaW1cIik7XG4gICAgICAgICAgICAgICAgbGV0IGxvYWRpbmdEb29yQW5pbVNjcjogTG9hZGluZ0Rvb3JBbmltID0gbG9hZGluZ0Rvb3JBbmltLmdldENvbXBvbmVudChcImxvYWRpbmdEb29yQW5pbVwiKTtcbiAgICAgICAgICAgICAgICBsb2FkaW5nRG9vckFuaW1TY3Iuc2V0U3RhdGUoZmFsc2UpO1xuICAgICAgICAgICAgICAgIGxvYWRpbmdEb29yQW5pbVNjci5vcGVuRG9vcigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgICAgICB0aGlzLmxvYWRpbmdEb29yQW5pbS5jbG9zZURvb3IoZnVuYyk7XG4gICAgICAgIEdhbWVEYXRhU3RvcmFnZS5wcmVzZXJ2ZUdhbWVEYXRhKCk7XG4gICAgfVxuXG4gICAgdG9MZXZlbFNjZW5lKGxldmVsKSB7XG4gICAgICAgIGxldCBmdW5jOiBjYy5BY3Rpb25JbnN0YW50ID0gY2MuY2FsbEZ1bmMoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwibGV2ZWxTY2VuZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbGV0IGxvYWRpbmdEb29yQW5pbTogY2MuTm9kZSA9IGNjLmZpbmQoXCJDYW52YXMvbG9hZGluZ0Rvb3JBbmltXCIpO1xuICAgICAgICAgICAgICAgIGxldCBsb2FkaW5nRG9vckFuaW1TY3I6IExvYWRpbmdEb29yQW5pbSA9IGxvYWRpbmdEb29yQW5pbS5nZXRDb21wb25lbnQoXCJsb2FkaW5nRG9vckFuaW1cIik7XG4gICAgICAgICAgICAgICAgbG9hZGluZ0Rvb3JBbmltU2NyLnNldFN0YXRlKGZhbHNlKTtcblxuICAgICAgICAgICAgICAgIC8v5Lyg5YWl5YWz5Y2h5pWwXG4gICAgICAgICAgICAgICAgbGV0IGxldmVsU2NlbmU6IExldmVsU2NlbmUgPSBjYy5maW5kKFwiQ2FudmFzXCIpLmdldENvbXBvbmVudChcImxldmVsU2NlbmVcIik7XG4gICAgICAgICAgICAgICAgbGV2ZWxTY2VuZS5sZXZlbE51bSA9IE51bWJlcihsZXZlbCk7XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgdGhpcy5sb2FkaW5nRG9vckFuaW0uY2xvc2VEb29yKGZ1bmMpO1xuXG4gICAgICAgIEdhbWVEYXRhU3RvcmFnZS5wcmVzZXJ2ZUdhbWVEYXRhKCk7XG4gICAgfVxuXG4gICAgdXBncmFkZUJ1dHRvbigpIHtcbiAgICAgICAgdGhpcy5za2lsbHNCb2FyZEFuaW1hdGlvbi5wbGF5KFwic2tpbGxzQm9hcmREb3duXCIpO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=