
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/levelScene/tower/magiclan/magiclanTower.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'faf39emRepGoLTsKitSfC/j', 'magiclanTower');
// scripts/levelScene/tower/magiclan/magiclanTower.ts

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
var gameDataManager_1 = require("../../../common/module/gameDataManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MagiclanFrames = /** @class */ (function () {
    function MagiclanFrames() {
        this.frames = [];
    }
    __decorate([
        property({
            type: [cc.SpriteFrame]
        })
    ], MagiclanFrames.prototype, "frames", void 0);
    MagiclanFrames = __decorate([
        ccclass("MagiclanFrames")
    ], MagiclanFrames);
    return MagiclanFrames;
}());
var MagiclanTower = /** @class */ (function (_super) {
    __extends(MagiclanTower, _super);
    function MagiclanTower() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.offsetY = [];
        _this.framesArray = [];
        _this.magiclanFrames = [];
        _this.bulletPrefab = null;
        _this.PosOfShoot = null;
        /**
         * 法师的 帧动画组件
         */
        _this.magiclanAF = null;
        /**
         * 塔的 帧动画
         */
        _this.towerAF = null;
        _this.bg = null;
        /* 塔的属性 */
        /**
         * 塔的等级
         */
        _this.level = 1;
        _this.maxLevel = 4;
        /* 控制 */
        /**
         * false为法师朝下
         */
        _this.toward = false;
        _this.isShoot = false;
        /**
         * 塔的坐标 世界
         */
        _this.wPos = null;
        _this.poolOfBullet = null;
        return _this;
    }
    MagiclanTower.prototype.onLoad = function () {
        this.magiclanAF = this.node.getChildByName("magiclan").getComponent("frameAnimation");
        this.towerAF = this.node.getChildByName("bg").getComponent("frameAnimation");
        this.bg = this.node.getChildByName("bg");
        this.monsterArray = monster_1.default.monstersOfAlive;
        var gc = gameDataManager_1.default.getGameConfig();
        this.dataOfTower = gc.getDataOfMagiclan();
        this.createPoolOfBullet();
    };
    MagiclanTower.prototype.start = function () {
        this.wPos = this.node.parent.convertToWorldSpaceAR(this.node.getPosition());
        this.wPOfShoot = this.PosOfShoot.parent.convertToWorldSpaceAR(this.PosOfShoot.getPosition());
        this.init();
    };
    /**
     * 根据塔的等级 设置塔的图片和骨骼动画
     */
    MagiclanTower.prototype.init = function () {
        this.attack = this.dataOfTower[this.level - 1].attack;
        this.speedOfShoot = this.dataOfTower[this.level - 1].speedOfShoot;
        this.speedOfBullet = this.dataOfTower[this.level - 1].speedOfBullet;
        this.shootRange = this.dataOfTower[this.level - 1].shootRange;
        this.price = this.dataOfTower[this.level - 1].price;
        this.initMagiclanAF();
        this.initTowerAF();
    };
    /* 对象池 */
    MagiclanTower.prototype.createPoolOfBullet = function () {
        if (this.poolOfBullet !== null)
            return;
        this.poolOfBullet = new cc.NodePool();
        for (var i = 0; i < 1; i++) {
            this.poolOfBullet.put(cc.instantiate(this.bulletPrefab));
        }
    };
    MagiclanTower.prototype.getBullet = function () {
        var r = null;
        if (this.poolOfBullet.size() > 0)
            r = this.poolOfBullet.get();
        else
            r = cc.instantiate(this.bulletPrefab);
        r.opacity = 255;
        return r;
    };
    MagiclanTower.prototype.releaseBullt = function (n) {
        this.poolOfBullet.put(n);
    };
    MagiclanTower.prototype.clearPoolOfBullet = function () {
        this.poolOfBullet.clear();
    };
    /**
     * 初始化法师，更新帧动画和位置，发射动画播放时间
     */
    MagiclanTower.prototype.initMagiclanAF = function () {
        var i;
        if (this.level === 4) {
            i = 2;
        }
        else {
            i = 0;
        }
        if (this.toward)
            i++;
        this.magiclanAF.setFrameArray(this.magiclanFrames[i].frames);
        this.magiclanAF.setSpriteFrame(this.magiclanFrames[i].frames[0]);
        this.playTOfShoot = this.magiclanAF.getDuration();
        this.magiclanAF.node.setPosition(this.offsetY[this.level - 1]);
    };
    /**
     * 改变法师的朝向
     * @param toward false为 朝下
     */
    MagiclanTower.prototype.changeToward = function (toward) {
        if (toward === this.toward)
            return;
        this.toward = toward;
        this.initMagiclanAF();
    };
    /**
     * 初始化塔，更新帧动画
     */
    MagiclanTower.prototype.initTowerAF = function () {
        this.towerAF.setFrameArray(this.framesArray[this.level - 1].frames);
        this.towerAF.setSpriteFrame(this.framesArray[this.level - 1].frames[0]);
    };
    /**
     * Shoots arrow tower
     * @param des 世界坐标
     * @param time 子弹到des的时间
     */
    MagiclanTower.prototype.shoot = function (des, time) {
        if (time === void 0) { time = null; }
        if (this.isShoot)
            return;
        this.isShoot = true;
        if (time === null) {
            var l = this.wPos.sub(des).mag();
            var time_1 = l / this.speedOfBullet;
        }
        //更新法师方向
        var wPos = this.node.convertToWorldSpaceAR(this.magiclanAF.node.getPosition());
        if (wPos.y > des.y && this.toward === true)
            this.toward = false;
        else if (wPos.y < des.y && this.toward === false)
            this.toward = true;
        this.initMagiclanAF();
        this.towerAF.play(false);
        this.magiclanAF.play(false, true, false, function () {
            var bulletScr = this.createBullet();
            bulletScr.moveTo(this.wPOfShoot, des, time);
            this.coolingShoot();
        }.bind(this));
    };
    /**
     * 冷却 射击
     */
    MagiclanTower.prototype.coolingShoot = function () {
        this.scheduleOnce(function () {
            this.isShoot = false;
        }.bind(this), this.speedOfShoot);
    };
    MagiclanTower.prototype.createBullet = function () {
        var bullet = this.getBullet();
        var script = bullet.getComponent("magiclanBullet");
        this.node.addChild(bullet);
        script.init(this.attack);
        return script;
    };
    MagiclanTower.prototype.destroySelf = function () {
        this.clearPoolOfBullet();
        this.node.destroy();
    };
    /**
     * 升级
     */
    MagiclanTower.prototype.upgrade = function () {
        if (this.level === 4)
            return;
        this.level++;
        this.init();
    };
    MagiclanTower.prototype.getPriceOfUpgrade = function () {
        return this.dataOfTower[this.level].price;
    };
    MagiclanTower.prototype.getDataOfTower = function () {
        return this.dataOfTower;
    };
    /**
     * 判断该点是否在射程内
     * @param pos 世界坐标
     */
    MagiclanTower.prototype.inShootRange = function (pos) {
        var l = this.wPos.sub(pos).mag();
        if (l <= this.shootRange)
            return true;
        return false;
    };
    /**
     * 根据怪物此时的位置，预判子弹到达后，怪物的新位置
     * @param monster
     * @param cP 此时怪物的坐标 世界坐标
     * @returns 怪物预测位置,世界; 子弹达到预测位置的时间
     */
    MagiclanTower.prototype.forecastMovePos = function (monster, cP) {
        //法球飞行到cP的时间
        var time = cP.sub(this.wPOfShoot).mag() / this.speedOfBullet;
        var mWP = monster.getPosInTime(time + this.playTOfShoot);
        if (!this.inShootRange(mWP))
            return null;
        return [mWP.x, mWP.y, time];
    };
    MagiclanTower.prototype.update = function (dt) {
        if (!this.isShoot) {
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
                        break;
                    }
                }
            }
        }
    };
    __decorate([
        property({
            type: [cc.Vec2],
            tooltip: "各等级的法师的Y坐标"
        })
    ], MagiclanTower.prototype, "offsetY", void 0);
    __decorate([
        property({
            type: [MagiclanFrames],
            tooltip: "它的帧图片"
        })
    ], MagiclanTower.prototype, "framesArray", void 0);
    __decorate([
        property({
            type: [MagiclanFrames],
            tooltip: "法师的帧图片"
        })
    ], MagiclanTower.prototype, "magiclanFrames", void 0);
    __decorate([
        property({
            type: cc.Prefab
        })
    ], MagiclanTower.prototype, "bulletPrefab", void 0);
    __decorate([
        property({
            type: cc.Node,
            displayName: "射击点"
        })
    ], MagiclanTower.prototype, "PosOfShoot", void 0);
    MagiclanTower = __decorate([
        ccclass
    ], MagiclanTower);
    return MagiclanTower;
}(cc.Component));
exports.default = MagiclanTower;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2xldmVsU2NlbmUvdG93ZXIvbWFnaWNsYW4vbWFnaWNsYW5Ub3dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxpREFBNEM7QUFDNUMsMEVBQXFGO0FBRS9FLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQUE7UUFJSSxXQUFNLEdBQXFCLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBREc7UUFIQyxRQUFRLENBQUM7WUFDTixJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO1NBQ3pCLENBQUM7a0RBQzRCO0lBSjVCLGNBQWM7UUFEbkIsT0FBTyxDQUFDLGdCQUFnQixDQUFDO09BQ3BCLGNBQWMsQ0FLbkI7SUFBRCxxQkFBQztDQUxELEFBS0MsSUFBQTtBQUdEO0lBQTJDLGlDQUFZO0lBQXZEO1FBQUEscUVBdVNDO1FBalNXLGFBQU8sR0FBYyxFQUFFLENBQUM7UUFNeEIsaUJBQVcsR0FBcUIsRUFBRSxDQUFDO1FBTW5DLG9CQUFjLEdBQXFCLEVBQUUsQ0FBQztRQUt0QyxrQkFBWSxHQUFjLElBQUksQ0FBQztRQU0vQixnQkFBVSxHQUFZLElBQUksQ0FBQztRQUVuQzs7V0FFRztRQUNLLGdCQUFVLEdBQW1CLElBQUksQ0FBQztRQUMxQzs7V0FFRztRQUNLLGFBQU8sR0FBbUIsSUFBSSxDQUFDO1FBQy9CLFFBQUUsR0FBWSxJQUFJLENBQUM7UUFHM0IsVUFBVTtRQUNWOztXQUVHO1FBQ0gsV0FBSyxHQUFXLENBQUMsQ0FBQztRQUNsQixjQUFRLEdBQVcsQ0FBQyxDQUFDO1FBUXJCLFFBQVE7UUFDUjs7V0FFRztRQUNLLFlBQU0sR0FBWSxLQUFLLENBQUM7UUFDeEIsYUFBTyxHQUFZLEtBQUssQ0FBQztRQU9qQzs7V0FFRztRQUNLLFVBQUksR0FBWSxJQUFJLENB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QUM7WUFDZixPQUFPLEVBQUUsWUFBWTtTQUN4QixDQUFDO2tEQUM4QjtJQU1oQztRQUpDLFFBQVEsQ0FBQztZQUNOLElBQUksRUFBRSxDQUFDLGNBQWMsQ0FBQztZQUN0QixPQUFPLEVBQUUsT0FBTztTQUNuQixDQUFDO3NEQUN5QztJQU0zQztRQUpDLFFBQVEsQ0FBQztZQUNOLElBQUksRUFBRSxDQUFDLGNBQWMsQ0FBQztZQUN0QixPQUFPLEVBQUUsUUFBUTtTQUNwQixDQUFDO3lEQUM0QztJQUs5QztRQUhDLFFBQVEsQ0FBQztZQUNOLElBQUksRUFBRSxFQUFFLENBQUMsTUFBTTtTQUNsQixDQUFDO3VEQUNxQztJQU12QztRQUpDLFFBQVEsQ0FBQztZQUNOLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSTtZQUNiLFdBQVcsRUFBRSxLQUFLO1NBQ3JCLENBQUM7cURBQ2lDO0lBN0JsQixhQUFhO1FBRGpDLE9BQU87T0FDYSxhQUFhLENBdVNqQztJQUFELG9CQUFDO0NBdlNELEFBdVNDLENBdlMwQyxFQUFFLENBQUMsU0FBUyxHQXVTdEQ7a0JBdlNvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEZyYW1lQW5pbWF0aW9uIGZyb20gXCIuLi8uLi8uLi9jb21tb24vZnJhbWVBbmltYXRpb25cIjtcbmltcG9ydCBNYWdpY2xhbkJ1bGxldCBmcm9tIFwiLi9tYWdpY2xhbkJ1bGxldFwiO1xuaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4uLy4uL21vbnN0ZXIvbW9uc3RlclwiO1xuaW1wb3J0IEdhbWVEYXRhU3RvcmFnZSwgeyBHYW1lQ29uZmlnIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9tb2R1bGUvZ2FtZURhdGFNYW5hZ2VyXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzKFwiTWFnaWNsYW5GcmFtZXNcIilcbmNsYXNzIE1hZ2ljbGFuRnJhbWVzIHtcbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBbY2MuU3ByaXRlRnJhbWVdXG4gICAgfSlcbiAgICBmcmFtZXM6IGNjLlNwcml0ZUZyYW1lW10gPSBbXTtcbn1cblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hZ2ljbGFuVG93ZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogW2NjLlZlYzJdLFxuICAgICAgICB0b29sdGlwOiBcIuWQhOetiee6p+eahOazleW4iOeahFnlnZDmoIdcIlxuICAgIH0pXG4gICAgcHJpdmF0ZSBvZmZzZXRZOiBjYy5WZWMyW10gPSBbXTtcblxuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IFtNYWdpY2xhbkZyYW1lc10sXG4gICAgICAgIHRvb2x0aXA6IFwi5a6D55qE5bin5Zu+54mHXCJcbiAgICB9KVxuICAgIHByaXZhdGUgZnJhbWVzQXJyYXk6IE1hZ2ljbGFuRnJhbWVzW10gPSBbXTtcblxuICAgIEBwcm9wZXJ0eSh7IC8vMCwx5Li6IOazleW4iDHnmoTmnJ3kuIvlkozmnJ3kuIrnmoTluKflm77niYdcbiAgICAgICAgdHlwZTogW01hZ2ljbGFuRnJhbWVzXSxcbiAgICAgICAgdG9vbHRpcDogXCLms5XluIjnmoTluKflm77niYdcIlxuICAgIH0pXG4gICAgcHJpdmF0ZSBtYWdpY2xhbkZyYW1lczogTWFnaWNsYW5GcmFtZXNbXSA9IFtdO1xuXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogY2MuUHJlZmFiXG4gICAgfSlcbiAgICBwcml2YXRlIGJ1bGxldFByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgICAgIGRpc3BsYXlOYW1lOiBcIuWwhOWHu+eCuVwiXG4gICAgfSlcbiAgICBwcml2YXRlIFBvc09mU2hvb3Q6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICog5rOV5biI55qEIOW4p+WKqOeUu+e7hOS7tlxuICAgICAqL1xuICAgIHByaXZhdGUgbWFnaWNsYW5BRjogRnJhbWVBbmltYXRpb24gPSBudWxsO1xuICAgIC8qKlxuICAgICAqIOWhlOeahCDluKfliqjnlLtcbiAgICAgKi9cbiAgICBwcml2YXRlIHRvd2VyQUY6IEZyYW1lQW5pbWF0aW9uID0gbnVsbDtcbiAgICBwcml2YXRlIGJnOiBjYy5Ob2RlID0gbnVsbDtcbiAgICBwcml2YXRlIG1vbnN0ZXJBcnJheTogTW9uc3RlcltdO1xuXG4gICAgLyog5aGU55qE5bGe5oCnICovXG4gICAgLyoqXG4gICAgICog5aGU55qE562J57qnXG4gICAgICovXG4gICAgbGV2ZWw6IG51bWJlciA9IDE7XG4gICAgbWF4TGV2ZWw6IG51bWJlciA9IDQ7XG4gICAgcHJpdmF0ZSBzcGVlZE9mU2hvb3Q6IG51bWJlcjtcbiAgICBwcml2YXRlIHNwZWVkT2ZCdWxsZXQ6IG51bWJlcjtcbiAgICBwcml2YXRlIGF0dGFjazogbnVtYmVyO1xuICAgIHNob290UmFuZ2U6IG51bWJlcjtcbiAgICBwcmljZTogbnVtYmVyO1xuXG5cbiAgICAvKiDmjqfliLYgKi9cbiAgICAvKipcbiAgICAgKiBmYWxzZeS4uuazleW4iOacneS4i1xuICAgICAqL1xuICAgIHByaXZhdGUgdG93YXJkOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBpc1Nob290OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiDmlbDmja4gKi9cbiAgICAvKipcbiAgICAgKiDms5XnkIPlj5HlsITngrkg5LiW55WMXG4gICAgICovXG4gICAgcHJpdmF0ZSB3UE9mU2hvb3Q6IGNjLlZlYzI7XG4gICAgLyoqXG4gICAgICog5aGU55qE5Z2Q5qCHIOS4lueVjFxuICAgICAqL1xuICAgIHByaXZhdGUgd1BvczogY2MuVmVjMiA9IG51bGw7XG4gICAgLyoqXG4gICAgICog5Y+R5bCE5Yqo55S75pKt5pS+5pe26Ze0XG4gICAgICovXG4gICAgcHJpdmF0ZSBwbGF5VE9mU2hvb3Q6IG51bWJlcjtcbiAgICBwcml2YXRlIHBvb2xPZkJ1bGxldDogY2MuTm9kZVBvb2wgPSBudWxsO1xuICAgIHByaXZhdGUgZGF0YU9mVG93ZXI6IGFueVtdO1xuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICB0aGlzLm1hZ2ljbGFuQUYgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJtYWdpY2xhblwiKS5nZXRDb21wb25lbnQoXCJmcmFtZUFuaW1hdGlvblwiKTtcbiAgICAgICAgdGhpcy50b3dlckFGID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmdcIikuZ2V0Q29tcG9uZW50KFwiZnJhbWVBbmltYXRpb25cIik7XG4gICAgICAgIHRoaXMuYmcgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKTtcbiAgICAgICAgdGhpcy5tb25zdGVyQXJyYXkgPSBNb25zdGVyLm1vbnN0ZXJzT2ZBbGl2ZTtcbiAgICAgICAgbGV0IGdjOiBHYW1lQ29uZmlnID0gR2FtZURhdGFTdG9yYWdlLmdldEdhbWVDb25maWcoKTtcbiAgICAgICAgdGhpcy5kYXRhT2ZUb3dlciA9IGdjLmdldERhdGFPZk1hZ2ljbGFuKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlUG9vbE9mQnVsbGV0KCk7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMud1BvcyA9IHRoaXMubm9kZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKHRoaXMubm9kZS5nZXRQb3NpdGlvbigpKTtcbiAgICAgICAgdGhpcy53UE9mU2hvb3QgPSB0aGlzLlBvc09mU2hvb3QucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUih0aGlzLlBvc09mU2hvb3QuZ2V0UG9zaXRpb24oKSk7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOagueaNruWhlOeahOetiee6pyDorr7nva7loZTnmoTlm77niYflkozpqqjpqrzliqjnlLtcbiAgICAgKi9cbiAgICBwcml2YXRlIGluaXQoKSB7XG4gICAgICAgIHRoaXMuYXR0YWNrID0gdGhpcy5kYXRhT2ZUb3dlclt0aGlzLmxldmVsIC0gMV0uYXR0YWNrO1xuICAgICAgICB0aGlzLnNwZWVkT2ZTaG9vdCA9IHRoaXMuZGF0YU9mVG93ZXJbdGhpcy5sZXZlbCAtIDFdLnNwZWVkT2ZTaG9vdDtcbiAgICAgICAgdGhpcy5zcGVlZE9mQnVsbGV0ID0gdGhpcy5kYXRhT2ZUb3dlclt0aGlzLmxldmVsIC0gMV0uc3BlZWRPZkJ1bGxldDtcbiAgICAgICAgdGhpcy5zaG9vdFJhbmdlID0gdGhpcy5kYXRhT2ZUb3dlclt0aGlzLmxldmVsIC0gMV0uc2hvb3RSYW5nZTtcbiAgICAgICAgdGhpcy5wcmljZSA9IHRoaXMuZGF0YU9mVG93ZXJbdGhpcy5sZXZlbCAtIDFdLnByaWNlO1xuXG4gICAgICAgIHRoaXMuaW5pdE1hZ2ljbGFuQUYoKTtcbiAgICAgICAgdGhpcy5pbml0VG93ZXJBRigpO1xuICAgIH1cblxuICAgIC8qIOWvueixoeaxoCAqL1xuICAgIHByaXZhdGUgY3JlYXRlUG9vbE9mQnVsbGV0KCkge1xuICAgICAgICBpZiAodGhpcy5wb29sT2ZCdWxsZXQgIT09IG51bGwpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMucG9vbE9mQnVsbGV0ID0gbmV3IGNjLk5vZGVQb29sKCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnBvb2xPZkJ1bGxldC5wdXQoY2MuaW5zdGFudGlhdGUodGhpcy5idWxsZXRQcmVmYWIpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRCdWxsZXQoKTogY2MuTm9kZSB7XG4gICAgICAgIGxldCByOiBjYy5Ob2RlID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMucG9vbE9mQnVsbGV0LnNpemUoKSA+IDApXG4gICAgICAgICAgICByID0gdGhpcy5wb29sT2ZCdWxsZXQuZ2V0KCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHIgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmJ1bGxldFByZWZhYik7XG4gICAgICAgIHIub3BhY2l0eSA9IDI1NTtcbiAgICAgICAgcmV0dXJuIHI7XG4gICAgfVxuICAgIHJlbGVhc2VCdWxsdChuOiBjYy5Ob2RlKSB7XG4gICAgICAgIHRoaXMucG9vbE9mQnVsbGV0LnB1dChuKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBjbGVhclBvb2xPZkJ1bGxldCgpIHtcbiAgICAgICAgdGhpcy5wb29sT2ZCdWxsZXQuY2xlYXIoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliJ3lp4vljJbms5XluIjvvIzmm7TmlrDluKfliqjnlLvlkozkvY3nva7vvIzlj5HlsITliqjnlLvmkq3mlL7ml7bpl7RcbiAgICAgKi9cbiAgICBwcml2YXRlIGluaXRNYWdpY2xhbkFGKCkge1xuICAgICAgICBsZXQgaTogbnVtYmVyO1xuICAgICAgICBpZiAodGhpcy5sZXZlbCA9PT0gNCkge1xuICAgICAgICAgICAgaSA9IDI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpID0gMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy50b3dhcmQpXG4gICAgICAgICAgICBpKys7XG4gICAgICAgIHRoaXMubWFnaWNsYW5BRi5zZXRGcmFtZUFycmF5KHRoaXMubWFnaWNsYW5GcmFtZXNbaV0uZnJhbWVzKTtcbiAgICAgICAgdGhpcy5tYWdpY2xhbkFGLnNldFNwcml0ZUZyYW1lKHRoaXMubWFnaWNsYW5GcmFtZXNbaV0uZnJhbWVzWzBdKTtcbiAgICAgICAgdGhpcy5wbGF5VE9mU2hvb3QgPSB0aGlzLm1hZ2ljbGFuQUYuZ2V0RHVyYXRpb24oKTtcblxuICAgICAgICB0aGlzLm1hZ2ljbGFuQUYubm9kZS5zZXRQb3NpdGlvbih0aGlzLm9mZnNldFlbdGhpcy5sZXZlbCAtIDFdKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmlLnlj5jms5XluIjnmoTmnJ3lkJFcbiAgICAgKiBAcGFyYW0gdG93YXJkIGZhbHNl5Li6IOacneS4i1xuICAgICAqL1xuICAgIHByaXZhdGUgY2hhbmdlVG93YXJkKHRvd2FyZDogYm9vbGVhbikge1xuICAgICAgICBpZiAodG93YXJkID09PSB0aGlzLnRvd2FyZClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy50b3dhcmQgPSB0b3dhcmQ7XG4gICAgICAgIHRoaXMuaW5pdE1hZ2ljbGFuQUYoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliJ3lp4vljJbloZTvvIzmm7TmlrDluKfliqjnlLtcbiAgICAgKi9cbiAgICBwcml2YXRlIGluaXRUb3dlckFGKCkge1xuICAgICAgICB0aGlzLnRvd2VyQUYuc2V0RnJhbWVBcnJheSh0aGlzLmZyYW1lc0FycmF5W3RoaXMubGV2ZWwgLSAxXS5mcmFtZXMpO1xuICAgICAgICB0aGlzLnRvd2VyQUYuc2V0U3ByaXRlRnJhbWUodGhpcy5mcmFtZXNBcnJheVt0aGlzLmxldmVsIC0gMV0uZnJhbWVzWzBdKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTaG9vdHMgYXJyb3cgdG93ZXJcbiAgICAgKiBAcGFyYW0gZGVzIOS4lueVjOWdkOagh1xuICAgICAqIEBwYXJhbSB0aW1lIOWtkOW8ueWIsGRlc+eahOaXtumXtFxuICAgICAqL1xuICAgIHByaXZhdGUgc2hvb3QoZGVzOiBjYy5WZWMyLCB0aW1lOiBudW1iZXIgPSBudWxsKSB7XG4gICAgICAgIGlmICh0aGlzLmlzU2hvb3QpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMuaXNTaG9vdCA9IHRydWU7XG5cbiAgICAgICAgaWYgKHRpbWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGxldCBsOiBudW1iZXIgPSB0aGlzLndQb3Muc3ViKGRlcykubWFnKCk7XG4gICAgICAgICAgICBsZXQgdGltZSA9IGwgLyB0aGlzLnNwZWVkT2ZCdWxsZXQ7XG4gICAgICAgIH1cblxuICAgICAgICAvL+abtOaWsOazleW4iOaWueWQkVxuICAgICAgICBsZXQgd1BvczogY2MuVmVjMiA9IHRoaXMubm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIodGhpcy5tYWdpY2xhbkFGLm5vZGUuZ2V0UG9zaXRpb24oKSk7XG4gICAgICAgIGlmICh3UG9zLnkgPiBkZXMueSAmJiB0aGlzLnRvd2FyZCA9PT0gdHJ1ZSlcbiAgICAgICAgICAgIHRoaXMudG93YXJkID0gZmFsc2U7XG4gICAgICAgIGVsc2UgaWYgKHdQb3MueSA8IGRlcy55ICYmIHRoaXMudG93YXJkID09PSBmYWxzZSlcbiAgICAgICAgICAgIHRoaXMudG93YXJkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pbml0TWFnaWNsYW5BRigpO1xuXG4gICAgICAgIHRoaXMudG93ZXJBRi5wbGF5KGZhbHNlKTtcbiAgICAgICAgdGhpcy5tYWdpY2xhbkFGLnBsYXkoZmFsc2UsIHRydWUsIGZhbHNlLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsZXQgYnVsbGV0U2NyOiBNYWdpY2xhbkJ1bGxldCA9IHRoaXMuY3JlYXRlQnVsbGV0KCk7XG4gICAgICAgICAgICBidWxsZXRTY3IubW92ZVRvKHRoaXMud1BPZlNob290LCBkZXMsIHRpbWUpO1xuICAgICAgICAgICAgdGhpcy5jb29saW5nU2hvb3QoKTtcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWGt+WNtCDlsITlh7tcbiAgICAgKi9cbiAgICBwcml2YXRlIGNvb2xpbmdTaG9vdCgpIHtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5pc1Nob290ID0gZmFsc2U7XG4gICAgICAgIH0uYmluZCh0aGlzKSwgdGhpcy5zcGVlZE9mU2hvb3QpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlQnVsbGV0KCk6IE1hZ2ljbGFuQnVsbGV0IHtcbiAgICAgICAgbGV0IGJ1bGxldDogY2MuTm9kZSA9IHRoaXMuZ2V0QnVsbGV0KCk7XG4gICAgICAgIGxldCBzY3JpcHQ6IE1hZ2ljbGFuQnVsbGV0ID0gYnVsbGV0LmdldENvbXBvbmVudChcIm1hZ2ljbGFuQnVsbGV0XCIpO1xuICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQoYnVsbGV0KTtcbiAgICAgICAgc2NyaXB0LmluaXQodGhpcy5hdHRhY2spO1xuICAgICAgICByZXR1cm4gc2NyaXB0O1xuICAgIH1cblxuICAgIGRlc3Ryb3lTZWxmKCkge1xuICAgICAgICB0aGlzLmNsZWFyUG9vbE9mQnVsbGV0KCk7XG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Y2H57qnXG4gICAgICovXG4gICAgdXBncmFkZSgpIHtcbiAgICAgICAgaWYgKHRoaXMubGV2ZWwgPT09IDQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMubGV2ZWwrKztcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuXG4gICAgZ2V0UHJpY2VPZlVwZ3JhZGUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YU9mVG93ZXJbdGhpcy5sZXZlbF0ucHJpY2U7XG4gICAgfVxuXG4gICAgZ2V0RGF0YU9mVG93ZXIoKTogYW55W10ge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhT2ZUb3dlcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliKTmlq3or6XngrnmmK/lkKblnKjlsITnqIvlhoVcbiAgICAgKiBAcGFyYW0gcG9zIOS4lueVjOWdkOagh1xuICAgICAqL1xuICAgIHByaXZhdGUgaW5TaG9vdFJhbmdlKHBvczogY2MuVmVjMik6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgbDogbnVtYmVyID0gdGhpcy53UG9zLnN1Yihwb3MpLm1hZygpO1xuICAgICAgICBpZiAobCA8PSB0aGlzLnNob290UmFuZ2UpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOagueaNruaAqueJqeatpOaXtueahOS9jee9ru+8jOmihOWIpOWtkOW8ueWIsOi+vuWQju+8jOaAqueJqeeahOaWsOS9jee9rlxuICAgICAqIEBwYXJhbSBtb25zdGVyIFxuICAgICAqIEBwYXJhbSBjUCDmraTml7bmgKrniannmoTlnZDmoIcg5LiW55WM5Z2Q5qCHXG4gICAgICogQHJldHVybnMg5oCq54mp6aKE5rWL5L2N572uLOS4lueVjDsg5a2Q5by56L6+5Yiw6aKE5rWL5L2N572u55qE5pe26Ze0XG4gICAgICovXG4gICAgcHJpdmF0ZSBmb3JlY2FzdE1vdmVQb3MobW9uc3RlcjogTW9uc3RlciwgY1A6IGNjLlZlYzIpOiBudW1iZXJbXSB7XG4gICAgICAgIC8v5rOV55CD6aOe6KGM5YiwY1DnmoTml7bpl7RcbiAgICAgICAgbGV0IHRpbWU6IG51bWJlciA9IGNQLnN1Yih0aGlzLndQT2ZTaG9vdCkubWFnKCkgLyB0aGlzLnNwZWVkT2ZCdWxsZXQ7XG5cbiAgICAgICAgbGV0IG1XUDogY2MuVmVjMiA9IG1vbnN0ZXIuZ2V0UG9zSW5UaW1lKHRpbWUgKyB0aGlzLnBsYXlUT2ZTaG9vdCk7XG4gICAgICAgIGlmICghdGhpcy5pblNob290UmFuZ2UobVdQKSlcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICByZXR1cm4gW21XUC54LCBtV1AueSwgdGltZV07XG4gICAgfVxuXG4gICAgdXBkYXRlKGR0KSB7XG4gICAgICAgIGlmICghdGhpcy5pc1Nob290KSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubW9uc3RlckFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IG06IE1vbnN0ZXIgPSB0aGlzLm1vbnN0ZXJBcnJheVtpXTtcbiAgICAgICAgICAgICAgICBsZXQgbVA6IGNjLlZlYzIgPSBtLm5vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihtLm5vZGUuZ2V0UG9zaXRpb24oKSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pblNob290UmFuZ2UobVApKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtLnN3aU9mUmVjdXJzaW9uSW5QVykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZDogbnVtYmVyW10gPSB0aGlzLmZvcmVjYXN0TW92ZVBvcyhtLCBtUCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZCA9PT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvb3QoY2MudjIoZFswXSwgZFsxXSksIGRbMl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob290KG0uZ2V0V1BvcygpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG59XG4iXX0=