
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/selecttLevelScene/levelManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL3NlbGVjdHRMZXZlbFNjZW5lL2xldmVsTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvRUFBeUU7QUFDekUsZ0VBQTJEO0FBR3JELElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTBDLGdDQUFZO0lBQXREO1FBQUEscUVBb0dDO1FBbEdXLFlBQU0sR0FBYyxJQUFJLENBQUM7UUFDekIsbUJBQWEsR0FBWSxLQUFLLENBQUM7UUFDL0Isc0JBQWdCLEdBQXFCLElBQUksQ0FBQztRQUMxQyxnQkFBVSxHQUFZLElBQUksQ0FBQztRQUNuQzs7V0FFRztRQUNLLGlCQUFXLEdBQVcsSUFBSSxDQUFDOztJQTJGdkMsQ0FBQztJQXJGRyw2QkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUNqQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUMzRSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLFdBQVcsR0FBRyx5QkFBZSxDQUFDLGFBQWEsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3RFLENBQUM7SUFFRCw0QkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRDs7T0FFRztJQUNLLHNDQUFlLEdBQXZCO1FBQ0ksSUFBSSxPQUFPLEdBQWMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDNUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDckMsSUFBSSxJQUFJLEdBQVksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9CLElBQUksTUFBTSxHQUFjLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3JELElBQUksV0FBVyxHQUFHLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUVsRCw4QkFBOEI7WUFDOUIsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQy9CLFdBQVcsQ0FBQyxTQUFTLEdBQUcsY0FBYyxDQUFDO1lBQ3ZDLFdBQVcsQ0FBQyxPQUFPLEdBQUcsaUJBQWlCLENBQUM7WUFDeEMsV0FBVyxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNqRCxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUN4QztJQUNMLENBQUM7SUFFRCxzQ0FBZSxHQUFmLFVBQWdCLENBQUMsRUFBRSxLQUFLO1FBQ3BCLElBQUksSUFBSSxDQUFDLGFBQWE7WUFDbEIsT0FBTztRQUNYLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzFCLHVCQUFhLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUU3QyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUUsS0FBSztZQUNqQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNsRCxPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRTlDLENBQUM7SUFFRDs7T0FFRztJQUNILHFDQUFjLEdBQWQsVUFBZSxJQUFVO1FBQ3JCLElBQUksUUFBUSxHQUFXLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQy9DLElBQUksWUFBWSxHQUFhLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUNwRCxTQUFTO1FBQ1QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMvQixJQUFJLEtBQUssR0FBWSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLElBQUksS0FBSyxHQUFjLEtBQUssQ0FBQyxRQUFRLENBQUM7WUFDdEMsSUFBSSxVQUFVLEdBQVcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2pDLElBQUksU0FBUyxHQUFZLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUNsRSxTQUFTLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQzthQUM1QjtZQUNELEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1NBQ3ZCO1FBRUQsSUFBSSxRQUFRLEdBQUcsQ0FBQyxHQUFHLHlCQUFlLENBQUMsYUFBYSxFQUFFLENBQUMsWUFBWSxFQUFFO1lBQzdELE9BQU87UUFFWCxhQUFhO1FBQ2IsSUFBSSxTQUFTLEdBQVksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMvQyxJQUFJLEdBQUcsR0FBWSxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDM0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBRTlCLGVBQWU7UUFDZixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFFN0IsOEJBQThCO1FBQzlCLElBQUksTUFBTSxHQUFjLFNBQVMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFELElBQUksV0FBVyxHQUFHLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNsRCxXQUFXLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDL0IsV0FBVyxDQUFDLFNBQVMsR0FBRyxjQUFjLENBQUM7UUFDdkMsV0FBVyxDQUFDLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQztRQUN4QyxXQUFXLENBQUMsZUFBZSxHQUFHLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3hELE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFsR2dCLFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0FvR2hDO0lBQUQsbUJBQUM7Q0FwR0QsQUFvR0MsQ0FwR3lDLEVBQUUsQ0FBQyxTQUFTLEdBb0dyRDtrQkFwR29CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR2FtZURhdGFTdG9yYWdlLCB7IFVzZXIgfSBmcm9tIFwiLi4vY29tbW9uL21vZHVsZS9nYW1lRGF0YU1hbmFnZXJcIjtcbmltcG9ydCBTb3VuZHNNYW5hZ2VyIGZyb20gXCIuLi9jb21tb24vbW9kdWxlL3NvdW5kc01hbmFnZXJcIjtcbmltcG9ydCBTZWxlY3RMZXZlbFNjZW5lIGZyb20gXCIuL3NlbGVjdExldmVsU2NlbmVcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExldmVsTWFuYWdlciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBwcml2YXRlIGxldmVsczogY2MuTm9kZVtdID0gbnVsbDtcbiAgICBwcml2YXRlIGlzTGV2ZWxCdXR0b246IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIHNlbGVjdExldmVsU2NlbmU6IFNlbGVjdExldmVsU2NlbmUgPSBudWxsO1xuICAgIHByaXZhdGUgbGV2ZWxFbnRyeTogY2MuTm9kZSA9IG51bGw7XG4gICAgLyoqXG4gICAgICog5pyA5aSn5YWz5pWwXG4gICAgICovXG4gICAgcHJpdmF0ZSBNYXhMZXZlbE51bTogbnVtYmVyID0gbnVsbDtcbiAgICAvKipcbiAgICAgKiDmnIDmlrDop6PplIHnmoTlhbPljaFcbiAgICAgKi9cbiAgICBwcml2YXRlIG5ld0xldmVsOiBudW1iZXI7XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMubGV2ZWxzID0gdGhpcy5ub2RlLmNoaWxkcmVuO1xuICAgICAgICB0aGlzLnNlbGVjdExldmVsU2NlbmUgPSBjYy5maW5kKFwiQ2FudmFzXCIpLmdldENvbXBvbmVudChcInNlbGVjdExldmVsU2NlbmVcIik7XG4gICAgICAgIHRoaXMubGV2ZWxFbnRyeSA9IHRoaXMubGV2ZWxzW3RoaXMubGV2ZWxzLmxlbmd0aCAtIDFdO1xuICAgICAgICB0aGlzLk1heExldmVsTnVtID0gR2FtZURhdGFTdG9yYWdlLmdldEdhbWVDb25maWcoKS5nZXRMZXZlbHNTdW0oKTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5idXR0b25FdmVudEJpbmQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmjInpkq7kuovku7bnu5HlrppcbiAgICAgKi9cbiAgICBwcml2YXRlIGJ1dHRvbkV2ZW50QmluZCgpIHtcbiAgICAgICAgbGV0IGJ1dHRvbnM6IGNjLk5vZGVbXSA9IHRoaXMubm9kZS5jaGlsZHJlbjtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBidXR0b25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbm9kZTogY2MuTm9kZSA9IGJ1dHRvbnNbaV07XG4gICAgICAgICAgICBsZXQgYnV0dG9uOiBjYy5CdXR0b24gPSBub2RlLmdldENvbXBvbmVudChjYy5CdXR0b24pO1xuICAgICAgICAgICAgbGV0IGNsaWNrX2V2ZW50ID0gbmV3IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIoKTtcblxuICAgICAgICAgICAgLy/mt7vliqDlk43lupTkuovku7bnmoTlv4XopoHlj4LmlbDvvIzljbPlk43lupTlh73mlbDmiYDlnKjnmoToioLngrnjgIHnu4Tku7bjgIHlh73mlbBcbiAgICAgICAgICAgIGNsaWNrX2V2ZW50LnRhcmdldCA9IHRoaXMubm9kZTtcbiAgICAgICAgICAgIGNsaWNrX2V2ZW50LmNvbXBvbmVudCA9IFwibGV2ZWxNYW5hZ2VyXCI7XG4gICAgICAgICAgICBjbGlja19ldmVudC5oYW5kbGVyID0gXCJsZXZlbEJ1dHRvbkZ1bmNcIjtcbiAgICAgICAgICAgIGNsaWNrX2V2ZW50LmN1c3RvbUV2ZW50RGF0YSA9IChpICsgMSkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIGJ1dHRvbi5jbGlja0V2ZW50cy5wdXNoKGNsaWNrX2V2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxldmVsQnV0dG9uRnVuYyhlLCBsZXZlbCkge1xuICAgICAgICBpZiAodGhpcy5pc0xldmVsQnV0dG9uKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLmlzTGV2ZWxCdXR0b24gPSB0cnVlO1xuICAgICAgICBTb3VuZHNNYW5hZ2VyLmlucy5wbGF5RWZmZWN0KFwic291bmRzL2NsaWNrXCIpO1xuXG4gICAgICAgIGlmIChsZXZlbCA+IHRoaXMuTWF4TGV2ZWxOdW0pIHsgLy/mnIDmlrDlhbNcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TGV2ZWxTY2VuZS50b0xldmVsU2NlbmUodGhpcy5uZXdMZXZlbCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNlbGVjdExldmVsU2NlbmUudG9MZXZlbFNjZW5lKGxldmVsKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOabtOaWsOmAieWFs+WcsOWbvlxuICAgICAqL1xuICAgIHVwZGF0ZUxldmVsTWFwKHVzZXI6IFVzZXIpIHtcbiAgICAgICAgbGV0IHZpc2l0ZWROOiBudW1iZXIgPSB1c2VyLmdldFJ1c2hMZXZlbHNTdW0oKTtcbiAgICAgICAgbGV0IGxldmVsc1JldmlldzogbnVtYmVyW10gPSB1c2VyLmdldExldmVsc1JldmlldygpO1xuICAgICAgICAvL+abtOaWsOW3sumXr+i/h+eahOWFs1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZpc2l0ZWROOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBsZXZlbDogY2MuTm9kZSA9IHRoaXMubGV2ZWxzW2ldO1xuICAgICAgICAgICAgbGV0IHN0YXJzOiBjYy5Ob2RlW10gPSBsZXZlbC5jaGlsZHJlbjtcbiAgICAgICAgICAgIGxldCBnZXRTdGFyTnVtOiBudW1iZXIgPSBsZXZlbHNSZXZpZXdbaV07XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGdldFN0YXJOdW07IGorKykge1xuICAgICAgICAgICAgICAgIGxldCBlbXB0eVN0YXI6IGNjLk5vZGUgPSBzdGFyc1tqICsgMV0uZ2V0Q2hpbGRCeU5hbWUoXCJlbXB0eVN0YXJcIik7XG4gICAgICAgICAgICAgICAgZW1wdHlTdGFyLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV2ZWwuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2aXNpdGVkTiArIDEgPiBHYW1lRGF0YVN0b3JhZ2UuZ2V0R2FtZUNvbmZpZygpLmdldExldmVsc1N1bSgpKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIC8v5pu05paw5rKh5pyJ6Zev55qE56ys5LiA5Liq5paw5YWzXG4gICAgICAgIGxldCBuZXh0TGV2ZWw6IGNjLk5vZGUgPSB0aGlzLmxldmVsc1t2aXNpdGVkTl07XG4gICAgICAgIGxldCBwb3M6IGNjLlZlYzIgPSBuZXh0TGV2ZWwuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgdGhpcy5sZXZlbEVudHJ5LnNldFBvc2l0aW9uKHBvcyk7XG4gICAgICAgIHRoaXMubGV2ZWxFbnRyeS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgIC8v6K6w5b2V5LiL5pyA5paw5YWz5YWl5Y+j5a+55bqU55qE5YWz5pWwXG4gICAgICAgIHRoaXMubmV3TGV2ZWwgPSB2aXNpdGVkTiArIDE7XG5cbiAgICAgICAgLy/mt7vliqDlk43lupTkuovku7bnmoTlv4XopoHlj4LmlbDvvIzljbPlk43lupTlh73mlbDmiYDlnKjnmoToioLngrnjgIHnu4Tku7bjgIHlh73mlbBcbiAgICAgICAgbGV0IGJ1dHRvbjogY2MuQnV0dG9uID0gbmV4dExldmVsLmdldENvbXBvbmVudChjYy5CdXR0b24pO1xuICAgICAgICBsZXQgY2xpY2tfZXZlbnQgPSBuZXcgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcigpO1xuICAgICAgICBjbGlja19ldmVudC50YXJnZXQgPSB0aGlzLm5vZGU7XG4gICAgICAgIGNsaWNrX2V2ZW50LmNvbXBvbmVudCA9IFwibGV2ZWxNYW5hZ2VyXCI7XG4gICAgICAgIGNsaWNrX2V2ZW50LmhhbmRsZXIgPSBcImxldmVsQnV0dG9uRnVuY1wiO1xuICAgICAgICBjbGlja19ldmVudC5jdXN0b21FdmVudERhdGEgPSAodmlzaXRlZE4gKyAxKS50b1N0cmluZygpO1xuICAgICAgICBidXR0b24uY2xpY2tFdmVudHMucHVzaChjbGlja19ldmVudCk7XG4gICAgfVxuXG59XG4iXX0=