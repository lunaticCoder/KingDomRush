"use strict";
cc._RF.push(module, 'e10f6wa86tCgJoy21R6dWZQ', 'combatLogic');
// scripts/levelScene/combatLogic.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CombatLogic = /** @class */ (function () {
    function CombatLogic(host, enemys) {
        this.host = null;
        this.enemys = null;
        this.host = host;
        this.enemys = enemys;
    }
    /**
     * Thinks combat logic
     */
    CombatLogic.prototype.think = function () {
        var eOfMinDis = this.getEnemyOfMinDis();
        if (eOfMinDis === null) {
            if (this.host.isTracking) {
                this.host.stopTrack();
                this.host.nonComLogic();
            }
            else if (!this.host.isNonComState)
                this.host.nonComLogic();
            return;
        }
        var e = eOfMinDis[0];
        var l = eOfMinDis[1];
        if (l <= this.host.rangeOfAttack) {
            if (this.host.isTracking) {
                this.host.stopTrack();
                this.host.attack(e);
            }
            else if (!this.host.isAttacking)
                this.host.attack(e);
        }
        else if (l <= this.host.rangeOfInvestigate) {
            if (this.host.isNonComState) {
                this.host.stopNonComLogic();
                this.host.track(e.getWPos());
            }
            else if (this.host.isNonComState === null) {
                this.host.isNonComState = false;
                this.host.track(e.getWPos());
            }
            else if (this.host.isTracking)
                this.host.refreshTrackTarget(e.getWPos());
            else if (this.host.isAttacking)
                return;
            else
                this.host.track(e.getWPos());
        }
        else if (!this.host.isNonComState)
            this.host.nonComLogic();
    };
    /**
     * 得到离宿主最近的敌人
     */
    CombatLogic.prototype.getEnemyOfMinDis = function () {
        if (this.enemys.length === 0)
            return null;
        var minE = this.enemys[0];
        var cp = this.host.node.getPosition();
        var ep = minE.node.getPosition();
        var minL = cp.sub(ep).mag();
        for (var i = 1; i < this.enemys.length; i++) {
            var e = this.enemys[i];
            ep = e.node.getPosition();
            var l = cp.sub(ep).mag();
            if (l < minL) {
                minL = l;
                minE = e;
            }
        }
        return [minE, minL];
    };
    return CombatLogic;
}());
exports.default = CombatLogic;

cc._RF.pop();