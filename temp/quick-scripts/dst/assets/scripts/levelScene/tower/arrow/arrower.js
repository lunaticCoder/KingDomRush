
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/levelScene/tower/arrow/arrower.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '85d98f92bBLz5Y1cmMhd2lH', 'arrower');
// scripts/levelScene/tower/arrow/arrower.ts

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
var Arrower = /** @class */ (function (_super) {
    __extends(Arrower, _super);
    function Arrower() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.frameAnimation = null;
        /**
         * 是否正在射击
         */
        _this.shooting = false;
        _this.arrowTower = null;
        return _this;
    }
    Arrower.prototype.onLoad = function () {
        this.frameAnimation = this.node.getComponent("frameAnimation");
        this.arrowTower = this.node.parent.getComponent("arrowTower");
        this.monsterArray = monster_1.default.monstersOfAlive;
    };
    Arrower.prototype.start = function () {
        //初始化数据
        this.wPosOfArrower = this.node.parent.convertToWorldSpaceAR(this.node.getPosition());
        this.playTimeOfshootArrow = this.frameAnimation.getDuration();
    };
    /**
     * Inits arrower
     * @param wPosOfTower 塔的世界坐标
     * @param speedOfArrow 箭的移动速度
     * @param shootRange 射程
     * @param speedOfShoot 射速
     */
    Arrower.prototype.init = function (wPosOfTower, speedOfArrow, shootRange, speedOfShoot, attack) {
        this.wPosOfTower = wPosOfTower;
        this.speedOfArrow = speedOfArrow;
        this.shootRange = shootRange;
        this.speedOfShoot = speedOfShoot;
        this.attack = attack;
    };
    /**
     * Shoots arrower
     * @param des 射击目标，世界坐标
     * @param time 射到目的地的时间
     */
    Arrower.prototype.shoot = function (des, time) {
        if (time === void 0) { time = null; }
        if (this.shooting)
            return;
        this.shooting = true;
        if (time === null) {
            var l = this.wPosOfTower.sub(des).mag();
            var time_1 = l / this.speedOfArrow;
        }
        //播放动作后射箭
        this.frameAnimation.play(false, false, false, function () {
            var arrowBullet = this.createArrow();
            var dir;
            if (this.wPosOfTower.x > des.x)
                dir = true;
            else
                dir = false;
            arrowBullet.init(this.attack, this.speedOfArrow, dir);
            arrowBullet.moveTo(this.wPosOfArrower, des, time);
            this.coolingShoot();
        }.bind(this));
    };
    /**
     * 冷却 射击
     */
    Arrower.prototype.coolingShoot = function () {
        this.scheduleOnce(function () {
            this.shooting = false;
        }.bind(this), this.speedOfShoot);
    };
    /**
     * Creates arrow
     * @returns arrow ArrowBullet
     */
    Arrower.prototype.createArrow = function () {
        var arrow = this.arrowTower.getArrowBullet();
        this.node.addChild(arrow);
        var script = arrow.getComponent("arrowBullet");
        return script;
    };
    /**
     * 根据怪物此时的位置，预判子弹到达后，怪物的新位置
     * @param monster
     * @param cP 此时怪物的坐标 世界坐标
     * @returns null表示超出射程;[怪物预测位置,世界; 子弹达到预测位置的时间]
     */
    Arrower.prototype.forecastMovePos = function (monster, cP) {
        //箭飞行到cP的时间
        var time = cP.sub(this.wPosOfArrower).mag() / this.speedOfArrow;
        var mWP = monster.getPosInTime(time + this.playTimeOfshootArrow);
        if (!this.inShootRange(mWP))
            return null;
        return [mWP.x, mWP.y, time];
    };
    Arrower.prototype.inShootRange = function (wP) {
        var l = this.wPosOfTower.sub(wP).mag();
        if (l <= this.shootRange)
            return true;
        return false;
    };
    Arrower.prototype.update = function (dt) {
        if (!this.shooting) {
            for (var i = 0; i < this.monsterArray.length; i++) {
                var m = this.monsterArray[i];
                var mP = m.node.parent.convertToWorldSpaceAR(m.node.getPosition());
                if (this.inShootRange(mP)) {
                    if (m.swiOfRecursionInPW) {
                        var d = this.forecastMovePos(m, mP);
                        if (d === null)
                            continue;
                        this.shoot(cc.v2(d[0], d[1]), d[2]);
                        break;
                    }
                    else {
                        this.shoot(m.getWPos());
                        return;
                    }
                }
            }
        }
    };
    Arrower = __decorate([
        ccclass
    ], Arrower);
    return Arrower;
}(cc.Component));
exports.default = Arrower;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2xldmVsU2NlbmUvdG93ZXIvYXJyb3cvYXJyb3dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxpREFBNEM7QUFHdEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBcUMsMkJBQVk7SUFBakQ7UUFBQSxxRUF3SkM7UUF0Slcsb0JBQWMsR0FBbUIsSUFBSSxDQUFDO1FBRTlDOztXQUVHO1FBQ0ssY0FBUSxHQUFZLEtBQUssQ0FBQztRQWExQixnQkFBVSxHQUFlLElBQUksQ0FBQzs7SUFvSTFDLENBQUM7SUE1SEcsd0JBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsWUFBWSxHQUFHLGlCQUFPLENBQUMsZUFBZSxDQUFDO0lBQ2hELENBQUM7SUFFRCx1QkFBSyxHQUFMO1FBQ0ksT0FBTztRQUNQLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQ3JGLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBRWxFLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxzQkFBSSxHQUFKLFVBQUssV0FBb0IsRUFBRSxZQUFvQixFQUFFLFVBQWtCLEVBQUUsWUFBb0IsRUFBRSxNQUFjO1FBQ3JHLElBQUksQ0FBQyxXQUFXLEdB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Q0FBQztJQXRKZ0IsT0FBTztRQUQzQixPQUFPO09BQ2EsT0FBTyxDQXdKM0I7SUFBRCxjQUFDO0NBeEpELEFBd0pDLENBeEpvQyxFQUFFLENBQUMsU0FBUyxHQXdKaEQ7a0JBeEpvQixPQUFPIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFycm93QnVsbGV0IGZyb20gXCIuL2Fycm93QnVsbGV0XCI7XG5pbXBvcnQgRnJhbWVBbmltYXRpb24gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9mcmFtZUFuaW1hdGlvblwiO1xuaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4uLy4uL21vbnN0ZXIvbW9uc3RlclwiO1xuaW1wb3J0IEFycm93VG93ZXIgZnJvbSBcIi4vYXJyb3dUb3dlclwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXJyb3dlciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBwcml2YXRlIGZyYW1lQW5pbWF0aW9uOiBGcmFtZUFuaW1hdGlvbiA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiDmmK/lkKbmraPlnKjlsITlh7tcbiAgICAgKi9cbiAgICBwcml2YXRlIHNob290aW5nOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICog5aGU55qE5LiW55WM5Z2Q5qCHXG4gICAgICovXG4gICAgcHJpdmF0ZSB3UG9zT2ZUb3dlcjogY2MuVmVjMjtcbiAgICAvKipcbiAgICAgKiDnrq3nmoTlsITlh7rngrkg5LiW55WM5Z2Q5qCHXG4gICAgICovXG4gICAgcHJpdmF0ZSB3UG9zT2ZBcnJvd2VyOiBjYy5WZWMyO1xuICAgIC8qKlxuICAgICAqIOWwhOeureWKqOeUu+aSreaUvuaXtumXtFxuICAgICAqL1xuICAgIHByaXZhdGUgcGxheVRpbWVPZnNob290QXJyb3c6IG51bWJlcjtcbiAgICBwcml2YXRlIGFycm93VG93ZXI6IEFycm93VG93ZXIgPSBudWxsO1xuICAgIHByaXZhdGUgbW9uc3RlckFycmF5OiBNb25zdGVyW107XG5cbiAgICBwcml2YXRlIGF0dGFjazogbnVtYmVyO1xuICAgIHByaXZhdGUgc3BlZWRPZkFycm93OiBudW1iZXI7XG4gICAgcHJpdmF0ZSBzaG9vdFJhbmdlOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBzcGVlZE9mU2hvb3Q6IG51bWJlcjtcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5mcmFtZUFuaW1hdGlvbiA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoXCJmcmFtZUFuaW1hdGlvblwiKTtcbiAgICAgICAgdGhpcy5hcnJvd1Rvd2VyID0gdGhpcy5ub2RlLnBhcmVudC5nZXRDb21wb25lbnQoXCJhcnJvd1Rvd2VyXCIpO1xuICAgICAgICB0aGlzLm1vbnN0ZXJBcnJheSA9IE1vbnN0ZXIubW9uc3RlcnNPZkFsaXZlO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICAvL+WIneWni+WMluaVsOaNrlxuICAgICAgICB0aGlzLndQb3NPZkFycm93ZXIgPSB0aGlzLm5vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUih0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSk7XG4gICAgICAgIHRoaXMucGxheVRpbWVPZnNob290QXJyb3cgPSB0aGlzLmZyYW1lQW5pbWF0aW9uLmdldER1cmF0aW9uKCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0cyBhcnJvd2VyXG4gICAgICogQHBhcmFtIHdQb3NPZlRvd2VyIOWhlOeahOS4lueVjOWdkOagh1xuICAgICAqIEBwYXJhbSBzcGVlZE9mQXJyb3cg566t55qE56e75Yqo6YCf5bqmXG4gICAgICogQHBhcmFtIHNob290UmFuZ2Ug5bCE56iLXG4gICAgICogQHBhcmFtIHNwZWVkT2ZTaG9vdCDlsITpgJ9cbiAgICAgKi9cbiAgICBpbml0KHdQb3NPZlRvd2VyOiBjYy5WZWMyLCBzcGVlZE9mQXJyb3c6IG51bWJlciwgc2hvb3RSYW5nZTogbnVtYmVyLCBzcGVlZE9mU2hvb3Q6IG51bWJlciwgYXR0YWNrOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy53UG9zT2ZUb3dlciA9IHdQb3NPZlRvd2VyO1xuICAgICAgICB0aGlzLnNwZWVkT2ZBcnJvdyA9IHNwZWVkT2ZBcnJvdztcbiAgICAgICAgdGhpcy5zaG9vdFJhbmdlID0gc2hvb3RSYW5nZTtcbiAgICAgICAgdGhpcy5zcGVlZE9mU2hvb3QgPSBzcGVlZE9mU2hvb3Q7XG4gICAgICAgIHRoaXMuYXR0YWNrID0gYXR0YWNrO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNob290cyBhcnJvd2VyXG4gICAgICogQHBhcmFtIGRlcyDlsITlh7vnm67moIfvvIzkuJbnlYzlnZDmoIdcbiAgICAgKiBAcGFyYW0gdGltZSDlsITliLDnm67nmoTlnLDnmoTml7bpl7RcbiAgICAgKi9cbiAgICBwcml2YXRlIHNob290KGRlczogY2MuVmVjMiwgdGltZTogbnVtYmVyID0gbnVsbCkge1xuICAgICAgICBpZiAodGhpcy5zaG9vdGluZylcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5zaG9vdGluZyA9IHRydWU7XG5cbiAgICAgICAgaWYgKHRpbWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGxldCBsOiBudW1iZXIgPSB0aGlzLndQb3NPZlRvd2VyLnN1YihkZXMpLm1hZygpO1xuICAgICAgICAgICAgbGV0IHRpbWUgPSBsIC8gdGhpcy5zcGVlZE9mQXJyb3c7XG4gICAgICAgIH1cblxuICAgICAgICAvL+aSreaUvuWKqOS9nOWQjuWwhOeurVxuICAgICAgICB0aGlzLmZyYW1lQW5pbWF0aW9uLnBsYXkoZmFsc2UsIGZhbHNlLCBmYWxzZSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbGV0IGFycm93QnVsbGV0OiBBcnJvd0J1bGxldCA9IHRoaXMuY3JlYXRlQXJyb3coKTtcbiAgICAgICAgICAgIGxldCBkaXI6IGJvb2xlYW47XG4gICAgICAgICAgICBpZiAodGhpcy53UG9zT2ZUb3dlci54ID4gZGVzLngpXG4gICAgICAgICAgICAgICAgZGlyID0gdHJ1ZTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBkaXIgPSBmYWxzZTtcbiAgICAgICAgICAgIGFycm93QnVsbGV0LmluaXQodGhpcy5hdHRhY2ssIHRoaXMuc3BlZWRPZkFycm93LCBkaXIpO1xuICAgICAgICAgICAgYXJyb3dCdWxsZXQubW92ZVRvKHRoaXMud1Bvc09mQXJyb3dlciwgZGVzLCB0aW1lKTtcbiAgICAgICAgICAgIHRoaXMuY29vbGluZ1Nob290KCk7XG4gICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Ya35Y20IOWwhOWHu1xuICAgICAqL1xuICAgIHByaXZhdGUgY29vbGluZ1Nob290KCkge1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnNob290aW5nID0gZmFsc2U7XG4gICAgICAgIH0uYmluZCh0aGlzKSwgdGhpcy5zcGVlZE9mU2hvb3QpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYXJyb3dcbiAgICAgKiBAcmV0dXJucyBhcnJvdyBBcnJvd0J1bGxldFxuICAgICAqL1xuICAgIHByaXZhdGUgY3JlYXRlQXJyb3coKTogQXJyb3dCdWxsZXQge1xuICAgICAgICBsZXQgYXJyb3c6IGNjLk5vZGUgPSB0aGlzLmFycm93VG93ZXIuZ2V0QXJyb3dCdWxsZXQoKTtcbiAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKGFycm93KTtcbiAgICAgICAgbGV0IHNjcmlwdDogQXJyb3dCdWxsZXQgPSBhcnJvdy5nZXRDb21wb25lbnQoXCJhcnJvd0J1bGxldFwiKTtcbiAgICAgICAgcmV0dXJuIHNjcmlwdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmoLnmja7mgKrnianmraTml7bnmoTkvY3nva7vvIzpooTliKTlrZDlvLnliLDovr7lkI7vvIzmgKrniannmoTmlrDkvY3nva5cbiAgICAgKiBAcGFyYW0gbW9uc3RlciBcbiAgICAgKiBAcGFyYW0gY1Ag5q2k5pe25oCq54mp55qE5Z2Q5qCHIOS4lueVjOWdkOagh1xuICAgICAqIEByZXR1cm5zIG51bGzooajnpLrotoXlh7rlsITnqIs7W+aAqueJqemihOa1i+S9jee9rizkuJbnlYw7IOWtkOW8uei+vuWIsOmihOa1i+S9jee9rueahOaXtumXtF1cbiAgICAgKi9cbiAgICBwcml2YXRlIGZvcmVjYXN0TW92ZVBvcyhtb25zdGVyOiBNb25zdGVyLCBjUDogY2MuVmVjMik6IG51bWJlcltdIHtcblxuICAgICAgICAvL+euremjnuihjOWIsGNQ55qE5pe26Ze0XG4gICAgICAgIGxldCB0aW1lOiBudW1iZXIgPSBjUC5zdWIodGhpcy53UG9zT2ZBcnJvd2VyKS5tYWcoKSAvIHRoaXMuc3BlZWRPZkFycm93O1xuXG4gICAgICAgIGxldCBtV1A6IGNjLlZlYzIgPSBtb25zdGVyLmdldFBvc0luVGltZSh0aW1lICsgdGhpcy5wbGF5VGltZU9mc2hvb3RBcnJvdyk7XG4gICAgICAgIGlmICghdGhpcy5pblNob290UmFuZ2UobVdQKSlcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICByZXR1cm4gW21XUC54LCBtV1AueSwgdGltZV07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpblNob290UmFuZ2Uod1A6IGNjLlZlYzIpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IGw6IG51bWJlciA9IHRoaXMud1Bvc09mVG93ZXIuc3ViKHdQKS5tYWcoKTtcbiAgICAgICAgaWYgKGwgPD0gdGhpcy5zaG9vdFJhbmdlKVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB1cGRhdGUoZHQpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNob290aW5nKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubW9uc3RlckFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IG06IE1vbnN0ZXIgPSB0aGlzLm1vbnN0ZXJBcnJheVtpXTtcbiAgICAgICAgICAgICAgICBsZXQgbVA6IGNjLlZlYzIgPSBtLm5vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihtLm5vZGUuZ2V0UG9zaXRpb24oKSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pblNob290UmFuZ2UobVApKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtLnN3aU9mUmVjdXJzaW9uSW5QVykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGQ6IG51bWJlcltdID0gdGhpcy5mb3JlY2FzdE1vdmVQb3MobSwgbVApO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGQgPT09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob290KGNjLnYyKGRbMF0sIGRbMV0pLCBkWzJdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG9vdChtLmdldFdQb3MoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==