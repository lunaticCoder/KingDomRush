"use strict";
cc._RF.push(module, '2e66asI3tZL6KhScP56kA4Y', 'arrowBullet');
// scripts/levelScene/tower/arrow/arrowBullet.ts

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
var ArrowBullet = /** @class */ (function (_super) {
    __extends(ArrowBullet, _super);
    function ArrowBullet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /* 资源 */
        _this.decalArrow = null;
        _this.completedArrow = null;
        /* 组件 */
        _this.sprite = null;
        _this.arrowTower = null;
        /* 属性 */
        _this.attack = null;
        /* 记录 */
        _this.lastPos = null;
        _this.curPos = null;
        /**
         * 修正箭的初始方向为正右
         */
        _this.offsetDegree = 180;
        /* 控制 */
        _this.isUpdateDir = true;
        /**
         * 是否落地
         */
        _this.isFallFloor = false;
        return _this;
    }
    ArrowBullet.prototype.onLoad = function () {
        this.sprite = this.node.getComponent(cc.Sprite);
        this.arrowTower = this.node.parent.parent.getComponent("arrowTower");
    };
    ArrowBullet.prototype.start = function () {
    };
    /**
     * 初始化
     * @param attack
     * @param dir 箭的朝向，true为左
     */
    ArrowBullet.prototype.init = function (attack, speed, dir) {
        this.attack = attack;
        if (dir)
            this.node.rotation = 50;
        else
            this.node.rotation = -230;
        //显示
        this.sprite.spriteFrame = this.completedArrow;
        //记录
        this.lastPos = null;
        this.curPos = this.node.getPosition();
        //控制
        this.isUpdateDir = true;
        this.isFallFloor = false;
        this.scheduleOnce(this.updateDir, 0.07);
    };
    /**
     * 移动，世界坐标
     * @param start 起点
     * @param end 终点
     * @param time 从起点到终点的时间
     */
    ArrowBullet.prototype.moveTo = function (start, end, time) {
        var nodeStart = this.node.parent.convertToNodeSpaceAR(start);
        var nodeEnd = this.node.parent.convertToNodeSpaceAR(end);
        var sub = nodeEnd.sub(nodeStart);
        var middle = nodeStart.add(cc.v2(sub.x / 2, sub.y / 2));
        var c = cc.v2(middle.x, nodeEnd.y + 60);
        if (start.x === end.x)
            c.x += 30;
        this.node.setPosition(nodeStart);
        var move = cc.bezierTo(time, [nodeStart, c, nodeEnd]);
        var func1 = cc.callFunc(function () {
            this.isUpdateDir = false;
            this.isFallFloor = true;
            this.sprite.spriteFrame = this.decalArrow;
        }, this);
        var fade = cc.fadeOut(2);
        var func2 = cc.callFunc(function () {
            this.destroySelf();
        }, this);
        var seq = cc.sequence(move, func1, fade, func2);
        this.node.runAction(seq);
    };
    ArrowBullet.prototype.onCollisionEnter = function (other, self) {
        if (this.isFallFloor)
            return;
        var node = other.node;
        var group = node.group;
        if (group === "Enemy") {
            this.node.stopAllActions();
            var m = node.getComponent("monster");
            m.injure(this.attack);
            this.destroySelf();
        }
    };
    /**
     * 更新方向
     */
    ArrowBullet.prototype.updateDir = function () {
        this.lastPos = this.curPos;
        this.curPos = this.node.getPosition();
        var dir = this.curPos.sub(this.lastPos);
        var degree = this.getDegree(dir);
        if (degree === null)
            return;
        this.node.rotation = -(this.offsetDegree + degree);
        if (this.isUpdateDir)
            this.scheduleOnce(this.updateDir.bind(this), 0.07);
    };
    /**
     * Gets degree
     * @param dir 方向向量
     * @returns degree [0,360),null为没有角度变化
     */
    ArrowBullet.prototype.getDegree = function (dir) {
        var rot;
        if (dir.x === 0 && dir.y === 0)
            return null;
        if (dir.x === 0 && dir.y > 0) //y上半轴
            return 90;
        else if (dir.x === 0 && dir.y < 0) //y下半轴
            return 270;
        else { //不在y轴上
            var r = Math.atan(dir.y / dir.x);
            var d = r * 180 / Math.PI;
            rot = d;
        }
        if (rot === 0) //在x轴上
            if (dir.x > 0)
                rot = 0;
            else
                rot = 180;
        else if (dir.x < 0 && dir.y > 0 || dir.x < 0 && dir.y < 0) //在第二三象限
            rot += 180;
        else if (dir.x > 0 && dir.y < 0) //在第四象限
            rot += 360;
        return rot;
    };
    ArrowBullet.prototype.destroySelf = function () {
        this.arrowTower.releaseArrowBullt(this.node);
    };
    __decorate([
        property({
            type: cc.SpriteFrame,
            tooltip: "半截箭图片"
        })
    ], ArrowBullet.prototype, "decalArrow", void 0);
    __decorate([
        property({
            type: cc.SpriteFrame,
            tooltip: "完整的箭图片"
        })
    ], ArrowBullet.prototype, "completedArrow", void 0);
    ArrowBullet = __decorate([
        ccclass
    ], ArrowBullet);
    return ArrowBullet;
}(cc.Component));
exports.default = ArrowBullet;

cc._RF.pop();