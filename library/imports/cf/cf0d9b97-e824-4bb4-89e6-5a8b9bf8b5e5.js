"use strict";
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