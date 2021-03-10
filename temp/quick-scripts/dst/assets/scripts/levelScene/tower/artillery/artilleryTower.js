
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/levelScene/tower/artillery/artilleryTower.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fc15buo1VJP94ELmP767FOP', 'artilleryTower');
// scripts/levelScene/tower/artillery/artilleryTower.ts

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
var gameDataManager_1 = require("../../../common/module/gameDataManager");
var monster_1 = require("../../monster/monster");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ArtilleryFrames = /** @class */ (function () {
    function ArtilleryFrames() {
        this.frames = [];
        this.bullet = [];
    }
    __decorate([
        property({
            type: [cc.SpriteFrame]
        })
    ], ArtilleryFrames.prototype, "frames", void 0);
    __decorate([
        property({
            type: [cc.SpriteFrame],
            tooltip: "炮弹的图片"
        })
    ], ArtilleryFrames.prototype, "bullet", void 0);
    ArtilleryFrames = __decorate([
        ccclass("ArtilleryFrames")
    ], ArtilleryFrames);
    return ArtilleryFrames;
}());
var Artillery = /** @class */ (function (_super) {
    __extends(Artillery, _super);
    function Artillery() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.towers = [];
        _this.addBulletNodes = [];
        _this.bulletPrefab = [];
        _this.frameAnimation = null;
        _this.bg = null;
        /* 数据 */
        _this.addBulletData = [
            {
                startPos: cc.v2(-20, 10),
                ctrlPos: cc.v2(-11, 55),
                endPos: cc.v2(3, 20),
                shootDelay: 0.9,
                addBulletDelay: 1.4
            },
            {
                startPos: cc.v2(-22, 16),
                ctrlPos: cc.v2(-12, 55),
                endPos: cc.v2(3, 25),
                shootDelay: 1.1,
                addBulletDelay: 1.8
            },
            {
                startPos: cc.v2(-22, 16),
                ctrlPos: cc.v2(-13, 55),
                endPos: cc.v2(4, 25),
                shootDelay: 0.9,
                addBulletDelay: 1.4
            },
        ];
        /**
         * 塔的世界坐标
         */
        _this.wPos = null;
        _this.poolsOfBullet = [];
        /* 塔的属性 */
        _this.level = 1;
        _this.maxLevel = 3;
        /* 控制 */
        _this.shootable = false;
        return _this;
    }
    Artillery.prototype.onLoad = function () {
        this.bg = this.node.getChildByName("bg");
        this.frameAnimation = this.bg.getComponent("frameAnimation");
        this.gameConfig = gameDataManager_1.default.getGameConfig();
        this.dataOfTower = this.gameConfig.getDataOfArtillery();
        this.monsterArray = monster_1.default.monstersOfAlive;
        this.createPoolsOfBullet();
    };
    Artillery.prototype.start = function () {
        this.init();
    };
    /**
     * 初始化攻击力、动画、
     * @returns
     */
    Artillery.prototype.init = function () {
        var _this = this;
        this.attack = this.dataOfTower[this.level - 1].attack;
        this.speedOfBullet = this.dataOfTower[this.level - 1].speedOfBullet;
        this.bombRange = this.dataOfTower[this.level - 1].bombRange;
        this.shootRange = this.dataOfTower[this.level - 1].shootRange;
        this.intervalOfShoot = this.dataOfTower[this.level - 1].intervalOfShoot;
        this.price = this.dataOfTower[this.level - 1].price;
        this.frameAnimation.setFrameArray(this.towers[this.level - 1].frames);
        this.frameAnimation.setSpriteFrame(this.towers[this.level - 1].frames[0]);
        this.wPos = this.node.parent.convertToWorldSpaceAR(this.node.getPosition());
        this.addBulletNodes[0].getComponent(cc.Sprite).spriteFrame = this.towers[this.level - 1].bullet[0];
        this.addBulletAnim();
        this.scheduleOnce((function () { _this.shootable = true; }).bind(this), this.intervalOfShoot);
    };
    /* 炮弹对象池 */
    Artillery.prototype.createPoolsOfBullet = function () {
        for (var i = 0; i < this.bulletPrefab.length; i++) {
            this.poolsOfBullet.push(new cc.NodePool());
            var p = this.bulletPrefab[i];
            this.poolsOfBullet[i].put(cc.instantiate(p));
        }
    };
    Artillery.prototype.getBullet = function (level) {
        var r = null;
        if (this.poolsOfBullet[level - 1].size() > 0)
            r = this.poolsOfBullet[level].get();
        else
            r = cc.instantiate(this.bulletPrefab[level - 1]);
        r.opacity = 255;
        return r;
    };
    Artillery.prototype.releaseBullt = function (level, n) {
        this.poolsOfBullet[level - 1].put(n);
    };
    Artillery.prototype.clearPoolsOfBullet = function () {
        for (var i = 0; i < this.poolsOfBullet.length; i++)
            this.poolsOfBullet[i].clear();
    };
    /**
     * 射击
     * @param des 世界坐标
     * @param time 子弹到des的时间
     */
    Artillery.prototype.shoot = function (des, time) {
        if (time === void 0) { time = null; }
        if (!this.shootable)
            return;
        this.shootable = false;
        if (time === null) {
            var l = this.wPos.sub(des).mag();
            var time_1 = l / this.speedOfBullet;
        }
        this.frameAnimation.play(false, false, false, function () {
            var _this = this;
            this.shootBullet(des, time);
            this.addBulletAnim();
            this.scheduleOnce((function () {
                _this.shootable = true;
            }).bind(this), this.intervalOfShoot);
        }.bind(this));
    };
    /**
     * 射出子弹
     */
    Artillery.prototype.shootBullet = function (des, time) {
        var a = this.createBullet();
        var wPos = this.bg.convertToWorldSpaceAR(this.addBulletData[this.level - 1].endPos);
        a.moveTo(wPos, des, time);
    };
    Artillery.prototype.createBullet = function () {
        var artillery = cc.instantiate(this.bulletPrefab[this.level - 1]).getComponent("artilleryBullet");
        this.node.addChild(artillery.node);
        artillery.init(this.level, this.attack, this.bombRange);
        var bg = this.node.getChildByName("bg");
        return artillery;
    };
    /**
     * 根据怪物此时的位置，预判子弹到达后，怪物的新位置
     * @param monster
     * @param cP 此时怪物的坐标 世界坐标
     * @returns 怪物预测位置,世界; 子弹达到预测位置的时间
     */
    Artillery.prototype.forecastMovePos = function (monster, cP) {
        //从填弹到子弹飞行到cP的时间
        var bulletStartPos = this.bg.convertToWorldSpaceAR(this.addBulletData[this.level - 1].endPos);
        var time = cP.sub(bulletStartPos).mag() / this.speedOfBullet + this.addBulletData[this.level - 1].shootDelay;
        var mWP = monster.getPosInTime(time);
        if (!this.inShootRange(mWP))
            return null;
        return [mWP.x, mWP.y, time - this.addBulletData[this.level - 1].shootDelay];
    };
    /**
     * 播放填弹动画
     */
    Artillery.prototype.addBulletAnim = function () {
        this.addBulletNodes[0].scale = 1;
        this.addBulletNodes[0].setPosition(this.addBulletData[this.level - 1].startPos);
        var a = cc.bezierTo(0.5, [this.addBulletData[this.level - 1].startPos, this.addBulletData[this.level - 1].ctrlPos, this.addBulletData[this.level - 1].endPos]);
        var func = cc.callFunc(function () {
            this.addBulletNodes[0].scale = 0;
        }, this);
        var seq = cc.sequence(a, func);
        this.addBulletNodes[0].runAction(seq);
    };
    Artillery.prototype.destroySelf = function () {
        this.clearPoolsOfBullet();
        this.node.destroy();
    };
    /**
     * 升级
     */
    Artillery.prototype.upgrade = function () {
        if (this.level === this.maxLevel)
            return;
        this.level++;
        this.init();
    };
    Artillery.prototype.getPriceOfUpgrade = function () {
        return this.dataOfTower[this.level].price;
    };
    Artillery.prototype.getDataOfTower = function () {
        return this.dataOfTower;
    };
    /**
     * 判断该点是否在射程内
     * @param pos 世界坐标
     */
    Artillery.prototype.inShootRange = function (pos) {
        var l = this.wPos.sub(pos).mag();
        if (l <= this.shootRange)
            return true;
        return false;
    };
    Artillery.prototype.update = function (dt) {
        if (this.shootable) {
            for (var i = 0; i < this.monsterArray.length; i++) {
                var m = this.monsterArray[i];
                var mP = m.getWPos();
                if (this.inShootRange(mP)) {
                    if (m.swiOfRecursionInPW) {
                        var d = this.forecastMovePos(m, mP);
                        if (d !== null) {
                            this.shoot(cc.v2(d[0], d[1]), d[2]);
                            return;
                        }
                    }
                    else {
                        this.shoot(m.getWPos());
                        return;
                    }
                }
            }
        }
    };
    __decorate([
        property({
            type: ArtilleryFrames,
            tooltip: "塔的图片资源"
        })
    ], Artillery.prototype, "towers", void 0);
    __decorate([
        property({
            type: [cc.Node],
            tooltip: "填弹动画的子弹的节点"
        })
    ], Artillery.prototype, "addBulletNodes", void 0);
    __decorate([
        property({
            type: [cc.Prefab],
        })
    ], Artillery.prototype, "bulletPrefab", void 0);
    Artillery = __decorate([
        ccclass
    ], Artillery);
    return Artillery;
}(cc.Component));
exports.default = Artillery;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2xldmVsU2NlbmUvdG93ZXIvYXJ0aWxsZXJ5L2FydGlsbGVyeVRvd2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLDBFQUFxRjtBQUNyRixpREFBNEM7QUFFdEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBQTtRQUlJLFdBQU0sR0FBcUIsRUFBRSxDQUFDO1FBTTlCLFdBQU0sR0FBcUIsRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFQRztRQUhDLFFBQVEsQ0FBQztZQUNOLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7U0FDekIsQ0FBQzttREFDNEI7SUFNOUI7UUFKQyxRQUFRLENBQUM7WUFDTixJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO1lBQ3RCLE9BQU8sRUFBRSxPQUFPO1NBQ25CLENBQUM7bURBQzRCO0lBVjVCLGVBQWU7UUFEcEIsT0FBTyxDQUFDLGlCQUFpQixDQUFDO09BQ3JCLGVBQWUsQ0FXcEI7SUFBRCxzQkFBQztDQVhELEFBV0MsSUFBQTtBQUdEO0lBQXVDLDZCQUFZO0lBQW5EO1FBQUEscUVBeVFDO1FBblFXLFlBQU0sR0FBc0IsRUFBRSxDQUFDO1FBTS9CLG9CQUFjLEdBQWMsRUFBRSxDQUFDO1FBSy9CLGtCQUFZLEdBQWdCLEVBQUUsQ0FBQztRQUUvQixvQkFBYyxHQUFtQixJQUFJLENBQUM7UUFHdEMsUUFBRSxHQUFZLElBQUksQ0FBQztRQUczQixRQUFRO1FBQ0EsbUJBQWEsR0FBRztZQUNwQjtnQkFDSSxRQUFRLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7Z0JBQ3hCLE9BQU8sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FB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LElBQUksRUFBRTs0QkFDWixJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNwQyxPQUFPO3lCQUNWO3FCQUNKO3lCQUNJO3dCQUNELElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7d0JBQ3hCLE9BQU87cUJBQ1Y7aUJBQ0o7YUFDSjtTQUNKO0lBQ0wsQ0FBQztJQWxRRDtRQUpDLFFBQVEsQ0FBQztZQUNOLElBQUksRUFBRSxlQUFlO1lBQ3JCLE9BQU8sRUFBRSxRQUFRO1NBQ3BCLENBQUM7NkNBQ3FDO0lBTXZDO1FBSkMsUUFBUSxDQUFDO1lBQ04sSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztZQUNmLE9BQU8sRUFBRSxZQUFZO1NBQ3hCLENBQUM7cURBQ3FDO0lBS3ZDO1FBSEMsUUFBUSxDQUFDO1lBQ04sSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztTQUNwQixDQUFDO21EQUNxQztJQWpCdEIsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQXlRN0I7SUFBRCxnQkFBQztDQXpRRCxBQXlRQyxDQXpRc0MsRUFBRSxDQUFDLFNBQVMsR0F5UWxEO2tCQXpRb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBGcmFtZUFuaW1hdGlvbiBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2ZyYW1lQW5pbWF0aW9uXCI7XG5pbXBvcnQgQXJ0aWxsZXJ5QnVsbGV0IGZyb20gXCIuL2FydGlsbGVyeUJ1bGxldFwiO1xuaW1wb3J0IEdhbWVEYXRhU3RvcmFnZSwgeyBHYW1lQ29uZmlnIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9tb2R1bGUvZ2FtZURhdGFNYW5hZ2VyXCI7XG5pbXBvcnQgTW9uc3RlciBmcm9tIFwiLi4vLi4vbW9uc3Rlci9tb25zdGVyXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzKFwiQXJ0aWxsZXJ5RnJhbWVzXCIpXG5jbGFzcyBBcnRpbGxlcnlGcmFtZXMge1xuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IFtjYy5TcHJpdGVGcmFtZV1cbiAgICB9KVxuICAgIGZyYW1lczogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xuXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogW2NjLlNwcml0ZUZyYW1lXSxcbiAgICAgICAgdG9vbHRpcDogXCLngq7lvLnnmoTlm77niYdcIlxuICAgIH0pXG4gICAgYnVsbGV0OiBjYy5TcHJpdGVGcmFtZVtdID0gW107XG59XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcnRpbGxlcnkgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogQXJ0aWxsZXJ5RnJhbWVzLFxuICAgICAgICB0b29sdGlwOiBcIuWhlOeahOWbvueJh+i1hOa6kFwiXG4gICAgfSlcbiAgICBwcml2YXRlIHRvd2VyczogQXJ0aWxsZXJ5RnJhbWVzW10gPSBbXTtcblxuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IFtjYy5Ob2RlXSxcbiAgICAgICAgdG9vbHRpcDogXCLloavlvLnliqjnlLvnmoTlrZDlvLnnmoToioLngrlcIlxuICAgIH0pXG4gICAgcHJpdmF0ZSBhZGRCdWxsZXROb2RlczogY2MuTm9kZVtdID0gW107XG5cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBbY2MuUHJlZmFiXSxcbiAgICB9KVxuICAgIHByaXZhdGUgYnVsbGV0UHJlZmFiOiBjYy5QcmVmYWJbXSA9IFtdO1xuXG4gICAgcHJpdmF0ZSBmcmFtZUFuaW1hdGlvbjogRnJhbWVBbmltYXRpb24gPSBudWxsO1xuICAgIHByaXZhdGUgZ2FtZUNvbmZpZzogR2FtZUNvbmZpZztcbiAgICBwcml2YXRlIG1vbnN0ZXJBcnJheTogTW9uc3RlcltdO1xuICAgIHByaXZhdGUgYmc6IGNjLk5vZGUgPSBudWxsO1xuXG5cbiAgICAvKiDmlbDmja4gKi9cbiAgICBwcml2YXRlIGFkZEJ1bGxldERhdGEgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHN0YXJ0UG9zOiBjYy52MigtMjAsIDEwKSwgLy9iZ+S4i+eahOiKgueCueWdkOagh1xuICAgICAgICAgICAgY3RybFBvczogY2MudjIoLTExLCA1NSksXG4gICAgICAgICAgICBlbmRQb3M6IGNjLnYyKDMsIDIwKSxcbiAgICAgICAgICAgIHNob290RGVsYXk6IDAuOSxcbiAgICAgICAgICAgIGFkZEJ1bGxldERlbGF5OiAxLjRcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgc3RhcnRQb3M6IGNjLnYyKC0yMiwgMTYpLFxuICAgICAgICAgICAgY3RybFBvczogY2MudjIoLTEyLCA1NSksXG4gICAgICAgICAgICBlbmRQb3M6IGNjLnYyKDMsIDI1KSxcbiAgICAgICAgICAgIHNob290RGVsYXk6IDEuMSxcbiAgICAgICAgICAgIGFkZEJ1bGxldERlbGF5OiAxLjhcblxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzdGFydFBvczogY2MudjIoLTIyLCAxNiksXG4gICAgICAgICAgICBjdHJsUG9zOiBjYy52MigtMTMsIDU1KSxcbiAgICAgICAgICAgIGVuZFBvczogY2MudjIoNCwgMjUpLFxuICAgICAgICAgICAgc2hvb3REZWxheTogMC45LFxuICAgICAgICAgICAgYWRkQnVsbGV0RGVsYXk6IDEuNFxuXG4gICAgICAgIH0sXG4gICAgXVxuICAgIC8qKlxuICAgICAqIOWhlOeahOS4lueVjOWdkOagh1xuICAgICAqL1xuICAgIHByaXZhdGUgd1BvczogY2MuVmVjMiA9IG51bGw7XG4gICAgcHJpdmF0ZSBwb29sc09mQnVsbGV0OiBjYy5Ob2RlUG9vbFtdID0gW107XG4gICAgcHJpdmF0ZSBkYXRhT2ZUb3dlcjogYW55W107XG5cbiAgICAvKiDloZTnmoTlsZ7mgKcgKi9cbiAgICBsZXZlbDogbnVtYmVyID0gMTtcbiAgICBtYXhMZXZlbDogbnVtYmVyID0gMztcbiAgICBwcml2YXRlIHNwZWVkT2ZCdWxsZXQ6IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiDngrjlvLnniIbngrjojIPlm7RcbiAgICAgKi9cbiAgICBwcml2YXRlIGJvbWJSYW5nZTogbnVtYmVyO1xuICAgIHNob290UmFuZ2U6IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiDmlLvlh7vliptcbiAgICAgKi9cbiAgICBhdHRhY2s6IG51bWJlcjtcbiAgICBwcml2YXRlIGludGVydmFsT2ZTaG9vdDogbnVtYmVyO1xuICAgIHByaWNlOiBudW1iZXI7XG5cbiAgICAvKiDmjqfliLYgKi9cbiAgICBwcml2YXRlIHNob290YWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICB0aGlzLmJnID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmdcIik7XG4gICAgICAgIHRoaXMuZnJhbWVBbmltYXRpb24gPSB0aGlzLmJnLmdldENvbXBvbmVudChcImZyYW1lQW5pbWF0aW9uXCIpO1xuICAgICAgICB0aGlzLmdhbWVDb25maWcgPSBHYW1lRGF0YVN0b3JhZ2UuZ2V0R2FtZUNvbmZpZygpO1xuICAgICAgICB0aGlzLmRhdGFPZlRvd2VyID0gdGhpcy5nYW1lQ29uZmlnLmdldERhdGFPZkFydGlsbGVyeSgpO1xuICAgICAgICB0aGlzLm1vbnN0ZXJBcnJheSA9IE1vbnN0ZXIubW9uc3RlcnNPZkFsaXZlO1xuXG4gICAgICAgIHRoaXMuY3JlYXRlUG9vbHNPZkJ1bGxldCgpO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliJ3lp4vljJbmlLvlh7vlipvjgIHliqjnlLvjgIFcbiAgICAgKiBAcmV0dXJucyAgXG4gICAgICovXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5hdHRhY2sgPSB0aGlzLmRhdGFPZlRvd2VyW3RoaXMubGV2ZWwgLSAxXS5hdHRhY2s7XG4gICAgICAgIHRoaXMuc3BlZWRPZkJ1bGxldCA9IHRoaXMuZGF0YU9mVG93ZXJbdGhpcy5sZXZlbCAtIDFdLnNwZWVkT2ZCdWxsZXQ7XG4gICAgICAgIHRoaXMuYm9tYlJhbmdlID0gdGhpcy5kYXRhT2ZUb3dlclt0aGlzLmxldmVsIC0gMV0uYm9tYlJhbmdlO1xuICAgICAgICB0aGlzLnNob290UmFuZ2UgPSB0aGlzLmRhdGFPZlRvd2VyW3RoaXMubGV2ZWwgLSAxXS5zaG9vdFJhbmdlO1xuICAgICAgICB0aGlzLmludGVydmFsT2ZTaG9vdCA9IHRoaXMuZGF0YU9mVG93ZXJbdGhpcy5sZXZlbCAtIDFdLmludGVydmFsT2ZTaG9vdDtcbiAgICAgICAgdGhpcy5wcmljZSA9IHRoaXMuZGF0YU9mVG93ZXJbdGhpcy5sZXZlbCAtIDFdLnByaWNlO1xuXG4gICAgICAgIHRoaXMuZnJhbWVBbmltYXRpb24uc2V0RnJhbWVBcnJheSh0aGlzLnRvd2Vyc1t0aGlzLmxldmVsIC0gMV0uZnJhbWVzKTtcbiAgICAgICAgdGhpcy5mcmFtZUFuaW1hdGlvbi5zZXRTcHJpdGVGcmFtZSh0aGlzLnRvd2Vyc1t0aGlzLmxldmVsIC0gMV0uZnJhbWVzWzBdKTtcbiAgICAgICAgdGhpcy53UG9zID0gdGhpcy5ub2RlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIodGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpO1xuXG4gICAgICAgIHRoaXMuYWRkQnVsbGV0Tm9kZXNbMF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnRvd2Vyc1t0aGlzLmxldmVsIC0gMV0uYnVsbGV0WzBdO1xuXG4gICAgICAgIHRoaXMuYWRkQnVsbGV0QW5pbSgpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKCkgPT4geyB0aGlzLnNob290YWJsZSA9IHRydWU7IH0pLmJpbmQodGhpcyksIHRoaXMuaW50ZXJ2YWxPZlNob290KTtcbiAgICB9XG5cbiAgICAvKiDngq7lvLnlr7nosaHmsaAgKi9cbiAgICBwcml2YXRlIGNyZWF0ZVBvb2xzT2ZCdWxsZXQoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5idWxsZXRQcmVmYWIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMucG9vbHNPZkJ1bGxldC5wdXNoKG5ldyBjYy5Ob2RlUG9vbCgpKTtcbiAgICAgICAgICAgIGxldCBwOiBjYy5QcmVmYWIgPSB0aGlzLmJ1bGxldFByZWZhYltpXTtcbiAgICAgICAgICAgIHRoaXMucG9vbHNPZkJ1bGxldFtpXS5wdXQoY2MuaW5zdGFudGlhdGUocCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldEJ1bGxldChsZXZlbDogbnVtYmVyKTogY2MuTm9kZSB7XG4gICAgICAgIGxldCByOiBjYy5Ob2RlID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMucG9vbHNPZkJ1bGxldFtsZXZlbCAtIDFdLnNpemUoKSA+IDApXG4gICAgICAgICAgICByID0gdGhpcy5wb29sc09mQnVsbGV0W2xldmVsXS5nZXQoKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgciA9IGNjLmluc3RhbnRpYXRlKHRoaXMuYnVsbGV0UHJlZmFiW2xldmVsIC0gMV0pO1xuICAgICAgICByLm9wYWNpdHkgPSAyNTU7XG4gICAgICAgIHJldHVybiByO1xuICAgIH1cbiAgICByZWxlYXNlQnVsbHQobGV2ZWw6IG51bWJlciwgbjogY2MuTm9kZSkge1xuICAgICAgICB0aGlzLnBvb2xzT2ZCdWxsZXRbbGV2ZWwgLSAxXS5wdXQobik7XG4gICAgfVxuICAgIHByaXZhdGUgY2xlYXJQb29sc09mQnVsbGV0KCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucG9vbHNPZkJ1bGxldC5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgIHRoaXMucG9vbHNPZkJ1bGxldFtpXS5jbGVhcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWwhOWHu1xuICAgICAqIEBwYXJhbSBkZXMg5LiW55WM5Z2Q5qCHXG4gICAgICogQHBhcmFtIHRpbWUg5a2Q5by55YiwZGVz55qE5pe26Ze0XG4gICAgICovXG4gICAgcHJpdmF0ZSBzaG9vdChkZXM6IGNjLlZlYzIsIHRpbWU6IG51bWJlciA9IG51bGwpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNob290YWJsZSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5zaG9vdGFibGUgPSBmYWxzZTtcblxuICAgICAgICBpZiAodGltZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgbGV0IGw6IG51bWJlciA9IHRoaXMud1Bvcy5zdWIoZGVzKS5tYWcoKTtcbiAgICAgICAgICAgIGxldCB0aW1lID0gbCAvIHRoaXMuc3BlZWRPZkJ1bGxldDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZnJhbWVBbmltYXRpb24ucGxheShmYWxzZSwgZmFsc2UsIGZhbHNlLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnNob290QnVsbGV0KGRlcywgdGltZSk7XG4gICAgICAgICAgICB0aGlzLmFkZEJ1bGxldEFuaW0oKTtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG9vdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgfSkuYmluZCh0aGlzKSwgdGhpcy5pbnRlcnZhbE9mU2hvb3QpO1xuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWwhOWHuuWtkOW8uVxuICAgICAqL1xuICAgIHByaXZhdGUgc2hvb3RCdWxsZXQoZGVzOiBjYy5WZWMyLCB0aW1lOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGE6IEFydGlsbGVyeUJ1bGxldCA9IHRoaXMuY3JlYXRlQnVsbGV0KCk7XG4gICAgICAgIGxldCB3UG9zOiBjYy5WZWMyID0gdGhpcy5iZy5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIodGhpcy5hZGRCdWxsZXREYXRhW3RoaXMubGV2ZWwgLSAxXS5lbmRQb3MpO1xuICAgICAgICBhLm1vdmVUbyh3UG9zLCBkZXMsIHRpbWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlQnVsbGV0KCk6IEFydGlsbGVyeUJ1bGxldCB7XG4gICAgICAgIGxldCBhcnRpbGxlcnk6IEFydGlsbGVyeUJ1bGxldCA9IGNjLmluc3RhbnRpYXRlKHRoaXMuYnVsbGV0UHJlZmFiW3RoaXMubGV2ZWwgLSAxXSkuZ2V0Q29tcG9uZW50KFwiYXJ0aWxsZXJ5QnVsbGV0XCIpO1xuICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQoYXJ0aWxsZXJ5Lm5vZGUpO1xuICAgICAgICBhcnRpbGxlcnkuaW5pdCh0aGlzLmxldmVsLCB0aGlzLmF0dGFjaywgdGhpcy5ib21iUmFuZ2UpO1xuICAgICAgICBsZXQgYmc6IGNjLk5vZGUgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKTtcbiAgICAgICAgcmV0dXJuIGFydGlsbGVyeTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmoLnmja7mgKrnianmraTml7bnmoTkvY3nva7vvIzpooTliKTlrZDlvLnliLDovr7lkI7vvIzmgKrniannmoTmlrDkvY3nva5cbiAgICAgKiBAcGFyYW0gbW9uc3RlciBcbiAgICAgKiBAcGFyYW0gY1Ag5q2k5pe25oCq54mp55qE5Z2Q5qCHIOS4lueVjOWdkOagh1xuICAgICAqIEByZXR1cm5zIOaAqueJqemihOa1i+S9jee9rizkuJbnlYw7IOWtkOW8uei+vuWIsOmihOa1i+S9jee9rueahOaXtumXtFxuICAgICAqL1xuICAgIHByaXZhdGUgZm9yZWNhc3RNb3ZlUG9zKG1vbnN0ZXI6IE1vbnN0ZXIsIGNQOiBjYy5WZWMyKTogbnVtYmVyW10ge1xuICAgICAgICAvL+S7juWhq+W8ueWIsOWtkOW8uemjnuihjOWIsGNQ55qE5pe26Ze0XG4gICAgICAgIGxldCBidWxsZXRTdGFydFBvczogY2MuVmVjMiA9IHRoaXMuYmcuY29udmVydFRvV29ybGRTcGFjZUFSKHRoaXMuYWRkQnVsbGV0RGF0YVt0aGlzLmxldmVsIC0gMV0uZW5kUG9zKTtcbiAgICAgICAgbGV0IHRpbWU6IG51bWJlciA9IGNQLnN1YihidWxsZXRTdGFydFBvcykubWFnKCkgLyB0aGlzLnNwZWVkT2ZCdWxsZXQgKyB0aGlzLmFkZEJ1bGxldERhdGFbdGhpcy5sZXZlbCAtIDFdLnNob290RGVsYXk7XG5cbiAgICAgICAgbGV0IG1XUDogY2MuVmVjMiA9IG1vbnN0ZXIuZ2V0UG9zSW5UaW1lKHRpbWUpO1xuICAgICAgICBpZiAoIXRoaXMuaW5TaG9vdFJhbmdlKG1XUCkpXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuIFttV1AueCwgbVdQLnksIHRpbWUgLSB0aGlzLmFkZEJ1bGxldERhdGFbdGhpcy5sZXZlbCAtIDFdLnNob290RGVsYXldO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaSreaUvuWhq+W8ueWKqOeUu1xuICAgICAqL1xuICAgIHByaXZhdGUgYWRkQnVsbGV0QW5pbSgpIHtcbiAgICAgICAgdGhpcy5hZGRCdWxsZXROb2Rlc1swXS5zY2FsZSA9IDE7XG4gICAgICAgIHRoaXMuYWRkQnVsbGV0Tm9kZXNbMF0uc2V0UG9zaXRpb24odGhpcy5hZGRCdWxsZXREYXRhW3RoaXMubGV2ZWwgLSAxXS5zdGFydFBvcyk7XG4gICAgICAgIGxldCBhOiBjYy5BY3Rpb25JbnRlcnZhbCA9IGNjLmJlemllclRvKDAuNSwgW3RoaXMuYWRkQnVsbGV0RGF0YVt0aGlzLmxldmVsIC0gMV0uc3RhcnRQb3MsIHRoaXMuYWRkQnVsbGV0RGF0YVt0aGlzLmxldmVsIC0gMV0uY3RybFBvcywgdGhpcy5hZGRCdWxsZXREYXRhW3RoaXMubGV2ZWwgLSAxXS5lbmRQb3NdKTtcbiAgICAgICAgbGV0IGZ1bmM6IGNjLkFjdGlvbkluc3RhbnQgPSBjYy5jYWxsRnVuYyhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmFkZEJ1bGxldE5vZGVzWzBdLnNjYWxlID0gMDtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIGxldCBzZXE6IGNjLkFjdGlvbkludGVydmFsID0gY2Muc2VxdWVuY2UoYSwgZnVuYyk7XG4gICAgICAgIHRoaXMuYWRkQnVsbGV0Tm9kZXNbMF0ucnVuQWN0aW9uKHNlcSk7XG4gICAgfVxuXG4gICAgZGVzdHJveVNlbGYoKSB7XG4gICAgICAgIHRoaXMuY2xlYXJQb29sc09mQnVsbGV0KCk7XG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Y2H57qnXG4gICAgICovXG4gICAgdXBncmFkZSgpIHtcbiAgICAgICAgaWYgKHRoaXMubGV2ZWwgPT09IHRoaXMubWF4TGV2ZWwpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMubGV2ZWwrKztcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuXG4gICAgZ2V0UHJpY2VPZlVwZ3JhZGUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YU9mVG93ZXJbdGhpcy5sZXZlbF0ucHJpY2U7XG4gICAgfVxuXG4gICAgZ2V0RGF0YU9mVG93ZXIoKTogYW55W10ge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhT2ZUb3dlcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliKTmlq3or6XngrnmmK/lkKblnKjlsITnqIvlhoVcbiAgICAgKiBAcGFyYW0gcG9zIOS4lueVjOWdkOagh1xuICAgICAqL1xuICAgIHByaXZhdGUgaW5TaG9vdFJhbmdlKHBvczogY2MuVmVjMik6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgbDogbnVtYmVyID0gdGhpcy53UG9zLnN1Yihwb3MpLm1hZygpO1xuICAgICAgICBpZiAobCA8PSB0aGlzLnNob290UmFuZ2UpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHVwZGF0ZShkdCkge1xuICAgICAgICBpZiAodGhpcy5zaG9vdGFibGUpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5tb25zdGVyQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgbTogTW9uc3RlciA9IHRoaXMubW9uc3RlckFycmF5W2ldO1xuICAgICAgICAgICAgICAgIGxldCBtUDogY2MuVmVjMiA9IG0uZ2V0V1BvcygpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmluU2hvb3RSYW5nZShtUCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG0uc3dpT2ZSZWN1cnNpb25JblBXKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZDogbnVtYmVyW10gPSB0aGlzLmZvcmVjYXN0TW92ZVBvcyhtLCBtUCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvb3QoY2MudjIoZFswXSwgZFsxXSksIGRbMl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvb3QobS5nZXRXUG9zKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIl19