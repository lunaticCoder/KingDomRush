
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/homeScene/startAnim.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd84c7vw3itCJZgQAZ79g8CH', 'startAnim');
// scripts/homeScene/startAnim.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var StartAnim = /** @class */ (function (_super) {
    __extends(StartAnim, _super);
    function StartAnim() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.animation = null;
        _this.isButtonDown = false;
        _this.clips = null;
        return _this;
        // update (dt) {}
    }
    StartAnim.prototype.onLoad = function () {
        this.animation = this.node.getComponent(cc.Animation);
        this.clips = this.animation.getClips();
    };
    StartAnim.prototype.start = function () {
    };
    /**
     * startAnim下落的动画
     */
    StartAnim.prototype.logoDown = function () {
        this.animation.play("homeSceneStart");
    };
    /**
     * 播放按钮上收的动画
     */
    StartAnim.prototype.buttonUp = function () {
        this.animation.play("buttonUp");
    };
    StartAnim.prototype.buttonDown = function () {
        if (this.isButtonDown)
            return;
        this.isButtonDown = true;
        soundsManager_1.default.ins.playEffect("sounds/click");
        this.animation.play("buttonDown");
        var d = cc.delayTime(this.clips[2].duration);
        var func = cc.callFunc(function () {
            this.isButtonDown = false;
        }, this);
        var seq = cc.sequence(d, func);
        this.node.runAction(seq);
    };
    StartAnim = __decorate([
        ccclass
    ], StartAnim);
    return StartAnim;
}(cc.Component));
exports.default = StartAnim;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2hvbWVTY2VuZS9zdGFydEFuaW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0VBQTJEO0FBRXJELElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXVDLDZCQUFZO0lBQW5EO1FBQUEscUVBK0NDO1FBN0NXLGVBQVMsR0FBaUIsSUFBSSxDQUFDO1FBQy9CLGtCQUFZLEdBQVksS0FBSyxDQUFDO1FBQzlCLFdBQUssR0FBdUIsSUFBSSxDQUFDOztRQTBDekMsaUJBQWlCO0lBQ3JCLENBQUM7SUExQ0csMEJBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBRUQseUJBQUssR0FBTDtJQUNBLENBQUM7SUFFRDs7T0FFRztJQUNILDRCQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRDs7T0FFRztJQUNILDRCQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsOEJBQVUsR0FBVjtRQUNJLElBQUksSUFBSSxDQUFDLFlBQVk7WUFDakIsT0FBTztRQUNYLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBRXpCLHVCQUFhLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVsQyxJQUFJLENBQUMsR0FBc0IsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hFLElBQUksSUFBSSxHQUFxQixFQUFFLENBQUMsUUFBUSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQzlCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNULElBQUksR0FBRyxHQUFzQixFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBekNnQixTQUFTO1FBRDdCLE9BQU87T0FDYSxTQUFTLENBK0M3QjtJQUFELGdCQUFDO0NBL0NELEFBK0NDLENBL0NzQyxFQUFFLENBQUMsU0FBUyxHQStDbEQ7a0JBL0NvQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNvdW5kc01hbmFnZXIgZnJvbSBcIi4uL2NvbW1vbi9tb2R1bGUvc291bmRzTWFuYWdlclwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhcnRBbmltIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIHByaXZhdGUgYW5pbWF0aW9uOiBjYy5BbmltYXRpb24gPSBudWxsO1xuICAgIHByaXZhdGUgaXNCdXR0b25Eb3duOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBjbGlwczogY2MuQW5pbWF0aW9uQ2xpcFtdID0gbnVsbDtcbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xuICAgICAgICB0aGlzLmNsaXBzID0gdGhpcy5hbmltYXRpb24uZ2V0Q2xpcHMoKTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzdGFydEFuaW3kuIvokL3nmoTliqjnlLtcbiAgICAgKi9cbiAgICBsb2dvRG93bigpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb24ucGxheShcImhvbWVTY2VuZVN0YXJ0XCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaSreaUvuaMiemSruS4iuaUtueahOWKqOeUuyBcbiAgICAgKi9cbiAgICBidXR0b25VcCgpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb24ucGxheShcImJ1dHRvblVwXCIpO1xuICAgIH1cblxuICAgIGJ1dHRvbkRvd24oKSB7XG4gICAgICAgIGlmICh0aGlzLmlzQnV0dG9uRG93bilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5pc0J1dHRvbkRvd24gPSB0cnVlO1xuXG4gICAgICAgIFNvdW5kc01hbmFnZXIuaW5zLnBsYXlFZmZlY3QoXCJzb3VuZHMvY2xpY2tcIik7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uLnBsYXkoXCJidXR0b25Eb3duXCIpO1xuXG4gICAgICAgIGxldCBkOiBjYy5BY3Rpb25JbnRlcnZhbCA9IGNjLmRlbGF5VGltZSh0aGlzLmNsaXBzWzJdLmR1cmF0aW9uKTtcbiAgICAgICAgbGV0IGZ1bmM6IGNjLkFjdGlvbkluc3RhbnQgPSBjYy5jYWxsRnVuYyhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmlzQnV0dG9uRG93biA9IGZhbHNlO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgbGV0IHNlcTogY2MuQWN0aW9uSW50ZXJ2YWwgPSBjYy5zZXF1ZW5jZShkLCBmdW5jKTtcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihzZXEpO1xuICAgIH1cblxuXG5cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=