
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/levelScene/creature.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'eff2dfpDpVJZIVXft5Z35uY', 'creature');
// scripts/levelScene/creature.ts

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
var frameAnimation_1 = require("../common/frameAnimation");
var utils_1 = require("../common/module/utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Creature = /** @class */ (function (_super) {
    __extends(Creature, _super);
    function Creature() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /* 属性 */
        _this.cHP = null;
        _this.maxHp = null;
        _this.speedOfMove = null;
        _this.intervalOfAttack = null;
        _this.aggressivity = null;
        _this.rangeOfAttack = null;
        _this.rangeOfInvestigate = null;
        _this.intervalOfThink = 1;
        /* 引用对象 */
        _this.bloodBar = null;
        _this.frameAnim = null;
        _this.combatLogic = null;
        _this._move = null;
        /* 控制 */
        _this.isAlive = false;
        _this.isTracking = false;
        _this.isAttacking = false;
        _this.isNonComState = false;
        return _this;
    }
    Creature.prototype.initCreature = function () {
        this.isTracking = false;
        this.isAttacking = false;
        //刚出生，还没执行非战斗行为
        this.isNonComState = null;
        this.isAlive = true;
    };
    /**
     * 只进行移动,移除其他Action
     * @param des 世界
     * @returns 方向
     */
    Creature.prototype.move = function (des, func, t) {
        if (func === void 0) { func = null; }
        if (t === void 0) { t = null; }
        var dnp = this.node.parent.convertToNodeSpaceAR(des);
        var cnp = this.node.getPosition();
        var dis = dnp.sub(cnp);
        if (t === null) {
            var l = dis.mag();
            t = l / this.speedOfMove;
        }
        this._move.moveTo(dis, t, func);
    };
    /**
     * 播放死亡动画,会移除当前的所有行为
     */
    Creature.prototype.playDie = function (frames, func) {
        if (func === void 0) { func = null; }
        if (this.isNonComState)
            this.stopNonComLogic();
        else if (this.isAttacking)
            this.frameAnim.stop();
        else if (this.isTracking)
            this.stopTrack();
        this.frameAnim.setFrameArray(frames);
        this.frameAnim.play(false, false, false, function () {
            var fOut = cc.fadeOut(1);
            var f = cc.callFunc(func);
            this.node.runAction(cc.sequence(fOut, f));
        }.bind(this));
    };
    /**
     * 设置该生物死亡并从存活记录集中移除
     * @param creatures 该生物存在的集
     */
    Creature.prototype.die = function (creatures, self) {
        this.isAlive = false;
        utils_1.default.remvoeItemOfArray(creatures, self);
    };
    /**
     * @param des 目的地 世界
     */
    Creature.prototype.updateDir = function (des) {
        var cwp = this.getWPos();
        if (des.x > cwp.x)
            this.node.scaleX = 1;
        else
            this.node.scaleX = -1;
    };
    /**
     * 得到其世界坐标
     */
    Creature.prototype.getWPos = function () {
        return this.node.parent.convertToWorldSpaceAR(this.node.getPosition());
    };
    /**
     * 受到伤害
     */
    Creature.prototype.injure = function (v) {
        if (this.cHP === 0)
            return;
        this.cHP -= v;
        if (this.cHP < 0)
            this.cHP = 0;
    };
    /**
     * 更新血条显示
     */
    Creature.prototype.refreshBloodBar = function () {
        var r = this.cHP / this.maxHp;
        this.bloodBar.progress = r;
    };
    Creature.prototype.update = function (dt) {
        if (!this.isAlive)
            return;
        this.combatLogic.think();
        this._move.refreshMove(dt);
        this.refreshState();
    };
    __decorate([
        property({ type: cc.ProgressBar })
    ], Creature.prototype, "bloodBar", void 0);
    __decorate([
        property({ type: frameAnimation_1.default })
    ], Creature.prototype, "frameAnim", void 0);
    Creature = __decorate([
        ccclass
    ], Creature);
    return Creature;
}(cc.Component));
exports.default = Creature;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2xldmVsU2NlbmUvY3JlYXR1cmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkRBQXNEO0FBR3RELGdEQUEyQztBQUVyQyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUErQyw0QkFBWTtJQUEzRDtRQUFBLHFFQW1KQztRQWpKRyxRQUFRO1FBQ0UsU0FBRyxHQUFXLElBQUksQ0FBQztRQUNuQixXQUFLLEdBQVcsSUFBSSxDQUFDO1FBQ3JCLGlCQUFXLEdBQVcsSUFBSSxDQUFDO1FBQzNCLHNCQUFnQixHQUFXLElBQUksQ0FBQztRQUNoQyxrQkFBWSxHQUFXLElBQUksQ0FBQztRQUN0QyxtQkFBYSxHQUFXLElBQUksQ0FBQztRQUM3Qix3QkFBa0IsR0FBVyxJQUFJLENBQUM7UUFDeEIscUJBQWUsR0FBVyxDQUFDLENBQUM7UUFFdEMsVUFBVTtRQUVBLGNBQVEsR0FBbUIsSUFBSSxDQUFDO1FBR2hDLGVBQVMsR0FBbUIsSUFBSSxDQUFDO1FBRWpDLGlCQUFXLEdBQWdCLElBQUksQ0FBQztRQUNoQyxXQUFLLEdBQVMsSUFBSSxDQUFDO1FBRzdCLFFBQVE7UUFDRSxhQUFPLEdBQVksS0FBSyxDQUFDO1FBQ25DLGdCQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLGlCQUFXLEdBQVksS0FBSyxDQUFDO1FBQzdCLG1CQUFhLEdBQVksS0FBSyxDQUFDOztJQXdIbkMsQ0FBQztJQXRIYSwrQkFBWSxHQUF0QjtRQUNJLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLGVBQWU7UUFDZixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztJ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QUFHLEdBQUcsQ0FBQztZQUNaLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFFRDs7T0FFRztJQUNPLGtDQUFlLEdBQXpCO1FBQ0ksSUFBSSxDQUFDLEdBQVcsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBaUJELHlCQUFNLEdBQU4sVUFBTyxFQUFFO1FBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPO1lBQ2IsT0FBTztRQUVYLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFwSUQ7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDOzhDQUNPO0lBRzFDO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLHdCQUFjLEVBQUUsQ0FBQzsrQ0FDUTtJQWpCakIsUUFBUTtRQURyQyxPQUFPO09BQ3NCLFFBQVEsQ0FtSnJDO0lBQUQsZUFBQztDQW5KRCxBQW1KQyxDQW5KOEMsRUFBRSxDQUFDLFNBQVMsR0FtSjFEO2tCQW5KNkIsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBGcmFtZUFuaW1hdGlvbiBmcm9tIFwiLi4vY29tbW9uL2ZyYW1lQW5pbWF0aW9uXCI7XG5pbXBvcnQgQ29tYmF0TG9naWMgZnJvbSBcIi4vY29tYmF0TG9naWNcIjtcbmltcG9ydCBNb3ZlIGZyb20gXCIuLi9jb21tb24vbW92ZVwiO1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuLi9jb21tb24vbW9kdWxlL3V0aWxzXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBDcmVhdHVyZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICAvKiDlsZ7mgKcgKi9cbiAgICBwcm90ZWN0ZWQgY0hQOiBudW1iZXIgPSBudWxsO1xuICAgIHByb3RlY3RlZCBtYXhIcDogbnVtYmVyID0gbnVsbDtcbiAgICBwcm90ZWN0ZWQgc3BlZWRPZk1vdmU6IG51bWJlciA9IG51bGw7XG4gICAgcHJvdGVjdGVkIGludGVydmFsT2ZBdHRhY2s6IG51bWJlciA9IG51bGw7XG4gICAgcHJvdGVjdGVkIGFnZ3Jlc3Npdml0eTogbnVtYmVyID0gbnVsbDtcbiAgICByYW5nZU9mQXR0YWNrOiBudW1iZXIgPSBudWxsO1xuICAgIHJhbmdlT2ZJbnZlc3RpZ2F0ZTogbnVtYmVyID0gbnVsbDtcbiAgICBwcm90ZWN0ZWQgaW50ZXJ2YWxPZlRoaW5rOiBudW1iZXIgPSAxO1xuXG4gICAgLyog5byV55So5a+56LGhICovXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuUHJvZ3Jlc3NCYXIgfSlcbiAgICBwcm90ZWN0ZWQgYmxvb2RCYXI6IGNjLlByb2dyZXNzQmFyID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IEZyYW1lQW5pbWF0aW9uIH0pXG4gICAgcHJvdGVjdGVkIGZyYW1lQW5pbTogRnJhbWVBbmltYXRpb24gPSBudWxsO1xuXG4gICAgcHJvdGVjdGVkIGNvbWJhdExvZ2ljOiBDb21iYXRMb2dpYyA9IG51bGw7XG4gICAgcHJvdGVjdGVkIF9tb3ZlOiBNb3ZlID0gbnVsbDtcblxuXG4gICAgLyog5o6n5Yi2ICovXG4gICAgcHJvdGVjdGVkIGlzQWxpdmU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBpc1RyYWNraW5nOiBib29sZWFuID0gZmFsc2U7XG4gICAgaXNBdHRhY2tpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBpc05vbkNvbVN0YXRlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwcm90ZWN0ZWQgaW5pdENyZWF0dXJlKCkge1xuICAgICAgICB0aGlzLmlzVHJhY2tpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc0F0dGFja2luZyA9IGZhbHNlO1xuICAgICAgICAvL+WImuWHuueUn++8jOi/mOayoeaJp+ihjOmdnuaImOaWl+ihjOS4ulxuICAgICAgICB0aGlzLmlzTm9uQ29tU3RhdGUgPSBudWxsO1xuICAgICAgICB0aGlzLmlzQWxpdmUgPSB0cnVlO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCB3YWxrKGRlczogY2MuVmVjMiwgZnVuYzogRnVuY3Rpb24pO1xuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBzdG9wV2FsaygpO1xuICAgIC8qKlxuICAgICAqIOWPqui/m+ihjOenu+WKqCznp7vpmaTlhbbku5ZBY3Rpb25cbiAgICAgKiBAcGFyYW0gZGVzIOS4lueVjFxuICAgICAqIEByZXR1cm5zIOaWueWQkVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBtb3ZlKGRlczogY2MuVmVjMiwgZnVuYzogRnVuY3Rpb24gPSBudWxsLCB0OiBudW1iZXIgPSBudWxsKSB7XG4gICAgICAgIGxldCBkbnA6IGNjLlZlYzIgPSB0aGlzLm5vZGUucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKGRlcyk7XG4gICAgICAgIGxldCBjbnA6IGNjLlZlYzIgPSB0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgbGV0IGRpczogY2MuVmVjMiA9IGRucC5zdWIoY25wKTtcbiAgICAgICAgaWYgKHQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGxldCBsOiBudW1iZXIgPSBkaXMubWFnKCk7XG4gICAgICAgICAgICB0ID0gbCAvIHRoaXMuc3BlZWRPZk1vdmU7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHRoaXMuX21vdmUubW92ZVRvKGRpcywgdCwgZnVuYyk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiDmkq3mlL7mrbvkuqHliqjnlLss5Lya56e76Zmk5b2T5YmN55qE5omA5pyJ6KGM5Li6XG4gICAgICovXG4gICAgcHJvdGVjdGVkIHBsYXlEaWUoZnJhbWVzOiBjYy5TcHJpdGVGcmFtZVtdLCBmdW5jOiBGdW5jdGlvbiA9IG51bGwpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNOb25Db21TdGF0ZSlcbiAgICAgICAgICAgIHRoaXMuc3RvcE5vbkNvbUxvZ2ljKCk7XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuaXNBdHRhY2tpbmcpXG4gICAgICAgICAgICB0aGlzLmZyYW1lQW5pbS5zdG9wKCk7XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuaXNUcmFja2luZylcbiAgICAgICAgICAgIHRoaXMuc3RvcFRyYWNrKCk7XG5cbiAgICAgICAgdGhpcy5mcmFtZUFuaW0uc2V0RnJhbWVBcnJheShmcmFtZXMpO1xuICAgICAgICB0aGlzLmZyYW1lQW5pbS5wbGF5KGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGxldCBmT3V0OiBjYy5BY3Rpb25JbnRlcnZhbCA9IGNjLmZhZGVPdXQoMSk7XG4gICAgICAgICAgICBsZXQgZjogY2MuQWN0aW9uSW5zdGFudCA9IGNjLmNhbGxGdW5jKGZ1bmMpO1xuICAgICAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShmT3V0LCBmKSk7XG4gICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6K6+572u6K+l55Sf54mp5q275Lqh5bm25LuO5a2Y5rS76K6w5b2V6ZuG5Lit56e76ZmkXG4gICAgICogQHBhcmFtIGNyZWF0dXJlcyDor6XnlJ/nianlrZjlnKjnmoTpm4ZcbiAgICAgKi9cbiAgICBkaWUoY3JlYXR1cmVzOiBhbnlbXSwgc2VsZikge1xuICAgICAgICB0aGlzLmlzQWxpdmUgPSBmYWxzZTtcbiAgICAgICAgVXRpbHMucmVtdm9lSXRlbU9mQXJyYXkoY3JlYXR1cmVzLCBzZWxmKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZGVzIOebrueahOWcsCDkuJbnlYwgXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHVwZGF0ZURpcihkZXM6IGNjLlZlYzIpIHtcbiAgICAgICAgbGV0IGN3cDogY2MuVmVjMiA9IHRoaXMuZ2V0V1BvcygpO1xuICAgICAgICBpZiAoZGVzLnggPiBjd3AueClcbiAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZVggPSAxO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLm5vZGUuc2NhbGVYID0gLTE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5b6X5Yiw5YW25LiW55WM5Z2Q5qCHXG4gICAgICovXG4gICAgcHVibGljIGdldFdQb3MoKTogY2MuVmVjMiB7XG4gICAgICAgIHJldHVybiB0aGlzLm5vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUih0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Y+X5Yiw5Lyk5a6zXG4gICAgICovXG4gICAgaW5qdXJlKHY6IG51bWJlcikge1xuICAgICAgICBpZiAodGhpcy5jSFAgPT09IDApXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdGhpcy5jSFAgLT0gdjtcbiAgICAgICAgaWYgKHRoaXMuY0hQIDwgMClcbiAgICAgICAgICAgIHRoaXMuY0hQID0gMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmm7TmlrDooYDmnaHmmL7npLpcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgcmVmcmVzaEJsb29kQmFyKCkge1xuICAgICAgICBsZXQgcjogbnVtYmVyID0gdGhpcy5jSFAgLyB0aGlzLm1heEhwO1xuICAgICAgICB0aGlzLmJsb29kQmFyLnByb2dyZXNzID0gcjtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgcmVmcmVzaFN0YXRlKCk7XG5cbiAgICBhYnN0cmFjdCByZWxlYXNlU2VsZigpO1xuXG4gICAgLyoqXG4gICAgICogVHJhY2tzIGNyZWF0dXJlXG4gICAgICogQHBhcmFtIHBvcyAg5LiW55WMXG4gICAgICovXG4gICAgYWJzdHJhY3QgdHJhY2socG9zOiBjYy5WZWMyKTtcbiAgICBhYnN0cmFjdCBzdG9wVHJhY2soKTtcbiAgICBhYnN0cmFjdCByZWZyZXNoVHJhY2tUYXJnZXQocG9zOiBjYy5WZWMyKTtcbiAgICBhYnN0cmFjdCBhdHRhY2sobTogQ3JlYXR1cmUpO1xuICAgIGFic3RyYWN0IG5vbkNvbUxvZ2ljKCk7XG4gICAgYWJzdHJhY3Qgc3RvcE5vbkNvbUxvZ2ljKCk7XG5cbiAgICB1cGRhdGUoZHQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzQWxpdmUpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdGhpcy5jb21iYXRMb2dpYy50aGluaygpO1xuICAgICAgICB0aGlzLl9tb3ZlLnJlZnJlc2hNb3ZlKGR0KTtcbiAgICAgICAgdGhpcy5yZWZyZXNoU3RhdGUoKTtcbiAgICB9XG59XG4iXX0=