"use strict";
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