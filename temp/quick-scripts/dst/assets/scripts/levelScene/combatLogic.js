
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/levelScene/combatLogic.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2xldmVsU2NlbmUvY29tYmF0TG9naWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTtJQUtJLHFCQUFZLElBQWMsRUFBRSxNQUFrQjtRQUh0QyxTQUFJLEdBQWEsSUFBSSxDQUFDO1FBQ3RCLFdBQU0sR0FBZSxJQUFJLENBQUM7UUFHOUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDekIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsMkJBQUssR0FBTDtRQUNJLElBQUksU0FBUyxHQUF1QixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUM1RCxJQUFJLFNBQVMsS0FBSyxJQUFJLEVBQUU7WUFDcEIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUMzQjtpQkFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhO2dCQUM3QixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBRTVCLE9BQU87U0FDVjtRQUVELElBQUksQ0FBQyxHQUFhLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsR0FBVyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFN0IsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDOUIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDdkI7aUJBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVztnQkFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDM0I7YUFDSSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQ3hDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO2FBQ2hDO2lCQUNJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEtBQUssSUFBSSxFQUFFO2dCQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO2FBQ2hDO2lCQUNJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVO2dCQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO2lCQUN6QyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVztnQkFDMUIsT0FBTzs7Z0JBRVAsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7U0FDcEM7YUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhO1lBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUNEOztPQUVHO0lBQ0ssc0NBQWdCLEdBQXhCO1FBQ0ksSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDO1lBQ3hCLE9BQU8sSUFBSSxDQUFDO1FBRWhCLElBQUksSUFBSSxHQUFhLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEMsSUFBSSxFQUFFLEdBQVksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDL0MsSUFBSSxFQUFFLEdBQVksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMxQyxJQUFJLElBQUksR0FBVyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3BDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN6QyxJQUFJLENBQUMsR0FBYSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxHQUFXLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDakMsSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFO2dCQUNWLElBQUksR0FBRyxDQUFDLENBQUM7Z0JBQ1QsSUFBSSxHQUFHLENBQUMsQ0FBQzthQUNaO1NBQ0o7UUFDRCxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFDTCxrQkFBQztBQUFELENBOUVBLEFBOEVDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ3JlYXR1cmUgZnJvbSBcIi4vY3JlYXR1cmVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tYmF0TG9naWMge1xuXG4gICAgcHJpdmF0ZSBob3N0OiBDcmVhdHVyZSA9IG51bGw7XG4gICAgcHJpdmF0ZSBlbmVteXM6IENyZWF0dXJlW10gPSBudWxsO1xuXG4gICAgY29uc3RydWN0b3IoaG9zdDogQ3JlYXR1cmUsIGVuZW15czogQ3JlYXR1cmVbXSkge1xuICAgICAgICB0aGlzLmhvc3QgPSBob3N0O1xuICAgICAgICB0aGlzLmVuZW15cyA9IGVuZW15cztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlua3MgY29tYmF0IGxvZ2ljXG4gICAgICovXG4gICAgdGhpbmsoKSB7XG4gICAgICAgIGxldCBlT2ZNaW5EaXM6IFtDcmVhdHVyZSwgbnVtYmVyXSA9IHRoaXMuZ2V0RW5lbXlPZk1pbkRpcygpO1xuICAgICAgICBpZiAoZU9mTWluRGlzID09PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5ob3N0LmlzVHJhY2tpbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhvc3Quc3RvcFRyYWNrKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5ob3N0Lm5vbkNvbUxvZ2ljKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghdGhpcy5ob3N0LmlzTm9uQ29tU3RhdGUpXG4gICAgICAgICAgICAgICAgdGhpcy5ob3N0Lm5vbkNvbUxvZ2ljKCk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBlOiBDcmVhdHVyZSA9IGVPZk1pbkRpc1swXTtcbiAgICAgICAgbGV0IGw6IG51bWJlciA9IGVPZk1pbkRpc1sxXTtcblxuICAgICAgICBpZiAobCA8PSB0aGlzLmhvc3QucmFuZ2VPZkF0dGFjaykge1xuICAgICAgICAgICAgaWYgKHRoaXMuaG9zdC5pc1RyYWNraW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ob3N0LnN0b3BUcmFjaygpO1xuICAgICAgICAgICAgICAgIHRoaXMuaG9zdC5hdHRhY2soZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghdGhpcy5ob3N0LmlzQXR0YWNraW5nKVxuICAgICAgICAgICAgICAgIHRoaXMuaG9zdC5hdHRhY2soZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobCA8PSB0aGlzLmhvc3QucmFuZ2VPZkludmVzdGlnYXRlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5ob3N0LmlzTm9uQ29tU3RhdGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhvc3Quc3RvcE5vbkNvbUxvZ2ljKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5ob3N0LnRyYWNrKGUuZ2V0V1BvcygpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuaG9zdC5pc05vbkNvbVN0YXRlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ob3N0LmlzTm9uQ29tU3RhdGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmhvc3QudHJhY2soZS5nZXRXUG9zKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5ob3N0LmlzVHJhY2tpbmcpXG4gICAgICAgICAgICAgICAgdGhpcy5ob3N0LnJlZnJlc2hUcmFja1RhcmdldChlLmdldFdQb3MoKSk7XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmhvc3QuaXNBdHRhY2tpbmcpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHRoaXMuaG9zdC50cmFjayhlLmdldFdQb3MoKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIXRoaXMuaG9zdC5pc05vbkNvbVN0YXRlKVxuICAgICAgICAgICAgdGhpcy5ob3N0Lm5vbkNvbUxvZ2ljKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOW+l+WIsOemu+Wuv+S4u+acgOi/keeahOaVjOS6ulxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0RW5lbXlPZk1pbkRpcygpOiBbQ3JlYXR1cmUsIG51bWJlcl0ge1xuICAgICAgICBpZiAodGhpcy5lbmVteXMubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgbGV0IG1pbkU6IENyZWF0dXJlID0gdGhpcy5lbmVteXNbMF07XG4gICAgICAgIGxldCBjcDogY2MuVmVjMiA9IHRoaXMuaG9zdC5ub2RlLmdldFBvc2l0aW9uKCk7XG4gICAgICAgIGxldCBlcDogY2MuVmVjMiA9IG1pbkUubm9kZS5nZXRQb3NpdGlvbigpO1xuICAgICAgICBsZXQgbWluTDogbnVtYmVyID0gY3Auc3ViKGVwKS5tYWcoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCB0aGlzLmVuZW15cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGU6IENyZWF0dXJlID0gdGhpcy5lbmVteXNbaV07XG4gICAgICAgICAgICBlcCA9IGUubm9kZS5nZXRQb3NpdGlvbigpO1xuICAgICAgICAgICAgbGV0IGw6IG51bWJlciA9IGNwLnN1YihlcCkubWFnKCk7XG4gICAgICAgICAgICBpZiAobCA8IG1pbkwpIHtcbiAgICAgICAgICAgICAgICBtaW5MID0gbDtcbiAgICAgICAgICAgICAgICBtaW5FID0gZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW21pbkUsIG1pbkxdO1xuICAgIH1cbn1cbiJdfQ==