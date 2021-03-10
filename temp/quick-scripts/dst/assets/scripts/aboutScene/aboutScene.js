
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/aboutScene/aboutScene.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f79d4kxUTVLgpxuoorvd4d9', 'aboutScene');
// scripts/aboutScene/aboutScene.ts

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
var loadingDoorAnim_1 = require("../../res/prefabs/loadingDoorAnim/loadingDoorAnim");
var soundsManager_1 = require("../common/module/soundsManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AboutScene = /** @class */ (function (_super) {
    __extends(AboutScene, _super);
    function AboutScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loadingDoorAnim = null;
        _this.isBackButton = false;
        return _this;
    }
    AboutScene.prototype.onLoad = function () {
    };
    AboutScene.prototype.start = function () {
        this.loadingDoorAnim.setState(false);
        this.loadingDoorAnim.openDoor();
    };
    AboutScene.prototype.backButton = function () {
        if (this.isBackButton) //保证播放开门动画期间，按按钮 不重复开门
            return;
        this.isBackButton = true;
        soundsManager_1.default.ins.playEffect("sounds/click");
        var func = cc.callFunc(function () {
            cc.director.loadScene("homeScene", function () {
                var loadingDoorAnim = cc.find("Canvas/centerAnchor/loadingDoorAnim");
                var loadingDoorAnimScr = loadingDoorAnim.getComponent("loadingDoorAnim");
                loadingDoorAnimScr.setState(false);
                // let homeScene: HomeScene = cc.find("Canvas").getComponent("homeScene");
                // homeScene.fristEntry = false;
                loadingDoorAnimScr.openDoor();
            });
        }, this);
        this.loadingDoorAnim.closeDoor(func);
        gameDataManager_1.default.preserveGameData();
    };
    __decorate([
        property({ type: loadingDoorAnim_1.default })
    ], AboutScene.prototype, "loadingDoorAnim", void 0);
    AboutScene = __decorate([
        ccclass
    ], AboutScene);
    return AboutScene;
}(cc.Component));
exports.default = AboutScene;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2Fib3V0U2NlbmUvYWJvdXRTY2VuZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxvRUFBK0Q7QUFDL0QscUZBQWdGO0FBQ2hGLGdFQUEyRDtBQUVyRCxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUF3Qyw4QkFBWTtJQUFwRDtRQUFBLHFFQW9DQztRQWpDVyxxQkFBZSxHQUFvQixJQUFJLENBQUM7UUFFeEMsa0JBQVksR0FBWSxLQUFLLENBQUM7O0lBK0IxQyxDQUFDO0lBOUJHLDJCQUFNLEdBQU47SUFDQSxDQUFDO0lBRUQsMEJBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUVELCtCQUFVLEdBQVY7UUFDSSxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUUsc0JBQXNCO1lBQ3pDLE9BQU87UUFDWCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUV6Qix1QkFBYSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDN0MsSUFBSSxJQUFJLEdBQXFCLEVBQUUsQ0FBQyxRQUFRLENBQUM7WUFDckMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFO2dCQUMvQixJQUFJLGVBQWUsR0FBWSxFQUFFLENBQUMsSUFBSSxDQUFDLHFDQUFxQyxDQUFDLENBQUM7Z0JBQzlFLElBQUksa0JBQWtCLEdBQW9CLGVBQWUsQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsQ0FBQztnQkFDMUYsa0JBQWtCLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUVuQywwRUFBMEU7Z0JBQzFFLGdDQUFnQztnQkFDaEMsa0JBQWtCLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDbEMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDVCxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVyQyx5QkFBZSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDdkMsQ0FBQztJQS9CRDtRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSx5QkFBZSxFQUFFLENBQUM7dURBQ1k7SUFIL0IsVUFBVTtRQUQ5QixPQUFPO09BQ2EsVUFBVSxDQW9DOUI7SUFBRCxpQkFBQztDQXBDRCxBQW9DQyxDQXBDdUMsRUFBRSxDQUFDLFNBQVMsR0FvQ25EO2tCQXBDb0IsVUFBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBIb21lU2NlbmUgZnJvbSBcIi4uL2hvbWVTY2VuZS9ob21lU2NlbmVcIjtcbmltcG9ydCBHYW1lRGF0YVN0b3JhZ2UgZnJvbSBcIi4uL2NvbW1vbi9tb2R1bGUvZ2FtZURhdGFNYW5hZ2VyXCI7XG5pbXBvcnQgTG9hZGluZ0Rvb3JBbmltIGZyb20gXCIuLi8uLi9yZXMvcHJlZmFicy9sb2FkaW5nRG9vckFuaW0vbG9hZGluZ0Rvb3JBbmltXCI7XG5pbXBvcnQgU291bmRzTWFuYWdlciBmcm9tIFwiLi4vY29tbW9uL21vZHVsZS9zb3VuZHNNYW5hZ2VyXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBYm91dFNjZW5lIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IExvYWRpbmdEb29yQW5pbSB9KVxuICAgIHByaXZhdGUgbG9hZGluZ0Rvb3JBbmltOiBMb2FkaW5nRG9vckFuaW0gPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBpc0JhY2tCdXR0b246IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBvbkxvYWQoKSB7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMubG9hZGluZ0Rvb3JBbmltLnNldFN0YXRlKGZhbHNlKTtcbiAgICAgICAgdGhpcy5sb2FkaW5nRG9vckFuaW0ub3BlbkRvb3IoKTtcbiAgICB9XG5cbiAgICBiYWNrQnV0dG9uKCkge1xuICAgICAgICBpZiAodGhpcy5pc0JhY2tCdXR0b24pIC8v5L+d6K+B5pKt5pS+5byA6Zeo5Yqo55S75pyf6Ze077yM5oyJ5oyJ6ZKuIOS4jemHjeWkjeW8gOmXqFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLmlzQmFja0J1dHRvbiA9IHRydWU7XG5cbiAgICAgICAgU291bmRzTWFuYWdlci5pbnMucGxheUVmZmVjdChcInNvdW5kcy9jbGlja1wiKTtcbiAgICAgICAgbGV0IGZ1bmM6IGNjLkFjdGlvbkluc3RhbnQgPSBjYy5jYWxsRnVuYyhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJob21lU2NlbmVcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGxldCBsb2FkaW5nRG9vckFuaW06IGNjLk5vZGUgPSBjYy5maW5kKFwiQ2FudmFzL2NlbnRlckFuY2hvci9sb2FkaW5nRG9vckFuaW1cIik7XG4gICAgICAgICAgICAgICAgbGV0IGxvYWRpbmdEb29yQW5pbVNjcjogTG9hZGluZ0Rvb3JBbmltID0gbG9hZGluZ0Rvb3JBbmltLmdldENvbXBvbmVudChcImxvYWRpbmdEb29yQW5pbVwiKTtcbiAgICAgICAgICAgICAgICBsb2FkaW5nRG9vckFuaW1TY3Iuc2V0U3RhdGUoZmFsc2UpO1xuXG4gICAgICAgICAgICAgICAgLy8gbGV0IGhvbWVTY2VuZTogSG9tZVNjZW5lID0gY2MuZmluZChcIkNhbnZhc1wiKS5nZXRDb21wb25lbnQoXCJob21lU2NlbmVcIik7XG4gICAgICAgICAgICAgICAgLy8gaG9tZVNjZW5lLmZyaXN0RW50cnkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBsb2FkaW5nRG9vckFuaW1TY3Iub3BlbkRvb3IoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgdGhpcy5sb2FkaW5nRG9vckFuaW0uY2xvc2VEb29yKGZ1bmMpO1xuXG4gICAgICAgIEdhbWVEYXRhU3RvcmFnZS5wcmVzZXJ2ZUdhbWVEYXRhKCk7XG4gICAgfVxuXG59XG4iXX0=