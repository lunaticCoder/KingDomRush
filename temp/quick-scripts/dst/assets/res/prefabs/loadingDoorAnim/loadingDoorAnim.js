
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/res/prefabs/loadingDoorAnim/loadingDoorAnim.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'eb3cfoKNhhKUYqSuYQiQcM8', 'loadingDoorAnim');
// res/prefabs/loadingDoorAnim/loadingDoorAnim.ts

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
var soundsManager_1 = require("../../../scripts/common/module/soundsManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LoadingDoorAnim = /** @class */ (function (_super) {
    __extends(LoadingDoorAnim, _super);
    function LoadingDoorAnim() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.time = 1;
        _this.lDoor = null;
        _this.rDoor = null;
        /**
         * 门是开的吗
         */
        _this.isDoorOpen = true;
        _this.viewSize = null;
        return _this;
    }
    LoadingDoorAnim.prototype.onLoad = function () {
        this.lDoor = this.node.getChildByName("lDoor");
        this.rDoor = this.node.getChildByName("rDoor");
        this.viewSize = cc.view.getVisibleSize();
        this.setState(true);
    };
    LoadingDoorAnim.prototype.start = function () {
    };
    /**
     * 设置门的状态
     * @param state true为开
     */
    LoadingDoorAnim.prototype.setState = function (state) {
        if (state) {
            this.lDoor.setPosition(cc.v2(-this.viewSize.width, 0));
            this.rDoor.setPosition(cc.v2(this.viewSize.width, 0));
            this.isDoorOpen = true;
        }
        else {
            this.lDoor.setPosition(cc.v2(2, 0));
            this.rDoor.setPosition(cc.v2(-2, 0));
            this.isDoorOpen = false;
        }
    };
    /**
     * 开门动画
     */
    LoadingDoorAnim.prototype.openDoor = function () {
        if (this.isDoorOpen)
            return;
        var d = cc.delayTime(1);
        var func = cc.callFunc(function () {
            var la = cc.moveTo(this.time, cc.v2(-this.viewSize.width, 0)).easing(cc.easeIn(2));
            var ra = cc.moveTo(this.time, cc.v2(this.viewSize.width, 0)).easing(cc.easeIn(2));
            this.lDoor.runAction(la);
            this.rDoor.runAction(ra);
        }.bind(this));
        var seq = cc.sequence(d, func);
        this.node.runAction(seq);
        this.isDoorOpen = true;
    };
    /**
     * 关门动画
     * @param func 回调函数
     */
    LoadingDoorAnim.prototype.closeDoor = function (func) {
        if (!this.isDoorOpen)
            return;
        var la = cc.moveTo(this.time, cc.v2(2, 0)).easing(cc.easeIn(2));
        var ra = cc.moveTo(this.time, cc.v2(-2, 0)).easing(cc.easeIn(2));
        var f1 = cc.callFunc(function () {
            soundsManager_1.default.ins.playEffect("sounds/close_door");
        }, this);
        var seq = cc.sequence(ra, f1, func);
        this.lDoor.runAction(la);
        this.rDoor.runAction(seq);
        this.isDoorOpen = false;
    };
    __decorate([
        property({
            displayName: "开关门时间"
        })
    ], LoadingDoorAnim.prototype, "time", void 0);
    LoadingDoorAnim = __decorate([
        ccclass
    ], LoadingDoorAnim);
    return LoadingDoorAnim;
}(cc.Component));
exports.default = LoadingDoorAnim;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9yZXMvcHJlZmFicy9sb2FkaW5nRG9vckFuaW0vbG9hZGluZ0Rvb3JBbmltLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhFQUF5RTtBQUVuRSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUE2QyxtQ0FBWTtJQUF6RDtRQUFBLHFFQW1GQztRQTlFRyxVQUFJLEdBQVcsQ0FBQyxDQUFDO1FBRVQsV0FBSyxHQUFZLElBQUksQ0FBQztRQUN0QixXQUFLLEdBQVksSUFBSSxDQUFDO1FBQzlCOztXQUVHO1FBQ0gsZ0JBQVUsR0FBWSxJQUFJLENBQUM7UUFDbkIsY0FBUSxHQUFZLElBQUksQ0FBQzs7SUFzRXJDLENBQUM7SUFyRUcsZ0NBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFekMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN2QixDQUFDO0lBRUQsK0JBQUssR0FBTDtJQUNBLENBQUM7SUFFRDs7O09BR0c7SUFDSCxrQ0FBUSxHQUFSLFVBQVMsS0FBYztRQUNuQixJQUFJLEtBQUssRUFBRTtZQUNQLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxLQUFLLENB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LENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUUxQixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztJQUM1QixDQUFDO0lBNUVEO1FBSEMsUUFBUSxDQUFDO1lBQ04sV0FBVyxFQUFFLE9BQU87U0FDdkIsQ0FBQztpREFDZTtJQUxBLGVBQWU7UUFEbkMsT0FBTztPQUNhLGVBQWUsQ0FtRm5DO0lBQUQsc0JBQUM7Q0FuRkQsQUFtRkMsQ0FuRjRDLEVBQUUsQ0FBQyxTQUFTLEdBbUZ4RDtrQkFuRm9CLGVBQWUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU291bmRzTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vc2NyaXB0cy9jb21tb24vbW9kdWxlL3NvdW5kc01hbmFnZXJcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvYWRpbmdEb29yQW5pbSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICBkaXNwbGF5TmFtZTogXCLlvIDlhbPpl6jml7bpl7RcIlxuICAgIH0pXG4gICAgdGltZTogbnVtYmVyID0gMTtcblxuICAgIHByaXZhdGUgbERvb3I6IGNjLk5vZGUgPSBudWxsO1xuICAgIHByaXZhdGUgckRvb3I6IGNjLk5vZGUgPSBudWxsO1xuICAgIC8qKlxuICAgICAqIOmXqOaYr+W8gOeahOWQl1xuICAgICAqL1xuICAgIGlzRG9vck9wZW46IGJvb2xlYW4gPSB0cnVlO1xuICAgIHByaXZhdGUgdmlld1NpemU6IGNjLlNpemUgPSBudWxsO1xuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5sRG9vciA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImxEb29yXCIpO1xuICAgICAgICB0aGlzLnJEb29yID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwickRvb3JcIik7XG4gICAgICAgIHRoaXMudmlld1NpemUgPSBjYy52aWV3LmdldFZpc2libGVTaXplKCk7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh0cnVlKVxuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiuvue9rumXqOeahOeKtuaAgVxuICAgICAqIEBwYXJhbSBzdGF0ZSB0cnVl5Li65byAIFxuICAgICAqL1xuICAgIHNldFN0YXRlKHN0YXRlOiBib29sZWFuKSB7XG4gICAgICAgIGlmIChzdGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5sRG9vci5zZXRQb3NpdGlvbihjYy52MigtdGhpcy52aWV3U2l6ZS53aWR0aCwgMCkpO1xuICAgICAgICAgICAgdGhpcy5yRG9vci5zZXRQb3NpdGlvbihjYy52Mih0aGlzLnZpZXdTaXplLndpZHRoLCAwKSk7XG4gICAgICAgICAgICB0aGlzLmlzRG9vck9wZW4gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sRG9vci5zZXRQb3NpdGlvbihjYy52MigyLCAwKSlcbiAgICAgICAgICAgIHRoaXMuckRvb3Iuc2V0UG9zaXRpb24oY2MudjIoLTIsIDApKVxuICAgICAgICAgICAgdGhpcy5pc0Rvb3JPcGVuID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlvIDpl6jliqjnlLtcbiAgICAgKi9cbiAgICBvcGVuRG9vcigpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEb29yT3BlbilcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICBsZXQgZDogY2MuQWN0aW9uSW50ZXJ2YWwgPSBjYy5kZWxheVRpbWUoMSk7XG4gICAgICAgIGxldCBmdW5jOiBjYy5BY3Rpb25JbnN0YW50ID0gY2MuY2FsbEZ1bmMoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbGV0IGxhOiBjYy5BY3Rpb25JbnRlcnZhbCA9IGNjLm1vdmVUbyh0aGlzLnRpbWUsIGNjLnYyKC10aGlzLnZpZXdTaXplLndpZHRoLCAwKSkuZWFzaW5nKGNjLmVhc2VJbigyKSk7XG4gICAgICAgICAgICBsZXQgcmE6IGNjLkFjdGlvbkludGVydmFsID0gY2MubW92ZVRvKHRoaXMudGltZSwgY2MudjIodGhpcy52aWV3U2l6ZS53aWR0aCwgMCkpLmVhc2luZyhjYy5lYXNlSW4oMikpO1xuICAgICAgICAgICAgdGhpcy5sRG9vci5ydW5BY3Rpb24obGEpO1xuICAgICAgICAgICAgdGhpcy5yRG9vci5ydW5BY3Rpb24ocmEpO1xuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICBsZXQgc2VxOiBjYy5BY3Rpb25JbnRlcnZhbCA9IGNjLnNlcXVlbmNlKGQsIGZ1bmMpO1xuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKHNlcSk7XG5cbiAgICAgICAgdGhpcy5pc0Rvb3JPcGVuID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlhbPpl6jliqjnlLtcbiAgICAgKiBAcGFyYW0gZnVuYyDlm57osIPlh73mlbBcbiAgICAgKi9cbiAgICBjbG9zZURvb3IoZnVuYzogY2MuQWN0aW9uSW5zdGFudCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNEb29yT3BlbilcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICBsZXQgbGE6IGNjLkFjdGlvbkludGVydmFsID0gY2MubW92ZVRvKHRoaXMudGltZSwgY2MudjIoMiwgMCkpLmVhc2luZyhjYy5lYXNlSW4oMikpO1xuICAgICAgICBsZXQgcmE6IGNjLkFjdGlvbkludGVydmFsID0gY2MubW92ZVRvKHRoaXMudGltZSwgY2MudjIoLTIsIDApKS5lYXNpbmcoY2MuZWFzZUluKDIpKTtcbiAgICAgICAgbGV0IGYxOiBjYy5BY3Rpb25JbnN0YW50ID0gY2MuY2FsbEZ1bmMoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgU291bmRzTWFuYWdlci5pbnMucGxheUVmZmVjdChcInNvdW5kcy9jbG9zZV9kb29yXCIpO1xuICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICBsZXQgc2VxOiBjYy5BY3Rpb25JbnRlcnZhbCA9IGNjLnNlcXVlbmNlKHJhLCBmMSwgZnVuYyk7XG4gICAgICAgIHRoaXMubERvb3IucnVuQWN0aW9uKGxhKTtcbiAgICAgICAgdGhpcy5yRG9vci5ydW5BY3Rpb24oc2VxKTtcblxuICAgICAgICB0aGlzLmlzRG9vck9wZW4gPSBmYWxzZTtcbiAgICB9XG5cbn1cbiJdfQ==