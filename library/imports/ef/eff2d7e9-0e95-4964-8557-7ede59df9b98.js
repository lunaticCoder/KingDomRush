"use strict";
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