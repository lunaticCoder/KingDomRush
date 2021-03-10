"use strict";
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