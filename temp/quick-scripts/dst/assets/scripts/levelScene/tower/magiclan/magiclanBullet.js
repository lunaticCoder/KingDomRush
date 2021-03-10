
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/levelScene/tower/magiclan/magiclanBullet.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4b9a4I8TTtBsL72juFLMOm2', 'magiclanBullet');
// scripts/levelScene/tower/magiclan/magiclanBullet.ts

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
var MagiclanBullet = /** @class */ (function (_super) {
    __extends(MagiclanBullet, _super);
    function MagiclanBullet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isFallFloor = false;
        _this.tower = null;
        return _this;
        // update (dt) {}
    }
    MagiclanBullet.prototype.onLoad = function () {
        this.tower = this.node.parent.getComponent("magiclanTower");
    };
    MagiclanBullet.prototype.start = function () {
    };
    MagiclanBullet.prototype.init = function (attack) {
        this.attack = attack;
    };
    /**
     * 移动，世界坐标
     * @param start 起点
     * @param end 终点
     * @param time 移动时间
     */
    MagiclanBullet.prototype.moveTo = function (start, end, time) {
        var nodeStart = this.node.parent.convertToNodeSpaceAR(start);
        var nodeEnd = this.node.parent.convertToNodeSpaceAR(end);
        var sub = nodeEnd.sub(nodeStart);
        var middle = cc.v2(nodeStart.x + sub.x / 2, nodeStart.y + sub.y / 2);
        var c = cc.v2(middle.x, nodeEnd.y + 60);
        if (start.x === end.x)
            c.x += 30;
        this.node.setPosition(nodeStart);
        var move = cc.bezierTo(time, [nodeStart, c, nodeEnd]);
        var func1 = cc.callFunc(function () {
            this.destroySelf();
        }.bind(this));
        var seq = cc.sequence(move, func1);
        this.node.runAction(seq);
    };
    MagiclanBullet.prototype.destroySelf = function () {
        this.tower.releaseBullt(this.node);
    };
    MagiclanBullet.prototype.onCollisionEnter = function (other, self) {
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
    MagiclanBullet = __decorate([
        ccclass
    ], MagiclanBullet);
    return MagiclanBullet;
}(cc.Component));
exports.default = MagiclanBullet;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2xldmVsU2NlbmUvdG93ZXIvbWFnaWNsYW4vbWFnaWNsYW5CdWxsZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR00sSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBNEMsa0NBQVk7SUFBeEQ7UUFBQSxxRUFpRUM7UUE5RFcsaUJBQVcsR0FBWSxLQUFLLENBQUM7UUFDN0IsV0FBSyxHQUFrQixJQUFJLENBQUM7O1FBNERwQyxpQkFBaUI7SUFDckIsQ0FBQztJQTNERywrQkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVELDhCQUFLLEdBQUw7SUFFQSxDQUFDO0lBRUQsNkJBQUksR0FBSixVQUFLLE1BQWM7UUFDZixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN6QixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCwrQkFBTSxHQUFOLFVBQU8sS0FBYyxFQUFFLEdBQVksRUFBRSxJQUFZO1FBQzdDLElBQUksU0FBUyxHQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RFLElBQUksT0FBTyxHQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xFLElBQUksR0FBRyxHQUFZLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUMsSUFBSSxNQUFNLEdBQVksRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM5RSxJQUFJLENBQUMsR0FBWSxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNqRCxJQUFJLEtBQUssQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDakIsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFZCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNqQyxJQUFJLElBQUksR0FBc0IsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFFekUsSUFBSSxLQUFLLEdBQXFCLEVBQUUsQ0FBQyxRQUFRLENBQUM7WUFDdEMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtRQUViLElBQUksR0FBRyxHQUFzQixFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRU8sb0NBQVcsR0FBbkI7UUFDSSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELHlDQUFnQixHQUFoQixVQUFpQixLQUFrQixFQUFFLElBQWlCO1FBQ2xELElBQUksSUFBSSxDQUFDLFdBQVc7WUFDaEIsT0FBTztRQUVYLElBQUksSUFBSSxHQUFZLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFDL0IsSUFBSSxLQUFLLEdBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUUvQixJQUFJLEtBQUssS0FBSyxPQUFPLEVBQUU7WUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUMzQixJQUFJLENBQUMsR0FBWSxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzlDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRXRCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN0QjtJQUNMLENBQUM7SUE5RGdCLGNBQWM7UUFEbEMsT0FBTztPQUNhLGNBQWMsQ0FpRWxDO0lBQUQscUJBQUM7Q0FqRUQsQUFpRUMsQ0FqRTJDLEVBQUUsQ0FBQyxTQUFTLEdBaUV2RDtrQkFqRW9CLGNBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTW9uc3RlciBmcm9tIFwiLi4vLi4vbW9uc3Rlci9tb25zdGVyXCI7XG5pbXBvcnQgTWFnaWNsYW5Ub3dlciBmcm9tIFwiLi9tYWdpY2xhblRvd2VyXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWdpY2xhbkJ1bGxldCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBwcml2YXRlIGF0dGFjazogbnVtYmVyO1xuICAgIHByaXZhdGUgaXNGYWxsRmxvb3I6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIHRvd2VyOiBNYWdpY2xhblRvd2VyID0gbnVsbDtcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy50b3dlciA9IHRoaXMubm9kZS5wYXJlbnQuZ2V0Q29tcG9uZW50KFwibWFnaWNsYW5Ub3dlclwiKTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcblxuICAgIH1cblxuICAgIGluaXQoYXR0YWNrOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5hdHRhY2sgPSBhdHRhY2s7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog56e75Yqo77yM5LiW55WM5Z2Q5qCHXG4gICAgICogQHBhcmFtIHN0YXJ0IOi1t+eCuVxuICAgICAqIEBwYXJhbSBlbmQg57uI54K5XG4gICAgICogQHBhcmFtIHRpbWUg56e75Yqo5pe26Ze0XG4gICAgICovXG4gICAgbW92ZVRvKHN0YXJ0OiBjYy5WZWMyLCBlbmQ6IGNjLlZlYzIsIHRpbWU6IG51bWJlcikge1xuICAgICAgICBsZXQgbm9kZVN0YXJ0OiBjYy5WZWMyID0gdGhpcy5ub2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUihzdGFydCk7XG4gICAgICAgIGxldCBub2RlRW5kOiBjYy5WZWMyID0gdGhpcy5ub2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUihlbmQpO1xuICAgICAgICBsZXQgc3ViOiBjYy5WZWMyID0gbm9kZUVuZC5zdWIobm9kZVN0YXJ0KTtcbiAgICAgICAgbGV0IG1pZGRsZTogY2MuVmVjMiA9IGNjLnYyKG5vZGVTdGFydC54ICsgc3ViLnggLyAyLCBub2RlU3RhcnQueSArIHN1Yi55IC8gMik7XG4gICAgICAgIGxldCBjOiBjYy5WZWMyID0gY2MudjIobWlkZGxlLngsIG5vZGVFbmQueSArIDYwKTtcbiAgICAgICAgaWYgKHN0YXJ0LnggPT09IGVuZC54KVxuICAgICAgICAgICAgYy54ICs9IDMwO1xuXG4gICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbihub2RlU3RhcnQpO1xuICAgICAgICBsZXQgbW92ZTogY2MuQWN0aW9uSW50ZXJ2YWwgPSBjYy5iZXppZXJUbyh0aW1lLCBbbm9kZVN0YXJ0LCBjLCBub2RlRW5kXSk7XG5cbiAgICAgICAgbGV0IGZ1bmMxOiBjYy5BY3Rpb25JbnN0YW50ID0gY2MuY2FsbEZ1bmMoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5kZXN0cm95U2VsZigpO1xuICAgICAgICB9LmJpbmQodGhpcykpXG5cbiAgICAgICAgbGV0IHNlcTogY2MuQWN0aW9uSW50ZXJ2YWwgPSBjYy5zZXF1ZW5jZShtb3ZlLCBmdW5jMSk7XG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oc2VxKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRlc3Ryb3lTZWxmKCkge1xuICAgICAgICB0aGlzLnRvd2VyLnJlbGVhc2VCdWxsdCh0aGlzLm5vZGUpO1xuICAgIH1cblxuICAgIG9uQ29sbGlzaW9uRW50ZXIob3RoZXI6IGNjLkNvbGxpZGVyLCBzZWxmOiBjYy5Db2xsaWRlcikge1xuICAgICAgICBpZiAodGhpcy5pc0ZhbGxGbG9vcilcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICBsZXQgbm9kZTogY2MuTm9kZSA9IG90aGVyLm5vZGU7XG4gICAgICAgIGxldCBncm91cDogc3RyaW5nID0gbm9kZS5ncm91cDtcblxuICAgICAgICBpZiAoZ3JvdXAgPT09IFwiRW5lbXlcIikge1xuICAgICAgICAgICAgdGhpcy5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgICAgICAgICBsZXQgbTogTW9uc3RlciA9IG5vZGUuZ2V0Q29tcG9uZW50KFwibW9uc3RlclwiKTtcbiAgICAgICAgICAgIG0uaW5qdXJlKHRoaXMuYXR0YWNrKTtcblxuICAgICAgICAgICAgdGhpcy5kZXN0cm95U2VsZigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==