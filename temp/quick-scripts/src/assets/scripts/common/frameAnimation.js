"use strict";
cc._RF.push(module, 'fd612rCcO5GqopQOUeviCbD', 'frameAnimation');
// scripts/common/frameAnimation.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FrameAnimation = /** @class */ (function (_super) {
    __extends(FrameAnimation, _super);
    function FrameAnimation() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.playSpeed = 0.1;
        _this.spriteFrames = [];
        _this.idle = null;
        _this.playOnLoad = false;
        _this.sprite = null;
        _this.isPlay = false;
        /**
         * 帧动画接下来播放哪一帧
         */
        _this.nextIndex = 0;
        /**
         * 当前播放时间
         */
        _this.timeSum = 0;
        _this.backFunc = null;
        /**
         * 是否循环播放
         */
        _this.isLoop = false;
        /**
         * 是否倒序播放
         */
        _this.isInvertedPlay = false;
        /**
         * 动画播放结束后是否恢复为第一帧
         */
        _this.isFirstFrameInEnd = true;
        return _this;
    }
    FrameAnimation.prototype.onLoad = function () {
        this.sprite = this.node.getComponent(cc.Sprite);
    };
    FrameAnimation.prototype.start = function () {
        if (this.playOnLoad)
            this.play(true);
    };
    /**
     * 播放帧动画
     * @param isLoop 是否循环播放
     * @param isFirstFrameInEnd 动画播放结束后是否恢复为第一帧
     * @param isInvertedPlay 是否倒序播放一次
     * @param backFunc 动画播放完后将执行该函数
     */
    FrameAnimation.prototype.play = function (isLoop, isFirstFrameInEnd, isInvertedPlay, backFunc) {
        if (isFirstFrameInEnd === void 0) { isFirstFrameInEnd = true; }
        if (isInvertedPlay === void 0) { isInvertedPlay = false; }
        if (backFunc === void 0) { backFunc = null; }
        this.isLoop = isLoop;
        this.backFunc = backFunc;
        this.isFirstFrameInEnd = isFirstFrameInEnd;
        this.nextIndex = 0;
        this.timeSum = 0;
        this.isInvertedPlay = isInvertedPlay;
        if (this.isInvertedPlay) {
            this.spriteFrames.reverse();
        }
        this.setSpriteFrame(this.spriteFrames[this.nextIndex++]);
        this.isPlay = true;
    };
    /**
     * 停止播放,恢复成等待图片，没有就恢复成第一帧
     */
    FrameAnimation.prototype.stop = function () {
        this.isPlay = false;
        if (this.idle === null)
            this.sprite.spriteFrame = this.spriteFrames[0];
        else
            this.sprite.spriteFrame = this.idle;
    };
    FrameAnimation.prototype.pause = function () {
        this.isPlay = false;
    };
    FrameAnimation.prototype.continue = function () {
        this.isPlay = true;
    };
    /**
     * 设置 动画播完后 显示的图片
     * @param f
     */
    FrameAnimation.prototype.setIdle = function (f) {
        this.idle = f;
    };
    /**
     * Sets sprite frame
     * @param spriteFrame 图片
     */
    FrameAnimation.prototype.setSpriteFrame = function (spriteFrame) {
        this.sprite.spriteFrame = spriteFrame;
    };
    /**
     * 设置帧数组
     * @param frameArray 帧数组
     */
    FrameAnimation.prototype.setFrameArray = function (frameArray) {
        this.spriteFrames = [];
        for (var i = 0; i < frameArray.length; i++) {
            this.spriteFrames.push(frameArray[i]);
        }
    };
    /**
     * Gets sprite frame
     * @returns sprite frame 图片
     */
    FrameAnimation.prototype.getSpriteFrame = function () {
        return this.sprite.spriteFrame;
    };
    /**
     * 动画的播放时间
     * @returns duration
     */
    FrameAnimation.prototype.getDuration = function () {
        return this.playSpeed * this.spriteFrames.length;
    };
    FrameAnimation.prototype.update = function (dt) {
        if (this.isPlay) {
            this.timeSum += dt;
            if (this.timeSum >= this.playSpeed) {
                this.sprite.spriteFrame = this.spriteFrames[this.nextIndex++];
                this.timeSum = 0;
                if (this.nextIndex >= this.spriteFrames.length) { //一轮播放完毕
                    if (this.isLoop) //要循环播放
                        this.nextIndex = 0;
                    else {
                        this.isPlay = false;
                        //播放完后的处理
                        if (this.idle) //有不播放动画时的图片
                            this.sprite.spriteFrame = this.idle;
                        else if (this.isFirstFrameInEnd)
                            this.sprite.spriteFrame = this.spriteFrames[0]; //复原为第一帧
                        //重置
                        if (this.isInvertedPlay) {
                            this.spriteFrames.reverse();
                            this.isInvertedPlay = false;
                        }
                        if (this.backFunc !== null)
                            this.backFunc();
                        return;
                    }
                }
            }
        }
    };
    __decorate([
        property({
            displayName: "播放速度",
            tooltip: "多少秒播放一帧"
        })
    ], FrameAnimation.prototype, "playSpeed", void 0);
    __decorate([
        property({
            type: [cc.SpriteFrame],
            tooltip: "帧图片"
        })
    ], FrameAnimation.prototype, "spriteFrames", void 0);
    __decorate([
        property({
            type: cc.SpriteFrame,
            tooltip: "动画播放完后的禁止状态的图片，如果没有就会显示第一帧"
        })
    ], FrameAnimation.prototype, "idle", void 0);
    __decorate([
        property({})
    ], FrameAnimation.prototype, "playOnLoad", void 0);
    FrameAnimation = __decorate([
        ccclass
    ], FrameAnimation);
    return FrameAnimation;
}(cc.Component));
exports.default = FrameAnimation;

cc._RF.pop();