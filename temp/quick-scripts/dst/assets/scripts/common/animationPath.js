
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/animationPath.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '06f6d0vxPFBFYgusIPYpJNx', 'animationPath');
// scripts/common/animationPath.ts

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
exports.BezierPart = void 0;
//animationPath.ts
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
// 贝塞尔曲线段类
var BezierPart = /** @class */ (function () {
    /**
     * 贝塞尔曲线段类
     * @param startP 开始点坐标
     * @param cP1 控制点1
     * @param cP2 控制点2
     * @param endP 结束点
     */
    function BezierPart(startP, cP1, cP2, endP) {
        /**
         * 将贝塞尔曲线分成多个点，不包含开始端点
         */
        this.posArray = [];
        this.lenght = null;
        this.startPos = startP;
        this.cPos1 = cP1;
        this.cPos2 = cP2;
        this.endPos = endP;
        this.lenght = this.getBezierLen();
    }
    /**
     * 每隔len个像素生成一个点,曲线开始的端点不生成点
     * @param len
     */
    BezierPart.prototype.createPosArray = function (len) {
        var fn = Math.floor(this.lenght / len);
        var i = 1 / fn;
        for (var t = i; t <= 1; t += i) {
            var x = this.bezier(this.startPos.x, this.cPos1.x, this.cPos2.x, this.endPos.x, t);
            var y = this.bezier(this.startPos.y, this.cPos1.y, this.cPos2.y, this.endPos.y, t);
            this.posArray.push(cc.v2(x, y));
        }
        if (this.posArray.length < fn) { //补上结束端点
            this.posArray.push(this.endPos);
        }
    };
    /**
     * 获得曲线长度
     * @param f 将一段曲线分为多少份来求长度,默认20
     */
    BezierPart.prototype.getBezierLen = function (f) {
        if (f === void 0) { f = 20; }
        var t = 1 / 20;
        var l = 0;
        var i;
        var cP;
        var lastP = cc.v2(0, 0);
        for (i = 0; i <= 1; i += t) {
            var x = this.bezier(this.startPos.x, this.cPos1.x, this.cPos2.x, this.endPos.x, i);
            var y = this.bezier(this.startPos.y, this.cPos1.y, this.cPos2.y, this.endPos.y, i);
            cP = cc.v2(x, y);
            l += (cP.sub(lastP)).mag();
            lastP = cP;
        }
        return l;
    };
    BezierPart.prototype.bezier = function (v1, v2, v3, v4, t) {
        return v1 * Math.pow(1 - t, 3) + 3 * v2 * t * Math.pow(1 - t, 2) + 3 * v3 * t * t * (1 - t) + v4 * Math.pow(t, 3);
    };
    return BezierPart;
}());
exports.BezierPart = BezierPart;
var AnimationPath = /** @class */ (function (_super) {
    __extends(AnimationPath, _super);
    function AnimationPath() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.animation = null;
        _this.griphics = null;
        return _this;
    }
    AnimationPath.prototype.onLoad = function () {
        this.animation = this.node.getComponent(cc.Animation);
    };
    AnimationPath.prototype.start = function () {
        // this.drawPath(this.getNodePath("road1"));
        // this.drawPath(this.getNodePath("road2"));
        // this.drawPath(this.getNodePath("road3"));
    };
    /**
     * Gets world path
     * @param pathName
     * @returns world path
     */
    AnimationPath.prototype.getWorldPath = function (pathName) {
        var path = this.getNodePath(pathName);
        for (var i = 0; i < path.length; i++)
            path[i] = this.node.convertToWorldSpaceAR(path[i]);
        return path;
    };
    /**
     * @param pathName
     * @returns 节点坐标
     */
    AnimationPath.prototype.getNodePath = function (pathName) {
        var clips = this.animation.getClips();
        var clip = clips[0];
        var paths = clip.curveData.paths; //动画路径数组
        var frameArray = paths[pathName].props.position; //关键帧数组即为一条路径            
        var bezierPartArray = this.getBezierPartArray(frameArray);
        var path = this._getPath(bezierPartArray);
        return path;
    };
    /**
     * 得到点路径
     * @param bezierPartArray 曲线数组
     * @returns path 不含路径起点坐标
     */
    AnimationPath.prototype._getPath = function (bezierPartArray) {
        var pArray = [];
        var bezier;
        for (var i = 0; i < bezierPartArray.length; i++) {
            bezier = bezierPartArray[i];
            bezier.createPosArray(16);
            pArray = pArray.concat(bezier.posArray);
        }
        return pArray;
    };
    /**
     * 由关键帧数组 得到 曲线段数组
     * @param frameArray 关键帧数组
     */
    AnimationPath.prototype.getBezierPartArray = function (frameArray) {
        var bezierPartArray = [];
        //两个关键帧组成一条路径
        for (var j = 0; j < frameArray.length - 1; j++) {
            var arr = this.createBezierPartArray(frameArray[j], frameArray[j + 1]);
            bezierPartArray = bezierPartArray.concat(arr);
        }
        return bezierPartArray;
    };
    /**
     * 由两个关键帧 生成 它们构成的贝塞尔曲线段数组
     * @param startKeyFrame 开始关键帧
     * @param endKeyFrame 结束关键帧
     */
    AnimationPath.prototype.createBezierPartArray = function (startKeyFrame, endKeyFrame) {
        var bezierPartArray = [];
        var startP, cP1, cP2, endP;
        var motionPath = startKeyFrame.motionPath; //移动路径数组即主控制点数组
        var moPathSP, moPathEP; //一段曲线上的首尾端主控制点
        //第一段
        startP = cc.v2(startKeyFrame.value[0], startKeyFrame.value[1]);
        moPathEP = motionPath[0];
        cP1 = cP2 = cc.v2(moPathEP[2], moPathEP[3]);
        endP = cc.v2(moPathEP[0], moPathEP[1]);
        bezierPartArray.push(new BezierPart(startP, cP1, cP2, endP));
        for (var i = 0; i < motionPath.length - 1; i++) { //0 - len - 1, len - 3 len - 2 len -1
            moPathSP = motionPath[i];
            moPathEP = motionPath[i + 1];
            startP = cc.v2(moPathSP[0], moPathSP[1]);
            cP1 = cc.v2(moPathSP[4], moPathSP[5]);
            cP2 = cc.v2(moPathEP[2], moPathEP[3]);
            endP = cc.v2(moPathEP[0], moPathEP[1]);
            bezierPartArray.push(new BezierPart(startP, cP1, cP2, endP));
        }
        //最后一段
        moPathSP = motionPath[motionPath.length - 1];
        startP = cc.v2(moPathSP[0], moPathSP[1]);
        cP1 = cP2 = cc.v2(moPathSP[4], moPathSP[5]);
        endP = cc.v2(endKeyFrame.value[0], endKeyFrame.value[1]);
        bezierPartArray.push(new BezierPart(startP, cP1, cP2, endP));
        return bezierPartArray;
    };
    AnimationPath.prototype.drawPath = function (pointArray) {
        this.griphics.moveTo(pointArray[0].x, pointArray[0].y);
        for (var i = 1; i < pointArray.length; i++)
            this.griphics.lineTo(pointArray[i].x, pointArray[i].y);
        this.griphics.stroke();
    };
    /**
     * 画出曲线的控制点
     * @param bezierPartArray 曲线数组
     */
    AnimationPath.prototype.drawContrlPoint = function (bezierPartArray) {
        for (var i = 0; i < bezierPartArray.length; i++) {
            this.drawPoint(bezierPartArray[i].startPos);
            this.drawPoint(bezierPartArray[i].cPos1, cc.Color.BLUE);
            this.drawPoint(bezierPartArray[i].cPos2, cc.Color.BLUE);
            this.drawPoint(bezierPartArray[i].endPos);
        }
    };
    /**
     * Draws point
     * @param point 点坐标
     * @param color 默认颜色为红色
     */
    AnimationPath.prototype.drawPoint = function (point, color) {
        if (color === void 0) { color = null; }
        if (color === null)
            this.griphics.strokeColor = cc.Color.RED;
        else
            this.griphics.strokeColor = color;
        if (point.length) {
            for (var i = 0; i < point.length; i++) {
                this.griphics.circle(point[i].x, point[i].y, 2);
                this.griphics.stroke();
            }
        }
        else {
            this.griphics.circle(point.x, point.y, 2);
            this.griphics.stroke();
        }
    };
    AnimationPath = __decorate([
        ccclass
    ], AnimationPath);
    return AnimationPath;
}(cc.Component));
exports.default = AnimationPath;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2NvbW1vbi9hbmltYXRpb25QYXRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrQkFBa0I7QUFDWixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUU1QyxVQUFVO0FBQ1Y7SUFXSTs7Ozs7O09BTUc7SUFDSCxvQkFBWSxNQUFlLEVBQUUsR0FBWSxFQUFFLEdBQVksRUFBRSxJQUFhO1FBYnRFOztXQUVHO1FBQ0gsYUFBUSxHQUFjLEVBQUUsQ0FBQztRQUN6QixXQUFNLEdBQVcsSUFBSSxDQUFDO1FBVWxCLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBRW5CLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFRDs7O09BR0c7SUFDSCxtQ0FBYyxHQUFkLFVBQWUsR0FBVztRQUN0QixJQUFJLEVBQUUsR0FBVyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLEdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN2QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDNUIsSUFBSSxDQUFDLEdBQVcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxD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RXpDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUV0QyxJQUFnQixLQUFNLENBQUMsTUFBTSxFQUFFO1lBQzNCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBZSxLQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNoRCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDMUI7U0FDSjthQUNJO1lBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQVcsS0FBTSxDQUFDLENBQUMsRUFBWSxLQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2hFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDMUI7SUFFTCxDQUFDO0lBNUpnQixhQUFhO1FBRGpDLE9BQU87T0FDYSxhQUFhLENBNkpqQztJQUFELG9CQUFDO0NBN0pELEFBNkpDLENBN0owQyxFQUFFLENBQUMsU0FBUyxHQTZKdEQ7a0JBN0pvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy9hbmltYXRpb25QYXRoLnRzXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG4vLyDotJ3loZ7lsJTmm7Lnur/mrrXnsbtcbmV4cG9ydCBjbGFzcyBCZXppZXJQYXJ0IHtcbiAgICBzdGFydFBvczogY2MuVmVjMjtcbiAgICBjUG9zMTogY2MuVmVjMjtcbiAgICBjUG9zMjogY2MuVmVjMjtcbiAgICBlbmRQb3M6IGNjLlZlYzI7XG4gICAgLyoqXG4gICAgICog5bCG6LSd5aGe5bCU5puy57q/5YiG5oiQ5aSa5Liq54K577yM5LiN5YyF5ZCr5byA5aeL56uv54K5XG4gICAgICovXG4gICAgcG9zQXJyYXk6IGNjLlZlYzJbXSA9IFtdO1xuICAgIGxlbmdodDogbnVtYmVyID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIOi0neWhnuWwlOabsue6v+auteexu1xuICAgICAqIEBwYXJhbSBzdGFydFAg5byA5aeL54K55Z2Q5qCHIFxuICAgICAqIEBwYXJhbSBjUDEg5o6n5Yi254K5MVxuICAgICAqIEBwYXJhbSBjUDIg5o6n5Yi254K5MlxuICAgICAqIEBwYXJhbSBlbmRQIOe7k+adn+eCuVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHN0YXJ0UDogY2MuVmVjMiwgY1AxOiBjYy5WZWMyLCBjUDI6IGNjLlZlYzIsIGVuZFA6IGNjLlZlYzIpIHtcbiAgICAgICAgdGhpcy5zdGFydFBvcyA9IHN0YXJ0UDtcbiAgICAgICAgdGhpcy5jUG9zMSA9IGNQMTtcbiAgICAgICAgdGhpcy5jUG9zMiA9IGNQMjtcbiAgICAgICAgdGhpcy5lbmRQb3MgPSBlbmRQO1xuXG4gICAgICAgIHRoaXMubGVuZ2h0ID0gdGhpcy5nZXRCZXppZXJMZW4oKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmr4/pmpRsZW7kuKrlg4/ntKDnlJ/miJDkuIDkuKrngrks5puy57q/5byA5aeL55qE56uv54K55LiN55Sf5oiQ54K5XG4gICAgICogQHBhcmFtIGxlbiBcbiAgICAgKi9cbiAgICBjcmVhdGVQb3NBcnJheShsZW46IG51bWJlcikge1xuICAgICAgICBsZXQgZm46IG51bWJlciA9IE1hdGguZmxvb3IodGhpcy5sZW5naHQgLyBsZW4pO1xuICAgICAgICBsZXQgaTogbnVtYmVyID0gMSAvIGZuO1xuICAgICAgICBmb3IgKGxldCB0ID0gaTsgdCA8PSAxOyB0ICs9IGkpIHtcbiAgICAgICAgICAgIGxldCB4OiBudW1iZXIgPSB0aGlzLmJlemllcih0aGlzLnN0YXJ0UG9zLngsIHRoaXMuY1BvczEueCwgdGhpcy5jUG9zMi54LCB0aGlzLmVuZFBvcy54LCB0KTtcbiAgICAgICAgICAgIGxldCB5OiBudW1iZXIgPSB0aGlzLmJlemllcih0aGlzLnN0YXJ0UG9zLnksIHRoaXMuY1BvczEueSwgdGhpcy5jUG9zMi55LCB0aGlzLmVuZFBvcy55LCB0KTtcbiAgICAgICAgICAgIHRoaXMucG9zQXJyYXkucHVzaChjYy52Mih4LCB5KSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucG9zQXJyYXkubGVuZ3RoIDwgZm4pIHsgLy/ooaXkuIrnu5PmnZ/nq6/ngrlcbiAgICAgICAgICAgIHRoaXMucG9zQXJyYXkucHVzaCh0aGlzLmVuZFBvcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflvpfmm7Lnur/plb/luqZcbiAgICAgKiBAcGFyYW0gZiDlsIbkuIDmrrXmm7Lnur/liIbkuLrlpJrlsJHku73mnaXmsYLplb/luqYs6buY6K6kMjBcbiAgICAgKi9cbiAgICBwcml2YXRlIGdldEJlemllckxlbihmOiBudW1iZXIgPSAyMCk6IG51bWJlciB7XG4gICAgICAgIGxldCB0OiBudW1iZXIgPSAxIC8gMjA7XG4gICAgICAgIGxldCBsOiBudW1iZXIgPSAwO1xuICAgICAgICBsZXQgaTogbnVtYmVyO1xuICAgICAgICBsZXQgY1A6IGNjLlZlYzI7XG4gICAgICAgIGxldCBsYXN0UDogY2MuVmVjMiA9IGNjLnYyKDAsIDApO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDw9IDE7IGkgKz0gdCkge1xuICAgICAgICAgICAgbGV0IHg6IG51bWJlciA9IHRoaXMuYmV6aWVyKHRoaXMuc3RhcnRQb3MueCwgdGhpcy5jUG9zMS54LCB0aGlzLmNQb3MyLngsIHRoaXMuZW5kUG9zLngsIGkpO1xuICAgICAgICAgICAgbGV0IHk6IG51bWJlciA9IHRoaXMuYmV6aWVyKHRoaXMuc3RhcnRQb3MueSwgdGhpcy5jUG9zMS55LCB0aGlzLmNQb3MyLnksIHRoaXMuZW5kUG9zLnksIGkpO1xuICAgICAgICAgICAgY1AgPSBjYy52Mih4LCB5KTtcbiAgICAgICAgICAgIGwgKz0gKGNQLnN1YihsYXN0UCkpLm1hZygpO1xuICAgICAgICAgICAgbGFzdFAgPSBjUDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGJlemllcih2MTogbnVtYmVyLCB2MjogbnVtYmVyLCB2MzogbnVtYmVyLCB2NDogbnVtYmVyLCB0OiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdjEgKiBNYXRoLnBvdygxIC0gdCwgMykgKyAzICogdjIgKiB0ICogTWF0aC5wb3coMSAtIHQsIDIpICsgMyAqIHYzICogdCAqIHQgKiAoMSAtIHQpICsgdjQgKiBNYXRoLnBvdyh0LCAzKTtcbiAgICB9XG59XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBbmltYXRpb25QYXRoIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuXG4gICAgcHJpdmF0ZSBhbmltYXRpb246IGNjLkFuaW1hdGlvbiA9IG51bGw7XG4gICAgcHJpdmF0ZSBncmlwaGljczogY2MuR3JhcGhpY3MgPSBudWxsO1xuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIC8vIHRoaXMuZHJhd1BhdGgodGhpcy5nZXROb2RlUGF0aChcInJvYWQxXCIpKTtcbiAgICAgICAgLy8gdGhpcy5kcmF3UGF0aCh0aGlzLmdldE5vZGVQYXRoKFwicm9hZDJcIikpO1xuICAgICAgICAvLyB0aGlzLmRyYXdQYXRoKHRoaXMuZ2V0Tm9kZVBhdGgoXCJyb2FkM1wiKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB3b3JsZCBwYXRoXG4gICAgICogQHBhcmFtIHBhdGhOYW1lIFxuICAgICAqIEByZXR1cm5zIHdvcmxkIHBhdGggXG4gICAgICovXG4gICAgZ2V0V29ybGRQYXRoKHBhdGhOYW1lOiBzdHJpbmcpOiBjYy5WZWMyW10ge1xuICAgICAgICBsZXQgcGF0aCA9IHRoaXMuZ2V0Tm9kZVBhdGgocGF0aE5hbWUpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhdGgubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICBwYXRoW2ldID0gdGhpcy5ub2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihwYXRoW2ldKTtcbiAgICAgICAgcmV0dXJuIHBhdGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHBhdGhOYW1lIFxuICAgICAqIEByZXR1cm5zIOiKgueCueWdkOagh1xuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0Tm9kZVBhdGgocGF0aE5hbWU6IHN0cmluZyk6IGNjLlZlYzJbXSB7XG4gICAgICAgIGxldCBjbGlwczogY2MuQW5pbWF0aW9uQ2xpcFtdID0gdGhpcy5hbmltYXRpb24uZ2V0Q2xpcHMoKTtcbiAgICAgICAgbGV0IGNsaXA6IGNjLkFuaW1hdGlvbkNsaXAgPSBjbGlwc1swXTtcbiAgICAgICAgbGV0IHBhdGhzID0gY2xpcC5jdXJ2ZURhdGEucGF0aHM7IC8v5Yqo55S76Lev5b6E5pWw57uEXG4gICAgICAgIGxldCBmcmFtZUFycmF5ID0gcGF0aHNbcGF0aE5hbWVdLnByb3BzLnBvc2l0aW9uOyAvL+WFs+mUruW4p+aVsOe7hOWNs+S4uuS4gOadoei3r+W+hCAgICAgICAgICAgIFxuICAgICAgICBsZXQgYmV6aWVyUGFydEFycmF5OiBCZXppZXJQYXJ0W10gPSB0aGlzLmdldEJlemllclBhcnRBcnJheShmcmFtZUFycmF5KTtcbiAgICAgICAgbGV0IHBhdGg6IGNjLlZlYzJbXSA9IHRoaXMuX2dldFBhdGgoYmV6aWVyUGFydEFycmF5KTtcblxuICAgICAgICByZXR1cm4gcGF0aDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlvpfliLDngrnot6/lvoRcbiAgICAgKiBAcGFyYW0gYmV6aWVyUGFydEFycmF5IOabsue6v+aVsOe7hCBcbiAgICAgKiBAcmV0dXJucyBwYXRoIOS4jeWQq+i3r+W+hOi1t+eCueWdkOagh1xuICAgICAqL1xuICAgIHByaXZhdGUgX2dldFBhdGgoYmV6aWVyUGFydEFycmF5OiBCZXppZXJQYXJ0W10pOiBjYy5WZWMyW10ge1xuICAgICAgICBsZXQgcEFycmF5OiBjYy5WZWMyW10gPSBbXTtcbiAgICAgICAgbGV0IGJlemllcjogQmV6aWVyUGFydDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiZXppZXJQYXJ0QXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGJlemllciA9IGJlemllclBhcnRBcnJheVtpXTtcbiAgICAgICAgICAgIGJlemllci5jcmVhdGVQb3NBcnJheSgxNik7XG4gICAgICAgICAgICBwQXJyYXkgPSBwQXJyYXkuY29uY2F0KGJlemllci5wb3NBcnJheSk7XG5cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcEFycmF5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOeUseWFs+mUruW4p+aVsOe7hCDlvpfliLAg5puy57q/5q615pWw57uEXG4gICAgICogQHBhcmFtIGZyYW1lQXJyYXkg5YWz6ZSu5bin5pWw57uEXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRCZXppZXJQYXJ0QXJyYXkoZnJhbWVBcnJheSk6IEJlemllclBhcnRbXSB7XG4gICAgICAgIGxldCBiZXppZXJQYXJ0QXJyYXk6IEJlemllclBhcnRbXSA9IFtdO1xuXG4gICAgICAgIC8v5Lik5Liq5YWz6ZSu5bin57uE5oiQ5LiA5p2h6Lev5b6EXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZnJhbWVBcnJheS5sZW5ndGggLSAxOyBqKyspIHtcbiAgICAgICAgICAgIGxldCBhcnI6IEJlemllclBhcnRbXSA9IHRoaXMuY3JlYXRlQmV6aWVyUGFydEFycmF5KGZyYW1lQXJyYXlbal0sIGZyYW1lQXJyYXlbaiArIDFdKTtcbiAgICAgICAgICAgIGJlemllclBhcnRBcnJheSA9IGJlemllclBhcnRBcnJheS5jb25jYXQoYXJyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBiZXppZXJQYXJ0QXJyYXk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog55Sx5Lik5Liq5YWz6ZSu5binIOeUn+aIkCDlroPku6zmnoTmiJDnmoTotJ3loZ7lsJTmm7Lnur/mrrXmlbDnu4RcbiAgICAgKiBAcGFyYW0gc3RhcnRLZXlGcmFtZSDlvIDlp4vlhbPplK7luKdcbiAgICAgKiBAcGFyYW0gZW5kS2V5RnJhbWUg57uT5p2f5YWz6ZSu5binXG4gICAgICovXG4gICAgcHJpdmF0ZSBjcmVhdGVCZXppZXJQYXJ0QXJyYXkoc3RhcnRLZXlGcmFtZSwgZW5kS2V5RnJhbWUpOiBCZXppZXJQYXJ0W10ge1xuICAgICAgICBsZXQgYmV6aWVyUGFydEFycmF5OiBCZXppZXJQYXJ0W10gPSBbXTtcbiAgICAgICAgbGV0IHN0YXJ0UDogY2MuVmVjMiwgY1AxOiBjYy5WZWMyLCBjUDI6IGNjLlZlYzIsIGVuZFA6IGNjLlZlYzI7XG4gICAgICAgIGxldCBtb3Rpb25QYXRoID0gc3RhcnRLZXlGcmFtZS5tb3Rpb25QYXRoOyAvL+enu+WKqOi3r+W+hOaVsOe7hOWNs+S4u+aOp+WItueCueaVsOe7hFxuICAgICAgICBsZXQgbW9QYXRoU1AsIG1vUGF0aEVQOyAvL+S4gOauteabsue6v+S4iueahOmmluWwvuerr+S4u+aOp+WItueCuVxuXG4gICAgICAgIC8v56ys5LiA5q61XG4gICAgICAgIHN0YXJ0UCA9IGNjLnYyKHN0YXJ0S2V5RnJhbWUudmFsdWVbMF0sIHN0YXJ0S2V5RnJhbWUudmFsdWVbMV0pO1xuICAgICAgICBtb1BhdGhFUCA9IG1vdGlvblBhdGhbMF07XG4gICAgICAgIGNQMSA9IGNQMiA9IGNjLnYyKG1vUGF0aEVQWzJdLCBtb1BhdGhFUFszXSk7XG4gICAgICAgIGVuZFAgPSBjYy52Mihtb1BhdGhFUFswXSwgbW9QYXRoRVBbMV0pO1xuICAgICAgICBiZXppZXJQYXJ0QXJyYXkucHVzaChuZXcgQmV6aWVyUGFydChzdGFydFAsIGNQMSwgY1AyLCBlbmRQKSk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb3Rpb25QYXRoLmxlbmd0aCAtIDE7IGkrKykgeyAvLzAgLSBsZW4gLSAxLCBsZW4gLSAzIGxlbiAtIDIgbGVuIC0xXG4gICAgICAgICAgICBtb1BhdGhTUCA9IG1vdGlvblBhdGhbaV07XG4gICAgICAgICAgICBtb1BhdGhFUCA9IG1vdGlvblBhdGhbaSArIDFdXG4gICAgICAgICAgICBzdGFydFAgPSBjYy52Mihtb1BhdGhTUFswXSwgbW9QYXRoU1BbMV0pO1xuICAgICAgICAgICAgY1AxID0gY2MudjIobW9QYXRoU1BbNF0sIG1vUGF0aFNQWzVdKTtcbiAgICAgICAgICAgIGNQMiA9IGNjLnYyKG1vUGF0aEVQWzJdLCBtb1BhdGhFUFszXSk7XG4gICAgICAgICAgICBlbmRQID0gY2MudjIobW9QYXRoRVBbMF0sIG1vUGF0aEVQWzFdKTtcbiAgICAgICAgICAgIGJlemllclBhcnRBcnJheS5wdXNoKG5ldyBCZXppZXJQYXJ0KHN0YXJ0UCwgY1AxLCBjUDIsIGVuZFApKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8v5pyA5ZCO5LiA5q61XG4gICAgICAgIG1vUGF0aFNQID0gbW90aW9uUGF0aFttb3Rpb25QYXRoLmxlbmd0aCAtIDFdO1xuICAgICAgICBzdGFydFAgPSBjYy52Mihtb1BhdGhTUFswXSwgbW9QYXRoU1BbMV0pO1xuICAgICAgICBjUDEgPSBjUDIgPSBjYy52Mihtb1BhdGhTUFs0XSwgbW9QYXRoU1BbNV0pO1xuICAgICAgICBlbmRQID0gY2MudjIoZW5kS2V5RnJhbWUudmFsdWVbMF0sIGVuZEtleUZyYW1lLnZhbHVlWzFdKTtcbiAgICAgICAgYmV6aWVyUGFydEFycmF5LnB1c2gobmV3IEJlemllclBhcnQoc3RhcnRQLCBjUDEsIGNQMiwgZW5kUCkpO1xuXG4gICAgICAgIHJldHVybiBiZXppZXJQYXJ0QXJyYXk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkcmF3UGF0aChwb2ludEFycmF5OiBjYy5WZWMyW10pIHtcbiAgICAgICAgdGhpcy5ncmlwaGljcy5tb3ZlVG8ocG9pbnRBcnJheVswXS54LCBwb2ludEFycmF5WzBdLnkpO1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHBvaW50QXJyYXkubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICB0aGlzLmdyaXBoaWNzLmxpbmVUbyhwb2ludEFycmF5W2ldLngsIHBvaW50QXJyYXlbaV0ueSk7XG5cbiAgICAgICAgdGhpcy5ncmlwaGljcy5zdHJva2UoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDnlLvlh7rmm7Lnur/nmoTmjqfliLbngrlcbiAgICAgKiBAcGFyYW0gYmV6aWVyUGFydEFycmF5IOabsue6v+aVsOe7hFxuICAgICAqL1xuICAgIHByaXZhdGUgZHJhd0NvbnRybFBvaW50KGJlemllclBhcnRBcnJheTogQmV6aWVyUGFydFtdKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmV6aWVyUGFydEFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdQb2ludChiZXppZXJQYXJ0QXJyYXlbaV0uc3RhcnRQb3MpO1xuICAgICAgICAgICAgdGhpcy5kcmF3UG9pbnQoYmV6aWVyUGFydEFycmF5W2ldLmNQb3MxLCBjYy5Db2xvci5CTFVFKTtcbiAgICAgICAgICAgIHRoaXMuZHJhd1BvaW50KGJlemllclBhcnRBcnJheVtpXS5jUG9zMiwgY2MuQ29sb3IuQkxVRSk7XG4gICAgICAgICAgICB0aGlzLmRyYXdQb2ludChiZXppZXJQYXJ0QXJyYXlbaV0uZW5kUG9zKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyYXdzIHBvaW50XG4gICAgICogQHBhcmFtIHBvaW50IOeCueWdkOaghyBcbiAgICAgKiBAcGFyYW0gY29sb3Ig6buY6K6k6aKc6Imy5Li657qi6ImyXG4gICAgICovXG4gICAgcHJpdmF0ZSBkcmF3UG9pbnQocG9pbnQ6IGNjLlZlYzIgfCBjYy5WZWMyW10sIGNvbG9yOiBjYy5Db2xvciA9IG51bGwpIHtcbiAgICAgICAgaWYgKGNvbG9yID09PSBudWxsKVxuICAgICAgICAgICAgdGhpcy5ncmlwaGljcy5zdHJva2VDb2xvciA9IGNjLkNvbG9yLlJFRDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5ncmlwaGljcy5zdHJva2VDb2xvciA9IGNvbG9yO1xuXG4gICAgICAgIGlmICgoPGNjLlZlYzJbXT5wb2ludCkubGVuZ3RoKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8ICg8Y2MuVmVjMltdPnBvaW50KS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuZ3JpcGhpY3MuY2lyY2xlKHBvaW50W2ldLngsIHBvaW50W2ldLnksIDIpO1xuICAgICAgICAgICAgICAgIHRoaXMuZ3JpcGhpY3Muc3Ryb2tlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmdyaXBoaWNzLmNpcmNsZSgoPGNjLlZlYzI+cG9pbnQpLngsICg8Y2MuVmVjMj5wb2ludCkueSwgMik7XG4gICAgICAgICAgICB0aGlzLmdyaXBoaWNzLnN0cm9rZSgpO1xuICAgICAgICB9XG5cbiAgICB9XG59XG4iXX0=