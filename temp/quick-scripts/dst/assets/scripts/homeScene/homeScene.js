
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/homeScene/homeScene.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2hvbWVTY2VuZS9ob21lU2NlbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0VBQTBEO0FBQzFELHlDQUFvQztBQUNwQyxvRUFBK0Q7QUFFL0Qsc0VBQWdFO0FBQ2hFLHFGQUFnRjtBQUNoRixrRUFBNkQ7QUFFdkQsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBQTtRQUtJLGVBQVUsR0FBaUIsSUFBSSxDQUFDO1FBTWhDLGdCQUFXLEdBQWlCLElBQUksQ0FBQztJQUNyQyxDQUFDO0lBUEc7UUFKQyxRQUFRLENBQUM7WUFDTixJQUFJLEVBQUUsRUFBRSxDQUFDLFNBQVM7WUFDbEIsV0FBVyxFQUFFLE1BQU07U0FDdEIsQ0FBQzttREFDOEI7SUFNaEM7UUFKQyxRQUFRLENBQUM7WUFDTixJQUFJLEVBQUUsRUFBRSxDQUFDLFNBQVM7WUFDbEIsV0FBVyxFQUFFLE1BQU07U0FDdEIsQ0FBQztvREFDK0I7SUFYL0IsV0FBVztRQURoQixPQUFPLENBQUMsYUFBYSxDQUFDO09BQ2pCLFdBQVcsQ0FZaEI7SUFBRCxrQkFBQztDQVpELEFBWUMsSUFBQTtBQUdEO0lBQXVDLDZCQUFZO0lBQW5EO1FBQUEscUVBK0ZDO1FBekZXLGlCQUFXLEdBQWdCLElBQUksV0FBVyxFQUFFLENBQUM7UUFHN0MscUJBQWUsR0FBb0IsSUFBSSxDQUFDO1FBR3hDLGVBQVMsR0FBYyxJQUFJLENBQUM7UUFFNUIsaUJBQVcsR0FBWSxLQUFLLENBQUM7UUFDckM7O1dBRUc7UUFDSyxtQkFBYSxHQUFZLEtBQUssQ0FBQztRQUN2Qzs7V0FFRztRQUNILGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBQ25CLFdBQUssR0FBdUIsSUFBSSxDQUFDOztJQXdFN0MsQ0FBQztJQXZFRywwQkFBTSxHQUFOO1FBQ0ksUUFB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QixFQUFFLENBQUMsUUFBUSxDQUFDO1lBQ3JDLEVBQUUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDOUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ1QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckMseUJBQWUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUF4RkQ7UUFKQyxRQUFRLENBQUM7WUFDTixJQUFJLEVBQUUsV0FBVztZQUNqQixXQUFXLEVBQUUsUUFBUTtTQUN4QixDQUFDO2tEQUNtRDtJQUdyRDtRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSx5QkFBZSxFQUFFLENBQUM7c0RBQ1k7SUFHaEQ7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsbUJBQVMsRUFBRSxDQUFDO2dEQUNNO0lBWm5CLFNBQVM7UUFEN0IsT0FBTztPQUNhLFNBQVMsQ0ErRjdCO0lBQUQsZ0JBQUM7Q0EvRkQsQUErRkMsQ0EvRnNDLEVBQUUsQ0FBQyxTQUFTLEdBK0ZsRDtrQkEvRm9CLFNBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU291bmRzTWFuYWdlciBmcm9tIFwiLi4vY29tbW9uL21vZHVsZS9zb3VuZHNNYW5hZ2VyXCJcbmltcG9ydCBTdGFydEFuaW0gZnJvbSBcIi4vc3RhcnRBbmltXCI7XG5pbXBvcnQgR2FtZURhdGFTdG9yYWdlIGZyb20gXCIuLi9jb21tb24vbW9kdWxlL2dhbWVEYXRhTWFuYWdlclwiO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi9jb21tb24vbW9kdWxlL2dhbWVEYXRhTWFuYWdlclwiXG5pbXBvcnQgTGV2ZWxEYXRhTWFuYWdlciBmcm9tIFwiLi4vY29tbW9uL21vZHVsZS9sZXZlbERhdGFNYW5hZ2VyXCJcbmltcG9ydCBMb2FkaW5nRG9vckFuaW0gZnJvbSBcIi4uLy4uL3Jlcy9wcmVmYWJzL2xvYWRpbmdEb29yQW5pbS9sb2FkaW5nRG9vckFuaW1cIjtcbmltcG9ydCBTdG9yYWdlTWFuYWdlciBmcm9tIFwiLi4vY29tbW9uL21vZHVsZS9zdG9yYWdlTWFuYWdlclwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzcyhcIkNvbmZpZ0ZpbGVzXCIpXG5jbGFzcyBDb25maWdGaWxlcyB7XG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogY2MuSnNvbkFzc2V0LFxuICAgICAgICBkaXNwbGF5TmFtZTogXCLmuLjmiI/phY3nva5cIlxuICAgIH0pXG4gICAgZ2FtZUNvbmZpZzogY2MuSnNvbkFzc2V0ID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IGNjLkpzb25Bc3NldCxcbiAgICAgICAgZGlzcGxheU5hbWU6IFwi5YWz5Y2h6YWN572uXCJcbiAgICB9KVxuICAgIGxldmVsQ29uZmlnOiBjYy5Kc29uQXNzZXQgPSBudWxsO1xufVxuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSG9tZVNjZW5lIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IENvbmZpZ0ZpbGVzLFxuICAgICAgICBkaXNwbGF5TmFtZTogXCLmuLjmiI/phY3nva7mlofku7ZcIlxuICAgIH0pXG4gICAgcHJpdmF0ZSBjb25GaWdGaWxlczogQ29uZmlnRmlsZXMgPSBuZXcgQ29uZmlnRmlsZXMoKTtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IExvYWRpbmdEb29yQW5pbSB9KVxuICAgIHByaXZhdGUgbG9hZGluZ0Rvb3JBbmltOiBMb2FkaW5nRG9vckFuaW0gPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogU3RhcnRBbmltIH0pXG4gICAgcHJpdmF0ZSBzdGFydEFuaW06IFN0YXJ0QW5pbSA9IG51bGw7XG5cbiAgICBwcml2YXRlIGlzU3RhcnRHYW1lOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICog5piv5ZCm54K55Ye75LqG6L+Z5Liq5oyJ6ZKuXG4gICAgICovXG4gICAgcHJpdmF0ZSBpc0Fib3V0QnV0dG9uOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICog56ys5LiA5qyh6L+b5YWl5ri45oiPXG4gICAgICovXG4gICAgZnJpc3RFbnRyeTogYm9vbGVhbiA9IHRydWU7XG4gICAgcHJpdmF0ZSBjbGlwczogY2MuQW5pbWF0aW9uQ2xpcFtdID0gbnVsbDtcbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIC8v5Yid5aeL5YyWIOaooeWdl1xuICAgICAgICBpZiAoR2FtZURhdGFTdG9yYWdlLmdldEdhbWVDb25maWcoKSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gY2Muc3lzLmxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAgICAgICAgICAgU3RvcmFnZU1hbmFnZXIuaW5pdCgpO1xuICAgICAgICAgICAgU291bmRzTWFuYWdlci5pbml0KCk7XG4gICAgICAgICAgICBHYW1lRGF0YVN0b3JhZ2UuaW5pdCh0aGlzLmNvbkZpZ0ZpbGVzLmdhbWVDb25maWcuanNvbik7XG4gICAgICAgICAgICBMZXZlbERhdGFNYW5hZ2VyLmluaXRMZXZlbERhdGEodGhpcy5jb25GaWdGaWxlcy5sZXZlbENvbmZpZy5qc29uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2xpcHMgPSB0aGlzLnN0YXJ0QW5pbS5ub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLmdldENsaXBzKCk7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwi5pys5Zyw5pWw5o2uOlwiLCBjYy5zeXMubG9jYWxTdG9yYWdlKTtcblxuICAgICAgICBTb3VuZHNNYW5hZ2VyLmlucy5jdXJCR00gPSBcInNvdW5kcy9ob21lX3NjZW5lX2JnXCI7XG4gICAgICAgIFNvdW5kc01hbmFnZXIuaW5zLnBsYXlCR00oXCJzb3VuZHMvaG9tZV9zY2VuZV9iZ1wiKTtcbiAgICAgICAgaWYgKHRoaXMuZnJpc3RFbnRyeSkge1xuICAgICAgICAgICAgdGhpcy5zdGFydEFuaW0ubG9nb0Rvd24oKTtcbiAgICAgICAgICAgIC8vIHRoaXMuZnJpc3RFbnRyeSA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDngrnlh7sg5byA5aeL5ri45oiPIOaMiemSrlxuICAgICAqL1xuICAgIHN0YXJ0R2FtZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNTdGFydEdhbWUpIC8v5L+d6K+B5pKt5pS+5byA6Zeo5Yqo55S75pyf6Ze077yM5oyJ5byA5aeL5ri45oiP5oyJ6ZKuIOS4jemHjeWkjeW8gOmXqFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLmlzU3RhcnRHYW1lID0gdHJ1ZTtcbiAgICAgICAgU291bmRzTWFuYWdlci5pbnMucGxheUVmZmVjdChcInNvdW5kcy9jbGlja1wiKTtcbiAgICAgICAgdGhpcy5zdGFydEFuaW0uYnV0dG9uVXAoKTtcblxuICAgICAgICBsZXQgZDogY2MuQWN0aW9uSW50ZXJ2YWwgPSBjYy5kZWxheVRpbWUodGhpcy5jbGlwc1sxXS5kdXJhdGlvbik7XG4gICAgICAgIGxldCBmdW5jOiBjYy5BY3Rpb25JbnN0YW50ID0gY2MuY2FsbEZ1bmMoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5pc1N0YXJ0R2FtZSA9IGZhbHNlO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgbGV0IHNlcTogY2MuQWN0aW9uSW50ZXJ2YWwgPSBjYy5zZXF1ZW5jZShkLCBmdW5jKTtcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihzZXEpO1xuICAgIH1cblxuICAgIGFib3V0QnV0dG9uKCkge1xuICAgICAgICBpZiAodGhpcy5pc0Fib3V0QnV0dG9uKSAvL+S/neivgeaSreaUvuW8gOmXqOWKqOeUu+acn+mXtO+8jOaMieW8gOWni+a4uOaIj+aMiemSriDkuI3ph43lpI3lvIDpl6hcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5pc0Fib3V0QnV0dG9uID0gdHJ1ZTtcblxuICAgICAgICBTb3VuZHNNYW5hZ2VyLmlucy5wbGF5RWZmZWN0KFwic291bmRzL2NsaWNrXCIpO1xuICAgICAgICBsZXQgZnVuYzogY2MuQWN0aW9uSW5zdGFudCA9IGNjLmNhbGxGdW5jKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcImFib3V0U2NlbmVcIik7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgICAgICB0aGlzLmxvYWRpbmdEb29yQW5pbS5jbG9zZURvb3IoZnVuYyk7XG5cbiAgICAgICAgR2FtZURhdGFTdG9yYWdlLnByZXNlcnZlR2FtZURhdGEoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDot7PovazliLAg6YCJ5YWzIOWcuuaZr1xuICAgICAqL1xuICAgIHNlbGVjdExldmVsU2NlbmUodXNlcnNJOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IHVzZXJzOiBVc2VyW10gPSBHYW1lRGF0YVN0b3JhZ2UuZ2V0VXNlcnMoKTtcbiAgICAgICAgR2FtZURhdGFTdG9yYWdlLnNldEN1cnJlbnRVc2VyKHVzZXJzW3VzZXJzSV0pXG4gICAgICAgIFNvdW5kc01hbmFnZXIuaW5zLnBsYXlFZmZlY3QoXCJzb3VuZHMvY2xpY2tcIik7XG4gICAgICAgIGxldCBmdW5jOiBjYy5BY3Rpb25JbnN0YW50ID0gY2MuY2FsbEZ1bmMoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwic2VsZWN0TGV2ZWxTY2VuZVwiKTtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIHRoaXMubG9hZGluZ0Rvb3JBbmltLmNsb3NlRG9vcihmdW5jKTtcblxuICAgICAgICBHYW1lRGF0YVN0b3JhZ2UucHJlc2VydmVHYW1lRGF0YSgpO1xuICAgIH1cbn1cbiJdfQ==