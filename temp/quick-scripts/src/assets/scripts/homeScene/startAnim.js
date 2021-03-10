"use strict";
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