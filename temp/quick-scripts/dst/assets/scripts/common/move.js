
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/move.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cf0d9uX6CRLtInmWoub+LXl', 'move');
// scripts/common/move.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Move = /** @class */ (function () {
    /**
     * 移动组件。必须将refrshMove()在update()中调用
     */
    function Move(host) {
        this.host = null;
        /* 数据 */
        this.distance = null;
        this.duration = null;
        this.callBack = null;
        /**
         * 计时
         */
        this.ct = 0;
        /* 控制 */
        this.startMove = false;
        this.host = host;
    }
    /**
     * @param distance 移动相对距离
     * @param t 时间
     * @param callBack 回调函数
     */
    Move.prototype.moveTo = function (distance, t, callBack) {
        if (callBack === void 0) { callBack = null; }
        this.distance = distance;
        this.duration = t;
        this.callBack = callBack;
        this.ct = 0;
        this.startMove = true;
    };
    Move.prototype.stopMove = function () {
        this.startMove = false;
    };
    /**
     * 需在update()里调用
     */
    Move.prototype.refreshMove = function (dt) {
        if (!this.startMove)
            return;
        //到达目的地
        if (this.ct >= this.duration) {
            this.stopMove();
            if (this.callBack !== null)
                this.callBack();
            return;
        }
        var rate = dt / this.duration;
        var l = cc.v2(this.distance.x * rate, this.distance.y * rate);
        var newP = this.host.getPosition().add(l);
        this.host.setPosition(newP);
        this.ct += dt;
    };
    return Move;
}());
exports.default = Move;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2NvbW1vbi9tb3ZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFpQkk7O09BRUc7SUFDSCxjQUFZLElBQWE7UUFsQmpCLFNBQUksR0FBWSxJQUFJLENBQUM7UUFFN0IsUUFBUTtRQUNBLGFBQVEsR0FBWSxJQUFJLENBQUM7UUFDekIsYUFBUSxHQUFXLElBQUksQ0FBQztRQUN4QixhQUFRLEdBQWEsSUFBSSxDQUFDO1FBRWxDOztXQUVHO1FBQ0ssT0FBRSxHQUFXLENBQUMsQ0FBQztRQUV2QixRQUFRO1FBQ0EsY0FBUyxHQUFZLEtBQUssQ0FBQztRQU0vQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILHFCQUFNLEdBQU4sVUFBTyxRQUFpQixFQUFFLENBQVMsRUFBRSxRQUF5QjtRQUF6Qix5QkFBQSxFQUFBLGVBQXlCO1FBQzFELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFBO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1osSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDMUIsQ0FBQztJQUVELHVCQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUMzQixDQUFDO0lBRUQ7O09BRUc7SUFDSCwwQkFBVyxHQUFYLFVBQVksRUFBVTtRQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVM7WUFDZixPQUFPO1FBQ1gsT0FBTztRQUNQLElBQUksSUFBSSxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQzFCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNoQixJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssSUFBSTtnQkFDdEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3BCLE9BQU87U0FDVjtRQUVELElBQUksSUFBSSxHQUFXLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxHQUFZLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ3ZFLElBQUksSUFBSSxHQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTVCLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFDTCxXQUFDO0FBQUQsQ0E5REEsQUE4REMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vdmUge1xuXG4gICAgcHJpdmF0ZSBob3N0OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIC8qIOaVsOaNriAqL1xuICAgIHByaXZhdGUgZGlzdGFuY2U6IGNjLlZlYzIgPSBudWxsO1xuICAgIHByaXZhdGUgZHVyYXRpb246IG51bWJlciA9IG51bGw7XG4gICAgcHJpdmF0ZSBjYWxsQmFjazogRnVuY3Rpb24gPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICog6K6h5pe2XG4gICAgICovXG4gICAgcHJpdmF0ZSBjdDogbnVtYmVyID0gMDtcblxuICAgIC8qIOaOp+WItiAqL1xuICAgIHByaXZhdGUgc3RhcnRNb3ZlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiDnp7vliqjnu4Tku7bjgILlv4XpobvlsIZyZWZyc2hNb3ZlKCnlnKh1cGRhdGUoKeS4reiwg+eUqFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGhvc3Q6IGNjLk5vZGUpIHtcbiAgICAgICAgdGhpcy5ob3N0ID0gaG9zdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZGlzdGFuY2Ug56e75Yqo55u45a+56Led56a7XG4gICAgICogQHBhcmFtIHQg5pe26Ze0XG4gICAgICogQHBhcmFtIGNhbGxCYWNrIOWbnuiwg+WHveaVsFxuICAgICAqL1xuICAgIG1vdmVUbyhkaXN0YW5jZTogY2MuVmVjMiwgdDogbnVtYmVyLCBjYWxsQmFjazogRnVuY3Rpb24gPSBudWxsKSB7XG4gICAgICAgIHRoaXMuZGlzdGFuY2UgPSBkaXN0YW5jZVxuICAgICAgICB0aGlzLmR1cmF0aW9uID0gdDtcbiAgICAgICAgdGhpcy5jYWxsQmFjayA9IGNhbGxCYWNrO1xuICAgICAgICB0aGlzLmN0ID0gMDtcbiAgICAgICAgdGhpcy5zdGFydE1vdmUgPSB0cnVlO1xuICAgIH1cblxuICAgIHN0b3BNb3ZlKCkge1xuICAgICAgICB0aGlzLnN0YXJ0TW92ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOmcgOWcqHVwZGF0ZSgp6YeM6LCD55SoXG4gICAgICovXG4gICAgcmVmcmVzaE1vdmUoZHQ6IG51bWJlcikge1xuICAgICAgICBpZiAoIXRoaXMuc3RhcnRNb3ZlKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAvL+WIsOi+vuebrueahOWcsFxuICAgICAgICBpZiAodGhpcy5jdCA+PSB0aGlzLmR1cmF0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3BNb3ZlKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5jYWxsQmFjayAhPT0gbnVsbClcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGxCYWNrKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmF0ZTogbnVtYmVyID0gZHQgLyB0aGlzLmR1cmF0aW9uO1xuICAgICAgICBsZXQgbDogY2MuVmVjMiA9IGNjLnYyKHRoaXMuZGlzdGFuY2UueCAqIHJhdGUsIHRoaXMuZGlzdGFuY2UueSAqIHJhdGUpO1xuICAgICAgICBsZXQgbmV3UDogY2MuVmVjMiA9IHRoaXMuaG9zdC5nZXRQb3NpdGlvbigpLmFkZChsKTtcbiAgICAgICAgdGhpcy5ob3N0LnNldFBvc2l0aW9uKG5ld1ApO1xuXG4gICAgICAgIHRoaXMuY3QgKz0gZHQ7XG4gICAgfVxufVxuIl19