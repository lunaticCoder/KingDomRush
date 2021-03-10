"use strict";
cc._RF.push(module, '403e3F1r7dJD4/WJwLaVuIm', 'arrowTower');
// scripts/levelScene/tower/arrow/arrowTower.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ArrowTower = /** @class */ (function (_super) {
    __extends(ArrowTower, _super);
    function ArrowTower() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.offsetY = [];
        _this.arrowPrefab = null;
        _this.atlas = [];
        /* 塔的属性 */
        /**
         * 塔的等级
         */
        _this.level = 1;
        _this.maxLevel = 4;
        _this.leftArrower = null;
        _this.rightArrower = null;
        /**
         * 左右两个士兵的 帧动画组件
         */
        _this.towerBG = null;
        _this.frameAnimations = [];
        /* 控制 */
        /**
         * false为士兵朝下
         */
        _this.toward = false;
        _this.dataOfTower = null;
        _this.poolOfArrow = null;
        return _this;
    }
    ArrowTower.prototype.onLoad = function () {
        var l = this.node.getChildByName("leftPerson");
        var r = this.node.getChildByName("rightPerson");
        this.frameAnimations[0] = l.getComponent("frameAnimation");
        this.frameAnimations[1] = r.getComponent("frameAnimation");
        this.leftArrower = l.getComponent("arrower");
        this.rightArrower = r.getComponent("arrower");
        this.towerBG = this.node.getChildByName("bg").getComponent(cc.Sprite);
        this.gameConfig = gameDataManager_1.default.getGameConfig();
        this.dataOfTower = this.gameConfig.getDataOfArrowTower();
        this.createPoolOfArrow();
    };
    ArrowTower.prototype.start = function () {
        this.wPos = this.node.parent.convertToWorldSpaceAR(this.node.getPosition());
        this.init();
    };
    ArrowTower.prototype.init = function () {
        this.attack = this.dataOfTower[this.level - 1].attack;
        this.speedOfArrow = this.dataOfTower[this.level - 1].speedOfArrow;
        this.shootRange = this.dataOfTower[this.level - 1].shootRange;
        this.speedOfShoot = this.dataOfTower[this.level - 1].speedOfShoot;
        this.price = this.dataOfTower[this.level - 1].price;
        this.initArrower();
    };
    /* 箭对象池 */
    ArrowTower.prototype.createPoolOfArrow = function () {
        if (this.poolOfArrow !== null)
            return;
        this.poolOfArrow = new cc.NodePool();
        for (var i = 0; i < 2; i++) {
            this.poolOfArrow.put(cc.instantiate(this.arrowPrefab));
        }
    };
    ArrowTower.prototype.getArrowBullet = function () {
        var r = null;
        if (this.poolOfArrow.size() > 0)
            r = this.poolOfArrow.get();
        else
            r = cc.instantiate(this.arrowPrefab);
        r.opacity = 255;
        return r;
    };
    ArrowTower.prototype.releaseArrowBullt = function (n) {
        this.poolOfArrow.put(n);
    };
    ArrowTower.prototype.clearPoolOfArrow = function () {
        this.poolOfArrow.clear();
    };
    ArrowTower.prototype.initArrower = function () {
        //设置位置和图片
        this.frameAnimations[0].node.y = this.offsetY[this.level - 1].y;
        this.frameAnimations[1].node.y = this.offsetY[this.level - 1].y;
        var atlas = this.atlas[this.level - 1];
        var spriteArr = atlas.getSpriteFrames();
        //设置塔的皮肤
        this.towerBG.spriteFrame = spriteArr[0];
        this.setSkin(this.frameAnimations[0], spriteArr);
        this.setSkin(this.frameAnimations[1], spriteArr);
        //传参
        this.leftArrower.init(this.wPos, this.speedOfArrow, this.shootRange, this.speedOfShoot, this.attack);
        this.rightArrower.init(this.wPos, this.speedOfArrow, this.shootRange, this.speedOfShoot, this.attack);
    };
    /**
     * 设置士兵的皮肤和帧动画
     * @param frameAnimation
     * @param res 图片资源
     */
    ArrowTower.prototype.setSkin = function (frameAnimation, res) {
        //设置士兵等待时的皮肤
        var i = 5; //朝下
        if (this.toward)
            i = 6;
        frameAnimation.setSpriteFrame(res[i]);
        frameAnimation.setIdle(res[i]);
        //设置帧动画
        var arr = [];
        i = 1;
        if (this.toward) //朝下
            i = 7;
        for (var j = 0; j < 4; j++)
            arr.push(res[i + j]);
        frameAnimation.setFrameArray(arr);
    };
    ArrowTower.prototype.destroySelf = function () {
        this.clearPoolOfArrow();
        this.node.destroy();
    };
    /**
     * 升级
     */
    ArrowTower.prototype.upgrade = function () {
        if (this.level === 4)
            return;
        this.level++;
        this.init();
    };
    ArrowTower.prototype.getPriceOfUpgrade = function () {
        return this.dataOfTower[this.level].price;
    };
    ArrowTower.prototype.getDataOfTower = function () {
        return this.dataOfTower;
    };
    ArrowTower.prototype.update = function (dt) {
    };
    __decorate([
        property({
            type: [cc.Vec2],
            tooltip: "各等级的人的Y坐标"
        })
    ], ArrowTower.prototype, "offsetY", void 0);
    __decorate([
        property({
            type: cc.Prefab
        })
    ], ArrowTower.prototype, "arrowPrefab", void 0);
    __decorate([
        property([cc.SpriteAtlas])
    ], ArrowTower.prototype, "atlas", void 0);
    ArrowTower = __decorate([
        ccclass
    ], ArrowTower);
    return ArrowTower;
}(cc.Component));
exports.default = ArrowTower;

cc._RF.pop();