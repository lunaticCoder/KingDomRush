
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/levelScene/tower/artillery/artilleryBullet.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4643fd5zIZPX7fZ/abAT8Qr', 'artilleryBullet');
// scripts/levelScene/tower/artillery/artilleryBullet.ts

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
var monster_1 = require("../../monster/monster");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ArtilleryBullet = /** @class */ (function (_super) {
    __extends(ArtilleryBullet, _super);
    function ArtilleryBullet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.level = null;
        _this.attack = 0;
        _this.frameAnim = null;
        _this.artilleryTower = null;
        return _this;
        // update (dt) {}
    }
    ArtilleryBullet.prototype.onLoad = function () {
        this.frameAnim = this.node.getComponent("frameAnimation");
        this.artilleryTower = this.node.parent.getComponent("artilleryTower");
    };
    ArtilleryBullet.prototype.start = function () {
    };
    /**
     * 设置炮的攻击力和速度
     * @param attack
     * @param bombRange 炸弹爆炸范围
     */
    ArtilleryBullet.prototype.init = function (l, attack, bombRange) {
        this.level = l;
        this.attack = attack;
        this.harmRadian = bombRange;
    };
    /**
     * 移动，世界坐标
     * @param start 起点
     * @param end 终点
     * @param time 移动时间
     *
     */
    ArtilleryBullet.prototype.moveTo = function (start, end, time) {
        var nodeStart = this.node.parent.convertToNodeSpaceAR(start);
        var nodeEnd = this.node.parent.convertToNodeSpaceAR(end);
        var sub = nodeEnd.sub(nodeStart);
        var middle = cc.v2(nodeStart.x + sub.x / 2, nodeStart.y + sub.y / 2);
        var c = cc.v2(middle.x, nodeEnd.y + 60);
        if (start.x === end.x)
            c.x += 30;
        this.node.setPosition(nodeStart);
        var move = cc.bezierTo(time, [nodeStart, c, nodeEnd]);
        var func = cc.callFunc(function () {
            this.frameAnim.play(false, true, false, function () {
                this.causeHarm(end);
                this.destroySelf();
            }.bind(this));
        }, this);
        var seq = cc.sequence(move, func);
        this.node.runAction(seq);
    };
    /**
     * Causes harm
     * @param pos 爆炸点 世界坐标
     */
    ArtilleryBullet.prototype.causeHarm = function (pos) {
        for (var i = 0; i < monster_1.default.monstersOfAlive.length; i++) {
            var mScr = monster_1.default.monstersOfAlive[i];
            if (this.isInjuredInScope(pos, mScr.getWPos()))
                mScr.injure(this.attack);
        }
    };
    /**
     * @param pos 爆炸点 世界
     */
    ArtilleryBullet.prototype.isInjuredInScope = function (pos, mwp) {
        var l = mwp.sub(pos).mag();
        if (l <= this.harmRadian)
            return true;
        return false;
    };
    ArtilleryBullet.prototype.destroySelf = function () {
        this.artilleryTower.releaseBullt(this.level, this.node);
    };
    ArtilleryBullet = __decorate([
        ccclass
    ], ArtilleryBullet);
    return ArtilleryBullet;
}(cc.Component));
exports.default = ArtilleryBullet;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2xldmVsU2NlbmUvdG93ZXIvYXJ0aWxsZXJ5L2FydGlsbGVyeUJ1bGxldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxpREFBNEM7QUFHdEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBNkMsbUNBQVk7SUFBekQ7UUFBQSxxRUFvRkM7UUFsRlcsV0FBSyxHQUFXLElBQUksQ0FBQztRQUNyQixZQUFNLEdBQVcsQ0FBQyxDQUFDO1FBRW5CLGVBQVMsR0FBbUIsSUFBSSxDQUFDO1FBQ2pDLG9CQUFjLEdBQWMsSUFBSSxDQUFDOztRQTZFekMsaUJBQWlCO0lBQ3JCLENBQUM7SUE1RUcsZ0NBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFRCwrQkFBSyxHQUFMO0lBRUEsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCw4QkFBSSxHQUFKLFVBQUssQ0FBUyxFQUFFLE1BQWMsRUFBRSxTQUFpQjtRQUM3QyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO0lBQ2hDLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxnQ0FBTSxHQUFOLFVBQU8sS0FBYyxFQUFFLEdBQVksRUFBRSxJQUFZO1FBQzdDLElBQUksU0FBUyxHQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLG9CQUFv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bnRlbnQiOlsiaW1wb3J0IEZyYW1lQW5pbWF0aW9uIGZyb20gXCIuLi8uLi8uLi9jb21tb24vZnJhbWVBbmltYXRpb25cIjtcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuLi8uLi9tb25zdGVyL21vbnN0ZXJcIjtcbmltcG9ydCBBcnRpbGxlcnkgZnJvbSBcIi4vYXJ0aWxsZXJ5VG93ZXJcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFydGlsbGVyeUJ1bGxldCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBwcml2YXRlIGxldmVsOiBudW1iZXIgPSBudWxsO1xuICAgIHByaXZhdGUgYXR0YWNrOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgaGFybVJhZGlhbjogbnVtYmVyO1xuICAgIHByaXZhdGUgZnJhbWVBbmltOiBGcmFtZUFuaW1hdGlvbiA9IG51bGw7XG4gICAgcHJpdmF0ZSBhcnRpbGxlcnlUb3dlcjogQXJ0aWxsZXJ5ID0gbnVsbDtcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5mcmFtZUFuaW0gPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KFwiZnJhbWVBbmltYXRpb25cIik7XG4gICAgICAgIHRoaXMuYXJ0aWxsZXJ5VG93ZXIgPSB0aGlzLm5vZGUucGFyZW50LmdldENvbXBvbmVudChcImFydGlsbGVyeVRvd2VyXCIpO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6K6+572u54Ku55qE5pS75Ye75Yqb5ZKM6YCf5bqmXG4gICAgICogQHBhcmFtIGF0dGFjayBcbiAgICAgKiBAcGFyYW0gYm9tYlJhbmdlIOeCuOW8ueeIhueCuOiMg+WbtFxuICAgICAqL1xuICAgIGluaXQobDogbnVtYmVyLCBhdHRhY2s6IG51bWJlciwgYm9tYlJhbmdlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5sZXZlbCA9IGw7XG4gICAgICAgIHRoaXMuYXR0YWNrID0gYXR0YWNrO1xuICAgICAgICB0aGlzLmhhcm1SYWRpYW4gPSBib21iUmFuZ2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog56e75Yqo77yM5LiW55WM5Z2Q5qCHXG4gICAgICogQHBhcmFtIHN0YXJ0IOi1t+eCuVxuICAgICAqIEBwYXJhbSBlbmQg57uI54K5XG4gICAgICogQHBhcmFtIHRpbWUg56e75Yqo5pe26Ze0XG4gICAgICogXG4gICAgICovXG4gICAgbW92ZVRvKHN0YXJ0OiBjYy5WZWMyLCBlbmQ6IGNjLlZlYzIsIHRpbWU6IG51bWJlcikge1xuICAgICAgICBsZXQgbm9kZVN0YXJ0OiBjYy5WZWMyID0gdGhpcy5ub2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUihzdGFydCk7XG4gICAgICAgIGxldCBub2RlRW5kOiBjYy5WZWMyID0gdGhpcy5ub2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUihlbmQpO1xuICAgICAgICBsZXQgc3ViOiBjYy5WZWMyID0gbm9kZUVuZC5zdWIobm9kZVN0YXJ0KTtcbiAgICAgICAgbGV0IG1pZGRsZTogY2MuVmVjMiA9IGNjLnYyKG5vZGVTdGFydC54ICsgc3ViLnggLyAyLCBub2RlU3RhcnQueSArIHN1Yi55IC8gMik7XG4gICAgICAgIGxldCBjOiBjYy5WZWMyID0gY2MudjIobWlkZGxlLngsIG5vZGVFbmQueSArIDYwKTtcbiAgICAgICAgaWYgKHN0YXJ0LnggPT09IGVuZC54KVxuICAgICAgICAgICAgYy54ICs9IDMwO1xuXG4gICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbihub2RlU3RhcnQpO1xuICAgICAgICBsZXQgbW92ZTogY2MuQWN0aW9uSW50ZXJ2YWwgPSBjYy5iZXppZXJUbyh0aW1lLCBbbm9kZVN0YXJ0LCBjLCBub2RlRW5kXSk7XG5cbiAgICAgICAgbGV0IGZ1bmM6IGNjLkFjdGlvbkluc3RhbnQgPSBjYy5jYWxsRnVuYyhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmZyYW1lQW5pbS5wbGF5KGZhbHNlLCB0cnVlLCBmYWxzZSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2F1c2VIYXJtKGVuZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5kZXN0cm95U2VsZigpO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgbGV0IHNlcTogY2MuQWN0aW9uSW50ZXJ2YWwgPSBjYy5zZXF1ZW5jZShtb3ZlLCBmdW5jKTtcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihzZXEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhdXNlcyBoYXJtXG4gICAgICogQHBhcmFtIHBvcyDniIbngrjngrkg5LiW55WM5Z2Q5qCHXG4gICAgICovXG4gICAgcHJpdmF0ZSBjYXVzZUhhcm0ocG9zOiBjYy5WZWMyKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTW9uc3Rlci5tb25zdGVyc09mQWxpdmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBtU2NyOiBNb25zdGVyID0gTW9uc3Rlci5tb25zdGVyc09mQWxpdmVbaV07XG4gICAgICAgICAgICBpZiAodGhpcy5pc0luanVyZWRJblNjb3BlKHBvcywgbVNjci5nZXRXUG9zKCkpKVxuICAgICAgICAgICAgICAgIG1TY3IuaW5qdXJlKHRoaXMuYXR0YWNrKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gcG9zIOeIhueCuOeCuSDkuJbnlYwgXG4gICAgICovXG4gICAgcHJpdmF0ZSBpc0luanVyZWRJblNjb3BlKHBvczogY2MuVmVjMiwgbXdwOiBjYy5WZWMyKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBsOiBudW1iZXIgPSBtd3Auc3ViKHBvcykubWFnKCk7XG4gICAgICAgIGlmIChsIDw9IHRoaXMuaGFybVJhZGlhbilcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkZXN0cm95U2VsZigpIHtcbiAgICAgICAgdGhpcy5hcnRpbGxlcnlUb3dlci5yZWxlYXNlQnVsbHQodGhpcy5sZXZlbCwgdGhpcy5ub2RlKTtcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19