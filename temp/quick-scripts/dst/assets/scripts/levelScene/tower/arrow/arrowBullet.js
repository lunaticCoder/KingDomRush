
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/levelScene/tower/arrow/arrowBullet.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2xldmVsU2NlbmUvdG93ZXIvYXJyb3cvYXJyb3dCdWxsZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR00sSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBeUMsK0JBQVk7SUFBckQ7UUFBQSxxRUE0S0M7UUExS0csUUFBUTtRQUtBLGdCQUFVLEdBQW1CLElBQUksQ0FBQztRQU1sQyxvQkFBYyxHQUFtQixJQUFJLENBQUM7UUFFOUMsUUFBUTtRQUNBLFlBQU0sR0FBYyxJQUFJLENBQUM7UUFDekIsZ0JBQVUsR0FBZSxJQUFJLENBQUM7UUFFdEMsUUFBUTtRQUNBLFlBQU0sR0FBVyxJQUFJLENBQUM7UUFFOUIsUUFBUTtRQUNBLGFBQU8sR0FBWSxJQUFJLENBQUM7UUFDeEIsWUFBTSxHQUFZLElBQUksQ0FBQztRQUMvQjs7V0FFRztRQUNjLGtCQUFZLEdBQVcsR0FBRyxDQUFDO1FBRTVDLFFBQVE7UUFDQSxpQkFBVyxHQUFZLElBQUksQ0FBQztRQUNwQzs7V0FFRztRQUNLLGlCQUFXLEdBQVksS0FBSyxDQUFDOztJQXlJekMsQ0FBQztJQXZJRyw0QkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFRCwyQkFBSyxHQUFMO0lBQ0EsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCwwQkFBSSxHQUFKLFVBQUssTUFBYyxFQUFFLEtBQWEsRUFBRSxHQUFZO1FBQzVDLElBQUksQ0FBQyxNQUFN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SSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQW5LRDtRQUpDLFFBQVEsQ0FBQztZQUNOLElBQUksRUFBRSxFQUFFLENBQUMsV0FBVztZQUNwQixPQUFPLEVBQUUsT0FBTztTQUNuQixDQUFDO21EQUN3QztJQU0xQztRQUpDLFFBQVEsQ0FBQztZQUNOLElBQUksRUFBRSxFQUFFLENBQUMsV0FBVztZQUNwQixPQUFPLEVBQUUsUUFBUTtTQUNwQixDQUFDO3VEQUM0QztJQWI3QixXQUFXO1FBRC9CLE9BQU87T0FDYSxXQUFXLENBNEsvQjtJQUFELGtCQUFDO0NBNUtELEFBNEtDLENBNUt3QyxFQUFFLENBQUMsU0FBUyxHQTRLcEQ7a0JBNUtvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4uLy4uL21vbnN0ZXIvbW9uc3RlclwiO1xuaW1wb3J0IEFycm93VG93ZXIgZnJvbSBcIi4vYXJyb3dUb3dlclwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXJyb3dCdWxsZXQgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgLyog6LWE5rqQICovXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWUsXG4gICAgICAgIHRvb2x0aXA6IFwi5Y2K5oiq566t5Zu+54mHXCJcbiAgICB9KVxuICAgIHByaXZhdGUgZGVjYWxBcnJvdzogY2MuU3ByaXRlRnJhbWUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWUsXG4gICAgICAgIHRvb2x0aXA6IFwi5a6M5pW055qE566t5Zu+54mHXCJcbiAgICB9KVxuICAgIHByaXZhdGUgY29tcGxldGVkQXJyb3c6IGNjLlNwcml0ZUZyYW1lID0gbnVsbDtcblxuICAgIC8qIOe7hOS7tiAqL1xuICAgIHByaXZhdGUgc3ByaXRlOiBjYy5TcHJpdGUgPSBudWxsO1xuICAgIHByaXZhdGUgYXJyb3dUb3dlcjogQXJyb3dUb3dlciA9IG51bGw7XG5cbiAgICAvKiDlsZ7mgKcgKi9cbiAgICBwcml2YXRlIGF0dGFjazogbnVtYmVyID0gbnVsbDtcblxuICAgIC8qIOiusOW9lSAqL1xuICAgIHByaXZhdGUgbGFzdFBvczogY2MuVmVjMiA9IG51bGw7XG4gICAgcHJpdmF0ZSBjdXJQb3M6IGNjLlZlYzIgPSBudWxsO1xuICAgIC8qKlxuICAgICAqIOS/ruato+eureeahOWIneWni+aWueWQkeS4uuato+WPs1xuICAgICAqL1xuICAgIHByaXZhdGUgcmVhZG9ubHkgb2Zmc2V0RGVncmVlOiBudW1iZXIgPSAxODA7XG5cbiAgICAvKiDmjqfliLYgKi9cbiAgICBwcml2YXRlIGlzVXBkYXRlRGlyOiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiDmmK/lkKbokL3lnLBcbiAgICAgKi9cbiAgICBwcml2YXRlIGlzRmFsbEZsb29yOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuc3ByaXRlID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICB0aGlzLmFycm93VG93ZXIgPSB0aGlzLm5vZGUucGFyZW50LnBhcmVudC5nZXRDb21wb25lbnQoXCJhcnJvd1Rvd2VyXCIpO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWIneWni+WMllxuICAgICAqIEBwYXJhbSBhdHRhY2sgXG4gICAgICogQHBhcmFtIGRpciDnrq3nmoTmnJ3lkJHvvIx0cnVl5Li65bemXG4gICAgICovXG4gICAgaW5pdChhdHRhY2s6IG51bWJlciwgc3BlZWQ6IG51bWJlciwgZGlyOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuYXR0YWNrID0gYXR0YWNrO1xuICAgICAgICBpZiAoZGlyKVxuICAgICAgICAgICAgdGhpcy5ub2RlLnJvdGF0aW9uID0gNTA7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMubm9kZS5yb3RhdGlvbiA9IC0yMzA7XG5cbiAgICAgICAgLy/mmL7npLpcbiAgICAgICAgdGhpcy5zcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLmNvbXBsZXRlZEFycm93O1xuXG4gICAgICAgIC8v6K6w5b2VXG4gICAgICAgIHRoaXMubGFzdFBvcyA9IG51bGw7XG4gICAgICAgIHRoaXMuY3VyUG9zID0gdGhpcy5ub2RlLmdldFBvc2l0aW9uKCk7XG5cbiAgICAgICAgLy/mjqfliLZcbiAgICAgICAgdGhpcy5pc1VwZGF0ZURpciA9IHRydWU7XG4gICAgICAgIHRoaXMuaXNGYWxsRmxvb3IgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSh0aGlzLnVwZGF0ZURpciwgMC4wNyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog56e75Yqo77yM5LiW55WM5Z2Q5qCHXG4gICAgICogQHBhcmFtIHN0YXJ0IOi1t+eCuVxuICAgICAqIEBwYXJhbSBlbmQg57uI54K5XG4gICAgICogQHBhcmFtIHRpbWUg5LuO6LW354K55Yiw57uI54K555qE5pe26Ze0XG4gICAgICovXG4gICAgbW92ZVRvKHN0YXJ0OiBjYy5WZWMyLCBlbmQ6IGNjLlZlYzIsIHRpbWU6IG51bWJlcikge1xuICAgICAgICBsZXQgbm9kZVN0YXJ0OiBjYy5WZWMyID0gdGhpcy5ub2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUihzdGFydCk7XG4gICAgICAgIGxldCBub2RlRW5kOiBjYy5WZWMyID0gdGhpcy5ub2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUihlbmQpO1xuICAgICAgICBsZXQgc3ViOiBjYy5WZWMyID0gbm9kZUVuZC5zdWIobm9kZVN0YXJ0KTtcbiAgICAgICAgbGV0IG1pZGRsZTogY2MuVmVjMiA9IG5vZGVTdGFydC5hZGQoY2MudjIoc3ViLnggLyAyLCBzdWIueSAvIDIpKTtcbiAgICAgICAgbGV0IGM6IGNjLlZlYzIgPSBjYy52MihtaWRkbGUueCwgbm9kZUVuZC55ICsgNjApO1xuICAgICAgICBpZiAoc3RhcnQueCA9PT0gZW5kLngpXG4gICAgICAgICAgICBjLnggKz0gMzA7XG5cbiAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKG5vZGVTdGFydCk7XG4gICAgICAgIGxldCBtb3ZlOiBjYy5BY3Rpb25JbnRlcnZhbCA9IGNjLmJlemllclRvKHRpbWUsIFtub2RlU3RhcnQsIGMsIG5vZGVFbmRdKTtcblxuICAgICAgICBsZXQgZnVuYzE6IGNjLkFjdGlvbkluc3RhbnQgPSBjYy5jYWxsRnVuYyhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmlzVXBkYXRlRGlyID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmlzRmFsbEZsb29yID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5kZWNhbEFycm93O1xuICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICBsZXQgZmFkZTogY2MuQWN0aW9uSW50ZXJ2YWwgPSBjYy5mYWRlT3V0KDIpO1xuXG4gICAgICAgIGxldCBmdW5jMjogY2MuQWN0aW9uSW5zdGFudCA9IGNjLmNhbGxGdW5jKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveVNlbGYoKTtcbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgbGV0IHNlcTogY2MuQWN0aW9uSW50ZXJ2YWwgPSBjYy5zZXF1ZW5jZShtb3ZlLCBmdW5jMSwgZmFkZSwgZnVuYzIpO1xuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKHNlcSk7XG4gICAgfVxuXG4gICAgb25Db2xsaXNpb25FbnRlcihvdGhlcjogY2MuQ29sbGlkZXIsIHNlbGY6IGNjLkNvbGxpZGVyKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRmFsbEZsb29yKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIGxldCBub2RlOiBjYy5Ob2RlID0gb3RoZXIubm9kZTtcbiAgICAgICAgbGV0IGdyb3VwOiBzdHJpbmcgPSBub2RlLmdyb3VwO1xuXG4gICAgICAgIGlmIChncm91cCA9PT0gXCJFbmVteVwiKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICAgICAgICAgIGxldCBtOiBNb25zdGVyID0gbm9kZS5nZXRDb21wb25lbnQoXCJtb25zdGVyXCIpO1xuICAgICAgICAgICAgbS5pbmp1cmUodGhpcy5hdHRhY2spO1xuXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lTZWxmKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmm7TmlrDmlrnlkJFcbiAgICAgKi9cbiAgICBwcml2YXRlIHVwZGF0ZURpcigpIHtcbiAgICAgICAgdGhpcy5sYXN0UG9zID0gdGhpcy5jdXJQb3M7XG4gICAgICAgIHRoaXMuY3VyUG9zID0gdGhpcy5ub2RlLmdldFBvc2l0aW9uKCk7XG4gICAgICAgIGxldCBkaXI6IGNjLlZlYzIgPSB0aGlzLmN1clBvcy5zdWIodGhpcy5sYXN0UG9zKTtcbiAgICAgICAgbGV0IGRlZ3JlZTogbnVtYmVyID0gdGhpcy5nZXREZWdyZWUoZGlyKTtcbiAgICAgICAgaWYgKGRlZ3JlZSA9PT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5ub2RlLnJvdGF0aW9uID0gLSh0aGlzLm9mZnNldERlZ3JlZSArIGRlZ3JlZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNVcGRhdGVEaXIpXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSh0aGlzLnVwZGF0ZURpci5iaW5kKHRoaXMpLCAwLjA3KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGRlZ3JlZVxuICAgICAqIEBwYXJhbSBkaXIg5pa55ZCR5ZCR6YePXG4gICAgICogQHJldHVybnMgZGVncmVlIFswLDM2MCksbnVsbOS4uuayoeacieinkuW6puWPmOWMllxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0RGVncmVlKGRpcjogY2MuVmVjMik6IG51bWJlciB7XG4gICAgICAgIGxldCByb3Q6IG51bWJlcjtcbiAgICAgICAgaWYgKGRpci54ID09PSAwICYmIGRpci55ID09PSAwKVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIGlmIChkaXIueCA9PT0gMCAmJiBkaXIueSA+IDApIC8veeS4iuWNiui9tFxuICAgICAgICAgICAgcmV0dXJuIDkwO1xuICAgICAgICBlbHNlIGlmIChkaXIueCA9PT0gMCAmJiBkaXIueSA8IDApIC8veeS4i+WNiui9tFxuICAgICAgICAgICAgcmV0dXJuIDI3MDtcbiAgICAgICAgZWxzZSB7IC8v5LiN5Zyoeei9tOS4ilxuICAgICAgICAgICAgbGV0IHI6IG51bWJlciA9IE1hdGguYXRhbihkaXIueSAvIGRpci54KTtcbiAgICAgICAgICAgIGxldCBkOiBudW1iZXIgPSByICogMTgwIC8gTWF0aC5QSTtcbiAgICAgICAgICAgIHJvdCA9IGQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocm90ID09PSAwKSAvL+WcqHjovbTkuIpcbiAgICAgICAgICAgIGlmIChkaXIueCA+IDApXG4gICAgICAgICAgICAgICAgcm90ID0gMDtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByb3QgPSAxODA7XG4gICAgICAgIGVsc2UgaWYgKGRpci54IDwgMCAmJiBkaXIueSA+IDAgfHwgZGlyLnggPCAwICYmIGRpci55IDwgMCkgLy/lnKjnrKzkuozkuInosaHpmZBcbiAgICAgICAgICAgIHJvdCArPSAxODA7XG4gICAgICAgIGVsc2UgaWYgKGRpci54ID4gMCAmJiBkaXIueSA8IDApIC8v5Zyo56ys5Zub6LGh6ZmQXG4gICAgICAgICAgICByb3QgKz0gMzYwO1xuICAgICAgICByZXR1cm4gcm90O1xuICAgIH1cblxuICAgIHByaXZhdGUgZGVzdHJveVNlbGYoKSB7XG4gICAgICAgIHRoaXMuYXJyb3dUb3dlci5yZWxlYXNlQXJyb3dCdWxsdCh0aGlzLm5vZGUpO1xuICAgIH1cblxufVxuIl19