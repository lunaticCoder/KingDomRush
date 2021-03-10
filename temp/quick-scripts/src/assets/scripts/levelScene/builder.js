"use strict";
cc._RF.push(module, 'a41detyOBVLHZsU59cvFaU2', 'builder');
// scripts/levelScene/builder.ts

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
var gameDataManager_1 = require("../common/module/gameDataManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Builder = /** @class */ (function (_super) {
    __extends(Builder, _super);
    function Builder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.arrowTower = null;
        _this.barrackTower = null;
        _this.magiclanTower = null;
        _this.artilleryTower = null;
        _this.graphics = null;
        /**
         * 建筑塔面板
         */
        _this.buildFace = null;
        /**
         * 建造的塔
         */
        _this.tower = null;
        /**
         * 没建塔时显示4种建筑的建造按钮界面
         */
        _this.g1 = null;
        /**
         * 建塔后显示的升级和卖出按钮界面
         */
        _this.g2 = null;
        _this.upgrade = null;
        /**
         * 空地（背景）节点
         */
        _this.land = null;
        _this.towerMap = null;
        _this.levelScene = null;
        _this.priceOfArrow = null;
        _this.priceOfBarrack = null;
        _this.priceOfMagiclan = null;
        _this.priceOfArtillery = null;
        _this.priceOfUpgrade = null;
        _this.priceOfSale = null;
        /* 数据 */
        /**
         * buildFace面板弹出和隐藏的时间
         */
        _this.timeOfFaceAction = 0.1;
        /**
         * 各种塔的数据
         * arrowTower,artillery,barrack,magiclan
         */
        _this.dataOfTower = [];
        /* 控制 */
        _this.playingOutBuildFace = false;
        _this.playingHiddenBuildFace = false;
        _this.g = null;
        return _this;
        // update (dt) {}
    }
    Builder.prototype.onLoad = function () {
        this.buildFace = this.node.getChildByName("buildFace");
        this.g1 = this.buildFace.getChildByName("g1");
        this.g2 = this.buildFace.getChildByName("g2");
        this.upgrade = this.g2.getChildByName("upgrade").getComponent(cc.Button);
        this.land = this.node.getChildByName("land");
        this.towerMap = cc.find("Canvas/towerMap");
        this.levelScene = cc.find("Canvas").getComponent("levelScene");
        this.stationOfSoldier = this.levelScene.levelData.stationOfSoldier;
        var gc = gameDataManager_1.default.getGameConfig();
        this.dataOfTower.push(gc.getDataOfArrowTower());
        this.dataOfTower.push(gc.getDataOfArtillery());
        this.dataOfTower.push(gc.getDataOfBarrack());
        this.dataOfTower.push(gc.getDataOfMagiclan());
        this.priceOfArrow = this.g1.getChildByName("arrow").getChildByName("price").getComponent(cc.Label);
        this.priceOfBarrack = this.g1.getChildByName("barrack").getChildByName("price").getComponent(cc.Label);
        this.priceOfMagiclan = this.g1.getChildByName("magiclan").getChildByName("price").getComponent(cc.Label);
        this.priceOfArtillery = this.g1.getChildByName("artillery").getChildByName("price").getComponent(cc.Label);
        this.priceOfUpgrade = this.g2.getChildByName("upgrade").getChildByName("price").getComponent(cc.Label);
        this.priceOfSale = this.g2.getChildByName("sale").getChildByName("price").getComponent(cc.Label);
        this.rateOfSale = gc.getRateOfSale();
    };
    Builder.prototype.start = function () {
    };
    /**
     * 实例化加入父节点后必须执行
     * @param num builder编号
     */
    Builder.prototype.init = function (num) {
        this.g = this.graphics.addComponent(cc.Graphics);
        this.g.strokeColor = this.g.fillColor = new cc.Color(0, 100, 0, 50);
        this.num = num;
    };
    /**
     * 弹出buildFace
     */
    Builder.prototype.outBuildFace = function () {
        if (this.playingOutBuildFace)
            return;
        this.playingOutBuildFace = true;
        this.node.zIndex = 10;
        this.buildFace.active = true;
        if (this.tower === null) {
            this.refreshPriceOfBuild();
            this.g1.active = true;
        }
        else { //有塔
            this.refreshPriceOfUpOrSele();
            if (this.tower.level === this.tower.maxLevel) //满级了
                this.upgrade.interactable = false;
            else
                this.upgrade.interactable = true;
            this.g2.active = true;
        }
        var a = cc.scaleTo(this.timeOfFaceAction, 1).easing(cc.easeBackOut());
        var func = cc.callFunc(function () { this.playingOutBuildFace = false; }, this);
        var seq = cc.sequence(a, func);
        this.buildFace.runAction(seq);
    };
    /**
     * 刷新各塔的建造价格
     */
    Builder.prototype.refreshPriceOfBuild = function () {
        this.setLabelInCase(this.priceOfArrow, this.dataOfTower[0][0].price);
        this.setLabelInCase(this.priceOfArtillery, this.dataOfTower[1][0].price);
        this.setLabelInCase(this.priceOfBarrack, this.dataOfTower[2][0].price);
        this.setLabelInCase(this.priceOfMagiclan, this.dataOfTower[3][0].price);
    };
    /**
     * 刷新升级塔和卖塔的价格
     */
    Builder.prototype.refreshPriceOfUpOrSele = function () {
        if (this.tower === null) {
            cc.error("[ERROR] 升级或卖塔时，发现塔为null。请处理！");
            return;
        }
        var d = this.tower.getDataOfTower();
        //升级按钮
        if (this.tower.level < d.length)
            this.setLabelInCase(this.priceOfUpgrade, d[this.tower.level].price);
        //出售按钮
        var p = d[this.tower.level - 1].price;
        this.priceOfSale.string = Math.floor(p * this.rateOfSale).toString();
    };
    /**
     * 根据操作价格与已有金币设置label
     * @param l Label
     * @param p 建筑价格
     */
    Builder.prototype.setLabelInCase = function (l, p) {
        var havedCash = this.levelScene.cash;
        l.string = p.toString();
        if (p > havedCash)
            l.node.color = cc.Color.RED;
        else
            l.node.color = cc.Color.WHITE;
    };
    /**
     * 隐藏buildFace
     */
    Builder.prototype.hiddenBuildFace = function () {
        if (this.playingHiddenBuildFace)
            return;
        this.playingHiddenBuildFace = true;
        this.node.zIndex = 0;
        var a = cc.scaleTo(this.timeOfFaceAction, 0);
        this.buildFace.runAction(a);
        this.scheduleOnce(function () {
            this.buildFace.active = false;
            this.g1.active = false;
            this.g2.active = false;
            this.playingHiddenBuildFace = false;
        }.bind(this), this.timeOfFaceAction);
    };
    Builder.prototype.buildArrowTower = function () {
        var cost = this.dataOfTower[0][0].price;
        this.buildTower(this.arrowTower, "arrowTower", cost);
    };
    Builder.prototype.buildArtilleryTower = function () {
        var cost = this.dataOfTower[1][0].price;
        this.buildTower(this.artilleryTower, "artilleryTower", cost);
    };
    Builder.prototype.buildMagiclanTower = function () {
        var cost = this.dataOfTower[3][0].price;
        this.buildTower(this.magiclanTower, "magiclanTower", cost);
    };
    Builder.prototype.buildBarrackTower = function () {
        var cost = this.dataOfTower[2][0].price;
        if (this.buildTower(this.barrackTower, "barrack", cost))
            this.tower.stationOfSoldier = this.stationOfSoldier[this.num];
    };
    /**
     * Builds tower
     * @param towerPrefab
     * @param component
     * @param cost 花费金币
     * @returns 金币不够，创建失败返回false
     */
    Builder.prototype.buildTower = function (towerPrefab, component, cost) {
        if (!this.levelScene.subCash(cost))
            return false;
        this.tower = cc.instantiate(towerPrefab).getComponent(component);
        this.towerMap.addChild(this.tower.node);
        this.tower.node.setPosition(this.node.getPosition());
        this.land.opacity = 0;
        this.hiddenBuildFaceImmediately();
        this.scheduleOnce(this.drawShootRange.bind(this), 0.5);
        return true;
    };
    Builder.prototype.saleTower = function () {
        this.levelScene.addCash(this.tower.price * this.rateOfSale);
        this.deleteTower();
        this.hiddenBuildFaceImmediately();
        this.g.clear();
    };
    Builder.prototype.upTower = function () {
        var havedCash = this.levelScene.cash;
        var cost = this.tower.getPriceOfUpgrade();
        if (havedCash < cost)
            return;
        this.levelScene.subCash(cost);
        this.tower.upgrade();
        this.drawShootRange();
        if (this.tower.level === this.tower.maxLevel) {
            this.upgrade.interactable = false;
            return;
        }
        this.refreshPriceOfUpOrSele();
    };
    /**
     * 立即隐藏BuildFace
     */
    Builder.prototype.hiddenBuildFaceImmediately = function () {
        this.buildFace.scale = 0;
        this.buildFace.active = false;
        this.g1.active = false;
        this.g2.active = false;
    };
    /**
     * 删除塔并将空地显示出来
     */
    Builder.prototype.deleteTower = function () {
        if (this.tower === null)
            return;
        this.tower.destroySelf();
        this.g.clear();
        this.tower = null;
        this.land.opacity = 255;
    };
    /**
    * 绘制射程范围
    */
    Builder.prototype.drawShootRange = function () {
        if (this.tower.shootRange === undefined)
            return;
        this.g.clear();
        this.g.circle(0, 0, this.tower.shootRange);
        this.g.stroke();
        this.g.fill();
    };
    __decorate([
        property({
            type: cc.Prefab,
        })
    ], Builder.prototype, "arrowTower", void 0);
    __decorate([
        property({
            type: cc.Prefab,
        })
    ], Builder.prototype, "barrackTower", void 0);
    __decorate([
        property({
            type: cc.Prefab,
        })
    ], Builder.prototype, "magiclanTower", void 0);
    __decorate([
        property({
            type: cc.Prefab,
        })
    ], Builder.prototype, "artilleryTower", void 0);
    __decorate([
        property({
            type: cc.Node,
        })
    ], Builder.prototype, "graphics", void 0);
    Builder = __decorate([
        ccclass
    ], Builder);
    return Builder;
}(cc.Component));
exports.default = Builder;

cc._RF.pop();