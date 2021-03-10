
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/frameAnimation.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2NvbW1vbi9mcmFtZUFuaW1hdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUE0QyxrQ0FBWTtJQUF4RDtRQUFBLHFFQStLQztRQXpLVyxlQUFTLEdBQVcsR0FBRyxDQUFDO1FBTXhCLGtCQUFZLEdBQXFCLEVBQUUsQ0FBQztRQU1wQyxVQUFJLEdBQW1CLElBQUksQ0FBQztRQUc1QixnQkFBVSxHQUFZLEtBQUssQ0FBQztRQUU1QixZQUFNLEdBQWMsSUFBSSxDQUFDO1FBQ3pCLFlBQU0sR0FBWSxLQUFLLENBQUM7UUFDaEM7O1dBRUc7UUFDSyxlQUFTLEdBQVcsQ0FBQyxDQUFDO1FBQzlCOztXQUVHO1FBQ0ssYUFBTyxHQUFHLENBQUMsQ0FBQztRQUNaLGNBQVEsR0FBYSxJQUFJLENBQUM7UUFDbEM7O1dBRUc7UUFDSyxZQUFNLEdBQVksS0FBSyxDQUFDO1FBQ2hDOztXQUVHO1FBQ0ssb0JBQWMsR0FBWSxLQUFLLENBQUM7UUFDeEM7O1dBRUc7UUFDSyx1QkFBaUIsR0FBWSxJQUFJLENBQUM7O0lBa0k5QyxDQUFDO0lBaElHLCtCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQsOEJBQUssR0FBTDtRQUNJLElBQUksSUFBSSxDQUFDLFVBQVU7WUFDZixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCw2QkFBSSxHQUFKLFVBQUssTUFBZSxFQUFFLGlCQUFpQyxFQUFFLGNBQStCLEVBQUUsUUFBeUI7UUFBN0Ysa0NB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QStLbEM7SUFBRCxxQkFBQztDQS9LRCxBQStLQyxDQS9LMkMsRUFBRSxDQUFDLFNBQVMsR0ErS3ZEO2tCQS9Lb0IsY0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGcmFtZUFuaW1hdGlvbiBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICBkaXNwbGF5TmFtZTogXCLmkq3mlL7pgJ/luqZcIixcbiAgICAgICAgdG9vbHRpcDogXCLlpJrlsJHnp5Lmkq3mlL7kuIDluKdcIlxuICAgIH0pXG4gICAgcHJpdmF0ZSBwbGF5U3BlZWQ6IG51bWJlciA9IDAuMTtcblxuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IFtjYy5TcHJpdGVGcmFtZV0sXG4gICAgICAgIHRvb2x0aXA6IFwi5bin5Zu+54mHXCJcbiAgICB9KVxuICAgIHByaXZhdGUgc3ByaXRlRnJhbWVzOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XG5cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSxcbiAgICAgICAgdG9vbHRpcDogXCLliqjnlLvmkq3mlL7lrozlkI7nmoTnpoHmraLnirbmgIHnmoTlm77niYfvvIzlpoLmnpzmsqHmnInlsLHkvJrmmL7npLrnrKzkuIDluKdcIlxuICAgIH0pXG4gICAgcHJpdmF0ZSBpZGxlOiBjYy5TcHJpdGVGcmFtZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoe30pXG4gICAgcHJpdmF0ZSBwbGF5T25Mb2FkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIHNwcml0ZTogY2MuU3ByaXRlID0gbnVsbDtcbiAgICBwcml2YXRlIGlzUGxheTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIOW4p+WKqOeUu+aOpeS4i+adpeaSreaUvuWTquS4gOW4p1xuICAgICAqL1xuICAgIHByaXZhdGUgbmV4dEluZGV4OiBudW1iZXIgPSAwO1xuICAgIC8qKlxuICAgICAqIOW9k+WJjeaSreaUvuaXtumXtFxuICAgICAqL1xuICAgIHByaXZhdGUgdGltZVN1bSA9IDA7XG4gICAgcHJpdmF0ZSBiYWNrRnVuYzogRnVuY3Rpb24gPSBudWxsO1xuICAgIC8qKlxuICAgICAqIOaYr+WQpuW+queOr+aSreaUvlxuICAgICAqL1xuICAgIHByaXZhdGUgaXNMb29wOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICog5piv5ZCm5YCS5bqP5pKt5pS+XG4gICAgICovXG4gICAgcHJpdmF0ZSBpc0ludmVydGVkUGxheTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIOWKqOeUu+aSreaUvue7k+adn+WQjuaYr+WQpuaBouWkjeS4uuesrOS4gOW4p1xuICAgICAqL1xuICAgIHByaXZhdGUgaXNGaXJzdEZyYW1lSW5FbmQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICB0aGlzLnNwcml0ZSA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgaWYgKHRoaXMucGxheU9uTG9hZClcbiAgICAgICAgICAgIHRoaXMucGxheSh0cnVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmkq3mlL7luKfliqjnlLtcbiAgICAgKiBAcGFyYW0gaXNMb29wIOaYr+WQpuW+queOr+aSreaUvlxuICAgICAqIEBwYXJhbSBpc0ZpcnN0RnJhbWVJbkVuZCDliqjnlLvmkq3mlL7nu5PmnZ/lkI7mmK/lkKbmgaLlpI3kuLrnrKzkuIDluKdcbiAgICAgKiBAcGFyYW0gaXNJbnZlcnRlZFBsYXkg5piv5ZCm5YCS5bqP5pKt5pS+5LiA5qyhXG4gICAgICogQHBhcmFtIGJhY2tGdW5jIOWKqOeUu+aSreaUvuWujOWQjuWwhuaJp+ihjOivpeWHveaVsFxuICAgICAqL1xuICAgIHBsYXkoaXNMb29wOiBib29sZWFuLCBpc0ZpcnN0RnJhbWVJbkVuZDogYm9vbGVhbiA9IHRydWUsIGlzSW52ZXJ0ZWRQbGF5OiBib29sZWFuID0gZmFsc2UsIGJhY2tGdW5jOiBGdW5jdGlvbiA9IG51bGwpIHtcbiAgICAgICAgdGhpcy5pc0xvb3AgPSBpc0xvb3A7XG4gICAgICAgIHRoaXMuYmFja0Z1bmMgPSBiYWNrRnVuYztcbiAgICAgICAgdGhpcy5pc0ZpcnN0RnJhbWVJbkVuZCA9IGlzRmlyc3RGcmFtZUluRW5kO1xuICAgICAgICB0aGlzLm5leHRJbmRleCA9IDA7XG4gICAgICAgIHRoaXMudGltZVN1bSA9IDA7XG4gICAgICAgIHRoaXMuaXNJbnZlcnRlZFBsYXkgPSBpc0ludmVydGVkUGxheTtcblxuICAgICAgICBpZiAodGhpcy5pc0ludmVydGVkUGxheSkge1xuICAgICAgICAgICAgdGhpcy5zcHJpdGVGcmFtZXMucmV2ZXJzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTcHJpdGVGcmFtZSh0aGlzLnNwcml0ZUZyYW1lc1t0aGlzLm5leHRJbmRleCsrXSk7XG4gICAgICAgIHRoaXMuaXNQbGF5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlgZzmraLmkq3mlL4s5oGi5aSN5oiQ562J5b6F5Zu+54mH77yM5rKh5pyJ5bCx5oGi5aSN5oiQ56ys5LiA5binXG4gICAgICovXG4gICAgc3RvcCgpIHtcbiAgICAgICAgdGhpcy5pc1BsYXkgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMuaWRsZSA9PT0gbnVsbClcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5zcHJpdGVGcmFtZXNbMF07XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5pZGxlO1xuICAgIH1cblxuICAgIHBhdXNlKCkge1xuICAgICAgICB0aGlzLmlzUGxheSA9IGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnRpbnVlKCkge1xuICAgICAgICB0aGlzLmlzUGxheSA9IHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6K6+572uIOWKqOeUu+aSreWujOWQjiDmmL7npLrnmoTlm77niYdcbiAgICAgKiBAcGFyYW0gZiBcbiAgICAgKi9cbiAgICBzZXRJZGxlKGY6IGNjLlNwcml0ZUZyYW1lKSB7XG4gICAgICAgIHRoaXMuaWRsZSA9IGY7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyBzcHJpdGUgZnJhbWVcbiAgICAgKiBAcGFyYW0gc3ByaXRlRnJhbWUg5Zu+54mHXG4gICAgICovXG4gICAgc2V0U3ByaXRlRnJhbWUoc3ByaXRlRnJhbWU6IGNjLlNwcml0ZUZyYW1lKSB7XG4gICAgICAgIHRoaXMuc3ByaXRlLnNwcml0ZUZyYW1lID0gc3ByaXRlRnJhbWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6K6+572u5bin5pWw57uEXG4gICAgICogQHBhcmFtIGZyYW1lQXJyYXkg5bin5pWw57uEXG4gICAgICovXG4gICAgc2V0RnJhbWVBcnJheShmcmFtZUFycmF5OiBjYy5TcHJpdGVGcmFtZVtdKSB7XG4gICAgICAgIHRoaXMuc3ByaXRlRnJhbWVzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZnJhbWVBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5zcHJpdGVGcmFtZXMucHVzaChmcmFtZUFycmF5W2ldKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgc3ByaXRlIGZyYW1lXG4gICAgICogQHJldHVybnMgc3ByaXRlIGZyYW1lIOWbvueJh1xuICAgICAqL1xuICAgIGdldFNwcml0ZUZyYW1lKCk6IGNjLlNwcml0ZUZyYW1lIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3ByaXRlLnNwcml0ZUZyYW1lO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWKqOeUu+eahOaSreaUvuaXtumXtFxuICAgICAqIEByZXR1cm5zIGR1cmF0aW9uIFxuICAgICAqL1xuXG4gICAgZ2V0RHVyYXRpb24oKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGxheVNwZWVkICogdGhpcy5zcHJpdGVGcmFtZXMubGVuZ3RoO1xuICAgIH1cblxuICAgIHVwZGF0ZShkdCkge1xuICAgICAgICBpZiAodGhpcy5pc1BsYXkpIHtcbiAgICAgICAgICAgIHRoaXMudGltZVN1bSArPSBkdDtcbiAgICAgICAgICAgIGlmICh0aGlzLnRpbWVTdW0gPj0gdGhpcy5wbGF5U3BlZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMuc3ByaXRlRnJhbWVzW3RoaXMubmV4dEluZGV4KytdO1xuICAgICAgICAgICAgICAgIHRoaXMudGltZVN1bSA9IDA7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5uZXh0SW5kZXggPj0gdGhpcy5zcHJpdGVGcmFtZXMubGVuZ3RoKSB7IC8v5LiA6L2u5pKt5pS+5a6M5q+VXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzTG9vcCkgLy/opoHlvqrnjq/mkq3mlL5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dEluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzUGxheSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+aSreaUvuWujOWQjueahOWkhOeQhlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaWRsZSkgLy/mnInkuI3mkq3mlL7liqjnlLvml7bnmoTlm77niYdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWRsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuaXNGaXJzdEZyYW1lSW5FbmQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLnNwcml0ZUZyYW1lc1swXTsgLy/lpI3ljp/kuLrnrKzkuIDluKdcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy/ph43nva5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzSW52ZXJ0ZWRQbGF5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVGcmFtZXMucmV2ZXJzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNJbnZlcnRlZFBsYXkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYmFja0Z1bmMgIT09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iYWNrRnVuYygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIl19